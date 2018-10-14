import React, { Component } from 'react';
import { Layout } from 'antd';
import SmwgItemList from './SmwgItemList';

const { Header, Content } = Layout;

export default class SmwgItemPage extends Component {
  goToSmwgPage = () => {
    this.props.history.push('/smwgs');
  }

  render() {
    const { match } = this.props;
    return (
      <Layout style={{ height: '100%' }}>
        <Header className="page-header">
          <span role="link" onClick={this.goToSmwgPage}>SMWG &gt;</span><span className="page-header-title"> Items</span>
        </Header>
        <Content className="page-content">
          <SmwgItemList match={match} />
        </Content>
      </Layout>
    );
  }
}
