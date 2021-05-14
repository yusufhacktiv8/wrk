import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Input, Row, Col, message, Popconfirm } from 'antd';
import { SearchOutlined, PlusOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import showError from '../utils/ShowError';
import ProjectWindow from './ProjectWindow';

const PROJECTS_URL = `${process.env.REACT_APP_SERVER_URL}/api/projects`;
const Column = Table.Column;

class ProjectList extends Component {
  state = {
    searchText: '',
    project: {},
    projects: [],
    loading: false,
    count: 0,
    currentPage: 1,
    pageSize: 10,
    projectWindowVisible: false,
  }
  componentDidMount() {
    this.fetchProjects();
  }

  onSearchChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  }

  onSaveSuccess = () => {
    this.closeEditWindow();
    this.fetchProjects();
  }

  fetchProjects() {
    this.setState({
      loading: true,
    });
    axios.get(PROJECTS_URL, { params: {
      searchText: this.state.searchText,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    } })
      .then((response) => {
        this.setState({
          projects: response.data.rows,
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

  filterProjects = () => {
    this.setState({
      currentPage: 1,
    }, () => { this.fetchProjects(); });
  }

  deleteProject(project) {
    const hide = message.loading('Action in progress..', 0);
    axios.delete(`${PROJECTS_URL}/${project.id}`)
      .then(() => {
        message.success('Delete project success');
        this.fetchProjects();
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
      project: record,
      projectWindowVisible: true,
    }, () => {
      // this.projectWindow.resetFields();
    });
  }

  closeEditWindow = () => {
    this.setState({
      projectWindowVisible: false,
    });
  }

  pageChanged = (pagination) => {
    const page = pagination.current;
    this.setState({
      currentPage: page,
    }, () => { this.fetchProjects(); });
  }

  render() {
    return (
      <div>
        <Row gutter={10}>
          <Col span={8}>
            <Input
              value={this.state.searchText}
              onChange={this.onSearchChange}
              placeholder="Name or Code"
              maxLength="50"
            />
          </Col>
          <Col span={16}>
            <span>
              <Button
                shape="circle"
                icon={<SearchOutlined/>}
                onClick={this.filterProjects}
                style={{ marginRight: 15 }}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined/>}
                onClick={() => this.openEditWindow({})}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={this.state.projects}
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
                title="Code"
                dataIndex="code"
                key="code"
                render={(columnText, record) => {
                  const reg = new RegExp(this.state.searchText, 'gi');
                  const match = columnText.match(reg);
                  return (
                    <span key={record.code}>
                      {columnText.split(reg).map((text, i) => (
                        i > 0 ? [<span key={record.code} style={{ color: '#F50' }}>{match[0]}</span>, text] : text
                      ))}
                    </span>
                  );
                }}
              />
              <Column
                title="Name"
                dataIndex="name"
                key="name"
                render={(columnText, record) => {
                  const reg = new RegExp(this.state.searchText, 'gi');
                  const match = columnText.match(reg);
                  return (
                    <span key={record.code}>
                      {columnText.split(reg).map((text, i) => (
                        i > 0 ? [<span key={record.code} style={{ color: '#F50' }}>{match[0]}</span>, text] : text
                      ))}
                    </span>
                  );
                }}
              />
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    <Button
                      icon={<EllipsisOutlined/>}
                      size="small"
                      onClick={() => this.openEditWindow(record)}
                      style={{ marginRight: 5 }}
                    />
                    <Popconfirm
                      title={`Are you sure delete project ${record.name}`}
                      onConfirm={() => this.deleteProject(record)}
                      okText="Yes" cancelText="No"
                    >
                      <Button
                        type="danger"
                        icon={<DeleteOutlined/>}
                        size="small"
                      />
                    </Popconfirm>
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>

        <ProjectWindow
          visible={this.state.projectWindowVisible}
          onSaveSuccess={this.onSaveSuccess}
          onCancel={this.closeEditWindow}
          onClose={this.closeEditWindow}
          project={this.state.project}
          ref={projectWindow => (this.projectWindow = projectWindow)}
        />
      </div>
    );
  }
}

export default ProjectList;
