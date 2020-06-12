import api from './api'

const fetchAll = () => api.get('/patients')

export default {
    fetchAll
}