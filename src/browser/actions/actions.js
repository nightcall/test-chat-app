export const INPUT_CHANGE = 'INPUT_CHANGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RETRIEVE_CONVERSATION = 'RETRIEVE_CONVERSATION';
export const RECEIVE_CONVERSATION = 'RECEIVE_CONVERSATION';

export function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    message
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