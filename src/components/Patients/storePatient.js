import React, { useEffect, useState } from 'react'
import './style.scss'
import { Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { cpfMask, phoneMask, currencyMask } from '../Mask/index'
import patientsService from "../../services/patientsService"
import Swal from "sweetalert2"
import axios from "axios"

const StorePatients = props => {

    const [cpf, setCpf] = useState("")
    const [cep, setCep] = useState("")
    const [foreign, setForeign] = useState(false)
    const [emergencyContact, setEmergencyContact] = useState("")
    const [value, setValue] = useState("R$ 0,00")
    const [phone, setPhone] = useState("")
    const [mobilephone, setMobilephone] = useState("")
    const [isCepValid, setIsCepValid] = useState(false)
    const [dateColor, setDateColor] = useState("form-control input nascimento")
    const [body, setBody] = useState({address: {state: "AC"}, user: {role_id: 1, gender_id: 1}})

    useEffect(() => {
        props.setPageTitle(
            props.location.state ?
            "Atualizar Paciente" :
            "Cadastrar Paciente"
        )

        if (props.location.state) {
            props.fetchPatientInfo(props.location.state.id)
            console.log("patient ==> ", props.patient)
            setBody(props.location.state)
            setPhone(props.location.state.telephone)
            setMobilephone(props.location.state.phone)
            setCpf(props.location.state.cpf)
        }
    },[props.patient])

    const handleCpf = e => {
        setCpf(cpfMask(e.target.value))

        let value = e.target.value
        let name = e.target.name

        setBody({
            ...body,
            [name]: value
        })
    }

    const handleVerifyPasswords = () => {
        return body.user.password === body.user.password_confirmation
    }

    const handleChangeCep = e => {
        let cep = e.target.value.replace(/[^0-9]/g, '')
        setCep(cep)

        if (cep.length === 8)
            axios.get(`https://viacep.com.br/ws/${cep}/json`)
                .then(res => {
                    if (!res.data.erro) {
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
                    else {
                        setIsCepValid(false)
                    }
                })
                .catch(err => console.error("Um erro ocorreu ao buscar o CEP: ", err))
        else
            setBody({
                ...body,
                address: {
                    ...body.address,
                    cep: cep
                }
            })
    }

    const handleDateChange = e => {
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

    const handleChangePhone = e => {
        let name = e.target.name
        let value = e.target.value

        if (!foreign) {
            value = value.replace(/[^0-9]/g, '')

            if (name == "telephone")
                setPhone(phoneMask(value))
            else
                setMobilephone(phoneMask(value))
        } else {
            if (name == "telephone")
                setPhone(value)
            else
                setMobilephone(value)
        }

        setBody({
            ...body,
            [name]: value
        })
    }

    const handleChangeUser = e => {
        let value = e.target.value
        let name = e.target.name

        if (name == "value") {
            setValue(currencyMask(value))
            value = value.replace(/[^0-9]/g, '')
        }

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

    const handlePlusInformationChange = e => {
        let value = e.target.value
        let name = e.target.name

        if (!foreign && name == "emergency_contact")
            setEmergencyContact(phoneMask(value))
        if (foreign && name == "emergency_contact")
            setEmergencyContact(value)

        setBody({
            ...body,
            plusInformation: {
                ...body.plusInformation,
                [name]: value
            }
        })
    }

    const handleVerifyDate = () => {
        let date = new Date()
        let birthday = new Date(body.birthday)
        let age = date.getFullYear() - birthday.getFullYear()
        return !(age > 130 || age < 0)
    }

    const handleFormSubmit = async e => {
        e.preventDefault()
        if(value === "R$ 0,00")
            return Swal.fire("Por favor informe o valor da consulta.")
        if (handleVerifyPasswords() && handleVerifyDate()) {
            await setBody({
                ...body,
                foreign: foreign
            })
            await patientsService.store(body)
                .then(() => {
                    Swal.fire({
                        title: "Paciente cadastrado com sucesso!",
                        icon: "success",
                        confirmButtonColor: "#1492A5"
                    })
                })
                .catch(e => {
                    if(e.message == "Request failed with status code 422"){
                        return Swal.fire({
                            title: "Email já cadastrado.",
                            text: "Por favor tente com um endereço de email diferente.",
                            icon: "warning",
                            confirmButtonColor: "#1492A5"
                        })
                    }
                    Swal.fire({
                        title: "Ocorreu um erro.",
                        text: "Por favor tente novamente mais tarde.",
                        icon: "warning",
                        confirmButtonColor: "#1492A5"
                    })
                })
        } else {
            if (!handleVerifyPasswords())
                return Swal.fire("As senhas divergem.")
            if (!handleVerifyDate())
                return Swal.fire("Por favor informe uma data de nascimento válida.")
        }
    }

    const handleForeignChange = () => {
        setPhone("")
        setMobilephone("")
        setEmergencyContact("")

        if (!foreign)
            setForeign(true)
        else
            setForeign(false)
    }

    return (
        <form autoComplete="new-password" onSubmit={handleFormSubmit}>
            <Row>
                <Col md={{ size: 6 }}>
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
                                    required
                                    value={body.name}
                                />
                            </Col>
                            <Col md={4}>
                                <label htmlFor="telephone">Telefone Fixo: </label>
                                <input
                                    onChange={handleChangePhone}
                                    type="text"
                                    name="telephone"
                                    className="form-control input"
                                    placeholder={foreign ? "Formato internacional" : "DDD + número"}
                                    value={phone}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '32px' }}>
                            <Col md={4}>
                                <label htmlFor="phone">Celular: </label>
                                <input
                                    onChange={handleChangePhone}
                                    type="text"
                                    name="phone"
                                    className="form-control input"
                                    placeholder={foreign ? "Formato internacional" : "DDD + número"}
                                    value={mobilephone}
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
                                    required
                                />
                            </Col>
                            <Col md={4}>
                                <label htmlFor="rg">RG: </label>
                                <input
                                    onChange={handleChangeBody}
                                    type="text"
                                    name="rg"
                                    className="form-control input"
                                    value={body.rg}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '32px', marginBottom: '32px' }}>
                            <Col md={6}>
                                <label htmlFor="birthday">Data de Nascimento: </label>
                                <input
                                    type="date"
                                    name="birthday"
                                    className={dateColor}
                                    placeholder="Data de Nascimento"
                                    onChange={handleDateChange}
                                    onKeyDown={handleDateChange}
                                    value={body.birthday}
                                />
                            </Col>
                            <Col md={6}>
                                Sexo
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
                        <Row style={{ marginTop: '32px', marginBottom: '32px' }}>
                            <Col md={12}>
                                <input
                                    className="foreignCheckbox"
                                    name="foreign"
                                    type="checkbox"
                                    checked={foreign}
                                    onChange={handleForeignChange}
                                />
                                <span className="foreignLabel">
                                    Estrangeiro?
                                </span>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col md={{ size: 6 }}>
                    <div className="box">
                        <h1 className="subtitle">
                            Endereço
                    </h1>
                        {foreign ? <Row style={{ marginTop: '32px', marginBottom: '32px' }}>
                            <Col md={12}>
                                <label htmlFor="country">País:</label>
                                <input
                                    name="country"
                                    onChange={handleChangeAddress}
                                    className="form-control input"
                                    text="text"
                                    id="country"
                                />
                            </Col>
                        </Row> : ''}
                        <Row>
                            <Col md={6}>
                                <label htmlFor="cep">CEP: </label>
                                {foreign ? 
                                <input
                                    maxLength="8"
                                    onChange={handleChangeAddress}
                                    type="text"
                                    name="foreign_cep"
                                    className="form-control input"
                                    placeholder="Formato internacional"
                                />
                                : <input
                                    maxLength="8"
                                    onChange={handleChangeCep}
                                    type="text"
                                    name="cep"
                                    className="form-control input"
                                    value={cep}
                                />} 
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
                        <Row style={{ marginTop: '32px', marginBottom: '32px' }}>
                            <Col md={6}>
                                <label htmlFor="complement">Complemento: </label>
                                <input
                                    id="complement"
                                    type="text"
                                    name="complement"
                                    className="form-control input"
                                    onChange={handleChangeAddress}
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
                                    onChange={handleChangeAddress}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '32px' }}>
                            <Col md={3}>
                                <label htmlFor="numero">Número: </label>
                                <input
                                    onChange={handleChangeAddress}
                                    id="number"
                                    type="number"
                                    min="1"
                                    name="number"
                                    className="form-control input"
                                />
                            </Col>
                            <Col md={3}>
                                {
                                    foreign ? (
                                        <>
                                            <label htmlFor="state">Estado: </label>
                                            <input
                                                type="text"
                                                name="state"
                                                id="state"
                                                className="form-control input"
                                                disabled={isCepValid}
                                                onChange={handleChangeAddress}
                                            />
                                        </>
                                    )
                                        : (
                                            <>
                                                <label htmlFor="state">UF: </label>
                                                <select
                                                    name="state"
                                                    id="state"
                                                    className="form-control input"
                                                    disabled={isCepValid}
                                                    onChange={handleChangeAddress}
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
                                            </>
                                        )
                                }
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
            <Row style={{ marginTop: '32px', marginBottom: '32px' }}>
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
                                    placeholder={foreign ? "Formato internacional" : "DDD + número"}
                                    onChange={handlePlusInformationChange}
                                    value={emergencyContact}
                                />
                            </Col>
                            <Col md={6}>
                                <label htmlFor="emergency_name">Nome: </label>
                                <input
                                    type="text"
                                    name="emergency_name"
                                    className="form-control input"
                                    placeholder="Nome completo"
                                    onChange={handlePlusInformationChange}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '32px', marginBottom: '32px' }}>
                            <Col md={12}>
                                <label htmlFor="observation">Observação: </label>
                                <textarea
                                    className="form-control input"
                                    name="observation"
                                    onChange={handlePlusInformationChange}
                                >
                                </textarea>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row style={{ marginTop: '32px', marginBottom: '32px' }}>
                <Col md={12}>
                    <div className="box">
                        <h1 className="subtitle">
                            Valor da Sessão
                    </h1>
                        <Row style={{ marginBottom: '32px' }}>
                            <Col md={6}>
                                <label htmlFor="value">Valor: </label>
                                <input
                                    type="text"
                                    onChange={handleChangeUser}
                                    className="form-control input"
                                    name="value"
                                    value={value}
                                    required
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
            <Row style={{ marginTop: '32px', marginBottom: '32px' }}>
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
                                    autoComplete="new-password"
                                    required
                                />
                            </Col>
                            <Col md={4}>
                                <label htmlFor="password">Senha: </label>
                                <input
                                    onChange={handleChangeUser}
                                    type="password"
                                    className="form-control input"
                                    name="password"
                                    autoComplete="new-password"
                                    required
                                />
                            </Col>
                            <Col md={4}>
                                <label htmlFor="password_confirmation">Repetir Senha: </label>
                                <input
                                    onChange={handleChangeUser}
                                    type="password"
                                    className="form-control input"
                                    name="password_confirmation"
                                    required
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '32px', marginBottom: '32px' }}>
                            <Col md={4}>
                                <label htmlFor="role_id">Hierarquia: </label>
                                <select 
                                    className="form-control input" 
                                    name="role"
                                >
                                    <option value="1">Admin</option>
                                    <option value="1">Médico</option>
                                    <option value="2">Paciente</option>
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
            <Row style={{ marginBottom: '100px' }}>
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
    setPageTitle: title => dispatch(actions.setPageTitle(title)),
    fetchPatientInfo: id => dispatch(actions.fetchPatientInfo(id))
})

const mapStateToProps = store => {
    return {
        patient: store.patientsReducer.currentPatient
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StorePatients)