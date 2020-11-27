import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { router } from 'dva';
// import { Link } from 'react-router-dom';
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
// import isPlainObject from 'lodash/isPlainObject';
import logo from '@/assest/log.jpg';

const { Header } = Layout;
// const { SubMenu } = Menu;
const { Link } = router;

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

    const visibleRoutes = routes.filter(v => v.name);
    return (
      <Header className="ones-header">
        <div className="header-system">
          <img className="system-logo" src={logo} alt="log" />
          {/* <span className="system-name">myProject</span> */}
        </div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          // mode="horizontal"
          mode="horizontal"
          style={{ float: 'left', height: '100%' }}
        >
          {visibleRoutes.map(({ name, path, }) => (
            <Menu.Item key={path}>
              <Link to={path}>{name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
    );
  }
}
export default HeaderView;
