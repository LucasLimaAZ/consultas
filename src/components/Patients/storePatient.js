import React, { useEffect, useState } from 'react'
import './style.scss'
import { Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { cpfMask, currencyMask } from '../Mask/index'
import patientsService from "../../services/patientsService"
import statesService from "../../services/statesService"
import Swal from "sweetalert2"
import axios from "axios"

const StorePatients = props => {

    const [cpf, setCpf] = useState("")
    const [isCepValid, setIsCepValid] = useState(false)
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

    const handleChangeCep = e => {
        let cep = e.target.value

        if(cep.length === 8)
            axios.get(`https://viacep.com.br/ws/${cep}/json`)
            .then(res => {
                if(!res.data.erro){
                    setIsCepValid(true)
                    document.querySelector("#street").value = res.data.logradouro
                    document.querySelector("#neighborhood").value = res.data.bairro
                    document.querySelector("#state").value = res.data.uf
                    document.querySelector("#city").value = res.data.localidade
                    setBody({
                        ...body,
                        address: {
                            ...body.address,
                            city: res.data.localidade,
                            cep: cep,
                            street: res.data.logradouro,
                            state: res.data.uf,
                            neighborhood: res.data.bairro
                        }
                    })
                }
                else{
                    setIsCepValid(false)
                }
            })
            .catch(err => console.log("Um erro ocorreu ao buscar o CEP: ", err))
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
                            <input 
                                onChange={handleChangeBody} 
                                type="text" 
                                name="name" 
                                placeholder="Nome completo" 
                                className="form-control input" 
                            />
                        </Col>
                        <Col md={4}>
                            <label htmlFor="telephone">Telefone Fixo: </label>                                    
                            <input
                                onChange={handleChangeBody} 
                                type="text" 
                                name="telephone" 
                                className="form-control input" 
                                placeholder="DDD + número"
                            />
                        </Col>
                    </Row>
                    <Row style={{marginTop: '32px'}}>
                        <Col md={4}>
                            <label htmlFor="phone">Celular: </label>
                            <input 
                                onChange={handleChangeBody} 
                                type="text" 
                                name="phone" 
                                className="form-control input" 
                                placeholder="DDD + número"
                            />
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
                            <input 
                                onChange={handleChangeBody} 
                                type="text" 
                                name="rg" 
                                className="form-control input"
                            />
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
                                    <input 
                                        type="radio" 
                                        className="option-input radio" 
                                        name="genders" 
                                        defaultChecked 
                                    />
                                    Masculino
                                </label>
                                <br />
                                <label>
                                    <input type="radio" 
                                        className="option-input radio" 
                                        name="genders" 
                                    />
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
                            <label htmlFor="cep">CEP: </label>
                            <input 
                                maxLength="8" 
                                onChange={handleChangeCep} 
                                type="text" 
                                name="cep" 
                                className="form-control input" 
                            />
                        </Col>
                        <Col md={6}>
                            <label htmlFor="street">Logradouro: </label>
                            <input 
                                onChange={handleChangeAddress} 
                                id="street" 
                                type="text" 
                                name="street" 
                                className="form-control input" 
                                placeholder="Rua, AV, etc..." 
                                disabled={isCepValid}
                            />
                        </Col>
                    </Row>
                    <Row style={{marginTop: '32px', marginBottom: '32px'}}>
                        <Col md={6}>
                            <label htmlFor="numero">Número: </label>
                            <input 
                                onChange={handleChangeAddress} 
                                id="number" 
                                type="number" 
                                name="number" 
                                className="form-control input" 
                            />
                        </Col>
                        <Col md={6}>
                            <label htmlFor="neighborhood">Bairro: </label>                                    
                            <input 
                                id="neighborhood" 
                                type="text" 
                                name="neighborhood" 
                                className="form-control input"
                                disabled={isCepValid}
                            />
                        </Col>
                    </Row>
                    <Row style={{marginBottom: '32px'}}>
                        <Col md={6}>
                            <label htmlFor="state">UF: </label>                                    
                            <select 
                                name="state" 
                                id="state" 
                                className="form-control input"
                                disabled={isCepValid}
                            >
                                <option value="AC">AC</option>
                                <option value="AL">AL</option>
                                <option value="AP">AP</option>
                                <option value="AM">AM</option>
                                <option value="BA">BA</option>
                                <option value="CE">CE</option>
                                <option value="DF">DF</option>
                                <option value="ES">ES</option>
                                <option value="GO">GO</option>
                                <option value="MA">MA</option>
                                <option value="MT">MT</option>
                                <option value="MS">MS</option>
                                <option value="MG">MG</option>
                                <option value="PA">PA</option>
                                <option value="PB">PB</option>
                                <option value="PR">PR</option>
                                <option value="PE">PE</option>
                                <option value="PI">PI</option>
                                <option value="RJ">RJ</option>
                                <option value="RN">RN</option>
                                <option value="RS">RS</option>
                                <option value="RO">RO</option>
                                <option value="RR">RR</option>
                                <option value="SC">SC</option>
                                <option value="SP">SP</option>
                                <option value="SE">SE</option>
                                <option value="TO">TO</option>
                            </select>
                        </Col>
                        <Col md={6}>
                            <label htmlFor="city">Municipio: </label>
                            <input 
                                type="text" 
                                onChange={handleChangeAddress} 
                                name="city" 
                                id="city" 
                                className="form-control input"
                                disabled={isCepValid} 
                            />
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
                            <input 
                                type="text"
                                name="emergency_contact" 
                                className="form-control input" 
                                placeholder="DDD + número" 
                            />
                        </Col>
                        <Col md={6}>
                            <label htmlFor="emergency_name">Nome: </label>
                            <input 
                                type="text" 
                                name="emergency_name" 
                                className="form-control input" 
                                placeholder="Nome completo" 
                            />                               
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
                            <input 
                                type="text"
                                onChange={handleChangeUser} 
                                className="form-control input" 
                                name="value" 
                            />
                        </Col>
                        <Col md={6}>
                            Deseja recibo?
                            <div className="receipt">
                                <label>
                                    <input 
                                        type="radio" 
                                        className="option-input radio" 
                                        name="receipt" 
                                        defaultChecked 
                                    />
                                    Sim
                                </label>
                                <br />
                                <label>
                                    <input 
                                        type="radio" 
                                        className="option-input radio" 
                                        name="receipt" 
                                    />
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
                            <input 
                                onChange={handleChangeUser} 
                                type="email" 
                                className="form-control input" 
                                name="email" 
                            />
                        </Col>
                        <Col md={4}>
                            <label htmlFor="password">Senha: </label>                                    
                            <input 
                                onChange={handleChangeUser} 
                                type="password" 
                                className="form-control input" 
                                name="password" 
                            />
                        </Col>
                        <Col md={4}>
                            <label htmlFor="password_confirmation">Repetir Senha: </label>                                    
                            <input 
                                onChange={handleChangeUser} 
                                type="password" 
                                className="form-control input" 
                                name="password_confirmation" 
                            />
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
                                    <input 
                                        type="radio" 
                                        className="option-input radio" 
                                        name="active" 
                                        defaultChecked 
                                    />
                                    Sim
                                </label>
                                <br />
                                <label>
                                    <input 
                                        type="radio" 
                                        className="option-input radio" 
                                        name="active" 
                                    />
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