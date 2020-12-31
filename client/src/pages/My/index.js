import React, { Component } from 'react';
import { Input, Card, Button } from 'antd';
import { fetchData } from '@/servers/my';

class MyPage extends Component {
  state = {
    value: '',
  };

  componentDidMount() {}

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleFetchData = () => {
    fetchData(this.state.value)
      .then((res) => {
        console.log(res, 22);
      })
      .catch((error) => {
        console.log(error, 11);
      });
  };

  render() {
    const { value } = this.state;
    return (
      <Card>
        <Input onChange={this.handleInputChange} />
        111
        <Button style={{ color: 'red' }} onClick={this.handleFetchData}>
          请求
        </Button>
        {value}
      </Card>
    );
  }
}

export default MyPage;
