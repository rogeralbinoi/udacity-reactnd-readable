import { postsActions, commentsActions } from '../actions'
const {
  FETCH_COMMENTS,
  ADD_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} = commentsActions

const {
  FETCH_POST,
  VOTE_POST,
  DELETE_POST,
} = postsActions

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
    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.comment.id) {
            return action.comment
          }
          return comment
        })
      }
    case VOTE_POST:
      return {
        ...state,
        voteScore: action.post.voteScore
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
    case DELETE_POST:
      return {
        ...state,
        deleted: true
      }
    default:
      return state
  }
}

export default post
