import React from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { createBrowserHistory } from 'history';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dayjs from 'dayjs';
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

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById('root'),
);
if (module.hot) {
  module.hot.accept(['./App'], () => {
    // 新的 AppComponent 加载成功后重新执行下组建渲染逻辑
    ReactDOM.render(
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>,
      document.getElementById('root'),
    );
  });
}
// if (module.hot) {
//   console.log(module.hot)
//   module.hot.accept();
// }
