import api from './api'

const fetchAll = () => api.get('/patients')
const store = body => api.post('/patients', body)
const deletePatient = id => api.delete(`/patients/${id}`)

export default {
    fetchAll,
    deletePatient,
    store
}