import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Register from './components/REGISTRATION/Registration';
import Header from './components/HEADER/Header';

class App extends Component {

  render() {
    return (
      <div>
        <Register/>
      </div>
      
    );
  }
}

export default App;
