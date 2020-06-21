import api from './api'

const fetchAll = () => api.get('/states')

export default {
    fetchAll
}