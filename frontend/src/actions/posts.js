import * as API from '../API'
import sortBy from 'sort-by'
import uuidv1 from 'uuid/v1'
import { NEW_MESSAGE, REMOVE_MESSAGE } from './messages'
export const FETCH_POSTS = 'FETCH_POSTS'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const FETCH_POST = 'FETCH_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export const fetchPosts = (category = '') => {
  return dispatch => {
    API.getPosts(category).then(response => {
      dispatch({ type: FETCH_POSTS, posts: response.data })
    })
  }
}

export const fetchPost = postId => {
  if (postId) {
    return dispatch => {
      API.getPost(postId).then(response => {
        dispatch({ type: FETCH_POST, post: response.data })
      })
    }
  }
}

export const votePost = ({ postId, vote }) => {
  return dispatch => {
    API.votePost({ postId, vote }).then(response => {
      dispatch({ type: VOTE_POST, post: response.data })
    })
  }
}

export const deletePost = ({ postId, history, category }) => {
  return dispatch => {
    API.deletePost({ postId }).then(response => {
      dispatch({ type: DELETE_POST, post: response })
      history.push(`/${category}`)
      const messageId = uuidv1()
      dispatch({
        type: NEW_MESSAGE, message: [
          {
            id: messageId,
            title: 'Post has been deleted successfully!',
            warning: true,
          }
        ]
      })
      setTimeout(() => {
        dispatch({
          type: REMOVE_MESSAGE, message: { id: messageId }
        })
      }, 10000)
    })
  }
}

export const addPost = (post, history) => {
  if (post) {
    return dispatch => {
      API.addPost(post).then(response => {
        dispatch({ type: ADD_POST, post: response.data })
        const messageId = uuidv1()
        dispatch({
          type: NEW_MESSAGE, message: [
            {
              id: messageId,
              title: 'Post has been created successfully!',
              positive: true,
            }
          ]
        })
        setTimeout(() => {
          dispatch({
            type: REMOVE_MESSAGE, message: { id: messageId }
          })
        }, 10000)
        history.push(`/${response.data.category}/${response.data.id}`)
      })
    }
  }
}

export const editPost = (post, id, history) => {
  if (post) {
    post.id = id
    return dispatch => {
      API.editPost(post).then(response => {
        dispatch({ type: EDIT_POST, post: response.data })
        const messageId = uuidv1()
        dispatch({
          type: NEW_MESSAGE, message: [
            {
              id: messageId,
              title: 'Post has been edited successfully!',
              positive: true,
            }
          ]
        })
        setTimeout(() => {
          dispatch({
            type: REMOVE_MESSAGE, message: { id: messageId }
          })
        }, 10000)
        history.push(`/${response.data.category}/${response.data.id}`)
      })
    }
  }
}
