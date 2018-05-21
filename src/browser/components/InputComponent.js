import React from 'react';
import './InputComponent.scss';
import sendImg from './img/send.png';
import { connect } from 'react-redux';
import { inputChange, sendMessage } from '../actions/actions';

class InputComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      username,
      currentMessage,
      handleChange,
      handleSubmit
    } = this.props;

    return(
      <form onSubmit={e => {
        e.preventDefault();
        handleSubmit(currentMessage, username, '10:42')
      }} >
        <input type='text' value={username}
          onChange={e => handleChange('username', e.target.value)} />
        <input name='currentMessage' type='text' value={currentMessage}
          onChange={e => handleChange('currentMessage', e.target.value)} />
        <button><img src={sendImg} alt='Send' /></button>
      </form>
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