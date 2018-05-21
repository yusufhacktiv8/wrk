import React from 'react';
import { Layout, Row, Col, Card } from 'antd';

const { Header, Content } = Layout;

export default ({ history }) => (
  <Layout style={{ height: '100%' }}>
    <Header className="page-header">
      <span className="page-header-title">Dashboard</span>
    </Header>
    <Content className="page-content">
      <Row gutter={20}>
        <Col span={12}>
        </Col>
      </Row>
    </Content>
  </Layout>
);
