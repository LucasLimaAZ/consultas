import axios from "axios"
import react, { Component } from "react"

const baseUrl = "https://breakingbadapi.com/api"

export default class http extends Component{

    get = endpoint => {
        axios.get(baseUrl + endpoint)
            .then(response => {
                const data = response.data
                return data
            })
    }

    post = (endpoint, postData) => {
        axios.post(baseUrl + endpoint, postData)
            .then(response => {
                const data = response.data
                return data
            })
    }

}