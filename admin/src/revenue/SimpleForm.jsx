import React from "react";
import { Form, InputNumber, Row, Col } from "antd";

const SimpleForm = ({ form, obj = {} }) => {
  const { rkap, ra, ri, prognosa } = obj;
  return (
    <Form layout="vertical"
      initialValues={{
        rkap, ra, ri, prognosa
      }}
    >
      <Row gutter={20}>
        <Col span={6}>
          <Form.Item name="rkap" label="RKAP">
            <InputNumber
                min={-1000000000}
                max={1000000000}
                step={0.1}
                precision={2}
                style={{ width: "100%" }}
              />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="ra" label="Ra s/d saat ini">
            <InputNumber
                min={-1000000000}
                max={1000000000}
                step={0.1}
                precision={2}
                style={{ width: "100%" }}
              />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="ri" label="Ri s/d saat ini">
            <InputNumber
                min={-1000000000}
                max={1000000000}
                step={0.1}
                precision={2}
                style={{ width: "100%" }}
              />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="prognosa" label="Prognosa">
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
    </Form>
  );
};

export default SimpleForm;
