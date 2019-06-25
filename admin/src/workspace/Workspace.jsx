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
        <Header style={{ backgroundColor: '#FFF', padding: 0, lineHeight: 1, height: 90 }}>
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
          <Affix>
            <div>
              <Menu
                onClick={this.handleClick}
                selectedKeys={selectedKeys}
                mode="horizontal"
              >
                <Menu.Item key="dashboard">
                  <Link
                    to="/"
                    onClick={() => {
                      this.setState({
                        selectedKeys: ['dashboard'],
                      });
                    }}
                  ><Icon type="pie-chart" />Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="revenues">
                  <Link
                    to="/revenues"
                    onClick={() => {
                      this.setState({
                        selectedKeys: ['revenues'],
                      });
                    }}
                  ><Icon type="profile" />Hasil Usaha</Link>
                </Menu.Item>
                <Menu.Item key="credits">
                  <Link
                    to="/credits"
                    onClick={() => {
                      this.setState({
                        selectedKeys: ['credits'],
                      });
                    }}
                  ><Icon type="profile" />Piutang</Link>
                </Menu.Item>
                <SubMenu title={<span><Icon type="profile" />Projects</span>}>
                  <Menu.Item key="projects">
                    <Link to="/projects">Projects</Link>
                  </Menu.Item>
                  <Menu.Item key="progress">
                    <Link to="/progress">Project Progress</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu title={<span><Icon type="profile" />SMWG</span>}>
                  <Menu.Item key="smwgtemplates">
                    <Link to="/smwgtemplates">Templates</Link>
                  </Menu.Item>
                  <Menu.Item key="smwgs">
                    <Link to="/smwgs">SMWG</Link>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="uploads">
                  <Link
                    to="/uploads"
                    onClick={() => {
                      this.setState({
                        selectedKeys: ['uploads'],
                      });
                    }}
                  ><Icon type="upload" />Upload</Link>
                </Menu.Item>
                <SubMenu title={<span><Icon type="setting" />Settings</span>}>
                  <MenuItemGroup title="Security">
                    <Menu.Item key="users">
                      <Link to="/users">Users</Link>
                    </Menu.Item>
                    <Menu.Item key="roles">
                      <Link to="/roles">Roles</Link>
                    </Menu.Item>
                    <Menu.Item key="projectusers">
                      <Link to="/projectusers">Project Users</Link>
                    </Menu.Item>
                  </MenuItemGroup>
                </SubMenu>
              </Menu>
            </div>
          </Affix>
        </Header>
        <Content style={{ backgroundColor: '#FFF' }}>
          <div>
            <Route exact path="/" component={DashboardPage} />
            <Route path="/roles" component={RolePage} />
            <Route path="/users" component={UserPage} />
            <Route path="/revenues" component={RevenuePage} />
            <Route path="/credits" component={CreditPage} />
            <Route path="/projects" component={ProjectPage} />
            <Route path="/projectusers" component={ProjectUserPage} />
            <Route path="/progress" component={ProgressPage} />
            <Route path="/smwgtemplates" component={SmwgTemplatePage} />
            <Route exact path="/smwgs" component={SmwgPage} />
            <Route exact path="/smwgs/:smwgId/items" component={SmwgItemPage} />
            <Route path="/uploads" component={UploadPage} />
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Workspace;
