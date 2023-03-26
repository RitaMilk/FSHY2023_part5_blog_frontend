import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

/* const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
} */

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  //const request = axios.get(baseUrl)
  //return request.then(response => response.data)
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = newObject => {
  console.log('create')
  const config = {
    headers: { Authorization: token },
  }
  return axios.post(baseUrl, newObject,config)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { 
  getAll,
  create,
  setToken  }