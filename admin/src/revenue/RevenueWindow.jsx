import React, { Component } from 'react';
import { Modal, Button, Tabs, message } from 'antd';
import axios from 'axios';
import showError from '../utils/ShowError';
import './RevenueWindow.css';

import ContractForm from './ContractForm';
import SingleForm from './SingleForm';

const REVENUES_URL = `${process.env.REACT_APP_SERVER_URL}/api/revenues`;

const TabPane = Tabs.TabPane;

class RevenueWindow extends Component {
  state = {
    saving: false,
  }

  onSave = () => {
    const { revenue, onSaveSuccess, form } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({
        saving: true,
      }, () => {
        const revenueId = revenue.id;
        const axiosObj = revenueId ? axios.put(`${REVENUES_URL}/${revenueId}`, values) : axios.post(REVENUES_URL, values);
        axiosObj.then(() => {
          message.success('Saving revenue success');
          this.setState({
            saving: false,
          }, () => {
            onSaveSuccess();
          });
        })
          .catch((error) => {
            this.setState({
              saving: false,
            });
            showError(error);
          });
      });
    });
  }

  render() {
    const { saving } = this.state;
    const { visible, onCancel, revenue } = this.props;
    return (
      <Modal
        wrapClassName="vertical-center-modal"
        width={700}
        visible={visible}
        title="Hasil Usaha"
        okText="Save"
        footer={[
          <Button key="cancel" onClick={onCancel}>Cancel</Button>,
          <Button key="save" type="primary" loading={saving} onClick={this.onSave}>
            Save
          </Button>,
        ]}
      >
        <Tabs defaultActiveKey="1" style={{ minHeight: 445, marginTop: -20 }}>
          <TabPane tab="Kontrak Dihadapi" key="1">
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="Sisa Kontrak / Pesanan Tahun Lalu" key="1">
                <ContractForm revenue={revenue} />
              </TabPane>
              <TabPane tab="Kontrak / Pesanan Baru" key="2">
                <ContractForm revenue={revenue} />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="Penjualan" key="2">
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="Sisa Kontrak / Pesanan Tahun Lalu" key="1">
                <ContractForm revenue={revenue} />
              </TabPane>
              <TabPane tab="Kontrak / Pesanan Baru" key="2">
                <ContractForm revenue={revenue} />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="Laba Kotor" key="3">
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="Sisa Kontrak / Pesanan Tahun Lalu" key="1">
                <ContractForm revenue={revenue} />
              </TabPane>
              <TabPane tab="Kontrak / Pesanan Baru" key="2">
                <ContractForm revenue={revenue} />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="Biaya Usaha" key="4">
            <SingleForm />
          </TabPane>
          <TabPane tab="Bunga" key="5">
            <SingleForm />
          </TabPane>
          <TabPane tab="Laba Rugi Lain-lain" key="6">
            <SingleForm />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default RevenueWindow;
