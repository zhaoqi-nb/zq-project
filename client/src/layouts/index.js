import React from 'react';
import { Layout } from 'antd';
import Header from './Header';

// import './style.less';

const { Content } = Layout;

export default function BasicLayout(props) {
  const { location, routes, children } = props;
  const { pathname } = location;
  console.log(children, 222);
  return (
    <Layout className="layout" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header routes={routes} pathname={pathname} />
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
