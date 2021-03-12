import React from 'react';
import Loadable from 'react-loadable';
import { Icon, Spin } from 'antd';

const Loading = () => (
  <Spin indicator={<Icon
    type="loading"
    style={{ fontSize: 24 }}
    spin
  />}
  />
);

export default (loader) => {
  return Loadable({
    loader,
    loading: Loading,
  });
}
