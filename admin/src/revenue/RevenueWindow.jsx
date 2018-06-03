import React, { Component } from 'react';
import { Modal, Button, Tabs, message } from 'antd';
import axios from 'axios';
import showError from '../utils/ShowError';
import './RevenueWindow.css';
import FormConverter from './FormConverter';

import ContractForm from './ContractForm';
import SimpleForm from './SimpleForm';

const REVENUES_URL = `${process.env.REACT_APP_SERVER_URL}/api/revenues`;

const TabPane = Tabs.TabPane;

class RevenueWindow extends Component {
  state = {
    saving: false,
  }

  onSave = () => {
    const { revenue, onSaveSuccess } = this.props;
    const forms = {
      contractForm1: this.contractForm1.getFieldsValue(),
      contractForm2: this.contractForm2.getFieldsValue(),
      contractForm3: this.contractForm3.getFieldsValue(),
      contractForm4: this.contractForm4.getFieldsValue(),
      contractForm5: this.contractForm5.getFieldsValue(),
      contractForm6: this.contractForm6.getFieldsValue(),
      simpleForm1: this.simpleForm1.getFieldsValue(),
      simpleForm2: this.simpleForm2.getFieldsValue(),
      simpleForm3: this.simpleForm3.getFieldsValue(),
    };
    const result = FormConverter(forms);
    console.log(result);
    // form.validateFields((err, values) => {
    //   if (err) {
    //     return;
    //   }
    //   this.setState({
    //     saving: true,
    //   }, () => {
    //     const revenueId = revenue.id;
    //     const axiosObj = revenueId ? axios.put(`${REVENUES_URL}/${revenueId}`, values) : axios.post(REVENUES_URL, values);
    //     axiosObj.then(() => {
    //       message.success('Saving revenue success');
    //       this.setState({
    //         saving: false,
    //       }, () => {
    //         onSaveSuccess();
    //       });
    //     })
    //       .catch((error) => {
    //         this.setState({
    //           saving: false,
    //         });
    //         showError(error);
    //       });
    //   });
    // });
  }

  render() {
    const { saving } = this.state;
    const { visible, onCancel, revenue } = this.props;
    return (
      <Modal
        wrapClassName="vertical-center-modal"
        width={900}
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
          <TabPane forceRender tab="Kontrak Dihadapi" key="1">
            <Tabs defaultActiveKey="1" type="card">
              <TabPane forceRender tab="Sisa Kontrak / Pesanan Tahun Lalu" key="1">
                <ContractForm
                  revenue={revenue}
                  ref={form => (this.contractForm1 = form)}
                />
              </TabPane>
              <TabPane forceRender tab="Kontrak / Pesanan Baru" key="2">
                <ContractForm
                  revenue={revenue}
                  ref={form => (this.contractForm2 = form)}
                />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane forceRender tab="Penjualan" key="2">
            <Tabs defaultActiveKey="1" type="card">
              <TabPane forceRender tab="Sisa Kontrak / Pesanan Tahun Lalu" key="1">
                <ContractForm
                  revenue={revenue}
                  ref={form => (this.contractForm3 = form)}
                />
              </TabPane>
              <TabPane forceRender tab="Kontrak / Pesanan Baru" key="2">
                <ContractForm
                  revenue={revenue}
                  ref={form => (this.contractForm4 = form)}
                />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane forceRender tab="Laba Kotor" key="3">
            <Tabs defaultActiveKey="1" type="card">
              <TabPane forceRender tab="Sisa Kontrak / Pesanan Tahun Lalu" key="1">
                <ContractForm
                  revenue={revenue}
                  ref={form => (this.contractForm5 = form)}
                />
              </TabPane>
              <TabPane forceRender tab="Kontrak / Pesanan Baru" key="2">
                <ContractForm
                  revenue={revenue}
                  ref={form => (this.contractForm6 = form)}
                />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane forceRender tab="Biaya Usaha" key="4">
            <SimpleForm ref={form => (this.simpleForm1 = form)} />
          </TabPane>
          <TabPane forceRender tab="Bunga" key="5">
            <SimpleForm ref={form => (this.simpleForm2 = form)} />
          </TabPane>
          <TabPane forceRender tab="Laba Rugi Lain-lain" key="6">
            <SimpleForm ref={form => (this.simpleForm3 = form)} />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default RevenueWindow;
