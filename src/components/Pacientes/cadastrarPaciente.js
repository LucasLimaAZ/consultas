import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Button } from 'reactstrap';

const CadastrarPaciente = props => {
    return(
        <Container>
            <Row>
                <Col md={{size: 10, offset: 1}}>
                    <div className="box">
                        <h1 className="title">
                            <FontAwesomeIcon icon={faUserPlus} className="mr-2"/>
                            Cadastrar paciente
                        </h1>
                        <form>
                            <Row>
                                <Col md={4}>
                                    <label for="nome">Nome: </label>
                                    <input type="text" id="nome" className="form-control input" />
                                </Col>
                                <Col md={4}>
                                    <label for="idade">Idade: </label>
                                    <input type="number" id="idade" className="form-control input" />
                                </Col>
                                <Col md={4}>
                                    <label for="telefone-fixo">Telefone Fixo: </label>                                    
                                    <input type="text" id="telefone-fixo" className="form-control input" placeholder="DDD + número"/>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '32px'}}>
                                <Col md={4}>
                                    <label for="celular">Celular: </label>
                                    <input type="text" id="celular" className="form-control input" placeholder="DDD + número"/>
                                </Col>
                                <Col md={4}>
                                    <label for="data-nascimento">Data de Nascimento: </label>
                                    <input type="date" id="data-nascimento" className="form-control input" placeholder="Data de Nascimento" />
                                </Col>
                            </Row>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default CadastrarPaciente;