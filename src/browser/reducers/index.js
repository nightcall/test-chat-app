import { combineReducers } from 'redux';
import {
  RECEIVE_ROOMS_LIST,
  RECEIVE_USERS_LIST,
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  OPEN_ROOM,
  OPEN_ROOM_SUCCESS,
  OPEN_ROOM_FAILED,
  RECEIVE_MESSAGE,
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

function usersList(state = [], action) {
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
      return action.list;

    case RECEIVE_MESSAGE:
      const nextState = [...state];
      const i = nextState.findIndex(r => r._id == action.message.roomId);
      nextState[i].lastMessageContent = action.message.content;
      nextState[i].lastMessageDate = action.message.date;
      return nextState;
    default:
      return state;
  }
}

function currentRoom(state = {}, action) {
  switch(action.type) {
    case OPEN_ROOM_SUCCESS:
      return {...action.room};

    case RECEIVE_MESSAGE:
      // Dans le cas ou le message est à ajouter à la conv actuelle
      if(state._id === action.message.roomId) {
        const nextState = {...state};
        nextState.messages = [
          ...nextState.messages,
          action.message
        ];
        return nextState;
      }

    default:
      return state;
  }
}

function isFetchingRoomData(state = false, action) {
  switch(action.type) {
    case OPEN_ROOM:
      return true;
    case OPEN_ROOM_SUCCESS:
    case OPEN_ROOM_FAILED:
      return false;
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
  isFetchingRoomData,
  currentRoom,
  isLoggedIn,
  isLoggingIn
});