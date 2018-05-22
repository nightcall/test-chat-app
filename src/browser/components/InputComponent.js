import React from 'react';
import './InputComponent.scss';
import sendImg from './img/send.png';
import { connect } from 'react-redux';
import { inputChange, sendMessage } from '../actions/actions';

class InputComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  submitMessage = (event) => {
    const {
      username,
      currentMessage,
      handleSubmit
    } = this.props;

    event.preventDefault();

    if(!currentMessage || !currentMessage.length || currentMessage.length > 500) {
      console.log('Message not valid');
      return;
    }

    handleSubmit(
      currentMessage,
      (username.length ? username : 'Anonymous'),
      new Date(Date.now()).toLocaleTimeString()
    );
  }

  render() {
    const {
      username,
      currentMessage,
      handleChange,
      handleSubmit
    } = this.props;

    return(
      <div id='input-component'>
        <form onSubmit={this.submitMessage} >
          <input type='text' value={username}
            onChange={e => handleChange('username', e.target.value)}
            placeholder='Your username' />
          <br />
          <textarea name='currentMessage' value={currentMessage}
            onChange={e => handleChange('currentMessage', e.target.value)}
            placeholder='Your message' />
          <br />
          <button><img src={sendImg} alt='Send' />Send</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.currentInput.username,
    currentMessage: state.currentInput.currentMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: (name, value) => dispatch(inputChange(name, value)),
    handleSubmit: (text, username, date) => dispatch(sendMessage(JSON.stringify({
      text,
      username,
      date
    })))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (InputComponent);