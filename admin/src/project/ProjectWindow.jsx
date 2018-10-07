import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber, Button, Row, Col, Tabs, DatePicker, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import showError from '../utils/ShowError';
import TypeSelect from './TypeSelect';
import { dateFormat } from '../constant';

const PROJECTS_URL = `${process.env.REACT_APP_SERVER_URL}/api/projects`;

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class ProjectWindow extends Component {
  state = {
    saving: false,
  }

  onSave = () => {
    const { project, onSaveSuccess, form } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({
        saving: true,
      }, () => {
        const projectId = project.id;
        const fixedDateData = { ...values };
        if (fixedDateData.startDate) {
          fixedDateData.startDate = fixedDateData.startDate.format(dateFormat);
        }
        if (fixedDateData.endDate) {
          fixedDateData.endDate = fixedDateData.endDate.format(dateFormat);
        }

        const axiosObj = projectId ? axios.put(`${PROJECTS_URL}/${projectId}`, fixedDateData) : axios.post(PROJECTS_URL, fixedDateData);
        axiosObj.then(() => {
          message.success('Saving project success');
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
    const { visible, onCancel, form, project } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Project"
        okText="Save"
        width={600}
        footer={[
          <Button key="cancel" onClick={onCancel}>Cancel</Button>,
          <Button key="save" type="primary" loading={saving} onClick={this.onSave}>
            Save
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Row gutter={10}>
            <Col span={6}>
              <FormItem label="Type">
                {getFieldDecorator('projectType', {
                  initialValue: project.projectType,
                  rules: [
                    { required: true, message: 'Please input type' },
                  ],
                })(
                  <TypeSelect />,
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Code">
                {getFieldDecorator('code', {
                  initialValue: project.code,
                  rules: [
                    { required: true, message: 'Please input code' },
                  ],
                })(
                  <Input maxLength="30" />,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Name">
                {getFieldDecorator('name', {
                  initialValue: project.name,
                  rules: [
                    { required: true, message: 'Please input name' },
                  ],
                })(
                  <Input maxLength="100" />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Tabs defaultActiveKey="1" type="card">
            <TabPane forceRender tab="Info" key="1">
              <FormItem label="Alamat">
                {getFieldDecorator('address', {
                  initialValue: project.address,
                })(
                  <Input maxLength="150" />,
                )}
              </FormItem>
              <Row gutter={10}>
                <Col span={12}>
                  <FormItem label="Pemberi Kerja">
                    {getFieldDecorator('givenBy', {
                      initialValue: project.givenBy,
                    })(
                      <Input maxLength="80" />,
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Omzet Kontrak">
                    {getFieldDecorator('omzetKontrak', {
                      initialValue: project.omzetKontrak,
                    })(
                      <InputNumber
                        min={-1000000000}
                        max={1000000000}
                        step={0.1}
                        precision={2}
                        style={{ width: '100%' }}
                      />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={12}>
                  <FormItem label="Tanggal Mulai">
                    {getFieldDecorator('startDate', {
                      initialValue: project.startDate ? moment(project.startDate) : undefined,
                    })(
                      <DatePicker style={{ width: '100%' }} />,
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Tanggal Selesai">
                    {getFieldDecorator('endDate', {
                      initialValue: project.endDate ? moment(project.endDate) : undefined,
                    })(
                      <DatePicker style={{ width: '100%' }} />,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </TabPane>
            <TabPane forceRender tab="Team" key="2">
              <Row>
                <Col span={12}>
                  <FormItem label="Project Manager">
                    {getFieldDecorator('mp', {
                      initialValue: project.mp,
                    })(
                      <Input maxLength="100" />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={12}>
                  <FormItem label="Kasie Keu">
                    {getFieldDecorator('keu', {
                      initialValue: project.keu,
                    })(
                      <Input maxLength="100" />,
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Kasie Kom">
                    {getFieldDecorator('kom', {
                      initialValue: project.kom,
                    })(
                      <Input maxLength="100" />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={12}>
                  <FormItem label="Pelut">
                    {getFieldDecorator('pelut', {
                      initialValue: project.pelut,
                    })(
                      <Input maxLength="100" />,
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Kasie Eng">
                    {getFieldDecorator('eng', {
                      initialValue: project.eng,
                    })(
                      <Input maxLength="100" />,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </TabPane>
            <TabPane forceRender tab="BAST" key="3" disabled>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ProjectWindow);
