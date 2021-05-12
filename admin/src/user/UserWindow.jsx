import React, { Component } from "react";
import { Modal, Form, Input, Button, Row, Col, message } from "antd";
import axios from "axios";
import showError from "../utils/ShowError";
import RoleSelect from "../role/RoleSelect";

const USERS_URL = `${process.env.REACT_APP_SERVER_URL}/api/users`;

const FormItem = Form.Item;
const strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

class UserWindow extends Component {
  state = {
    saving: false,
  };

  formRef = React.createRef();

  onSave = (values) => {
    const { user, onSaveSuccess, form } = this.props;
    this.setState(
        {
          saving: true,
        },
        () => {
          const userId = user.id;
          const axiosObj = userId
            ? axios.put(`${USERS_URL}/${userId}`, values)
            : axios.post(USERS_URL, values);
          axiosObj
            .then(() => {
              message.success("Saving user success");
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
              showError(error);
            });
        }
      );
  };

  retypePasswordValidator = (rule, value, callback) => {
    const form = this.formRef.current;
    const passwordFieldError = form.getFieldError("password");
    if (passwordFieldError.length == 0) {
      const passwordFieldValue = form.getFieldValue("password");
      if (value !== passwordFieldValue) {
        callback("Password is not same");
      }
    }
    callback();
  };

  render() {
    const { saving } = this.state;
    const { visible, onCancel, user } = this.props;
    const { username, name, email, password } = user;
    return (
      <Modal
        wrapClassName="vertical-center-modal"
        destroyOnClose
        visible={visible}
        title="User"
        okText="Save"
        cancelButtonProps={{onClick: onCancel}}
        okButtonProps={{form:'user-form', text: 'Save', key: 'save', htmlType: 'submit', loading: saving}}
      >
        <Form
          id='user-form'
          layout="vertical" onFinish={this.onSave} ref={this.formRef}
          initialValues={
            {
              username,
              name,
              role: user.Role ? user.Role.id : undefined,
              email,
              password
            }
          }
        >
          <FormItem name="username" label="Username" rules={
            [
                { required: true, message: "Please input username" },
                { min: 3, message: "Username minimum length is 3 characters" },
              ]
          }>
            <Input maxLength="50" />
          </FormItem>
          <FormItem name="name" label="Name" rules={
            [
                { required: true, message: "Please input name" },
                { min: 3, message: "Name minimum length is 3 characters" },
              ]
          }>
            <Input maxLength="100" />
          </FormItem>
          <Row>
            <Col span={12}>
              <FormItem name="role" label="Role" rules={
                [{ required: true, message: "Please input role" }]
              }>
                <RoleSelect />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem name="email" label="Email" rules={
                [[{ type: "email", message: "The is not valid E-mail" }]]
              }>
                <Input maxLength="100" />
              </FormItem>
            </Col>
          </Row>
          {visible === false || user.id !== undefined ? null : (
            <FormItem name="password" label="Password" style={{ whiteSpace: "normal" }} rules={
              [
                  { required: true, message: "Please input password" },
                  {
                    pattern: strongRegex,
                    message:
                      "Password must contain lowercase, uppercase, numeric and special character. \n Must have minimum 8 characters length.",
                  },
                ]
            }>
              <Input type="password" maxLength="30" />
            </FormItem>
          )}
          {visible === false || user.id !== undefined ? null : (
            <FormItem name="retypePassword" label="Retype Password" rules={
              [
                  { required: true, message: "Please input retype password" },
                  { validator: this.retypePasswordValidator },
                ]
            }>
              <Input type="password" maxLength="30" />
            </FormItem>
          )}
        </Form>
      </Modal>
    );
  }
}

// export default (UserWindow);
export default UserWindow;
