import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import FriendForm from './Components/Form';
import Friends from './Components/Friends';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }
  }
  componentDidMount() {
    axios
      .get('http://localhost:5000/api/friends')
      .then((response) => {
        console.log('RESPONSE', response)
        this.setState({ friends: response.data })
      })
      .catch((err) => {
        console.log('Server error', err);
      });
  }

  addFriendToServer = (friend) => {
    axios
      .post('http://localhost:5000/api/friends', friend)
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
        <FriendForm addFriendToServer={ this.addFriendToServer } />
        <Friends friends={this.state.friends} />
      </div>
    );
  }
}

export default App;
