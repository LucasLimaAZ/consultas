import React from 'react'
import auth from '../../auth'
import { Container, Row, Col, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHospitalAlt } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

const Login = props => {

    const handleCallBack = () => {
        auth.login(() => {
            props.history.push("/")
        })
    }

    return(
        <Container>
            <Row>
                <Col className="form-background" md={{size: 6, offset: 3}}>
                    <form>
                        <h2><FontAwesomeIcon icon={faHospitalAlt} /> Acessar</h2>
                        <input type="text" className="form-control" name="user" />
                        <input type="password" className="form-control" name="password" />
                        <Button onClick={handleCallBack} className="login-button">Acessar</Button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login