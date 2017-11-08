import { NEW_MESSAGE } from '../actions'

const initialState = []

const messages = (state = initialState, action = '') => {
    switch (action.type) {
        case NEW_MESSAGE:
            return action.message
        default:
            return state
    }
}

export default messages
