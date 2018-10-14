import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Input, Row, Col, message, Popconfirm } from 'antd';
import showError from '../utils/ShowError';
import SmwgWindow from './SmwgWindow';
import YearSelect from '../common/YearSelect';
import SmwgTypeSelect from './SmwgTypeSelect';
import ProjectSelect from '../project/ProjectSelect';

const SMWGS_URL = `${process.env.REACT_APP_SERVER_URL}/api/smwgs`;
const Column = Table.Column;

class SmwgList extends Component {
  state = {
    searchYear: new Date().getFullYear(),
    smwg: {},
    smwgs: [],
    smwgType: 1,
    loading: false,
    count: 0,
    currentPage: 1,
    pageSize: 10,
    smwgWindowVisible: false,
  }
  componentDidMount() {
    this.fetchSmwgs();
  }

  onSearchChange = (e) => {
    this.setState({
      searchYear: e,
    });
  }

  onSmwgTypeChange = (e) => {
    this.setState({
      smwgType: e,
    });
  }

  onProjectChange = (e) => {
    this.setState({
      project: e,
    });
  }

  onSaveSuccess = () => {
    this.closeEditWindow();
    this.fetchSmwgs();
  }

  openSmwgItemPage = (record) => {
    this.props.history.push(`/smwgs/${record.id}/items`);
  }

  fetchSmwgs() {
    this.setState({
      loading: true,
    });
    axios.get(SMWGS_URL, { params: {
      searchYear: this.state.searchYear,
      project: this.state.project,
      smwgType: this.state.smwgType,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    } })
      .then((response) => {
        this.setState({
          smwgs: response.data.rows,
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

  filterSmwgs = () => {
    this.setState({
      currentPage: 1,
    }, () => { this.fetchSmwgs(); });
  }

  deleteSmwg(smwg) {
    const hide = message.loading('Action in progress..', 0);
    axios.delete(`${SMWGS_URL}/${smwg.id}`)
      .then(() => {
        message.success('Delete smwg success');
        this.fetchSmwgs();
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
      smwg: record,
      smwgWindowVisible: true,
    }, () => {
      this.smwgWindow.resetFields();
    });
  }

  closeEditWindow = () => {
    this.setState({
      smwgWindowVisible: false,
    });
  }

  pageChanged = (pagination) => {
    const page = pagination.current;
    this.setState({
      currentPage: page,
    }, () => { this.fetchSmwgs(); });
  }

  render() {
    return (
      <div>
        <Row gutter={10}>
          <Col span={4}>
            <YearSelect
              value={this.state.searchYear}
              onChange={this.onSearchChange}
            />
          </Col>
          <Col span={4}>
            <SmwgTypeSelect
              value={this.state.smwgType}
              onChange={this.onSmwgTypeChange}
            />
          </Col>
          <Col span={4}>
            <ProjectSelect
              value={this.state.project}
              onChange={this.onProjectChange}
            />
          </Col>
          <Col span={12}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={this.filterSmwgs}
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
              dataSource={this.state.smwgs}
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
                title="Project"
                dataIndex="Project.name"
              />
              <Column
                title="Type"
                dataIndex="smwgType"
                key="smwgType"
                render={(columnText, record) => {
                  switch (record.smwgType) {
                    case 1:
                      return 'QMSL';
                    case 2:
                      return 'SHE Level';
                    case 3:
                      return '5R';
                    default:
                      return '-';
                  }
                }}
              />
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
                    <Button
                      icon="profile"
                      size="small"
                      onClick={() => this.openSmwgItemPage(record)}
                      style={{ marginRight: 5 }}
                    />
                    <Popconfirm
                      title={`Are you sure delete smwg`}
                      onConfirm={() => this.deleteSmwg(record)}
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

        <SmwgWindow
          visible={this.state.smwgWindowVisible}
          onSaveSuccess={this.onSaveSuccess}
          onCancel={this.closeEditWindow}
          onClose={this.closeEditWindow}
          smwg={this.state.smwg}
          ref={smwgWindow => (this.smwgWindow = smwgWindow)}
        />
      </div>
    );
  }
}

export default SmwgList;
