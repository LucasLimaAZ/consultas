import api from './api'

const fetch = cep => api.get(`https://viacep.com.br/ws/${cep}/json`)

export default {
    fetch
}