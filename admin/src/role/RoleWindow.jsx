import React, { Component } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";
import showError from "../utils/ShowError";

const ROLES_URL = `${process.env.REACT_APP_SERVER_URL}/api/roles`;

const FormItem = Form.Item;

class RoleWindow extends Component {
  state = {
    saving: false,
  };

  onSave = (values) => {
    const { role, onSaveSuccess, form } = this.props;
    this.setState(
        {
          saving: true,
        },
      () => {
        
          const roleId = role.id;
          const axiosObj = roleId
            ? axios.put(`${ROLES_URL}/${roleId}`, values)
            : axios.post(ROLES_URL, values);
          axiosObj
            .then(() => {
              message.success("Saving role success");
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
  };

  render() {
    const { saving } = this.state;
    const { visible, onCancel, role } = this.props;
    // const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        destroyOnClose
        title="Role"
        cancelButtonProps={{onClick: onCancel}}
        okButtonProps={{form:'category-editor-form', key: 'save', htmlType: 'submit', loading: saving}}
      >
        <Form
          id='category-editor-form'
          layout="vertical"
          // It's work because destroyOnClose on Modal
          initialValues={
            {
              code: role.code,
              name: role.name
            }
          }
          onFinish={this.onSave}
        >
          <Form.Item name="code" label="Code" rules={[{ required: true, message: "Please input code" }]}>
            <Input maxLength="30" />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input name" }]}>
            <Input maxLength="50" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default RoleWindow;
