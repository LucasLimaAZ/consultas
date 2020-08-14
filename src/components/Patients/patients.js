import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from "../../store/actions"
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Table } from 'reactstrap'
import Loader from 'react-loader-spinner'
import "./style.scss"
import Swal from "sweetalert2"

const Patients = props => {

    useEffect(() => {
        props.setPageTitle("Gerenciar pacientes")
        props.fetchPatients()
    },[])

    const handleInput = e => {
        props.filterPatients(e.target.value)
    }

    const deletePatient = id => {
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
            if(res.value)
                props.deletePatient(id)
        })
    }
    return(
        <div className="box">
            <Row>
                <Col md={12}>
                    <label htmlFor="search">Pesquisar:</label>
                    <input 
                        type="text" 
                        className="form-control input" 
                        placeholder="Digite aqui o nome do paciente..." 
                        onChange={handleInput} 
                    />
                </Col>
            </Row>
            <>
                {
                    props.patients.patients ? (
                        <Table striped responsive>
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
                            {props.patients.patients.map((patient, index) => (
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
                                            onClick={ () => deletePatient(patient.id) } 
                                            className="btn delete-button"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    ) : (
                        <Loader className="loader" type="TailSpin" color="#17A2B8" height={100} width={100} />
                    )
                }
            </>
        </div>
    )
    
}

const mapDispatchToProps = dispatch => ({
    setPageTitle: title => dispatch(actions.setPageTitle(title)),
    filterPatients: patient => dispatch(actions.filterPatients(patient)),
    fetchPatients: () => dispatch(actions.fetchPatients()),
    deletePatient: id => dispatch(actions.deletePatient(id))
})

const mapStateToProps = store => {
    return{
        patients: store.patientsReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Patients)