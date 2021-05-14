import React from "react";
import { Form, InputNumber, Row, Col } from "antd";

const ContractForm = ({ form, obj = {} }) => {
  const {
    rkap1, ra1, ri1, prognosa1,
    rkap2, ra2, ri2, prognosa2,
    rkap3, ra3, ri3, prognosa3
  } = obj;
  
  return (
    <Form layout="vertical"
      initialValues={{
        rkap1, ra1, ri1, prognosa1,
        rkap2, ra2, ri2, prognosa2,
        rkap3, ra3, ri3, prognosa3
      }}
    >
      <Row>
        <Col>
          <span className="hu-header2">Extern</span>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={6}>
          <Form.Item name="rkap1" label="RKAP">
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
          <Form.Item name="ra1" label="Ra s/d saat ini">
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
          <Form.Item name="ri1" label="Ri s/d saat ini">
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
          <Form.Item name="prognosa1" label="Prognosa">
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

      <Row>
        <Col>
          <span className="hu-header2">JO</span>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={6}>
          <Form.Item name="rkap2" label="RKAP">
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
          <Form.Item name="ra2" label="Ra s/d saat ini">
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
          <Form.Item name="ri2" label="Ri s/d saat ini">
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
          <Form.Item name="prognosa2" label="Prognosa">
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

      <Row>
        <Col>
          <span className="hu-header2">Intern</span>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={6}>
          <Form.Item name="rkap3" label="RKAP">
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
          <Form.Item name="ra3" label="Ra s/d saat ini">
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
          <Form.Item name="ri3" label="Ri s/d saat ini">
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
          <Form.Item name="prognosa3" label="Prognosa">
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

export default ContractForm;
