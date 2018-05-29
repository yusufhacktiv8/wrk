import React from 'react';
import { Form, InputNumber, Row, Col } from 'antd';

const FormItem = Form.Item;

const SingleForm = ({ form, revenue = {} }) => {
  const { getFieldDecorator } = form;
  return (
    <Form layout="vertical">
      <Row gutter={20}>
        <Col span={6}>
          <FormItem label="RKAP">
            {getFieldDecorator('rkap1', {
              initialValue: revenue.rkap1,
            })(
              <InputNumber min={0} max={10000} step={0.1} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Ra s/d saat ini">
            {getFieldDecorator('ra1', {
              initialValue: revenue.ra1,
            })(
              <InputNumber min={0} max={10000} step={0.1} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Ri s/d saat ini">
            {getFieldDecorator('ri1', {
              initialValue: revenue.ri1,
            })(
              <InputNumber min={0} max={10000} step={0.1} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Prognosa">
            {getFieldDecorator('prognosa1', {
              initialValue: revenue.prognosa1,
            })(
              <InputNumber min={0} max={10000} step={0.1} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(SingleForm);
