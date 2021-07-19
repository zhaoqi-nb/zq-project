import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'antd';

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  getValue() {
    return { complete: this.state.value };
  }

  getInputNode() {
    return ReactDOM.findDOMNode(this).getElementsByTagName('input')[0];
  }

  handleChangeComplete = (ev) => {
    this.setState({ value: ev.target.value });
  }

  handelInputOnblur = () => {
    this.props.onCommit();
  }

  render() {
    return (
      <Input
        defaultValue={this.state.value}
        onBlur={this.handelInputOnblur}
        onChange={this.handleChangeComplete}
      />
    );
  }
}

export default MyPage;
