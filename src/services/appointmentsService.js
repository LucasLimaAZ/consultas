import api from './api'

const fetchAll = page => api.get(`/appointments?page=${page}`)
const store = body => api.post('/appointments', body)
const deleteAppointment = id => api.delete(`/appointments/${id}`)
const update = body => api.put(`/appointments/${body.id}`, body)
const fetchMade = () => api.get(`/made-appointments`)
const fetchTodays = () => api.get(`/todays-appointments`)

export default {
    fetchAll,
    deleteAppointment,
    store,
    update,
    fetchMade,
    fetchTodays
}