import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore} from 'redux';
import { Provider } from 'react-redux';
import chatApp from './reducers/reducers';

const store = createStore(chatApp);

console.log(store.getState());


ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root'));