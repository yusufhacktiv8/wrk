import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Input, Row, Col, message, Popconfirm } from 'antd';
import showError from '../../utils/ShowError';
import SmwgTemplateWindow from './SmwgTemplateWindow';
import SmwgTypeSelect from '../SmwgTypeSelect';

const SMWG_TEMPLATES_URL = `${process.env.REACT_APP_SERVER_URL}/api/smwgtemplates`;
const Column = Table.Column;

class SmwgTemplateList extends Component {
  state = {
    searchText: '',
    smwgType: 1,
    smwgTemplate: {},
    smwgTemplates: [],
    loading: false,
    count: 0,
    currentPage: 1,
    pageSize: 10,
    smwgTemplateWindowVisible: false,
  }
  componentDidMount() {
    this.fetchSmwgTemplates();
  }

  onSearchChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  }

  onSaveSuccess = () => {
    this.closeEditWindow();
    this.fetchSmwgTemplates();
  }

  onSmwgTypeChange = (e) => {
    this.setState({
      smwgType: e,
    });
  }

  fetchSmwgTemplates() {
    this.setState({
      loading: true,
    });
    axios.get(SMWG_TEMPLATES_URL, { params: {
      searchText: this.state.searchText,
      smwgType: this.state.smwgType,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    } })
      .then((response) => {
        this.setState({
          smwgTemplates: response.data.rows,
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

  filterSmwgTemplates = () => {
    this.setState({
      currentPage: 1,
    }, () => { this.fetchSmwgTemplates(); });
  }

  deleteSmwgTemplate(smwgTemplate) {
    const hide = message.loading('Action in progress..', 0);
    axios.delete(`${SMWG_TEMPLATES_URL}/${smwgTemplate.id}`)
      .then(() => {
        message.success('Delete template success');
        this.fetchSmwgTemplates();
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
      smwgTemplate: record,
      smwgTemplateWindowVisible: true,
    }, () => {
      this.smwgTemplateWindow.resetFields();
    });
  }

  closeEditWindow = () => {
    this.setState({
      smwgTemplateWindowVisible: false,
    });
  }

  pageChanged = (pagination) => {
    const page = pagination.current;
    this.setState({
      currentPage: page,
    }, () => { this.fetchSmwgTemplates(); });
  }

  render() {
    return (
      <div>
        <Row gutter={10}>
          <Col span={4}>
            <Input
              value={this.state.searchText}
              onChange={this.onSearchChange}
              placeholder="Name or SID"
              maxLength="50"
            />
          </Col>
          <Col span={4}>
            <SmwgTypeSelect
              value={this.state.smwgType}
              onChange={this.onSmwgTypeChange}
            />
          </Col>
          <Col span={16}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={this.filterSmwgTemplates}
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
              dataSource={this.state.smwgTemplates}
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
                title="Sequence"
                dataIndex="smwgSequence"
                key="smwgSequence"
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
                      title={`Are you sure delete smwgTemplate ${record.name}`}
                      onConfirm={() => this.deleteSmwgTemplate(record)}
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

        <SmwgTemplateWindow
          visible={this.state.smwgTemplateWindowVisible}
          onSaveSuccess={this.onSaveSuccess}
          onCancel={this.closeEditWindow}
          onClose={this.closeEditWindow}
          smwgTemplate={this.state.smwgTemplate}
          ref={smwgTemplateWindow => (this.smwgTemplateWindow = smwgTemplateWindow)}
        />
      </div>
    );
  }
}

export default SmwgTemplateList;
