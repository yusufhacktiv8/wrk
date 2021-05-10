import React, { Component } from "react";
import { Modal, Form, InputNumber, Button, Row, Col, message } from "antd";
import axios from "axios";
import showError from "../utils/ShowError";
import YearSelect from "../common/YearSelect";
import MonthSelect from "../common/MonthSelect";
import SmwgTypeSelect from "./SmwgTypeSelect";
import ProjectSelect from "../project/ProjectSelect";

const SMWGS_URL = `${process.env.REACT_APP_SERVER_URL}/api/smwgs`;

const FormItem = Form.Item;

class SmwgWindow extends Component {
  state = {
    saving: false,
  };

  onSave = () => {
    const { smwg, onSaveSuccess, form } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState(
        {
          saving: true,
        },
        () => {
          const smwgId = smwg.id;
          const axiosObj = smwgId
            ? axios.put(`${SMWGS_URL}/${smwgId}`, values)
            : axios.post(SMWGS_URL, values);
          axiosObj
            .then(() => {
              message.success("Saving smwg success");
              this.setState(
                {
                  saving: false,
                },
                () => {
                  onSaveSuccess();
                }
              );
            })
            .catch((error) => {
              this.setState({
                saving: false,
              });
              showError(error);
            });
        }
      );
    });
  };

  render() {
    const { saving } = this.state;
    const { visible, onCancel, form, smwg } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="SMWG"
        okText="Save"
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            loading={saving}
            onClick={this.onSave}
          >
            Save
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <FormItem label="Project">
            {getFieldDecorator("project", {
              initialValue: smwg.Project ? smwg.Project.id : undefined,
              rules: [{ required: true, message: "Please input project" }],
            })(<ProjectSelect />)}
          </FormItem>
          <FormItem label="Type">
            {getFieldDecorator("smwgType", {
              initialValue: smwg.smwgType,
              rules: [{ required: true, message: "Please input type" }],
            })(<SmwgTypeSelect />)}
          </FormItem>
          <Row gutter={10}>
            <Col span={12}>
              <FormItem label="Year">
                {getFieldDecorator("year", {
                  initialValue: smwg.year,
                  rules: [{ required: true, message: "Please input year" }],
                })(<YearSelect />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Month">
                {getFieldDecorator("month", {
                  initialValue: smwg.month,
                  rules: [{ required: true, message: "Please input month" }],
                })(<MonthSelect />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default SmwgWindow;
