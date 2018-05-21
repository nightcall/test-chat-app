import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore} from 'redux';
import { Provider } from 'react-redux';
import chatApp from './reducers/reducers';
import io from 'socket.io-client';

const socket = io();
const store = createStore(chatApp);

socket.on('TEST', () => {
  store.dispatch({type: 'RECEIVE_MESSAGE', message: {text: 'tessst', username: 'Jon', date: '10:42'}});
})

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root'));