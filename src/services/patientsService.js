import api from './api'

const fetchAll = () => api.get('/patients')
const deletePatient = id => api.delete(`/patients/${id}`)

export default {
    fetchAll,
    deletePatient
}