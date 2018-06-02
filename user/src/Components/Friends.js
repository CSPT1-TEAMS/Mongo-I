import React, { Component } from 'react';
import Friend from './Friend';

class Friends extends Component {

    render() {
        return (
            <div className="Friends">
            <h1>Friend List</h1>
                <ul>
                    { this.props.friends.map(friend => {
                        return (
                            <Friend
                                firstName={ friend.firstName }
                                lastName={friend.lastName}
                                age={friend.age}
                                key={ friend._id }
                               
                            />
                        );
                    }) }
                </ul>
            </div>
        );
    }
}

export default Friends;
