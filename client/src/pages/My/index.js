/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Input, Card, Button } from 'antd';
import { fetchData } from '@/servers/my';

// interface IProps {
//   // history: IHistory,
//   // match: Match,
// }

// interface IState {
//   value: string
// }


class MyPage extends Component {
  state = {
    value: '',
    // q: 1
  };

  componentDidMount() {
  }

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
        <Button style={{ color: 'red' }} onClick={() => console.log(a)}>
          请求
        </Button>
        {value}
      </Card>
    );
  }
}

export default MyPage;
