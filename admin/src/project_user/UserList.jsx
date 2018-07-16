import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Input, Row, Col, message, Popconfirm } from 'antd';
import showError from '../utils/ShowError';
import UserWindow from './UserWindow';

const PROJECT_USERS_URL = `${process.env.REACT_APP_SERVER_URL}/api/hospitalusers`;
const Column = Table.Column;

class UserList extends Component {
  state = {
    searchText: '',
    user: {},
    users: [],
    loading: false,
    count: 0,
    currentPage: 1,
    pageSize: 10,
    userWindowVisible: false,
  }

  componentDidMount() {
    this.fetchUsers();
  }

  onSearchChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  }

  onSaveSuccess = () => {
    this.closeEditWindow();
    this.fetchUsers();
  }

  fetchUsers() {
    this.setState({
      loading: true,
    });
    axios.get(PROJECT_USERS_URL, { params: {
      searchText: this.state.searchText,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    } })
      .then((response) => {
        this.setState({
          users: response.data.rows,
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

  filterUsers = () => {
    this.setState({
      currentPage: 1,
    }, () => { this.fetchUsers(); });
  }

  deleteUser(user) {
    const hide = message.loading('Action in progress..', 0);
    axios.delete(`${PROJECT_USERS_URL}/${user.id}`)
      .then(() => {
        message.success('Delete user success');
        this.fetchUsers();
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
      user: record,
      userWindowVisible: true,
    }, () => {
      this.userWindow.resetFields();
    });
  }

  closeEditWindow = () => {
    this.setState({
      userWindowVisible: false,
    });
  }

  pageChanged = (pagination) => {
    const page = pagination.current;
    this.setState({
      currentPage: page,
    }, () => { this.fetchUsers(); });
  }

  render() {
    return (
      <div>
        <Row gutter={10}>
          <Col span={8}>
            <Input
              value={this.state.searchText}
              onChange={this.onSearchChange}
              placeholder="Username or name"
              maxLength="100"
            />
          </Col>
          <Col span={16}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={this.filterUsers}
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
              dataSource={this.state.users}
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
                title="Username"
                dataIndex="User.username"
              />
              <Column
                title="Name"
                dataIndex="User.name"
              />
              <Column
                title="Project"
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
                      title={`Are you sure remove user ${record.User.name} from project ${record.Project.name}`}
                      onConfirm={() => this.deleteUser(record)}
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

        <UserWindow
          visible={this.state.userWindowVisible}
          onSaveSuccess={this.onSaveSuccess}
          onCancel={this.closeEditWindow}
          onClose={this.closeEditWindow}
          user={this.state.user}
          ref={userWindow => (this.userWindow = userWindow)}
        />
      </div>
    );
  }
}

export default UserList;
