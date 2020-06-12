import api from './services/api'

class Auth{
    constructor(props){
        this.authenticated = true
    }

    login(data, callBack, elseCallBack){

        api.post('/auth/login', data)
            .then(response => {
                if(response.status === 200){
                    localStorage.setItem("access_token", response.data.access_token)
                    this.authenticated = true
                    
                    callBack()
                }
                else{
                    this.authenticated = false
                    elseCallBack()
                }
            })
            .catch(err => {
                this.authenticated = false
                elseCallBack()
                console.log(err)
            })

    }

    logout(callBack){
        this.authenticated = false
        callBack()
    }

    isAuthenticated(){
        return this.authenticated
    }
}

export default new Auth()