import React, { Component } from "react";
import { Modal, Form, Input, InputNumber, Button, message } from "antd";
import axios from "axios";
import showError from "../../utils/ShowError";
import ItemTypeSelect from "./ItemTypeSelect";

const SMWG_ITEMS_URL = `${process.env.REACT_APP_SERVER_URL}/api/smwgitems`;

const FormItem = Form.Item;

class SmwgItemWindow extends Component {
  state = {
    saving: false,
  };

  onSave = () => {
    const { smwgItem, smwgId, onSaveSuccess, form } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState(
        {
          saving: true,
        },
        () => {
          const smwgItemId = smwgItem.id;
          const data = { ...values, smwg: smwgId };
          const axiosObj = smwgItemId
            ? axios.put(`${SMWG_ITEMS_URL}/${smwgItemId}`, data)
            : axios.post(SMWG_ITEMS_URL, data);
          axiosObj
            .then(() => {
              message.success("Saving smwgItem success");
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
    const { visible, onCancel, form, smwgItem } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        wrapClassName="vertical-center-modal"
        visible={visible}
        title="SMWG Item"
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
          <FormItem label="Code">
            {getFieldDecorator("code", {
              initialValue: smwgItem.code,
              rules: [{ required: true, message: "Please input code" }],
            })(<Input maxLength="30" />)}
          </FormItem>
          <FormItem label="Name">
            {getFieldDecorator("name", {
              initialValue: smwgItem.name,
              rules: [{ required: true, message: "Please input name" }],
            })(<Input maxLength="150" />)}
          </FormItem>
          <FormItem label="Type">
            {getFieldDecorator("itemType", {
              initialValue: smwgItem.itemType,
              rules: [{ required: true, message: "Please input type" }],
            })(<ItemTypeSelect />)}
          </FormItem>
          <FormItem label="Bobot">
            {getFieldDecorator("bobot", {
              initialValue: smwgItem.bobot,
              rules: [{ required: true, message: "Please input weight" }],
            })(<InputNumber min={0} max={1000} precision={1} />)}
          </FormItem>
          <FormItem label="Nilai">
            {getFieldDecorator("nilai", {
              initialValue: smwgItem.nilai,
            })(<InputNumber min={0} max={1000} precision={0} />)}
          </FormItem>
          <FormItem label="Sequence">
            {getFieldDecorator("smwgSequence", {
              initialValue: smwgItem.smwgSequence,
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

export default SmwgItemWindow;
