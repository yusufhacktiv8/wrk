import React from 'react';
import { Layout } from 'antd';
import RevenueList from './RevenueList';

const { Header, Content } = Layout;

export default () => (
  <Layout style={{ height: '100%' }}>
    <Header className="page-header">
      <span className="page-header-title">Hasil Usaha</span>
    </Header>
    <Content className="page-content">
      <RevenueList />
    </Content>
  </Layout>
);
