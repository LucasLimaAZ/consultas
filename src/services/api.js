import axios from "axios"

const baseUrl = "http://127.0.0.1/api"

export const get = endpoint => {
    axios.get(baseUrl + endpoint)
    .then(response => {
        const data = response.data
        return data
    })
}

export const post = (endpoint, postData) => {
    axtios.post(baseUrl + endpoint, postData)
    .then(response => {
        const data = response.data
        return data
    })
}
