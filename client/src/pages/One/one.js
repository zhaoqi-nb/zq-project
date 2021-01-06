import React, { Component } from 'react';
import My from '@/pages/My/index'

class MyPage extends Component {
  componentDidMount() {
    // console.log('我的页面', this.props)
  }

  render() {
    return <div><My a={1} /></div>;
  }
}

export default MyPage;
