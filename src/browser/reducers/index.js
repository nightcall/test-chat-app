import { combineReducers } from 'redux';
import {
  RECEIVE_ROOMS_LIST,
  RECEIVE_USERS_LIST,
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  login
} from './../actions/index';

function user(state = {
    _id: '5b045203ce5cd514f8b1ac1b',
    name: 'Sara',
    password: '1234',
    lastDateActive: '45621358'
}, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {...action.user};
    default:
      return state;
  }
}

function usersList(state = [{name: 'Jon'}, {name: 'Andrew'}], action) {
  switch(action.type) {
    case RECEIVE_USERS_LIST:
      return action.list;
    default:
      return state;
  }
}

function rooms(state = [], action) {
  switch(action.type) {
    case RECEIVE_ROOMS_LIST:
      console.log(action.list)
      return action.list;
    default:
      return state;
  }
}

function isLoggedIn(state = true, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return true;
    default:
      return state;
  }
}

function isLoggingIn(state = false, action) {
  switch(action.type) {
    case LOGIN_REQUEST:
      return true;
    case LOGIN_SUCCESS:
    case LOGIN_FAILED:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  user,
  usersList,
  rooms,
  isLoggedIn,
  isLoggingIn
});