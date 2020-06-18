import React, { useEffect, useState } from 'react'
import './style.scss'
import { Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { cpfMask, currencyMask } from '../Mask/index'
import patientsService from "../../services/patientsService"
import Swal from "sweetalert2"

const StorePatients = props => {

    const [cpf, setCpf] = useState("")
    const [currency, setCurrency] = useState("")
    const [dateColor, setDateColor] = useState("form-control input nascimento")
    const [body, setBody] = useState({})

    useEffect(() => {
        props.setPageTitle("Cadastrar Paciente")
    })

    const handleCpf = e => {
        setCpf(cpfMask(e.target.value))
        
        let value = e.target.value
        let name = e.target.name

        setBody({
            ...body,
            [name]: value
        })
    }

    const handleCurrency = e => {
        setCurrency(currencyMask(e.target.value))
    }

    const handleDateChage = e => {
        let value = e.target.value
        let name = e.target.name

        setBody({
            ...body,
            [name]: value
        })

        setDateColor("form-control input")
    }

    const handleChangeBody = e => {
        let value = e.target.value
        let name = e.target.name

        setBody({
            ...body,
            [name]: value
        })
    }

    const handleChangeUser = e => {
        let value = e.target.value
        let name = e.target.name

        setBody({
            ...body,
            user: {
                ...body.user,
                name: body.name,
                [name]: value
            }
        })
    }

    const handleChangeAddress = e => {
        let value = e.target.value
        let name = e.target.name

        setBody({
            ...body,
            address: {
                ...body.address,
                [name]: value
            }
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        console.log(body)
        patientsService.store(body)
        .then(res => {
            console.log(res)
            Swal.fire({
                title: "Paciente cadastrado com sucesso!",
                icon: "success",
                confirmButtonColor: "#1492A5"
            })
        })
        .catch(err => {
            console.log(err)
            Swal.fire({
                title: "Ocorreu um erro.",
                text: "Por favor tente novamente mais tarde",
                icon: "warning",
                confirmButtonColor: "#1492A5"
            })
        })
    }

    return(
        <form onSubmit={handleFormSubmit}>
        <Row>
            <Col md={{size: 6}}>
                <div className="box">
                    <h1 className="subtitle">
                        Dados do paciente
                    </h1>
                    <Row>
                        <Col md={8}>
                            <label htmlFor="name">Nome: </label>
                            <input onChange={handleChangeBody} type="text" name="name" placeholder="Nome completo" className="form-control input" />
                        </Col>
                        <Col md={4}>
                            <label htmlFor="telephone">Telefone Fixo: </label>                                    
                            <input onChange={handleChangeBody} type="text" name="telephone" className="form-control input" placeholder="DDD + número"/>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '32px'}}>
                        <Col md={4}>
                            <label htmlFor="phone">Celular: </label>
                            <input onChange={handleChangeBody} type="text" name="phone" className="form-control input" placeholder="DDD + número"/>
                        </Col>
                        <Col md={4}>
                            <label htmlFor="cpf">CPF: </label>
                            <input 
                                type="text" 
                                name="cpf" 
                                className="form-control input"
                                onChange={handleCpf} 
                                maxLength="14" 
                                placeholder="___.___.___-__" 
                                value={cpf}
                            />
                        </Col>
                        <Col md={4}>
                            <label htmlFor="rg">RG: </label>
                            <input onChange={handleChangeBody} type="text" name="rg" className="form-control input"/>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '32px', marginBottom: '32px'}}>
                        <Col md={6}>
                            <label htmlFor="birthday">Data de Nascimento: </label>
                            <input 
                                type="date" 
                                name="birthday" 
                                className={dateColor}
                                placeholder="Data de Nascimento" 
                                onChange={handleDateChage}
                                onKeyDown={handleDateChage}
                            />
                        </Col>
                        <Col md={6}>
                            Gênero
                            <div className="genders">
                                <label>
                                    <input type="radio" className="option-input radio" name="genders" defaultChecked />
                                    Masculino
                                </label>
                                <br />
                                <label>
                                    <input type="radio" className="option-input radio" name="genders" />
                                    Feminino
                                </label>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col md={{size: 6}}>
                <div className="box">
                    <h1 className="subtitle">
                        Endereço
                    </h1>
                    <Row>
                        <Col md={6}>
                            <label htmlFor="street">Logradouro: </label>
                            <input onChange={handleChangeAddress} type="text" name="street" className="form-control input" placeholder="Rua, AV, etc..." />
                        </Col>
                        <Col md={6}>
                            <label htmlFor="numero">Número: </label>
                            <input onChange={handleChangeAddress} type="number" name="number" className="form-control input" />
                        </Col>
                    </Row>
                    <Row style={{marginTop: '32px', marginBottom: '32px'}}>
                        <Col md={6}>
                            <label htmlFor="neighborhood">Bairro: </label>                                    
                            <input type="text" name="neighborhood" className="form-control input"/>
                        </Col>
                        <Col md={6}>
                            <label htmlFor="cep">CEP: </label>
                            <input onChange={handleChangeAddress} type="text" name="cep" className="form-control input" />
                        </Col>
                    </Row>
                    <Row style={{marginBottom: '32px'}}>
                        <Col md={6}>
                            <label htmlFor="city_id">Municipio: </label>
                            <select onChange={handleChangeAddress} name="city_id" className="form-control input">
                                <option value="1">Novo Hamburgo</option>
                                <option value="2">São Leopoldo</option>
                                <option value="3">Sapucaia</option>
                                <option value="4">Esteio</option>
                                <option value="5">Canoas</option>
                                <option value="6">Porto Alegre</option>
                            </select>
                        </Col>
                        <Col md={6}>
                            <label htmlFor="state">UF: </label>                                    
                            <select name="state" className="form-control input">
                                <option value="ACRE">ACRE</option>
                                <option value="ALAGOAS">ALAGOAS</option>
                                <option value="AMAPÁ">AMAPÁ</option>
                                <option value="AMAZONAS">AMAZONAS</option>
                                <option value="BAHIA">BAHIA</option>
                                <option value="CEARÁ">CEARÁ</option>
                                <option value="DISTRITO FEDERAL">DISTRITO FEDERAL</option>
                                <option value="ESPÍRITO SANTO">ESPÍRITO SANTO</option>
                                <option value="GOIÁS">GOIÁS</option>
                                <option value="MARANHÃO">MARANHÃO</option>
                                <option value="MATO GROSSO">MATO GROSSO</option>
                                <option value="MATO GROSSO DO SUL">MATO GROSSO DO SUL</option>
                                <option value="MINAS GERAIS">MINAS GERAIS</option>
                                <option value="PARÁ">PARÁ</option>
                                <option value="PARAÍBA">PARAÍBA</option>
                                <option value="PARANÁ">PARANÁ</option>
                                <option value="PERNAMBUCO">PERNAMBUCO</option>
                                <option value="PIAUÍ">PIAUÍ</option>
                                <option value="RIO DE JANEIRO">RIO DE JANEIRO</option>
                                <option value="RIO GRANDE DO NORTE">RIO GRANDE DO NORTE</option>
                                <option value="RIO GRANDE DO SUL">RIO GRANDE DO SUL</option>
                                <option value="RONDÔNIA">RONDÔNIA</option>
                                <option value="RORAIMA">RORAIMA</option>
                                <option value="SANTA CATARINA">SANTA CATARINA</option>
                                <option value="SÃO PAULO">SÃO PAULO</option>
                                <option value="SERGIPE">SERGIPE</option>
                                <option value="TOCANTINS">TOCANTINS</option>
                            </select>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
        <Row style={{marginTop: '32px', marginBottom: '32px'}}>
            <Col md={12}>
                <div className="box">
                    <h1 className="subtitle">
                        Informações adicionais
                    </h1>
                    <Row>
                        <Col md={6}>
                            <label htmlFor="emergency_contact">Contato de Emergência: </label>                                    
                            <input type="text" name="emergency_contact" className="form-control input" placeholder="DDD + número" />
                        </Col>
                        <Col md={6}>
                            <label htmlFor="emergency_name">Nome: </label>
                            <input type="text" name="emergency_name" className="form-control input" placeholder="Nome completo" />                               
                        </Col>
                    </Row>
                    <Row style={{marginTop: '32px', marginBottom: '32px'}}>
                        <Col md={12}>
                            <label htmlFor="observation">Observação: </label>                                    
                            <textarea className="form-control input" name="observation"></textarea>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
        <Row style={{marginTop: '32px', marginBottom: '32px'}}>
            <Col md={12}>
                <div className="box">
                    <h1 className="subtitle">
                        Valor da Sessão
                    </h1>
                    <Row style={{marginBottom: '32px'}}>
                        <Col md={6}>
                            <label htmlFor="value">Valor: </label>                                    
                            <input type="text" onChange={handleChangeUser} className="form-control input" name="value" />
                        </Col>
                        <Col md={6}>
                            Deseja recibo?
                            <div className="receipt">
                                <label>
                                    <input type="radio" className="option-input radio" name="receipt" defaultChecked />
                                    Sim
                                </label>
                                <br />
                                <label>
                                    <input type="radio" className="option-input radio" name="receipt" />
                                    Não
                                </label>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
        <Row style={{marginTop: '32px', marginBottom: '32px'}}>
            <Col md={12}>
                <div className="box">
                    <h1 className="subtitle">
                        Dados de Acesso ao Sistema
                    </h1>
                    <Row>
                        <Col md={4}>
                            <label htmlFor="email">Email: </label>                                    
                            <input onChange={handleChangeUser} type="email" className="form-control input" name="email" />
                        </Col>
                        <Col md={4}>
                            <label htmlFor="password">Senha: </label>                                    
                            <input onChange={handleChangeUser} type="password" className="form-control input" name="password" />
                        </Col>
                        <Col md={4}>
                            <label htmlFor="password_confirmation">Repetir Senha: </label>                                    
                            <input onChange={handleChangeUser} type="password" className="form-control input" name="password_confirmation" />
                        </Col>
                    </Row>
                    <Row style={{marginTop: '32px', marginBottom: '32px'}}>
                        <Col md={4}>
                            <label htmlFor="role">Hierarquia: </label>                                    
                            <select className="form-control input" name="role">
                                <option>Teste 1</option>
                                <option>Teste 2</option>
                                <option>Teste 3</option>
                            </select>
                        </Col>
                        <Col md={4}>
                            Cadastro ativo?
                            <div className="active">
                                <label>
                                    <input type="radio" className="option-input radio" name="active" defaultChecked />
                                    Sim
                                </label>
                                <br />
                                <label>
                                    <input type="radio" className="option-input radio" name="active" />
                                    Não
                                </label>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
        <Row style={{marginBottom: '100px'}}>
            <Col md={12}>
                <div className="box">
                    <h1 className="subtitle">Salvar dados</h1>
                    <Button type="submit">Salvar</Button>
                </div>
            </Col>
        </Row>
        </form>
    )
}

const mapDispatchToProps = dispatch => ({
   setPageTitle: title => dispatch(actions.setPageTitle(title))
})

export default connect(null, mapDispatchToProps)(StorePatients)