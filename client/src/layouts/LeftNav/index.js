import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
// import { Link } from 'react-router-dom';
import { router } from 'dva';
import { pathToRegexp } from 'path-to-regexp';
// import isPlainObject from 'lodash/isPlainObject';

import { getSubPaths } from '@/utils/utils';

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Link } = router;

export default class LeftNav extends Component {
  state = {
    current: undefined,
    navItems: [],
  };

  componentDidMount() {
    this.updateNavs();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.pathname !== this.props.pathname ||
      prevProps.currentAuthority !== this.props.currentAuthority
    ) {
      this.updateNavs();
    }
  }

  updateNavs = () => {
    const { pathname, routes } = this.props;
    let navItems;
    let current;
    let mainNavItem;
    routes
      .filter((v) => v.name)
      .some((route) => {
        if (pathname.indexOf(route.path) === 0) {
          mainNavItem = route;
          return true;
        }
        return false;
      });
    if (mainNavItem) {
      navItems = mainNavItem.routes;
    }
    if (navItems) {
      current = this.getCurrentNav(navItems, pathname);
    }
    this.setState({
      navItems,
      current,
    });
  };

  getCurrentNav = (navItems, pathname) => {
    navItems = navItems.filter(({ name, hideInMenu }) => name && !hideInMenu);
    if (navItems.length <= 0) {
      return undefined;
    }
    let current;
    let currentNavItem;
    navItems.some((navItem) => {
      const { path: navPath } = navItem;
      if (navPath === pathname || pathToRegexp(navPath).test(pathname)) {
        current = navPath;
        currentNavItem = navItem;
        return true;
      }
      if (pathname.indexOf(navPath) === 0) {
        current = navPath;
        currentNavItem = navItem;
      } else {
        getSubPaths(pathname).some((subPath) => {
          if (pathToRegexp(navPath).test(subPath)) {
            current = navPath;
            currentNavItem = navItem;
            return true;
          }
          return false;
        });
      }
      return false;
    });
    if (currentNavItem && currentNavItem.routes && !currentNavItem.hideChildrenInMenu) {
      return [current, ...this.getCurrentNav(currentNavItem.routes, pathname)];
    }
    return current ? [current] : [];
  };

  renderMenuItems = (navItems = [], currentAuthority) => {
    if (navItems.length <= 0) {
      return null;
    }
    return navItems
      .filter((v) => v.name)
      .map(({ name, path, routes, hideChildrenInMenu, hideInMenu }) => {
        const subNavItems = routes;
        if (!hideChildrenInMenu && subNavItems && subNavItems.length > 0) {
          return (
            <SubMenu
              key={path}
              title={
                <>
                  <span>{name}</span>
                </>
              }
              className="left-nav-submenu"
            >
              {this.renderMenuItems(subNavItems, currentAuthority)}
            </SubMenu>
          );
        }
        return (
          !hideInMenu && (
            <Menu.Item key={path}>
              <Link to={path && path.replace(/(\/:[^/:?]+\?)+$/, '')}>{name}</Link>
            </Menu.Item>
          )
        );
      });
  };

  render() {
    const { currentAuthority } = this.props;
    const { current, navItems } = this.state;
    return navItems && navItems.length > 0 ? (
      <Sider
        collapsible
        collapsed={false} // {!current || current.length <= 0} // 只有左侧栏菜单一级中的某一项为高亮状态，左侧栏才会显示
        collapsedWidth={0}
        trigger={null}
        theme="light"
        width={80}
        style={{
          transform: 'translateZ(0)',
          zIndex: '10',
          transition: 'none',
          borderRight: '1px solid #e8e8e8',
        }}
      >
        <Menu mode="vertical" theme="light" selectedKeys={current} id="left-nav-menu">
          {this.renderMenuItems(navItems, currentAuthority)}
        </Menu>
      </Sider>
    ) :
      (
        <div />
      );
  }
}
