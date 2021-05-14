import React, { Component } from "react";
import { Modal, Form, Button, message } from "antd";
import axios from "axios";
import showError from "../utils/ShowError";
import ProjectSelect from "../project/ProjectSelect";
import UserByRoleSelect from "./UserByRoleSelect";

const PROJECT_USERS_URL = `${process.env.REACT_APP_SERVER_URL}/api/projectusers`;
class ProjectUserWindow extends Component {
  state = {
    saving: false,
  };

  onSave = (values) => {
    const { user, onSaveSuccess } = this.props;
    this.setState(
        {
          saving: true,
        },
        () => {
          const userId = user.id;
          const axiosObj = userId
            ? axios.put(`${PROJECT_USERS_URL}/${userId}`, values)
            : axios.post(PROJECT_USERS_URL, values);
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

  render() {
    const { saving } = this.state;
    const { visible, onCancel, user } = this.props;
    return (
      <Modal
        wrapClassName="vertical-center-modal"
        visible={visible}
        destroyOnClose
        title="User"
        okText="Save"
        cancelButtonProps={{onClick: onCancel}}
        okButtonProps={{form:'project-user-form', key: 'save', htmlType: 'submit', loading: saving}}
      >
        <Form layout="vertical"
          id="project-user-form"
          initialValues={{
            user: user.User ? user.User.id : undefined,
            project: user.Project ? user.Project.id : undefined
          }}
          onFinish={this.onSave}
        >
          <Form.Item name="user" label="User" rules={[{ required: true, message: "Please input user" }]}>
            <UserByRoleSelect roleCode="PROJECT" />
          </Form.Item>
          <Form.Item name="project" label="Project" rules={[{ required: true, message: "Please input project" }]}>
            <ProjectSelect />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default ProjectUserWindow;
