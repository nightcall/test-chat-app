import React from 'react';
import { connect } from 'react-redux';

const Message = ({text, username, date}) => (
  <p>[{date}] {username}: {text}</p>
);

class MessageList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id='message-list'>
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