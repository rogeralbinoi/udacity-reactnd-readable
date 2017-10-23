import * as API from '../API'
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POSTS = 'FETCH_POSTS'

export const fetchCategories = () => {
  return dispatch => {
    API.getCategories().then(response => {
      dispatch({ type: FETCH_CATEGORIES, categories: response.data.categories })
    })
  }
}

export const fetchPosts = () => {
  return dispatch => {
    API.getPosts().then(response => {
      dispatch({ type: FETCH_POSTS, posts: response.data })
    })
  }
}
