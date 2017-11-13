import { messagesActions } from '../actions'
const { NEW_MESSAGE, CLEAR_MESSAGES, REMOVE_MESSAGE } = messagesActions

const initialState = []

const messages = (state = initialState, action = '') => {
  switch (action.type) {
    case NEW_MESSAGE:
      return [...state, ...action.message]
    case REMOVE_MESSAGE:
      return state.filter((message) => message.id !== action.message.id)
    case CLEAR_MESSAGES:
      return []
    default:
      return state
  }
}

export default messages
