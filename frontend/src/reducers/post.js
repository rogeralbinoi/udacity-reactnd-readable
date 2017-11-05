import { FETCH_POST, FETCH_COMMENTS, ADD_COMMENT, ADD_POST, VOTE_COMMENT, DELETE_COMMENT } from '../actions'

const post = (state = {}, action = '') => {
    switch (action.type) {
        case FETCH_POST:
            return { ...action.post }
        case FETCH_COMMENTS:
            return {
                ...state,
                comments: action.comments
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.comment]
            }
        case VOTE_COMMENT:
            return {
                ...state,
                comments: state.comments.map((comment) => {
                    if (comment.id === action.comment.id) {
                        return action.comment
                    }
                    return comment
                })
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.map((comment) => {
                    if (comment.id === action.comment.id) {
                        return action.comment
                    }
                    return comment
                })
            }
        default:
            return state
    }
}

export default post
