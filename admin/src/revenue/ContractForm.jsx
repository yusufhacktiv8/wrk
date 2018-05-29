import React from 'react';
import { Form, InputNumber, Row, Col } from 'antd';

const FormItem = Form.Item;

const ContractForm = ({ form, revenue = {} }) => {
  const { getFieldDecorator } = form;
  return (
    <Form layout="vertical">
      <Row>
        <Col>
          <span className="hu-header2">Extern</span>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <FormItem label="RKAP">
            {getFieldDecorator('rkap1', {
              initialValue: revenue.rkap1,
            })(
              <InputNumber min={0} max={10000} step={0.1} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Ra s/d saat ini">
            {getFieldDecorator('ra1', {
              initialValue: revenue.ra1,
            })(
              <InputNumber min={0} max={10000} step={0.1} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Ri s/d saat ini">
            {getFieldDecorator('ri1', {
              initialValue: revenue.ri1,
            })(
              <InputNumber min={0} max={10000} step={0.1} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Prognosa">
            {getFieldDecorator('prognosa1', {
              initialValue: revenue.prognosa1,
            })(
              <InputNumber min={0} max={10000} step={0.1} />,
            )}
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col>
          <span className="hu-header2">JO</span>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <FormItem label="RKAP">
            {getFieldDecorator('rkap2', {
              initialValue: revenue.rkap2,
            })(
              <InputNumber min={0} max={10000} step={0.1} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Ra s/d saat ini">
            {getFieldDecorator('ra2', {
              initialValue: revenue.ra2,
            })(
              <InputNumber min={0} max={10000} step={0.1} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Ri s/d saat ini">
            {getFieldDecorator('ri2', {
              initialValue: revenue.ri2,
            })(
              <InputNumber min={0} max={10000} step={0.1} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Prognosa">
            {getFieldDecorator('prognosa2', {
              initialValue: revenue.prognosa2,
            })(
              <InputNumber min={0} max={10000} step={0.1} />,
            )}
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col>
          <span className="hu-header2">Intern</span>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <FormItem label="RKAP">
            {getFieldDecorator('rkap3', {
              initialValue: revenue.rkap3,
            })(
              <InputNumber min={0} max={10000} step={0.1} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Ra s/d saat ini">
            {getFieldDecorator('ra3', {
              initialValue: revenue.ra3,
            })(
              <InputNumber min={0} max={10000} step={0.1} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Ri s/d saat ini">
            {getFieldDecorator('ri3', {
              initialValue: revenue.ri3,
            })(
              <InputNumber min={0} max={10000} step={0.1} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Prognosa">
            {getFieldDecorator('prognosa3', {
              initialValue: revenue.prognosa3,
            })(
              <InputNumber min={0} max={10000} step={0.1} />,
            )}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(ContractForm);
