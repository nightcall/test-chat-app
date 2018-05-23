import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import socket from './Socket';
import rootReducer from './reducers/index';
import { retrieveRoomsList, receiveRoomsList } from './actions/index';

const store = createStore(rootReducer, applyMiddleware(thunk));

// setting up socket events
/*
socket.on('RECEIVE_ROOMS_LIST', list => {
  store.dispatch(receiveRoomsList(JSON.parse(list)));
});

store.dispatch(retrieveRoomsList());
*/

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root'));