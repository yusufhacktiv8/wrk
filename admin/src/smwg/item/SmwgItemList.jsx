import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Row, Col, Tag, Icon, Spin, message, Popconfirm } from 'antd';
import showError from '../../utils/ShowError';
import SmwgItemWindow from './SmwgItemWindow';

const SMWGS_URL = `${process.env.REACT_APP_SERVER_URL}/api/smwgs`;
const SMWG_ITEMS_URL = `${process.env.REACT_APP_SERVER_URL}/api/smwgitems`;
const getSmwgItemUrl = smwgId => `${SMWGS_URL}/${smwgId}/items`;
const Column = Table.Column;

class SmwgItemList extends Component {
  state = {
    searchText: '',
    smwg: {},
    smwgItem: {},
    smwgItems: [],
    loading: false,
    count: 0,
    currentPage: 1,
    pageSize: 10,
    smwgItemWindowVisible: false,
  }
  componentDidMount() {
    this.fetchSmwgItems();
    this.fetchSmwg();
  }

  onSearchChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  }

  onSaveSuccess = () => {
    this.closeEditWindow();
    this.fetchSmwgItems();
  }

  fetchSmwgItems() {
    const { match } = this.props;
    const { smwgId } = match.params;
    this.setState({
      loading: true,
    });
    axios.get(getSmwgItemUrl(smwgId), { params: {
      searchText: this.state.searchText,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    } })
      .then((response) => {
        this.setState({
          smwgItems: response.data.rows,
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

  fetchSmwg() {
    const { match } = this.props;
    const { smwgId } = match.params;
    this.setState({
      loading: true,
    });
    axios.get(`${SMWGS_URL}/${smwgId}`, { params: {} })
      .then((response) => {
        this.setState({
          smwg: response.data,
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

  filterSmwgItems = () => {
    this.setState({
      currentPage: 1,
    }, () => { this.fetchSmwgItems(); });
  }

  deleteSmwgItem(smwgItem) {
    const hide = message.loading('Action in progress..', 0);
    axios.delete(`${SMWG_ITEMS_URL}/${smwgItem.id}`)
      .then(() => {
        message.success('Delete item success');
        this.fetchSmwgItems();
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
      smwgItem: record,
      smwgItemWindowVisible: true,
    }, () => {
      this.smwgItemWindow.resetFields();
    });
  }

  closeEditWindow = () => {
    this.setState({
      smwgItemWindowVisible: false,
    });
  }

  pageChanged = (pagination) => {
    const page = pagination.current;
    this.setState({
      currentPage: page,
    }, () => { this.fetchSmwgItems(); });
  }

  render() {
    const { match } = this.props;
    const { smwgId } = match.params;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    let smwgTypeStr = '-';
    if (this.state.smwg.smwgType) {
      switch (this.state.smwg.smwgType) {
        case 1:
          smwgTypeStr = 'QMSL';
          break;
        case 2:
          smwgTypeStr = 'SHE Level';
          break;
        case 3:
          smwgTypeStr = '5R';
          break;
        default:
      }
    }
    return (
      <div>
        <Col span={8}>
          {
            this.state.smwg.smwgType ? (
              <span>
                <Tag style={{ height: 26, fontSize: 15 }} color="#2db7f5">{ this.state.smwg.Project.name}</Tag>
                <Tag style={{ height: 26, fontSize: 15 }} color="#2db7f5">{ smwgTypeStr }</Tag>
                <Tag style={{ height: 26, fontSize: 15 }}>{ this.state.smwg.year}</Tag>
                <Tag style={{ height: 26, fontSize: 15 }}>{ this.state.smwg.month}</Tag>
              </span>
            ) : (
              <Spin indicator={antIcon} />
            )
          }
        </Col>
        <Row gutter={10}>
          <Col span={8}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={this.filterSmwgItems}
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
              dataSource={this.state.smwgItems}
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
              />
              <Column
                title="Name"
                dataIndex="name"
              />
              <Column
                title="Type"
                dataIndex="itemType"
                key="itemType"
                render={(columnText, record) => {
                  switch (record.itemType) {
                    case 1:
                      return 'Score';
                    case 2:
                      return 'Label';
                    default:
                      return '-';
                  }
                }}
              />
              <Column
                title="Bobot"
                dataIndex="bobot"
                key="bobot"
              />
              <Column
                title="Nilai"
                dataIndex="nilai"
                key="nilai"
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
                      title={`Are you sure delete smwg item ${record.name}`}
                      onConfirm={() => this.deleteSmwgItem(record)}
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

        <SmwgItemWindow
          visible={this.state.smwgItemWindowVisible}
          onSaveSuccess={this.onSaveSuccess}
          onCancel={this.closeEditWindow}
          onClose={this.closeEditWindow}
          smwgItem={this.state.smwgItem}
          smwgId={smwgId}
          ref={smwgItemWindow => (this.smwgItemWindow = smwgItemWindow)}
        />
      </div>
    );
  }
}

export default SmwgItemList;
