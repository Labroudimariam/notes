import React, { useState } from 'react';
import Login from './components/login';
import List from './components/List';
import './App.css';


const App = () => {
  const [isConnected, setIsConnected] = useState(false)

  return (
    <>
      {!isConnected ?
        <Login setIsConnected={setIsConnected} />
        :
        <List setIsConnected={setIsConnected} />
      }
    </>
  )
}

export default App