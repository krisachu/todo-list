import axios from 'axios'
const baseUrl = 'http://localhost:3001/tasks'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (taskObject) => {
    const request = axios.post(baseUrl, taskObject)
    return request.then(response => response.data)
}

const remove = (id) => { 
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, changedTask) => {
    const request = axios.put(`${baseUrl}/${id}`, changedTask)
    return request.then(response => response.data)
}

const update2 = (id, taskFound) => {
    const request = axios.put(`${baseUrl}/${id}`, taskFound)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update, update2 }