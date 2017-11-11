import * as API from '../API'
import sortBy from 'sort-by'
import uuidv1 from 'uuid/v1'
export const FETCH_POSTS = 'FETCH_POSTS'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const FETCH_POST = 'FETCH_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES'
export const NEW_MESSAGE = 'NEW_MESSAGE'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

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

export const editComment = (comment, history) => {
  return dispatch => {
    API.editComment(comment).then(response => {
      dispatch({ type: EDIT_COMMENT, comment: response.data })
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

export const fetchComments = postId => {
  if (postId) {
    return dispatch => {
      API.getComments(postId).then(response => {
        dispatch({ type: FETCH_COMMENTS, comments: (response.data || []).sort(sortBy('-voteScore')) })
      })
    }
  }
}

export const addComment = data => {
  return dispatch => {
    API.addComment(data).then(response => {
      dispatch({ type: ADD_COMMENT, comment: response.data })
    })
  }
}

export const voteComment = ({ id, vote }) => {
  return dispatch => {
    API.voteComment({ id, vote }).then(response => {
      dispatch({ type: VOTE_COMMENT, comment: response.data })
    })
  }
}

export const votePost = ({ postId, vote }) => {
  return dispatch => {
    API.votePost({ postId, vote }).then(response => {
      dispatch({ type: VOTE_POST, post: response.data })
    })
  }
}

export const deleteComment = ({ id }) => {
  return dispatch => {
    API.deleteComment({ id }).then(response => {
      dispatch({ type: DELETE_COMMENT, comment: response.data })
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