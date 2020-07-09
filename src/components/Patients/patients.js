import React, { useEffect, useState, Component } from 'react'
import { connect } from 'react-redux'
import * as actions from "../../store/actions"
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col } from 'reactstrap'
import "./style.scss"
import patientsService from "../../services/patientsService"
import Swal from "sweetalert2"

class Patients extends Component{

    constructor(props){
        super(props)

        this.state = {
            patients: []
        }
    }

    initialState = []

    componentDidMount(){
        this.props.setPageTitle("Gerenciar pacientes")

        this.fetchPatients()
        this.props.fetchPatients()
        console.log("pacientes: ", this.props.patients)
    }

    fetchPatients = () => {
        // patientsService.fetchAll()
        // .then(response => {
        //     this.setState({
        //         patients: response.data.data
        //     })
        //     this.initialState = response.data.data
        // })
    }

    handleInput = e => {
        const filteredPatients = this.initialState.filter(patient => {
            let name = patient.name.toLocaleLowerCase()
            let search = e.target.value.toLocaleLowerCase()
            return name.includes(search)
        })

        this.setState({
            patients: filteredPatients
        })
    }

    deletePatient = id => {
        Swal.fire({
            title: 'Tem certeza que deseja excluir este paciente?',
            text: 'Todos os registros vinculados ao paciente serão completamente excluídos!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Excluir',
            confirmButtonColor: 'red',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#1492A5'
        })
        .then(res => {
            if(res.value){
                patientsService.deletePatient(id)
                .then(res => {
                    if(res.status === 200)
                        this.fetchPatients()
                        Swal.fire("Excluído com sucesso!")
                })
                .catch(err => {
                    console.log(err)
                })
            }
        })
    }

    render(){
        return(
            <div className="box">
                <Row>
                    <Col md={12}>
                        <label htmlFor="search">Pesquisar:</label>
                        <input 
                            type="text" 
                            className="form-control input" 
                            placeholder="Digite aqui o nome do paciente..." 
                            onChange={this.handleInput} 
                        />
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
                                    <button onClick={() => Swal.fire('Em construção')} className="btn edit-button">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </td>
                                <td>
                                    <button 
                                        id={patient.id} 
                                        onClick={ () => this.deletePatient(patient.id) } 
                                        className="btn delete-button"
                                    >
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
    filterPatients: patient => dispatch(actions.filterPatients(patient)),
    fetchPatients: () => dispatch(actions.fetchPatients())
})

const mapStateToProps = store => {
    return{
        patients: store.patientsReducer.patients
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Patients)