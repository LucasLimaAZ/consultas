import api from './api'

const fetchAll = () => api.get('/patients?page=-1')
const fetch = page => api.get(`/patients?page=${page}`)
const find = id => api.get(`/patients/${id}`)
const store = body => api.post('/patients', body)
const deletePatient = id => api.delete(`/patients/${id}`)
const fetchAppointments = patient => api.get(`/appointments/${patient}`)

export default { 
    fetchAll,
    fetch,
    find,
    fetchAppointments,
    deletePatient,
    store
}