import React from 'react';
// import { Table, Icon } from 'antd'
import {
  QuestionCircleOutlined
} from '@ant-design/icons';
import './App.css';

function App() {
  const a = { a: 1 }
  const handle = () => {
    const a = { a: 1 }
    return a
  }
  const b = 1
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* <img src={logo} className="App-logo" alt="logo" /> */}

      <p>
        {/* Edit <code>src/App.js</code> and save to reload. */}
      </p>
        恒恒叫哥哥   <QuestionCircleOutlined />
      <div style={{ backgroundColor: "red" }} >11322</div>
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
