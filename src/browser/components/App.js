import React from 'react';
import './App.scss';
import InputComponent from './InputComponent';
import MessageList from './MessageList';

export default class App extends React.Component {
  constructor(props) {
    super(props);
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