import * as API from '../API'
import sortBy from 'sort-by'
import uuidv1 from 'uuid/v1'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const editComment = (comment, history) => {
  return dispatch => {
    API.editComment(comment).then(response => {
      dispatch({ type: EDIT_COMMENT, comment: response.data })
    })
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



export const deleteComment = ({ id }) => {
  return dispatch => {
    API.deleteComment({ id }).then(response => {
      dispatch({ type: DELETE_COMMENT, comment: response.data })
    })
  }
}
