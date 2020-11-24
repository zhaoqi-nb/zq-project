import React from 'react';
// import { hot } from 'react-hot-loader/root';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { createBrowserHistory } from 'history';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import App from './App';
// import './index.css';

// hot(App);
dayjs.locale('zh-cn');
const history = createBrowserHistory();
ReactDOM.render(
  // 严格模式
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App history={history} />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
// if (module.hot) {
//   console.log(module.hot)
//   module.hot.accept();
// }
