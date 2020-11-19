/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Router, Switch } from 'react-router-dom';
import routes from '@/configs/router.config';
import My from '@/pages/My';
import { getLayouts } from '@/utils';

class AppRouter extends Component {
  state = {
    routerData: [],
    authority: [],
  };

  componentDidMount() {
    console.log(routes, 22);
  }

  render() {
    console.log(22222, 222, 3332);
    const { routerData, authority } = this.state;
    const { history } = this.props;
    return (
      <div
        onClick={() => {
          this.setState({
            a: 11111,
          });
        }}
      >
        2{this.state.a}
        <My />
      </div>
    );
    // return 22<Router history={history}>
    //   1111
    //   {/* <Switch>
    //     {getLayouts(routerData, authority)}
    //   </Switch> */}
    // </Router>
  }
}

export default AppRouter;
