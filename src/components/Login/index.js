import React, { useState } from 'react'
import auth from '../../auth'
import { Container, Row, Col, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHospitalAlt } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-loader-spinner'
import './style.scss'

const Login = props => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [incorrectMessage, setIncorrectMessage] = useState(false)
    const [loader, setLoader] = useState(false)

    const handleLogin = e => {
        setLoader(true)
        e.preventDefault()
        
        let data = {email: email, password: password}

        auth.login(data, 
            () => props.history.push("/"), 
            () => {
                setIncorrectMessage(true)
                setLoader(false)
            }
        )
    }

    return(
        <Container>
            <Row>
                <Col className="form-background" md={{size: 6, offset: 3}}>
                    <form onSubmit={handleLogin}>
                        <h2><FontAwesomeIcon icon={faHospitalAlt} /> Acessar</h2>
                        <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" name="user" required />
                        <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" name="password" required />
                        { loader ? <Loader type="TailSpin" color="#ffffff" height={40} width={40} /> : "" }
                        { incorrectMessage ? <p>Usuário ou senha incorretos</p> : "" }
                        <Button className="login-button">Acessar</Button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login