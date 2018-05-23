import React from 'react';
import { connect } from 'react-redux';
import socket from './../Socket';
import RoomsListComponent from './RoomsListComponent';
import ConversationComponent from './ConversationComponent';
import InputComponent from './InputComponent';
import ProfileComponent from './ProfileComponent';
import {
  retrieveUsersList,
  receiveUsersList,
  retrieveRoomsList,
  receiveRoomsList
} from './../actions/index';

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
      this.props.receiveUsersList(JSON.parse(list));
    })

    socket.on('RECEIVE_ROOMS_LIST', list => {
      this.props.receiveRoomsList(JSON.parse(list));
    })

    // && retrieve first time
    this.props.retrieveUsersList();
    this.props.retrieveRoomsList();
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    retrieveUsersList: () => dispatch(retrieveUsersList()),
    receiveUsersList: (list) => dispatch(receiveUsersList(list)),
    retrieveRoomsList: () => dispatch(retrieveRoomsList()),
    receiveRoomsList: (list) => dispatch(receiveRoomsList(list))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);