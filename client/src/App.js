import React, { Component } from 'react';
import { Router, Switch } from 'react-router-dom';
import routes from '@/configs/router.config';
// import My from '@/pages/My';
import { getLayouts, formatter } from '@/utils';

class AppRouter extends Component {
  state = {
    routerData: [],
    authority: [],
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
    console.log(getLayouts(routerData, authority));
    return (
      <Router history={history}>
        <Switch>{getLayouts(routerData, authority)}</Switch>
      </Router>
    );
  }
}

export default AppRouter;
