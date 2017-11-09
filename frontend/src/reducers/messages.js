import { NEW_MESSAGE, CLEAR_MESSAGES } from '../actions'

const initialState = []

const messages = (state = initialState, action = '') => {
    switch (action.type) {
        case NEW_MESSAGE:
            return action.message
        case CLEAR_MESSAGES:
            return []
        default:
            return state
    }
}

export default messages
