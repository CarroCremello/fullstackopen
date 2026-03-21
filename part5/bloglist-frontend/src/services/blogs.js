import axios from 'axios'
const baseUrl = '/api/blogs'

const setToken = newToken => {
  return `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, setToken }