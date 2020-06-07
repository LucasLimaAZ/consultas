import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from "../../store/actions"
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col } from 'reactstrap'
import api from '../../services/api'
import "./style.scss"

const Patients = props => {

    useEffect(() => {
        props.setPageTitle("Gerenciar pacientes")
        api.get('/patients')
            .then(response => {
                const data = response.data
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    })

    const handleInput = (e) => {
        let teste = props.filterPatients(e.target.value)
        console.log(props.patients)
    }

    return(
        <div className="box">
            <Row>
                <Col md={12}>
                    <label htmlFor="search">Pesquisar:</label>
                    <input type="text" className="form-control input" placeholder="Digite aqui o nome do paciente..." onChange={handleInput} />
                </Col>
            </Row>
            <table className="table table-striped table-sm table-responsive">
                <thead>
                    <tr>
                        <th>Name:</th>
                        <th>Login:</th>
                        <th>Value:</th>
                        <th>Editar:</th>
                        <th>Deletar:</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.patients.map((patient, index) => (
                        <tr key={index}>
                            <td>{patient.name}</td>
                            <td>{patient.login}</td>
                            <td>{patient.value}</td>
                            <td>
                                <button className="btn edit-button">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </td>
                            <td>
                                <button className="btn delete-button">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setPageTitle: title => dispatch(actions.setPageTitle(title)),
    filterPatients: patient => dispatch(actions.filterPatients(patient))
})

const mapStateToProps = store => {
    return{
        patients: store.patientsReducer.patients
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Patients)