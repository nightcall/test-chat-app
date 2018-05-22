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
    const { isRetrievingConversation } = this.props;

    return(
      <div id='message-list'>
        <p>{isRetrievingConversation ? 'Retrieving conversation...' : 'Message list'}</p>
        {this.props.messages.map(m => <Message {...m} />)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    isRetrievingConversation: state.isRetrievingConversation
  };
};

export default connect(mapStateToProps)(MessageList);