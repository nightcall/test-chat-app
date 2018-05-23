import React from 'react';
import { connect } from 'react-redux';
import socket from './../Socket';
import RoomsListComponent from './RoomsListComponent';
import ConversationComponent from './ConversationComponent';
import InputComponent from './InputComponent';
import ProfileComponent from './ProfileComponent';
import { retrieveUsersList } from './../actions/index';

class ChatComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <React.Fragment>
        <div id='left-container'>
          <ProfileComponent />
          <RoomsListComponent />
        </div>
        <div id='right-container'>
          <ConversationComponent />
          <InputComponent />
        </div>
      </React.Fragment>
    )
  }

  componentWillMount() {
    // bind sockets events
    socket.on('RECEIVE_USERS_LIST', list => {
      console.log(list)
      //receive
    })
    // && retrieve first time
    this.props.retrieveUsersList();
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    retrieveUsersList: () => dispatch(retrieveUsersList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);