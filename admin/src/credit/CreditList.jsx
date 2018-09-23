import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Input, Row, Col, message, Popconfirm } from 'antd';
import showError from '../utils/ShowError';
import CreditWindow from './CreditWindow';
import YearSelect from '../common/YearSelect';

const CREDITS_URL = `${process.env.REACT_APP_SERVER_URL}/api/credits`;
const Column = Table.Column;

class CreditList extends Component {
  state = {
    searchYear: new Date().getFullYear(),
    credit: {},
    credits: [],
    loading: false,
    count: 0,
    currentPage: 1,
    pageSize: 10,
    creditWindowVisible: false,
  }
  componentDidMount() {
    this.fetchCredits();
  }

  onSearchChange = (e) => {
    this.setState({
      searchYear: e,
    });
  }

  onSaveSuccess = () => {
    this.closeEditWindow();
    this.fetchCredits();
  }

  fetchCredits() {
    this.setState({
      loading: true,
    });
    axios.get(CREDITS_URL, { params: {
      searchYear: this.state.searchYear,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    } })
      .then((response) => {
        this.setState({
          credits: response.data.rows,
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

  filterCredits = () => {
    this.setState({
      currentPage: 1,
    }, () => { this.fetchCredits(); });
  }

  deleteCredit(credit) {
    const hide = message.loading('Action in progress..', 0);
    axios.delete(`${CREDITS_URL}/${credit.id}`)
      .then(() => {
        message.success('Delete credit success');
        this.fetchCredits();
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
      credit: record,
      creditWindowVisible: true,
    }, () => {
      this.creditWindow.resetFields();
    });
  }

  closeEditWindow = () => {
    this.setState({
      creditWindowVisible: false,
    });
  }

  pageChanged = (pagination) => {
    const page = pagination.current;
    this.setState({
      currentPage: page,
    }, () => { this.fetchCredits(); });
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
                onClick={this.filterCredits}
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
              dataSource={this.state.credits}
              style={{ marginTop: 20 }}
              rowKey="id"
              loading={this.state.loading}
              pagination={{
                total: this.state.count,
                current: this.state.currentPage,
                pageSize: this.state.pageSize,
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
                      title={`Are you sure delete credit ${record.name}`}
                      onConfirm={() => this.deleteCredit(record)}
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

        <CreditWindow
          visible={this.state.creditWindowVisible}
          onSaveSuccess={this.onSaveSuccess}
          onCancel={this.closeEditWindow}
          onClose={this.closeEditWindow}
          credit={this.state.credit}
          ref={creditWindow => (this.creditWindow = creditWindow)}
        />
      </div>
    );
  }
}

export default CreditList;
