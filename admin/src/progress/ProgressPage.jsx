import React from 'react';
import { Layout } from 'antd';
import ProgressList from './ProgressList';

const { Header, Content } = Layout;

export default () => (
  <Layout style={{ height: '100%' }}>
    <Header className="page-header">
      <span className="page-header-title"> Project Progress</span>
    </Header>
    <Content className="page-content">
      <ProgressList />
    </Content>
  </Layout>
);
