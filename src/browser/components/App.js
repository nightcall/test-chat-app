import React from 'react';
import './App.scss';
import InputComponent from './InputComponent';
import MessageList from './MessageList';
import io from 'socket.io-client';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.socket = io();
  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        <MessageList />
        <InputComponent />
      </div>
    );
  }
}