import React, { useEffect, useState, Component } from 'react'
import { connect } from 'react-redux'
import * as actions from "../../store/actions"
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col } from 'reactstrap'
import "./style.scss"
import patientsService from "../../services/patientsService"

class Patients extends Component{

    constructor(props){
        super(props)

        this.state = {
            patients: []
        }
    }

    componentDidMount(){
        this.props.setPageTitle("Gerenciar pacientes")

        patientsService.fetchAll()
        .then(response => {
            this.setState({
                patients: response.data.data
            })
        })

    }

    handleInput = (e) => {
        let teste = this.props.filterPatients(e.target.value)
    }

    render(){
        return(
            <div className="box">
                <Row>
                    <Col md={12}>
                        <label htmlFor="search">Pesquisar:</label>
                        <input type="text" className="form-control input" placeholder="Digite aqui o nome do paciente..." onChange={this.handleInput} />
                    </Col>
                </Row>
                <table className="table table-striped table-sm table-responsive">
                    <thead>
                        <tr>
                            <th>Name:</th>
                            <th>RG:</th>
                            <th>Celular:</th>
                            <th>Editar:</th>
                            <th>Deletar:</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.patients.map((patient, index) => (
                            <tr key={index}>
                                <td>{patient.name}</td>
                                <td>{patient.rg}</td>
                                <td>{patient.phone}</td>
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