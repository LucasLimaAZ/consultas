import api from './api'

const fetchAll = () => api.get('/attachements')
const upload = files => api.post('/attachements/upload', files)
const deleteFile = id => api.delete(`/attachements/${id}`)
const fetchByPatient = patient => api.get(`/attachements/patients/${patient}`)

const attach = (patient, files) => {
    files.forEach(file => {
        api.post(`attachements/${file.id}/patients/${patient}`)
    })
}

export default {
    fetchAll,
    upload,
    deleteFile,
    attach,
    fetchByPatient
}