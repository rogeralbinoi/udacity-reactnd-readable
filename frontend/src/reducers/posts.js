import { FETCH_POSTS, ADD_POST } from '../actions'

const posts = (state = [], action = '') => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.posts
    case ADD_POST:
      return state
    default:
      return state
  }
}

export default posts
