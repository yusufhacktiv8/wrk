import React from "react";
import { Form, Row, Col } from "antd";
import MonthSelect from "./MonthSelect";
import YearSelect from "./YearSelect";

const FormItem = Form.Item;

const MonthYearForm = ({ form, month, year }) => {
  return (
    <Form layout="vertical"
    initialValues={
            {
              month,
              year
            }
          }
    >
      <Row gutter={20}>
        <Col span={6}>
          <Form.Item name="month" label="Month" rules={[{ required: true, message: "Please input month" }]}>
            <MonthSelect />)
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="year" label="Year" rules={[{ required: true, message: "Please input year" }]}>
            <YearSelect />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default MonthYearForm;
