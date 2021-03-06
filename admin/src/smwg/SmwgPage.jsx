import React from 'react';
import { Layout } from 'antd';
import SmwgList from './SmwgList';

const { Header, Content } = Layout;

export default ({ history }) => (
  <Layout style={{ height: '100%' }}>
    <Header className="page-header">
      <span className="page-header-title"> SMWG</span>
    </Header>
    <Content className="page-content">
      <SmwgList history={history} />
    </Content>
  </Layout>
);
