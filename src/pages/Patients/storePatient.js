import React, { useEffect, useState } from 'react'
import './style.scss'
import { Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { cpfMask, phoneMask, currencyMask } from '../../components/Mask/index'
import Swal from "sweetalert2"

const StorePatients = props => {

    const [cep, setCep] = useState("")
    const [foreign, setForeign] = useState(false)
    const [body, setBody] = useState({ 
        name: "",
        rg: "",
        birthday: "",
        foreign: "",
        cpf: "",
        phone: "",
        telephone: "",
        address: {
            state: "AC",
            cep: "",
            street: "",
            complement: "",
            neighborhood: "",
            number: "",
            city: "",
            country: ""
        }, 
        user: {
            role_id: 1, 
            gender_id: 1,
            value: "R$ 0,00",
            email: "",
            password: "",
            password_confirmation: ""
        },
        plusInformation: {
            emergency_contact: "",
            name: "",
            observation: ""
        },
    })

    useEffect(() => {
        props.setPageTitle(
            props.location.state ?
            "Atualizar Paciente" :
            "Cadastrar Paciente"
        )

        if (props.location.new) {
            props.location.new = false
            props.fetchPatientInfo(props.location.state.id)
        }
        
        if (props.patient?.address && props.location.state) {
            setBody({
                ...props.patient,
                plusInformation: props.patient.plus_informations
            })
            setCep(props.patient.address.cep)
        }
    },[props.patient])

    const handleChangeCep = e => {
        let cep = e.target.value.replace(/[^0-9]/g, '')
        setCep(cep)

        if (cep.length === 8) {
            props.fetchCep()
        } 
        else {
            setBody({ ...body, address: { ...body.address, cep: cep } })
        }
    }

    const handleChangeBody = e => {
        let value = e.target.value
        let name = e.target.name

        setBody({ ...body, [name]: value })
    }

    const handleChangeUser = e => {
        let value = e.target.value
        let name = e.target.name

        setBody({
            ...body,
            user: { 
                ...body.user, 
                name: body.name, 
                [name]: name === "value" ? 
                value.replace(/[^0-9]/g, '') : value 
            }
        })
    }

    const handleChangeAddress = e => {
        let value = e.target.value
        let name = e.target.name

        setBody({ ...body, address: { ...body.address, [name]: value } })
    }

    const handlePlusInformationChange = e => {
        let value = e.target.value
        let name = e.target.name

        setBody({
            ...body,
            plusInformation: { ...body.plusInformation, [name]: value }
        })
    }

    const validateDate = () => {
        let date = new Date()
        let birthday = new Date(body.birthday)
        let age = date.getFullYear() - birthday.getFullYear()

        if(age > 130 || age < 0) {
            Swal.fire("Por favor informe uma data de nascimento válida.")
            return false;
        }
        return true;
    }

    const validateValue = () => {
        if(body.user.value === "R$ 0,00") {
            Swal.fire("Por favor informe o valor da consulta.")
            return false
        }
        return true
    }

    const validatePasswords = () => {
        if(body.user.password === body.user.password_confirmation) {
            return true;
        }
        else {
            Swal.fire("As senhas divergem.")
            return false;
        }
    }

    const handleFormSubmit = e => {
        e.preventDefault()
            
        if (validatePasswords() && validateDate() && validateValue()) {
            setBody({ ...body, foreign: foreign })
            props.location.state ?
            props.updatePatient(body) :
            props.storePatient(body)
        }
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
                                    onChange={handleChangeBody}
                                    type="text"
                                    name="telephone"
                                    className="form-control input"
                                    placeholder={foreign ? "Formato internacional" : "DDD + número"}
                                    value={
                                        foreign ?
                                        body.telephone :
                                        phoneMask(body.telephone)
                                    }
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '32px' }}>
                            <Col md={4}>
                                <label htmlFor="phone">Celular: </label>
                                <input
                                    onChange={handleChangeBody}
                                    type="text"
                                    name="phone"
                                    className="form-control input"
                                    placeholder={foreign ? "Formato internacional" : "DDD + número"}
                                    value={
                                        foreign ?
                                        body.phone :
                                        phoneMask(body.phone)
                                    }
                                />
                            </Col>
                            <Col md={4}>
                                <label htmlFor="cpf">CPF: </label>
                                <input
                                    type="text"
                                    name="cpf"
                                    className="form-control input"
                                    onChange={handleChangeBody}
                                    maxLength="14"
                                    placeholder="___.___.___-__"
                                    value={cpfMask(body.cpf)}
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
                                    className="form-control input"
                                    onChange={handleChangeBody}
                                    onKeyDown={handleChangeBody}
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
                                    onChange={setForeign(!foreign)}
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
                                    value={body.address.cep}
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
                                    disabled={props.cepIsValid}
                                    value={body.address.street}

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
                                    value={body.address.complement}
                                />
                            </Col>
                            <Col md={6}>
                                <label htmlFor="neighborhood">Bairro: </label>
                                <input
                                    id=""
                                    type="text"
                                    name="neighborhood"
                                    className="form-control input"
                                    disabled={props.cepIsValid}
                                    onChange={handleChangeAddress}
                                    value={body.address.neighborhood}
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
                                    value={body.address.number}
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
                                                disabled={props.cepIsValid}
                                                onChange={handleChangeAddress}
                                                value={body.address.state}
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
                                                    disabled={props.cepIsValid}
                                                    onChange={handleChangeAddress}
                                                    value={body.address.state}
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
                                    disabled={props.cepIsValid}
                                    value={body.address.city}
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
                                    value={
                                        foreign ?
                                            body.plusInformation.emergency_contact :
                                            phoneMask(body.plusInformation.emergency_contact)
                                    }
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
                                    value={body.plusInformation.name}
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
                                    value={body.plusInformation.observation}
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
                                    value={currencyMask(String(body.user.value))}
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
                                    value={body.user.email}
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
                                    value={body.user.role}
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
                        <h1 className="subtitle">
                            { props.location.state ? 'Atualizar dados' : 'Salvar dados' }
                        </h1>
                        <Button type="submit">
                            { props.location.state ? 'Atualizar' : 'Salvar' }
                        </Button>
                    </div>
                </Col>
            </Row>
        </form>
    )
}

const mapDispatchToProps = dispatch => ({
    setPageTitle: title => dispatch(actions.setPageTitle(title)),
    fetchPatientInfo: id => dispatch(actions.fetchPatientInfo(id)),
    storePatient: body => dispatch(actions.storePatient(body)),
    fetchCep: cep => dispatch(actions.fetchCep(cep))
})

const mapStateToProps = store => {
    return {
        patient: store.patientsReducer.currentPatient,
        cepIsValid: store.patientsReducer.cepIsValid
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StorePatients)