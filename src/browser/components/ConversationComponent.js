import React from 'react';
import { connect } from 'react-redux';

class ConversationComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isFetchingRoomData,
      currentRoom
    } = this.props; 

    if(isFetchingRoomData) {
      return (
        <div id='conversation-component'>
          <p>Retrieving data...</p>
        </div>
      );
    }

    if(!currentRoom.name) {
      return (
        <div id='conversation-component'>
          <p>(No room currently selectionned)</p>
        </div>
      );
    }

    // return room
    return (
      <div id='conversation-component'>
        <p>{currentRoom.name}</p>
        {currentRoom.messages.map(m => <p>[{m.username}]: {m.content}</p>)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentRoom: state.currentRoom,
    isFetchingRoomData: state.isFetchingRoomData
  };
};

export default connect(mapStateToProps)(ConversationComponent);