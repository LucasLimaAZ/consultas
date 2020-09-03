import api from './api'

const fetchAll = () => api.get('/appointments')
const store = body => api.post('/appointments', body)
const deleteAppointment = id => api.delete(`/appointments/${id}`)

export default {
    fetchAll,
    deleteAppointment,
    store
}