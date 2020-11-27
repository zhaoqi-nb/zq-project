import React, { Component } from 'react';
import { Input } from 'antd';

class MyPage extends Component {
  state = {
    value: '',
  };

  componentDidMount() {
    // console.log('我的页面', this.props)
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <Input onChange={this.handleInputChange} />
        {value}
      </div>
    );
  }
}

export default MyPage;
