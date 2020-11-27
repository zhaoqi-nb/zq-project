import React, { Component } from 'react';
import { router } from 'dva';
import routes from '@/configs/router.config';
// import { hot } from 'react-hot-loader/root';
import { getLayouts, formatter } from '@/utils/router';

const { Router, Switch } = router;
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
    return (
      <Router history={history}>
        <Switch>{getLayouts(routerData, authority)}</Switch>
      </Router>
    );
  }
}

// export default hot(AppRouter);
export default AppRouter;
