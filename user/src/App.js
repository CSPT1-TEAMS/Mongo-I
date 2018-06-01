import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Form from './Components/Form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }
  }
  componentDidMount() {
    axios
      .get('http://localhost:27017/friends')
      .then((response) => {
        this.setState({ friends: response.data })
      })
      .catch((err) => {
        console.log('Server error', err);
      });
  }

  addFriendToServer = (friend) => {
    axios
      .post('http://localhost:27017/friends', friend)
      .then(response => {
        this.setState({ friends: response.data });
      })
      .catch(err => {
        console.log('Error')
      })
  }

  render() {
    return (
      <div className="App">
        <h1>Friend Database</h1>
        <h3>Add Your Info</h3>
        <Form addFriendToServer={ this.addFriendToServer } />
      </div>
    );
  }
}

export default App;
