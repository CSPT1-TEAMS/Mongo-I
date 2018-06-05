import React from 'react';

const Friend = props => {
    // console.log('PROPS', props)
    return (
        <div className="Friend">
            <h5>{ props.firstName }</h5>
            <h5>{ props.lastName }</h5>
            <p>{ props.age }</p>

            {/* <button onClick={()=> {console.log(props.id)}}>Delete</button> */}

            <button onClick={ () => { props.deleteFriendFromServer(props.id) } }>Delete</button>
        </div>
    );
};

export default Friend;
