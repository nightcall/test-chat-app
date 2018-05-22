import {
  INPUT_CHANGE,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  RETRIEVE_CONVERSATION,
  RECEIVE_CONVERSATION,
  MESSAGE_SENT
} from '../actions/actions';
import { combineReducers } from 'redux';

function currentInput(state = {
  username: '',
  currentMessage: ''
}, action) {
  switch(action.type) {
    case INPUT_CHANGE:
      return {...state, [action.name]: action.value};
    case SEND_MESSAGE:
      if(action.status && action.status === 'Success'){
        return {...state, currentMessage: ''};
      }
      return state;
    default:
      return state;
  };
}

function messages(state = [], action) {
  switch(action.type) {
    case RECEIVE_MESSAGE:
      return [...state, action.message];
    case RECEIVE_CONVERSATION:
      return action.messages;
    default:
      return state;
  }
}

const chatApp = combineReducers({
  currentInput,
  messages
});

export default chatApp;