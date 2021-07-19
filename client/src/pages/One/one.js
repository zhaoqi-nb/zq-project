import React, { useCallback, useContext, useState } from 'react';

// const LogContext = React.createContext();
const LogDispatchContext = React.createContext();
const LogStateContext = React.createContext();

function LogProvider({ children }) {
  const [logs, setLogs] = useState([]);
  const addLog = useCallback((log) => setLogs((prevLogs) => [...prevLogs, log]), []);
  return (
    <LogDispatchContext.Provider value={addLog}>
      <LogStateContext.Provider value={logs}>
        {children}
      </LogStateContext.Provider>
    </LogDispatchContext.Provider>
  );
}

function Logger1() {
  const addLog = useContext(LogDispatchContext);
  return (
    <>
      <p>一个能发日志的组件 1</p>
      <button onClick={() => addLog('logger1')}>发日志</button>
    </>
  );
}

function Logger2() {
  const addLog = useContext(LogDispatchContext);
  return (
    <>
      <p>一个能发日志的组件 2</p>
      <button onClick={() => addLog('logger2')}>发日志</button>
    </>
  );
}

function LogsPanel() {
  const logs = useContext(LogStateContext);
  return logs.map((log, index) => <p key={index}>{log}</p>);
}

export default function App() {
  return (
    <LogProvider>
      {/* 写日志 */}
      <Logger1 />
      <Logger2 />
      {/* 读日志 */}
      <LogsPanel />
    </LogProvider>
  );
}
