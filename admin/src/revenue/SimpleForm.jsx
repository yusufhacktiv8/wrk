import React from 'react';
import { Form, InputNumber, Row, Col } from 'antd';

const FormItem = Form.Item;

const SimpleForm = ({ form, obj = {} }) => {
  const { getFieldDecorator } = form;
  return (
    <Form layout="vertical">
      <Row gutter={20}>
        <Col span={6}>
          <FormItem label="RKAP">
            {getFieldDecorator('rkap', {
              initialValue: obj.rkap,
            })(
              <InputNumber min={0} max={10000} step={0.1} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Ra s/d saat ini">
            {getFieldDecorator('ra', {
              initialValue: obj.ra,
            })(
              <InputNumber min={0} max={10000} step={0.1} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Ri s/d saat ini">
            {getFieldDecorator('ri', {
              initialValue: obj.ri,
            })(
              <InputNumber min={0} max={10000} step={0.1} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Prognosa">
            {getFieldDecorator('prognosa', {
              initialValue: obj.prognosa,
            })(
              <InputNumber min={0} max={10000} step={0.1} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(SimpleForm);
