import Socket from '../Socket';

export const INPUT_CHANGE = 'INPUT_CHANGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RETRIEVE_CONVERSATION = 'RETRIEVE_CONVERSATION';
export const RECEIVE_CONVERSATION = 'RECEIVE_CONVERSATION';

// THUNK
export function sendMessage(message) {
  return (dispatch) => {

    // Could've handled errors and sending time but im a lazy ass motherfucker
    Socket.emit('SEND_MESSAGE', message);
  };
}

export function receiveMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    message
  };
}

export function retrieveConversation() {
  return {
    type: RETRIEVE_CONVERSATION
  };
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