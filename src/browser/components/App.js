import React from 'react';
import { connect } from 'react-redux';
import './App.scss';
import ChatComponent from './ChatComponent';
import LoginComponent from './LoginComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isLoggedIn,
      isLoggingIn
    } = this.props;

    if(isLoggedIn) {
      return(
        <div id='app-container'>
          <ChatComponent />
        </div>
      );
    } else {
      return(
        <div id='app-container'>
          <LoginComponent isLoggingIn={isLoggingIn} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    isLoggingIn: state.isLoggingIn
  };
};

export default connect(mapStateToProps)(App);