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

  deleteFriendFromServer = (id) => {
    axios
      .delete(`http://localhost:5000/api/friends/${id}`)
      .then((response) => {
        // console.log('RESPONSE', response)
        const removedFriend = response.data._id;
        const friendArray = this.state.friends.filter((item) => {
          return item._id !== removedFriend;
        })
        this.setState({ friends: friendArray })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
        <h1>Friend Database</h1>
        <h3>Add Your Info</h3>
        <FriendForm
          addFriendToServer={ this.addFriendToServer } />
        <Friends
          friends={ this.state.friends }
          deleteFriendFromServer={ this.deleteFriendFromServer } />
      </div>
    );
  }
}

export default App;
