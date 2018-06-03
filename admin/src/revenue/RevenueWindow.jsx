import React, { Component } from 'react';
import { Modal, Button, Tabs, Row, Col, message } from 'antd';
import axios from 'axios';
import showError from '../utils/ShowError';
import './RevenueWindow.css';
import FormConverter from './FormConverter';

import ContractForm from './ContractForm';
import SimpleForm from './SimpleForm';
import MonthYearForm from '../common/MonthYearForm';

const getUnitValues = (hasilUsaha, type1, type2) => (
  {
    rkap1: hasilUsaha[type1][type2].extern.rkap,
    ra1: hasilUsaha[type1][type2].extern.ra,
    ri1: hasilUsaha[type1][type2].extern.ri,
    prognosa1: hasilUsaha[type1][type2].extern.prognosa,
    rkap2: hasilUsaha[type1][type2].jo.rkap,
    ra2: hasilUsaha[type1][type2].jo.ra,
    ri2: hasilUsaha[type1][type2].jo.ri,
    prognosa2: hasilUsaha[type1][type2].jo.prognosa,
    rkap3: hasilUsaha[type1][type2].intern.rkap,
    ra3: hasilUsaha[type1][type2].intern.ra,
    ri3: hasilUsaha[type1][type2].intern.ri,
    prognosa3: hasilUsaha[type1][type2].intern.prognosa,
  }
);

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
    const hasilUsaha = FormConverter(forms);
    this.monthYearForm.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({
        saving: true,
      }, () => {
        const data = { ...values, hasilUsaha };
        const revenueId = revenue.id;
        const axiosObj = revenueId ? axios.put(`${REVENUES_URL}/${revenueId}`, data) : axios.post(REVENUES_URL, data);
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

  resetFields() {
    if (!this.contractForm1) return;
    this.monthYearForm.resetFields();
    this.contractForm1.resetFields();
    this.contractForm2.resetFields();
    this.contractForm3.resetFields();
    this.contractForm4.resetFields();
    this.contractForm5.resetFields();
    this.contractForm6.resetFields();
    this.simpleForm1.resetFields();
    this.simpleForm2.resetFields();
    this.simpleForm3.resetFields();
  }

  render() {
    const { saving } = this.state;
    const { visible, onCancel, revenue } = this.props;
    const hasilUsaha = revenue.data ? JSON.parse(revenue.data) : null;

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
        <Row style={{ mrginTop: -15, marginBottom: 15 }}>
          <Col>
            <MonthYearForm
              month={revenue.month}
              year={revenue.year}
              ref={form => (this.monthYearForm = form)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Tabs defaultActiveKey="1" style={{ minHeight: 410, marginTop: -20 }}>
              <TabPane forceRender tab="Kontrak Dihadapi" key="1">
                <Tabs defaultActiveKey="1" type="card">
                  <TabPane forceRender tab="Sisa Kontrak / Pesanan Tahun Lalu" key="1">
                    <ContractForm
                      obj={hasilUsaha ? getUnitValues(hasilUsaha, 'kontrakDihadapi', 'pesananTahunLalu') : undefined}
                      ref={form => (this.contractForm1 = form)}
                    />
                  </TabPane>
                  <TabPane forceRender tab="Kontrak / Pesanan Baru" key="2">
                    <ContractForm
                      obj={hasilUsaha ? getUnitValues(hasilUsaha, 'kontrakDihadapi', 'pesananBaru') : undefined}
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
                      obj={hasilUsaha ? getUnitValues(hasilUsaha, 'penjualan', 'pesananTahunLalu') : undefined}
                      ref={form => (this.contractForm3 = form)}
                    />
                  </TabPane>
                  <TabPane forceRender tab="Kontrak / Pesanan Baru" key="2">
                    <ContractForm
                      obj={hasilUsaha ? getUnitValues(hasilUsaha, 'penjualan', 'pesananBaru') : undefined}
                      ref={form => (this.contractForm4 = form)}
                    />
                  </TabPane>
                </Tabs>
              </TabPane>
              <TabPane forceRender tab="Laba Kotor" key="3">
                <Tabs defaultActiveKey="1" type="card">
                  <TabPane forceRender tab="Sisa Kontrak / Pesanan Tahun Lalu" key="1">
                    <ContractForm
                      obj={hasilUsaha ? getUnitValues(hasilUsaha, 'labaKotor', 'pesananTahunLalu') : undefined}
                      ref={form => (this.contractForm5 = form)}
                    />
                  </TabPane>
                  <TabPane forceRender tab="Kontrak / Pesanan Baru" key="2">
                    <ContractForm
                      obj={hasilUsaha ? getUnitValues(hasilUsaha, 'labaKotor', 'pesananBaru') : undefined}
                      ref={form => (this.contractForm6 = form)}
                    />
                  </TabPane>
                </Tabs>
              </TabPane>
              <TabPane forceRender tab="Biaya Usaha" key="4">
                <SimpleForm
                  obj={hasilUsaha ? hasilUsaha.biayaUsaha : undefined}
                  ref={form => (this.simpleForm1 = form)}
                />
              </TabPane>
              <TabPane forceRender tab="Bunga" key="5">
                <SimpleForm
                  obj={hasilUsaha ? hasilUsaha.bunga : undefined}
                  ref={form => (this.simpleForm2 = form)}
                />
              </TabPane>
              <TabPane forceRender tab="Laba Rugi Lain-lain" key="6">
                <SimpleForm
                  obj={hasilUsaha ? hasilUsaha.labaRugiLain : undefined}
                  ref={form => (this.simpleForm3 = form)}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default RevenueWindow;
