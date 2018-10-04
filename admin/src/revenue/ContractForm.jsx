import React from 'react';
import { Form, InputNumber, Row, Col } from 'antd';

const FormItem = Form.Item;

const ContractForm = ({ form, obj = {} }) => {
  const { getFieldDecorator } = form;
  return (
    <Form layout="vertical">
      <Row>
        <Col>
          <span className="hu-header2">Extern</span>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={6}>
          <FormItem label="RKAP">
            {getFieldDecorator('rkap1', {
              initialValue: obj.rkap1,
            })(
              <InputNumber min={0} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Ra s/d saat ini">
            {getFieldDecorator('ra1', {
              initialValue: obj.ra1,
            })(
              <InputNumber min={0} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Ri s/d saat ini">
            {getFieldDecorator('ri1', {
              initialValue: obj.ri1,
            })(
              <InputNumber min={0} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Prognosa">
            {getFieldDecorator('prognosa1', {
              initialValue: obj.prognosa1,
            })(
              <InputNumber min={0} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col>
          <span className="hu-header2">JO</span>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={6}>
          <FormItem label="RKAP">
            {getFieldDecorator('rkap2', {
              initialValue: obj.rkap2,
            })(
              <InputNumber min={0} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Ra s/d saat ini">
            {getFieldDecorator('ra2', {
              initialValue: obj.ra2,
            })(
              <InputNumber min={0} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Ri s/d saat ini">
            {getFieldDecorator('ri2', {
              initialValue: obj.ri2,
            })(
              <InputNumber min={0} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Prognosa">
            {getFieldDecorator('prognosa2', {
              initialValue: obj.prognosa2,
            })(
              <InputNumber min={0} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col>
          <span className="hu-header2">Intern</span>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={6}>
          <FormItem label="RKAP">
            {getFieldDecorator('rkap3', {
              initialValue: obj.rkap3,
            })(
              <InputNumber min={0} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Ra s/d saat ini">
            {getFieldDecorator('ra3', {
              initialValue: obj.ra3,
            })(
              <InputNumber min={0} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Ri s/d saat ini">
            {getFieldDecorator('ri3', {
              initialValue: obj.ri3,
            })(
              <InputNumber min={0} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Prognosa">
            {getFieldDecorator('prognosa3', {
              initialValue: obj.prognosa3,
            })(
              <InputNumber min={0} max={1000000000} step={0.1} precision={2} style={{ width: '100%' }} />,
            )}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(ContractForm);
