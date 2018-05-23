import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from './../actions/index';

class InputComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };
  }

  submitMessage = (e) => {
    e.preventDefault();

    const { message } = this.state;
    const {
      user,
      currentRoom
    } = this.props;

    // tests
    if(!message.length)
      return;

    //
    this.setState({message: ''});
    this.props.handleSendMessage(user, message, currentRoom);
  }

  render() {
    const {
      currentRoom
    } = this.props;

    if(!currentRoom._id) {
      return (
        <div id='input-component'>
          <p>Go into a room to send a message, dumbass.</p>
        </div>
      );
    }
    return(
      <div id='input-component'>
        <form onSubmit={this.submitMessage} >
          <input type='text' value={this.state.message}
            onChange={e => this.setState({message: e.target.value})} /><button>Send</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentRoom: state.currentRoom,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSendMessage: (user, message, room) => dispatch(sendMessage(user, message, room))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputComponent);