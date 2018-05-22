import React from 'react';
import { connect } from 'react-redux';
import './MessageList.scss';
import Socket from '../Socket';

const Message = ({text, username, date}) => (
  <p>[{date}] <strong>{username}</strong>: {text}</p>
);

class MessageList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id='message-list'>
        <p>Message list</p>
        {this.props.messages.map(m => <Message {...m} />)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(MessageList);