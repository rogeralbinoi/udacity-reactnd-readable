import { FETCH_POSTS } from '../actions'

const posts = (state = [], action = '') => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.posts
    default:
      return state
  }
}

export default posts
