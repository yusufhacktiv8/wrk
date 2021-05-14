import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Input, Row, Col, message, Popconfirm, Upload, notification } from 'antd';
import { SearchOutlined, PlusOutlined, EllipsisOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import showError from '../utils/ShowError';
// import UploadWindow from './UploadWindow';

const UPLOADS_URL = `${process.env.REACT_APP_SERVER_URL}/api/uploads`;
const FILE_UPLOAD_URL = `${process.env.REACT_APP_SERVER_URL}/api/uploadfile`;
const Column = Table.Column;

const uploadProps = {
  name: 'docFile',
};

class UploadList extends Component {
  state = {
    searchText: '',
    upload: {},
    uploads: [],
    loading: false,
    count: 0,
    currentPage: 1,
    pageSize: 10,
    uploadWindowVisible: false,
  }
  componentDidMount() {
    this.fetchUploads();
  }

  onSearchChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  }

  onSaveSuccess = () => {
    this.closeEditWindow();
    this.fetchUploads();
  }

  fetchUploads() {
    this.setState({
      loading: true,
    });
    axios.get(UPLOADS_URL, { params: {
      searchText: this.state.searchText,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    } })
      .then((response) => {
        this.setState({
          uploads: response.data.rows,
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

  filterUploads = () => {
    this.setState({
      currentPage: 1,
    }, () => { this.fetchUploads(); });
  }

  deleteUpload(upload) {
    const hide = message.loading('Action in progress..', 0);
    axios.delete(`${UPLOADS_URL}/${upload.id}`)
      .then(() => {
        message.success('Delete upload success');
        this.fetchUploads();
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
      upload: record,
      uploadWindowVisible: true,
    }, () => {
      this.uploadWindow.resetFields();
    });
  }

  closeEditWindow = () => {
    this.setState({
      uploadWindowVisible: false,
    });
  }

  pageChanged = (pagination) => {
    const page = pagination.current;
    this.setState({
      currentPage: page,
    }, () => { this.fetchUploads(); });
  }

  render() {

    const token = window.sessionStorage.getItem('token');
    uploadProps.headers = {
      authorization: `Bearer ${token}`,
    };
    uploadProps.action = FILE_UPLOAD_URL;
    uploadProps.onChange = (info) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.fetchUploads();

        notification.success({
          message: 'Upload file success',
          description: 'Success',
        });
      } else if (info.file.status === 'error') {
        notification.error({
          message: 'Upload file error',
          description: `${info.file.name} file upload failed.`,
        });
      }
    };

    return (
      <div>
        <Row gutter={10}>
        <Col span={8}>
            <span>
              <Button
                shape="circle"
                icon={<SearchOutlined/>}
                onClick={this.filterUploads}
                style={{ marginRight: 5 }}
              />
              <Upload {...uploadProps}>
                <Button
                  shape="circle"
                  icon={<UploadOutlined/>}
                  style={{ marginLeft: 10 }}
                />
              </Upload>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={this.state.uploads}
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
                title="Tipe Sheet"
                dataIndex="sheetType"
              />
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    {/* <Button
                      icon="ellipsis"
                      size="small"
                      onClick={() => this.openEditWindow(record)}
                      style={{ marginRight: 5 }}
                    /> */}
                    <Popconfirm
                      title={'Are you sure delete upload ?'}
                      onConfirm={() => this.deleteUpload(record)}
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

        {/* <UploadWindow
          visible={this.state.uploadWindowVisible}
          onSaveSuccess={this.onSaveSuccess}
          onCancel={this.closeEditWindow}
          onClose={this.closeEditWindow}
          upload={this.state.upload}
          ref={uploadWindow => (this.uploadWindow = uploadWindow)}
        /> */}
      </div>
    );
  }
}

export default UploadList;
