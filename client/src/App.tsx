// todo: react-hot-loader/root的使用要放在react前面
// import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { router } from 'dva'
import routes from '@/configs/router.config.js';
import { formatter, getLayouts } from '@/utils/router';

const { Router, Switch } = router

interface IProps {
  history: any
}

interface IState {
  routerData: any[],
  authority: any[],
}

class AppRouter extends Component<IProps, IState> {
  state = {
    routerData: [],
    authority: [1],
  };

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    const routerData = formatter(routes);
    this.setState({
      routerData,
    });
  };

  render() {
    const { routerData, authority } = this.state;
    const { history } = this.props;
    return (
      <Router history={history} >
        <Switch>{getLayouts(routerData, authority)} </Switch>
      </Router>
    );
  }
}

export default AppRouter;
