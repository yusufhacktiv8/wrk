import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from "antd";
import { Icon } from "@ant-design/compatible";
import axios from "axios";

const FormItem = Form.Item;

const LOGIN_URL = `${process.env.REACT_APP_SERVER_URL}/api/security/signin`;

class NormalLoginForm extends React.Component {
  state = {
    redirectToWorkspace: false,
  };
  handleSubmit = (values) => {
    axios
          .post(LOGIN_URL, values)
      .then((response) => {
        console.log('--------> ', response.data);
            const token = response.data.token;
            if (typeof Storage !== "undefined") {
              window.sessionStorage.setItem("token", token);

              this.setState({
                redirectToWorkspace: true,
              });
            } else {
              message.error("Sorry! No Web Storage support..");
            }
          })
          .catch((errPost) => {
            if (errPost.response) {
              message.error(errPost.response.data);
            } else {
              message.error(errPost.message);
            }
          });
    // e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     axios
    //       .post(LOGIN_URL, values)
    //       .then((response) => {
    //         const token = response.data.token;
    //         if (typeof Storage !== "undefined") {
    //           window.sessionStorage.setItem("token", token);

    //           this.setState({
    //             redirectToWorkspace: true,
    //           });
    //         } else {
    //           message.error("Sorry! No Web Storage support..");
    //         }
    //       })
    //       .catch((errPost) => {
    //         if (errPost.response) {
    //           message.error(errPost.response.data);
    //         } else {
    //           message.error(errPost.message);
    //         }
    //       });
    //   }
    // });
  };
  render() {
    if (this.state.redirectToWorkspace) {
      return <Redirect to="/" />;
    }
    // const { getFieldDecorator } = this.props.form;

    const onFinish = (values) => {
      console.log('Success:', values);
    };
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" onFinish={this.handleSubmit}>
        <div
          style={{
            width: 215,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 30,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "#5093E1",
              border: "1px dotted silver",
              borderRadius: 50,
              padding: 7,
            }}
          >
            <span style={{ color: "#5093E1" }}>WRK Dashboard &trade;</span>
          </span>
        </div>
        <Form.Item name="username" rules={[{ required: true }]}>
          
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              maxLength={30}
            />
          
        </Form.Item>
        
        <Form.Item name="password" rules={[{ required: true, message: "Please input password"}]}>
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              maxLength={30}
            />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" initialValue>
          <Checkbox>Remember me</Checkbox>
          <a className="login-form-forgot" href="">
            Forgot password?
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
        <div style={{ color: "silver", fontSize: 12 }}>
          WIKA Rekon Dashboard. © WRK 2018. All rights reserved.
        </div>
      </Form>
    );
  }
}

export default NormalLoginForm;
