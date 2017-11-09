import * as API from '../API'
import sortBy from 'sort-by'
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POSTS = 'FETCH_POSTS'
export const ADD_POST = 'ADD_POST'
export const FETCH_POST = 'FETCH_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const VOTE_POST = 'VOTE_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_POST = 'DELETE_POST'
export const NEW_MESSAGE = 'NEW_MESSAGE'
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES'

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
        dispatch({
          type: NEW_MESSAGE, message: [
            {
              title: 'Post has been created successfully!',
              positive: true,
            }
          ]
        })
        history.push(`/${response.data.category}/${response.data.id}`)
      })
    }
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
    dispatch({
      type: CLEAR_MESSAGES
    })
    API.deletePost({ postId }).then(response => {
      dispatch({ type: DELETE_POST, post: response })
      history.push(`/${category}`)
      dispatch({
        type: NEW_MESSAGE, message: [
          {
            title: 'Post has been deleted successfully!',
            warning: true,
          }
        ]
      })
    })
  }
}