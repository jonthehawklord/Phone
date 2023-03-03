import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
	console.log('in getAll')
  const request = axios.get(baseUrl)
  const zzz = request.then(response => response.data)
  console.log(zzz)
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

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}


export default { getAll, create, update, remove }