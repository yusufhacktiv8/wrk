import React from 'react';
import { Layout } from 'antd';
import SmwgTemplateList from './SmwgTemplateList';

const { Header, Content } = Layout;

export default () => (
  <Layout style={{ height: '100%' }}>
    <Header className="page-header">
      <span>SMWG &gt;</span><span className="page-header-title"> Template</span>
    </Header>
    <Content className="page-content">
      <SmwgTemplateList />
    </Content>
  </Layout>
);
