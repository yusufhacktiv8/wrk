import React from 'react';
import { Layout } from 'antd';
import CreditList from './CreditList';

const { Header, Content } = Layout;

export default () => (
  <Layout style={{ height: '100%' }}>
    <Header className="page-header">
      <span className="page-header-title"> Credits</span>
    </Header>
    <Content className="page-content">
      <CreditList />
    </Content>
  </Layout>
);
