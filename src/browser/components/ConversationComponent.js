import React from 'react';
import { connect } from 'react-redux';

class ConversationComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentRoom } = this.props; 
    
    if(!currentRoom.id) {
      return (
        <div id='conversation-component'>
          <p>( No room selected )</p>
        </div>
      );
    }

    return(
      <div id='conversation-component'>
        <p>Conversation {currentRoom.id}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentRoom: state.currentRoom
  };
};

export default connect(mapStateToProps)(ConversationComponent);