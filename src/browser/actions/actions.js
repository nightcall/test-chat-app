import Socket from '../Socket';

export const INPUT_CHANGE = 'INPUT_CHANGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RETRIEVE_CONVERSATION = 'RETRIEVE_CONVERSATION';
export const RECEIVE_CONVERSATION = 'RECEIVE_CONVERSATION';
export const SEND_MESSAGE = 'SEND_MESSAGE';

// THUNK
export function sendMessage(message) {
  return (dispatch) => {

    // Sending message
    Socket.emit('SEND_MESSAGE', message);
    dispatch({type: SEND_MESSAGE, status: 'Success'});
  };
}

export function receiveMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    message
  };
}

export function retrieveConversation() {
  return dispatch => {
    dispatch({type: RETRIEVE_CONVERSATION});

    Socket.emit('RETRIEVE_CONVERSATION');
  }
}

export function receiveConversation(messages) {
  return {
    type: RECEIVE_CONVERSATION,
    messages
  };
}

export function inputChange(name, value) {
  return {
    type: INPUT_CHANGE,
    name,
    value
  };
}