import api from './api'

const fetchAll = () => api.get('/attachements')
const upload = files => api.post('/attachements/upload', files)
const deleteFile = id => api.delete(`/attachements/${id}`)
const attach = (file, patient) => api.post(`/${file}/patients/${patient}`)

export default {
    fetchAll,
    upload,
    deleteFile,
    attach
}