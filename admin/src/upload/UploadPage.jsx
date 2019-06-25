import React from 'react';
import { Layout } from 'antd';
import UploadList from './UploadList';

const { Header, Content } = Layout;

export default () => (
  <Layout style={{ height: '100%' }}>
    <Header className="page-header">
      <span className="page-header-title"> Uploads</span>
    </Header>
    <Content className="page-content">
      <UploadList />
    </Content>
  </Layout>
);
