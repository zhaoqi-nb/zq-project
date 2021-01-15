/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Input, Card, Button } from 'antd';
import { fetchData } from '@/servers/my';

interface IProps {
  history: IHistory,
  match: Match,
}

interface IState {
  value: string
}

class MyPage extends Component<IProps, IState> {
  state = {
    value: '',
    // asd: 1
  };

  componentDidMount() {

  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleFetchData = () => {
    fetchData({ a: this.state.value })
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
        <div className="triangleMark" />
        <Input onChange={this.handleInputChange} />
        <Button onClick={this.handleFetchData} style={{ color: 'black' }}>
          请求
        </Button>
        { value}
      </Card>
    );
  }
}

export default MyPage;
