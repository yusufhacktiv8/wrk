import React from 'react';
import { Form, Row, Col } from 'antd';
import MonthSelect from './MonthSelect';
import YearSelect from './YearSelect';

const FormItem = Form.Item;

const MonthYearForm = ({ form, obj = {} }) => {
  const { getFieldDecorator } = form;
  return (
    <Form layout="vertical">
      <Row gutter={20}>
        <Col span={6}>
          <FormItem label="Month">
            {getFieldDecorator('month', {
              initialValue: obj.month,
              rules: [
                { required: true, message: 'Please input month' },
              ],
            })(
              <MonthSelect />,
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Year">
            {getFieldDecorator('year', {
              initialValue: obj.year,
              rules: [
                { required: true, message: 'Please input year' },
              ],
            })(
              <YearSelect />,
            )}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(MonthYearForm);
