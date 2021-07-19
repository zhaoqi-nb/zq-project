import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import LeftNav from './LeftNav';

import './index.less';

const { Content } = Layout;

export default function BasicLayout(props) {
  const {
    location, routes, children, currentAuthority,
  } = props;
  const { pathname } = location;
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header routes={routes} pathname={pathname} />
      <Layout>
        <LeftNav currentAuthority={currentAuthority} routes={routes} pathname={pathname} />
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
