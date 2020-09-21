import api from './api'

const fetchAll = () => api.get('/attachements')
const upload = files => api.post('/attachements/upload', files)
const deleteFile = id => api.delete(`/attachements/${id}`)

export default {
    fetchAll,
    upload,
    deleteFile
}