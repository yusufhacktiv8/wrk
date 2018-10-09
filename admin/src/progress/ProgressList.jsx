import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Input, Row, Col, message, Popconfirm } from 'antd';
import showError from '../utils/ShowError';
import ProgressWindow from './ProgressWindow';
import YearSelect from '../common/YearSelect';
import ProjectSelect from '../project/ProjectSelect';

const PROGRESSES_URL = `${process.env.REACT_APP_SERVER_URL}/api/projectprogresses`;
const Column = Table.Column;

class ProgressList extends Component {
  state = {
    searchYear: new Date().getFullYear(),
    progress: {},
    progresses: [],
    loading: false,
    count: 0,
    currentPage: 1,
    pageSize: 10,
    progressWindowVisible: false,
  }
  componentDidMount() {
    this.fetchProgresses();
  }

  onSearchChange = (e) => {
    this.setState({
      searchYear: e,
    });
  }

  onSearchProjectChange = (e) => {
    this.setState({
      searchProject: e,
    });
  }

  onSaveSuccess = () => {
    this.closeEditWindow();
    this.fetchProgresses();
  }

  fetchProgresses() {
    this.setState({
      loading: true,
    });
    axios.get(PROGRESSES_URL, { params: {
      searchYear: this.state.searchYear,
      searchProject: this.state.searchProject,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    } })
      .then((response) => {
        this.setState({
          progresses: response.data.rows,
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

  filterProgresses = () => {
    this.setState({
      currentPage: 1,
    }, () => { this.fetchProgresses(); });
  }

  deleteProgress(progress) {
    const hide = message.loading('Action in progress..', 0);
    axios.delete(`${PROGRESSES_URL}/${progress.id}`)
      .then(() => {
        message.success('Delete progress success');
        this.fetchProgresses();
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
      progress: record,
      progressWindowVisible: true,
    }, () => {
      this.progressWindow.resetFields();
    });
  }

  closeEditWindow = () => {
    this.setState({
      progressWindowVisible: false,
    });
  }

  pageChanged = (pagination) => {
    const page = pagination.current;
    this.setState({
      currentPage: page,
    }, () => { this.fetchProgresses(); });
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
          <Col span={6}>
            <ProjectSelect
              value={this.state.searchProject}
              onChange={this.onSearchProjectChange}
            />
          </Col>
          <Col span={12}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={this.filterProgresses}
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
              dataSource={this.state.progresses}
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
                title="Name"
                dataIndex="Project.name"
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
                      title={`Are you sure delete progress ${record.Project.name}`}
                      onConfirm={() => this.deleteProgress(record)}
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

        <ProgressWindow
          visible={this.state.progressWindowVisible}
          onSaveSuccess={this.onSaveSuccess}
          onCancel={this.closeEditWindow}
          onClose={this.closeEditWindow}
          progress={this.state.progress}
          ref={progressWindow => (this.progressWindow = progressWindow)}
        />
      </div>
    );
  }
}

export default ProgressList;
