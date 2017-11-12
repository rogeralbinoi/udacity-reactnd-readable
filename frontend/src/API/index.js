import axios from 'axios'
import uuidv1 from 'uuid/v1'
const baseURL = 'http://localhost:3001'
const config = {
  headers: { Authorization: 'whatever-you-want' }
}

export const getCategories = () => {
  return axios.get(`${baseURL}/categories`, config).catch(function (error) {
    console.log(error)
  })
}

export const getPosts = (category = '') => {
  return axios
    .get(`${baseURL}${category ? `/${category}` : ''}/posts`, config)
    .catch(function (error) {
      console.log(error)
    })
}

export const getPost = postId => {
  return axios.get(`${baseURL}/posts/${postId}`, config).catch(function (error) {
    console.log(error)
  })
}

export const getComments = postId => {
  return axios.get(`${baseURL}/posts/${postId}/comments`, config).catch(function (error) {
    console.log(error)
  })
}

export const votePost = ({ postId, vote }) => {
  const option = vote === 'upVote' || vote === 'downVote' ? vote : ''
  return axios
    .post(`${baseURL}/posts/${postId}`, { option }, config)
    .catch(function (error) {
      console.log(error)
    })
}

export const voteComment = ({ id, vote }) => {
  const option = vote === 'upVote' || vote === 'downVote' ? vote : ''
  return axios
    .post(`${baseURL}/comments/${id}`, { option }, config)
    .catch(function (error) {
      console.log(error)
    })
}

export const deleteComment = ({ id }) => {
  return axios
    .delete(`${baseURL}/comments/${id}`, config)
    .catch(function (error) {
      console.log(error)
    })
}

export const editPost = data => {
  const { title = '', body = '', id = '' } = data || {}
  if (!title) delete data.title
  if (!body) delete data.body
  delete data.id
  return axios
    .put(`${baseURL}/posts/${id}`, data, config)
    .catch(function (error) {
      console.log(error)
    })
}

export const editComment = ({ id = '', body = '' }) => {
  const data = {}
  data.body = body
  data.timestamp = Date.now()
  return axios
    .put(`${baseURL}/comments/${id}`, data, config)
    .catch(function (error) {
      console.log(error)
    })
}


export const deletePost = ({ postId }) => {
  return axios
    .delete(`${baseURL}/posts/${postId}`, config)
    .catch(function (error) {
      console.log(error)
    })
}

export const addPost = ({ title, body, author, category }) => {
  const timestamp = Date.now()
  const id = uuidv1()

  const data = { id, timestamp, title, body, author, category }

  return axios.post(`${baseURL}/posts`, data, config).catch(function (error) {
    console.log(error)
  })
}

export const addComment = ({ body, author, parentId }) => {
  const timestamp = Date.now()
  const id = uuidv1()

  const data = { id, timestamp, body, author, parentId }

  return axios.post(`${baseURL}/comments`, data, config).catch(function (error) {
    console.log(error)
  })
}
