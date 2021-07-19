import React, { Component } from 'react';
import './index.less';

class MyPage extends Component {
  componentDidMount() {
    console.log(this.props.data, 1111);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    const { data } = this.props;
    return <span className="center-spin">{data}</span>;
  }
}

export default React.memo(MyPage);
