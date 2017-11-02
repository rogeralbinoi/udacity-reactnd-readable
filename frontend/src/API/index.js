import axios from 'axios'
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
  if (!postId) return
  return axios.get(`${baseURL}/posts/${postId}`, config).catch(function (error) {
    console.log(error)
  })
}

export const votePost = ({ postId, vote }) => {
  const option = vote === 'upVote' || vote === 'downVote' ? vote : ''
  if (!postId || !option) return

  return axios
    .post(`${baseURL}/posts/${postId}`, { option }, config)
    .catch(function (error) {
      console.log(error)
    })
}

export const editPost = data => {
  const { title = '', body = '', id = '' } = data || {}
  if (!id || (!title && !body)) return
  if (!title) delete data.title
  if (!body) delete data.body
  delete data.id
  return axios
    .put(`${baseURL}/posts/${id}`, data, config)
    .catch(function (error) {
      console.log(error)
    })
}

export const deletePost = postId => {
  if (!postId) return

  return axios
    .delete(`${baseURL}/posts/${postId}`, config)
    .catch(function (error) {
      console.log(error)
    })
}

export const addPost = ({ title, body, author, category }) => {
  const timestamp = Date.now()
  const id = Math.random()
    .toString(36)
    .substr(2, 10)

  const data = { id, timestamp, title, body, author, category }

  return axios.post(`${baseURL}/posts`, data, config).catch(function (error) {
    console.log(error)
  })
}
