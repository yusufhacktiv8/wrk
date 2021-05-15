import React, { Component } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  Tabs,
  DatePicker,
  message,
} from "antd";
import axios from "axios";
import moment from "moment";
import showError from "../utils/ShowError";
import TypeSelect from "./TypeSelect";
import { dateFormat } from "../constant";

const PROJECTS_URL = `${process.env.REACT_APP_SERVER_URL}/api/projects`;
const TabPane = Tabs.TabPane;

class ProjectWindow extends Component {
  state = {
    saving: false,
  };

  onSave = (values) => {
    const { project, onSaveSuccess } = this.props;
    this.setState(
        {
          saving: true,
        },
        () => {
          const projectId = project.id;
          const fixedDateData = { ...values };
          if (fixedDateData.startDate) {
            fixedDateData.startDate = fixedDateData.startDate.format(
              dateFormat
            );
          }
          if (fixedDateData.endDate) {
            fixedDateData.endDate = fixedDateData.endDate.format(dateFormat);
          }

          const axiosObj = projectId
            ? axios.put(`${PROJECTS_URL}/${projectId}`, fixedDateData)
            : axios.post(PROJECTS_URL, fixedDateData);
          axiosObj
            .then(() => {
              message.success("Saving project success");
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
    const { visible, onCancel, project } = this.props;
    const {
      projectType,
      code,
      name,
      address,
      omzetKontrak,
      mp,
      keu,
      kom,
      pelut,
      eng
    } = project;
    return (
      <Modal
        visible={visible}
        destroyOnClose
        title="Project"
        okText="Save"
        width={600}
        cancelButtonProps={{onClick: onCancel}}
        okButtonProps={{form:'project-form', key: 'save', htmlType: 'submit', loading: saving}}
      >
        <Form id='project-form' layout="vertical"
          initialValues={{
            projectType,
            code,
            name,
            address,
            omzetKontrak,
            startDate: project.startDate ? moment(project.startDate) : undefined,
            endDate: project.endDate ? moment(project.endDate) : undefined,
            mp,
            keu,
            kom,
            pelut,
            eng
          }}
          onFinish={this.onSave}
        >
          <Row gutter={10}>
            <Col span={6}>
              <Form.Item name="projectType" label="Type" rules={[{ required: true, message: "Please input type" }]}>
                <TypeSelect />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="code" label="Code" rules={[{ required: true, message: "Please input code" }]}>
                <Input maxLength="30" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input name" }]}>
                <Input maxLength="100" />
              </Form.Item>
            </Col>
          </Row>
          <Tabs defaultActiveKey="1" type="card">
            <TabPane forceRender tab="Info" key="1">
              <Form.Item name="address" label="Alamat">
                <Input maxLength="150" />
              </Form.Item>
              <Row gutter={10}>
                <Col span={12}>
                  <Form.Item name="givenBy" label="Pemberi Kerja">
                    <Input maxLength="80" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="omzetKontrak" label="Omzet Kontrak">
                    <InputNumber
                        min={-1000000000}
                        max={1000000000}
                        step={0.1}
                        precision={2}
                        style={{ width: "100%" }}
                      />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={12}>
                  <Form.Item name="startDate" label="Tanggal Mulai">
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="endDate" label="Tanggal Selesai">
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            <TabPane forceRender tab="Team" key="2">
              <Row>
                <Col span={12}>
                  <Form.Item name="mp" label="Project Manager">
                    <Input maxLength="100" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={12}>
                  <Form.Item name="keu" label="Kasie Keu">
                    <Input maxLength="100" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="kom" label="Kasie Kom">
                    <Input maxLength="100" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={12}>
                  <Form.Item name="pelut" label="Pelut">
                    <Input maxLength="100" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="eng" label="Kasie Eng">
                    <Input maxLength="100" />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            <TabPane forceRender tab="BAST" key="3" disabled></TabPane>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}

export default ProjectWindow;
