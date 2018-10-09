import React, { Component } from 'react';
import { Modal, Form, InputNumber, Button, Row, Col, Tabs, message } from 'antd';
import axios from 'axios';
import showError from '../utils/ShowError';
import YearSelect from '../common/YearSelect';
import MonthSelect from '../common/MonthSelect';
import ProjectSelect from '../project/ProjectSelect';

const PROGRESSES_URL = `${process.env.REACT_APP_SERVER_URL}/api/projectprogresses`;

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class ProgressWindow extends Component {
  state = {
    saving: false,
  }

  onSave = () => {
    const { progress, onSaveSuccess, form } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({
        saving: true,
      }, () => {
        const progressId = progress.id;
        const axiosObj = progressId ? axios.put(`${PROGRESSES_URL}/${progressId}`, values) : axios.post(PROGRESSES_URL, values);
        axiosObj.then(() => {
          message.success('Saving progress success');
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
    const { visible, onCancel, form, progress } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        wrapClassName="vertical-center-modal"
        visible={visible}
        title="Project Progress"
        okText="Save"
        footer={[
          <Button key="cancel" onClick={onCancel}>Cancel</Button>,
          <Button key="save" type="primary" loading={saving} onClick={this.onSave}>
            Save
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Row gutter={10}>
            <Col span={24}>
              <FormItem label="Project">
                {getFieldDecorator('project', {
                  initialValue: progress.Project ? progress.Project.id : undefined,
                  rules: [
                    { required: true, message: 'Please project' },
                  ],
                })(
                  <ProjectSelect />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <FormItem label="Year">
                {getFieldDecorator('year', {
                  initialValue: progress.year,
                  rules: [
                    { required: true, message: 'Please input year' },
                  ],
                })(
                  <YearSelect />,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Month">
                {getFieldDecorator('month', {
                  initialValue: progress.month,
                  rules: [
                    { required: true, message: 'Please input month' },
                  ],
                })(
                  <MonthSelect />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Tabs defaultActiveKey="1" type="card">
            <TabPane forceRender tab="Tab 1" key="1">
              <Row gutter={10}>
                <Col span={12}>
                  <FormItem label="Ra Progress">
                    {getFieldDecorator('raProgress', {
                      initialValue: progress.raProgress,
                    })(
                      <InputNumber min={-1000000000} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Ri Progress">
                    {getFieldDecorator('riProgress', {
                      initialValue: progress.riProgress,
                    })(
                      <InputNumber min={-1000000000} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={12}>
                  <FormItem label="Ra">
                    {getFieldDecorator('ra', {
                      initialValue: progress.ra,
                    })(
                      <InputNumber min={-1000000000} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Ri">
                    {getFieldDecorator('ri', {
                      initialValue: progress.ri,
                    })(
                      <InputNumber min={-1000000000} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={12}>
                  <FormItem label="PDP">
                    {getFieldDecorator('pdp', {
                      initialValue: progress.pdp,
                    })(
                      <InputNumber min={-1000000000} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="BAD">
                    {getFieldDecorator('bad', {
                      initialValue: progress.bad,
                    })(
                      <InputNumber min={-1000000000} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </TabPane>
            <TabPane forceRender tab="Tab 2" key="2">
              <Row gutter={10}>
                <Col span={12}>
                  <FormItem label="OK">
                    {getFieldDecorator('ok', {
                      initialValue: progress.ok,
                    })(
                      <InputNumber min={-1000000000} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Cashflow">
                    {getFieldDecorator('cashflow', {
                      initialValue: progress.cashflow,
                    })(
                      <InputNumber min={-1000000000} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={12}>
                  <FormItem label="Piutang Usaha">
                    {getFieldDecorator('piutangUsaha', {
                      initialValue: progress.piutangUsaha,
                    })(
                      <InputNumber min={-1000000000} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Piutang Retensi">
                    {getFieldDecorator('piutangRetensi', {
                      initialValue: progress.piutangRetensi,
                    })(
                      <InputNumber min={-1000000000} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={12}>
                  <FormItem label="Tagihan Bruto">
                    {getFieldDecorator('tagihanBruto', {
                      initialValue: progress.tagihanBruto,
                    })(
                      <InputNumber min={-1000000000} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Persediaan">
                    {getFieldDecorator('persediaan', {
                      initialValue: progress.persediaan,
                    })(
                      <InputNumber min={-1000000000} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ProgressWindow);
