import axios from 'axios'

const api = axios.create({ 
    baseURL: 'http://127.0.0.1:8000/api' 

})

api.interceptors.request.use(
    request => {
        request.headers = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': "Bearer " + localStorage.getItem('access_token'),
        }
      return request
    },
    error => error
)

export default api
