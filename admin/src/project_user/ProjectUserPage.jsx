import React from 'react';
import { Layout } from 'antd';
import ProjectUserList from './ProjectUserList';

const { Header, Content } = Layout;

export default () => (
  <Layout style={{ height: '100%' }}>
    <Header className="page-header">
      <span>Settings &gt;</span><span className="page-header-title"> Project Users</span>
    </Header>
    <Content className="page-content">
      <ProjectUserList />
    </Content>
  </Layout>
);
