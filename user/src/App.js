import React, { Component } from 'react';
import './App.css';

import Form from './Components/Form';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>Friend Database</h1>
      <h3>Add Your Info</h3>
        <Form />
      </div>
    );
  }
}

export default App;
