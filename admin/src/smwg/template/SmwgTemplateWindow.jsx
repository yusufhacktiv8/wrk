import React, { Component } from "react";
import { Modal, Form, Input, InputNumber, Button, message } from "antd";
import axios from "axios";
import showError from "../../utils/ShowError";
import SmwgTypeSelect from "../SmwgTypeSelect";
import ItemTypeSelect from "../item/ItemTypeSelect";

const SMWG_TEMPLATES_URL = `${process.env.REACT_APP_SERVER_URL}/api/smwgtemplates`;

const FormItem = Form.Item;

class SmwgTemplateWindow extends Component {
  state = {
    saving: false,
  };

  onSave = () => {
    const { smwgTemplate, onSaveSuccess, form } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState(
        {
          saving: true,
        },
        () => {
          const smwgTemplateId = smwgTemplate.id;
          const axiosObj = smwgTemplateId
            ? axios.put(`${SMWG_TEMPLATES_URL}/${smwgTemplateId}`, values)
            : axios.post(SMWG_TEMPLATES_URL, values);
          axiosObj
            .then(() => {
              message.success("Saving template success");
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
    const { visible, onCancel, form, smwgTemplate } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        wrapClassName="vertical-center-modal"
        visible={visible}
        title="Smwg Template"
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
          <FormItem label="Type">
            {getFieldDecorator("smwgType", {
              initialValue: smwgTemplate.smwgType,
              rules: [{ required: true, message: "Please input type" }],
            })(<SmwgTypeSelect />)}
          </FormItem>
          <FormItem label="Code">
            {getFieldDecorator("code", {
              initialValue: smwgTemplate.code,
              rules: [{ required: true, message: "Please input code" }],
            })(<Input maxLength="30" />)}
          </FormItem>
          <FormItem label="Name">
            {getFieldDecorator("name", {
              initialValue: smwgTemplate.name,
              rules: [{ required: true, message: "Please input name" }],
            })(<Input maxLength="150" />)}
          </FormItem>
          <FormItem label="Item Type">
            {getFieldDecorator("itemType", {
              initialValue: smwgTemplate.itemType,
              rules: [{ required: true, message: "Please input type" }],
            })(<ItemTypeSelect />)}
          </FormItem>
          <FormItem label="Bobot">
            {getFieldDecorator("bobot", {
              initialValue: smwgTemplate.bobot,
            })(<InputNumber min={0} max={1000} precision={1} />)}
          </FormItem>
          <FormItem label="Sequence">
            {getFieldDecorator("smwgSequence", {
              initialValue: smwgTemplate.smwgSequence,
              rules: [{ required: true, message: "Please input sequence" }],
            })(
              <InputNumber
                min={0}
                max={10000}
                step={1}
                precision={0}
                style={{ width: "100%" }}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default SmwgTemplateWindow;
