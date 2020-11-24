/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
// import isPlainObject from 'lodash/isPlainObject';

const { Header } = Layout;
const { SubMenu } = Menu;

class HeaderView extends Component {
  state = {
    current: undefined,
  };

  componentDidMount() {
    this.updateCurrentNav();
  }

  updateCurrentNav = () => {
    const { pathname, routes } = this.props;
    const hasCurrentNav = routes
      .filter((route) => route.name)
      .some((route) => {
        if (pathname.indexOf(route.path) === 0) {
          this.setState({
            current: route.path,
          });
          return true;
        }
        return false;
      });
    if (!hasCurrentNav) {
      this.setState({
        current: undefined,
      });
    }
  };

  render() {
    const { routes } = this.props;
    const { current } = this.state;

    const visibleRoutes = routes;
    return (
      <Header className="ones-header">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          // mode="horizontal"
          mode="horizontal"
          // style={{ float: 'left', height: '100%' }}
        >
          {visibleRoutes.map(({ name, path, nav: Nav }) => (
            <Menu.Item key={path}>
              <Link to={path}>{Nav ? <Nav /> : name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
    );
  }
}
export default HeaderView;
