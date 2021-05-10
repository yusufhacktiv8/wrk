import React, { Component } from "react";
import { Modal, Form, InputNumber, Button, Row, Col, message } from "antd";
import axios from "axios";
import showError from "../utils/ShowError";
import YearSelect from "../common/YearSelect";
import MonthSelect from "../common/MonthSelect";

const CREDITS_URL = `${process.env.REACT_APP_SERVER_URL}/api/credits`;

const FormItem = Form.Item;

class CreditWindow extends Component {
  state = {
    saving: false,
  };

  onSave = () => {
    const { credit, onSaveSuccess, form } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState(
        {
          saving: true,
        },
        () => {
          const creditId = credit.id;
          const axiosObj = creditId
            ? axios.put(`${CREDITS_URL}/${creditId}`, values)
            : axios.post(CREDITS_URL, values);
          axiosObj
            .then(() => {
              message.success("Saving credit success");
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
    const { visible, onCancel, form, credit } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Piutang"
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
        <Row gutter={10}>
          <Col span={12}>
            <FormItem label="Year">
              {getFieldDecorator("year", {
                initialValue: credit.year,
                rules: [{ required: true, message: "Please input year" }],
              })(<YearSelect />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Month">
              {getFieldDecorator("month", {
                initialValue: credit.month,
                rules: [{ required: true, message: "Please input month" }],
              })(<MonthSelect />)}
            </FormItem>
          </Col>
        </Row>
        <Form layout="vertical">
          <FormItem label="Piutang">
            {getFieldDecorator("pu", {
              initialValue: credit.pu,
            })(
              <InputNumber
                min={-1000000000}
                max={1000000000}
                step={0.1}
                precision={2}
                style={{ width: "100%" }}
              />
            )}
          </FormItem>
          <FormItem label="Tagihan Bruto">
            {getFieldDecorator("tb", {
              initialValue: credit.tb,
            })(
              <InputNumber
                min={-1000000000}
                max={1000000000}
                step={0.1}
                precision={2}
                style={{ width: "100%" }}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

// export default (CreditWindow);
export default CreditWindow;
