import axios from 'axios'
let baseUrl
import.meta.env.DEV ? baseUrl = 'http://localhost:3001/api/persons' : baseUrl = '/api/persons'

console.log("baseUrl:", baseUrl);  

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
    console.log('remove id', id)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, remove }