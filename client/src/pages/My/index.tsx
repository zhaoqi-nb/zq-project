/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Input, Card, Button } from 'antd';
import { fetchData } from '@/servers/my';
import debounce from 'lodash/debounce';

import style from './index.module.less'

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
    console.log(this.getStyle(document.documentElement, 'width'))
    document.getElementById('parent')?.addEventListener('click', () => {
      console.log('父组件冒泡')
    })
    document.getElementById('parent1')?.addEventListener('click', (e) => {
      // e.stopImmediatePropagation()
      console.log('父组件冒泡1')
    })
    document.getElementById('parent2')?.addEventListener('click', (e) => {
      // e.stopImmediatePropagation()
      console.log('父组件冒泡2')
    })
    document.getElementById('child')?.addEventListener('click', (e) => {
      // e.stopImmediatePropagation()
      e.stopPropagation()
      const a = document.getElementById('child')
      this.getStyle(a, 'width')
    })
  }

  getStyle = (ele, attr) => {
    console.log(window.getComputedStyle(ele, null))
    if (window.getComputedStyle) {
      return window.getComputedStyle(ele, null)[attr];
    }
    return ele.currentStyle[attr];
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onInputChange = debounce(e => {
    console.log(e)
  }, 800)

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
        <Input onChange={this.onInputChange} />
        <Button onClick={this.handleFetchData} style={{ color: 'black' }}>
          请求3
        </Button>
        { value}
        <div className={style.parentCss} id="parent">父组件
          <div id="parent1">父组件1</div>
          <div id="parent2">父组件2</div>
          ----------------------------
          ----
          <div id="child">子组件2</div>
        </div>
        <div style={{ width: '10000px', height: '2000px', background: 'red' }}>1</div>
      </Card>
    );
  }
}

export default MyPage;
