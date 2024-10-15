import logo from './logo.svg';
import './App.css';
import Header from './component/Header/Header';
import React from 'react'
import Body from './component/Body/Body';
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Body></Body>
    </div>
  );
}

export default App;
