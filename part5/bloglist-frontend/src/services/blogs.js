import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = newToken => {
  token = `Bearer ${newToken}`
  return token
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

export default { setToken, getAll, add }