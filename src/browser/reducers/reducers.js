import {
  INPUT_CHANGE,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  RETRIEVE_CONVERSATION,
  RECEIVE_CONVERSATION
} from '../actions/actions';
import { combineReducers } from 'redux';

function currentInput(state = {
  username: 'Anonymous',
  currentMessage: ''
}, action) {
  switch(action.type) {
    case INPUT_CHANGE:
      return Object.assign({}, state, {[action.name]: action.value});
    default:
      return state;
  };
}

function messages(state = [], action) {
  switch(action.type) {
    case RECEIVE_MESSAGE:
      return [...state, action.message];
    default:
      return state;
  }
}

const chatApp = combineReducers({
  currentInput,
  messages
});

export default chatApp;