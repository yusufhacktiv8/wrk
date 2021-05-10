import React from "react";
import { Form, Row, Col } from "antd";
import MonthSelect from "./MonthSelect";
import YearSelect from "./YearSelect";

const FormItem = Form.Item;

const MonthYearForm = ({ form, month, year }) => {
  const { getFieldDecorator } = form;
  return (
    <Form layout="vertical">
      <Row gutter={20}>
        <Col span={6}>
          <FormItem label="Month">
            {getFieldDecorator("month", {
              initialValue: month,
              rules: [{ required: true, message: "Please input month" }],
            })(<MonthSelect />)}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Year">
            {getFieldDecorator("year", {
              initialValue: year,
              rules: [{ required: true, message: "Please input year" }],
            })(<YearSelect />)}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

// export default (MonthYearForm);
export default MonthYearForm;
