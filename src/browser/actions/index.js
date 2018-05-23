import socket from './../Socket';

export const RETRIEVE_ROOMS_LIST_PENDING = 'RETRIEVE_ROOMS_LIST_PENDING';
export const RETRIEVE_USERS_LIST_PENDING = 'RETRIEVE_USERS_LIST_PENDING';
export const RECEIVE_ROOMS_LIST = 'RECEIVE_ROOMS_LIST';
export const RECEIVE_USERS_LIST = 'RECEIVE_USERS_LIST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const OPEN_ROOM = 'OPEN_ROOM';

export function retrieveRoomsList() {
  return (dispatch) => {
    dispatch({type: RETRIEVE_ROOMS_LIST_PENDING});

    socket.emit('RETRIEVE_ROOMS_LIST');
  };
};

export function retrieveUsersList() {
  return (dispatch) => {
    dispatch({type: RETRIEVE_USERS_LIST_PENDING});

    socket.emit('RETRIEVE_USERS_LIST');
  };
};

export function receiveRoomsList(list) {
  return {
    type: RECEIVE_ROOMS_LIST,
    list
  }
};

export function receiveUsersList(list) {
  return {
    type: RECEIVE_USERS_LIST,
    list
  }
};

// LOGIN THUNK
export function login(username, password) {
  return (dispatch) => {
    dispatch({type: LOGIN_REQUEST});

    fetch('/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      credentials: 'same-origin',
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(
      data => data.json(),
      error => console.log('An error occured', error)
    ).then(data => {
      if(data.error) {
        dispatch({type: LOGIN_FAILED})
        console.log(data.error);
      } else {
        console.log(data)
        dispatch({type: LOGIN_SUCCESS, user: data})
      }
    });
  }
}

export function createRoom(name, participants, content) {
  return dispatch => {
    socket.emit('CREATE_ROOM', JSON.stringify({
      name,
      participants,
      lastMessageContent: content,
      lastMessageDate: Date.now()
    }));
  }
}

export function openRoom(id) {
  return {
    type: OPEN_ROOM,
    id
  };
};