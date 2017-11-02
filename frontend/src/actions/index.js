import * as API from '../API'
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POSTS = 'FETCH_POSTS'
export const ADD_POST = 'ADD_POST'

export const fetchCategories = () => {
  return dispatch => {
    API.getCategories().then(response => {
      dispatch({ type: FETCH_CATEGORIES, categories: response.data.categories })
    })
  }
}

export const fetchPosts = (category = '') => {
  return dispatch => {
    API.getPosts(category).then(response => {
      dispatch({ type: FETCH_POSTS, posts: response.data })
    })
  }
}

export const addPost = (post) => {
  if (post) {
    return dispatch => {
      API.addPost(post).then(response => {
        dispatch({ type: ADD_POST, post: response.data })
      })
    }
  }
}
