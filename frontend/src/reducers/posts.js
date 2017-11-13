import { postsActions } from '../actions'
const {
  FETCH_POSTS,
  ADD_POST,
  EDIT_POST,
  VOTE_POST,
  DELETE_POST
} = postsActions

const posts = (state = [], action = '') => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.posts
    case ADD_POST:
      return [...state, action.post]
    case EDIT_POST:
      return state.map(post => (
        post.id === action.post.id ? action.post : post)
      )
    case VOTE_POST:
      return state.map(post => (
        post.id === action.post.id ? action.post : post)
      )
    case DELETE_POST:
      return state.filter(post => post.id !== action.post.id)
    default:
      return state
  }
}

export default posts
