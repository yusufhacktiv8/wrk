import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Input, Row, Col, message, Popconfirm } from 'antd';
import showError from '../utils/ShowError';
import RevenueWindow from './RevenueWindow';
import YearSelect from '../common/YearSelect';

const REVENUES_URL = `${process.env.REACT_APP_SERVER_URL}/api/revenues`;
const Column = Table.Column;
const PAGE_SIZE = 12;

class RevenueList extends Component {
  state = {
    searchYear: new Date().getFullYear(),
    revenue: {},
    revenues: [],
    loading: false,
    revenueWindowVisible: false,
  }
  componentDidMount() {
    this.fetchRevenues();
  }

  onSearchChange = (e) => {
    this.setState({
      searchYear: e,
    });
  }

  onSaveSuccess = () => {
    this.closeEditWindow();
    this.fetchRevenues();
  }

  fetchRevenues() {
    this.setState({
      loading: true,
    });
    axios.get(REVENUES_URL, { params: {
      searchYear: this.state.searchYear,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    } })
      .then((response) => {
        this.setState({
          revenues: response.data.rows,
          count: response.data.count,
          loading: false,
        });
      })
      .catch((error) => {
        showError(error);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  }

  filterRevenues = () => {
    this.setState({
      currentPage: 1,
    }, () => { this.fetchRevenues(); });
  }

  deleteRevenue(revenue) {
    const hide = message.loading('Action in progress..', 0);
    axios.delete(`${REVENUES_URL}/${revenue.id}`)
      .then(() => {
        message.success('Delete revenue success');
        this.fetchRevenues();
      })
      .catch((error) => {
        showError(error);
      })
      .finally(() => {
        hide();
      });
  }

  openEditWindow = (record) => {
    this.setState({
      revenue: record,
      revenueWindowVisible: true,
    }, () => {
      this.revenueWindow.resetFields();
    });
  }

  closeEditWindow = () => {
    this.setState({
      revenueWindowVisible: false,
    });
  }

  pageChanged = (pagination) => {
    const page = pagination.current;
    this.setState({
      currentPage: page,
    }, () => { this.fetchRevenues(); });
  }

  render() {
    return (
      <div>
        <Row gutter={10}>
          <Col span={6}>
            <YearSelect
              value={this.state.searchYear}
              onChange={this.onSearchChange}
            />
          </Col>
          <Col span={16}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={this.filterRevenues}
                style={{ marginRight: 15 }}
              />
              <Button
                type="primary"
                shape="circle"
                icon="plus"
                onClick={() => this.openEditWindow({})}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={this.state.revenues}
              style={{ marginTop: 20 }}
              rowKey="id"
              loading={this.state.loading}
              pagination={{
                total: this.state.count,
                current: this.state.currentPage,
                pageSize: PAGE_SIZE,
              }}
              onChange={this.pageChanged}
              size="small"
            >
              <Column
                title="Tahun"
                dataIndex="year"
                key="year"
              />
              <Column
                title="Bulan"
                dataIndex="month"
                key="month"
              />
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    <Button
                      icon="ellipsis"
                      size="small"
                      onClick={() => this.openEditWindow(record)}
                      style={{ marginRight: 5 }}
                    />
                    <Popconfirm
                      title={`Are you sure delete revenue ${record.month} - ${record.year}`}
                      onConfirm={() => this.deleteRevenue(record)}
                      okText="Yes" cancelText="No"
                    >
                      <Button
                        type="danger"
                        icon="delete"
                        size="small"
                      />
                    </Popconfirm>
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>

        <RevenueWindow
          visible={this.state.revenueWindowVisible}
          onSaveSuccess={this.onSaveSuccess}
          onCancel={this.closeEditWindow}
          onClose={this.closeEditWindow}
          revenue={this.state.revenue}
          ref={revenueWindow => (this.revenueWindow = revenueWindow)}
        />
      </div>
    );
  }
}

export default RevenueList;
