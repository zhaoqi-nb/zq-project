import React from 'react';
// import { Table, Icon } from 'antd'
import {
  QuestionCircleOutlined
} from '@ant-design/icons';
// import logo from './logo.svg';
import './App.css';

function App() {
  const a = {'1':2}
  console.log(a)
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* <img src={logo} className="App-logo" alt="logo" /> */}

      <p>
        {/* Edit <code>src/App.js</code> and save to reload. */}
      </p>
      {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >


        </a> */}
        恒恒叫哥哥<QuestionCircleOutlined />
      <div style={{ backgroundColor: "red" }} >113</div>
      <table width='500' height='100' style={{
        backgroundColor: 'blue'
      }} border="1px">
        <tr>
          <td>1</td>
          <td>1</td> <td>1</td>
        </tr>
        <tr>
          <td>1</td>
          <td>1</td> <td>1</td>
        </tr><tr>
          <td>1</td>
          <td>1</td> <td>1</td>
        </tr>
      </table>
      {/* </header> */}
    </div>
  );
}

export default App;
