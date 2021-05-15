import React, { Component } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";
import showError from "../utils/ShowError";

const CHANGE_PASSWORD_URL = `${process.env.REACT_APP_SERVER_URL}/api/changepassword`;

const FormItem = Form.Item;
const strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

class ChangePasswordWindow extends Component {
  state = {
    saving: false,
  };

  formRef = React.createRef();

  onSave = (values) => {
    const { user, onSaveSuccess } = this.props;
    this.setState(
        {
          saving: true,
        },
        () => {
          const userId = user.id;
          const axiosObj = axios.put(
            `${CHANGE_PASSWORD_URL}/${userId}`,
            values
          );
          axiosObj
            .then(() => {
              message.success("Change password success");
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

  retypePasswordValidator = (rule, value, callback) => {
    const form = this.formRef.current;
    const newPasswordFieldError = form.getFieldError("newPassword");
    if (newPasswordFieldError.length == 0) {
      const newPasswordFieldValue = form.getFieldValue("newPassword");
      if (value !== newPasswordFieldValue) {
        callback("Password is not same");
      }
    }
    callback();
  };

  render() {
    const { saving } = this.state;
    const { visible, onCancel, user } = this.props;
    return (
      <Modal
        wrapClassName="vertical-center-modal"
        destroyOnClose
        visible={visible}
        title={`Change Password - ${user.username}`}
        okText="Save"
        cancelButtonProps={{onClick: onCancel}}
        okButtonProps={{form:'change-password-form', key: 'save', htmlType: 'submit', loading: saving}}
      >
        <Form id='change-password-form' layout="vertical" onFinish={this.onSave} ref={this.formRef}>
          <FormItem name="newPassword"
            label="New Password" style={{ whiteSpace: "normal" }}
            rules={
              [
                { required: true, message: "Please input new password" },
                {
                  pattern: strongRegex,
                  message:
                    "Password must contain lowercase, uppercase, numeric and special character. \n Must have minimum 8 characters length.",
                },
              ]
            }
          >
            <Input type="password" maxLength="30" />
          </FormItem>
          <FormItem name="retypePassword" label="Retype Password" rules={
            [
                { required: true, message: "Please input retype password" },
                { validator: this.retypePasswordValidator },
              ]
          }>
            <Input type="password" maxLength="30" />
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default ChangePasswordWindow;
