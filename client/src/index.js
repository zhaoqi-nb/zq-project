import React from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { createBrowserHistory } from 'history';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dayjs from 'dayjs';
import lodash from 'lodash';
import 'dayjs/locale/zh-cn';
import AppRouter from './App';
import './common.less';

dayjs.locale('zh-cn');

const app = dva({
  history: createBrowserHistory(),
  onAction: [],
});

app.use(createLoading());

app.router((props) => <AppRouter {...props} />);

const App = app.start();

window._ = lodash;
// eslint-disable-next-line no-underscore-dangle
export default app._store;

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById('root'),
);
