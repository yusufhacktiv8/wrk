import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Icon, Affix, Row, Col } from 'antd';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import RolePage from '../role/RolePage';
import UserPage from '../user/UserPage';
import DashboardPage from '../dashboard/DashboardPage';
import RevenuePage from '../revenue/RevenuePage';
import CreditPage from '../credit/CreditPage';
import ProjectPage from '../project/ProjectPage';
import ProjectUserPage from '../project_user/ProjectUserPage';
import ProgressPage from '../progress/ProgressPage';
import SmwgTemplatePage from '../smwg/template/SmwgTemplatePage';
import SmwgPage from '../smwg/SmwgPage';
import SmwgItemPage from '../smwg/item/SmwgItemPage';
import UploadPage from '../upload/UploadPage';

const { Header, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

const userMenu = (
  <Menu style={{ width: 150 }}>
    <Menu.Item>
      <Link
        to="/"
        onClick={() => {
          window.sessionStorage.removeItem('token');
        }}
      ><Icon type="logout" /> Logout</Link>
    </Menu.Item>
  </Menu>
);

class Workspace extends Component {
  state = {
    name: 'Anonymous',
    role: '',
  }

  componentWillMount() {
    const token = window.sessionStorage.getItem('token');
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
    const { name, role } = parseJwt(token);
    this.setState({
      name,
      role,
    });
  }

  render() {
    console.log(this.props.location.pathname);
    const location = this.props.location.pathname;
    let selectedKeys = 'dashboard';
    if (location.includes('roles')) {
      selectedKeys = ['roles'];
    } else if (location.includes('users') && !location.includes('projectusers')) {
      selectedKeys = ['users'];
    } else if (location.includes('revenues')) {
      selectedKeys = ['revenues'];
    } else if (location.includes('credits')) {
      selectedKeys = ['credits'];
    } else if (location.includes('projects') && !location.includes('projectusers')) {
      selectedKeys = ['projects'];
    } else if (location.includes('progress')) {
      selectedKeys = ['progress'];
    } else if (location.includes('projectusers')) {
      selectedKeys = ['projectusers'];
    } else if (location.includes('smwgtemplates')) {
      selectedKeys = ['smwgtemplates'];
    } else if (location.includes('smwgs')) {
      selectedKeys = ['smwgs'];
    } else if (location.includes('uploads')) {
      selectedKeys = ['uploads'];
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Header style={{ backgroundColor: '#FFF', padding: 0, lineHeight: 1, height: 50 }}>
          <Row>
            <Col span={6}>
              <div style={{ width: '100%', height: 35, padding: 15, paddingTop: 17, marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', border: '1px dotted silver', borderRadius: 50, padding: 7 }}>
                  <Icon type="dot-chart" style={{ marginRight: 5, color: 'gray', fontSize: 17 }} />
                  <span style={{ color: 'gray' }}>WIKA Rekon Dashboard &trade;</span>
                </span>
              </div>
            </Col>
            <Col span={6} offset={12}>
              <div style={{ paddingTop: 18, paddingRight: 25, textAlign: 'right' }}>
                <Dropdown overlay={userMenu} style={{ width: 200 }}>
                  <a className="ant-dropdown-link" href="#">
                    {this.state.name} ({this.state.role})<Icon type="down" />
                  </a>
                </Dropdown>
              </div>
            </Col>
          </Row>
          
        </Header>
        <Content style={{ backgroundColor: '#FFF' }}>
          <div>
            <Route exact path="/" component={UploadPage} />
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Workspace;
