import axios from 'axios'

const api = axios.create({ 
    baseURL: 'https://appointments12.herokuapp.com/api/' 

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
