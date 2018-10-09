import React, { Component } from 'react';
import { Modal, Form, InputNumber, Button, Row, Col, message } from 'antd';
import axios from 'axios';
import showError from '../utils/ShowError';
import YearSelect from '../common/YearSelect';
import MonthSelect from '../common/MonthSelect';
import ProjectSelect from '../project/ProjectSelect';

const PROGRESSES_URL = `${process.env.REACT_APP_SERVER_URL}/api/projectprogresses`;

const FormItem = Form.Item;

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
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ProgressWindow);
