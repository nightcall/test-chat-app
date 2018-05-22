import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import chatApp from './reducers/reducers';
import Socket from './Socket';
import { receiveMessage, receiveConversation, retrieveConversation } from './actions/actions';

const store = createStore(chatApp, applyMiddleware(thunk));

Socket.on('RECEIVE_MESSAGE', message => {
  store.dispatch(receiveMessage(JSON.parse(message)));
})

Socket.on('RECEIVE_CONVERSATION', messages => {
  store.dispatch(receiveConversation(JSON.parse(messages)));
})

store.dispatch(retrieveConversation());

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root'));