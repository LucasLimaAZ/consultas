import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from "../../store/actions"
import { faEdit, faTrash, faUserMd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import Loader from 'react-loader-spinner'
import "./style.scss"
import Swal from "sweetalert2"
import PatientRecordModal from "./patientRecordModal"

const Patients = props => {

    useEffect(() => {
        props.setPageTitle("Gerenciar pacientes")
        props.fetchPatients(1)
    },[])

    const handleInput = e => {
        props.filterPatients(e.target.value)
    }

    const handlePaginationClick = async page => {
        await props.fetchPatients(page)
    }

    const newAppointment = id => {
        props.history.push({ 
            pathname: 'cadastrar-atendimento', 
            patient: id
        })
    }

    const handleEdit = patient => {
        props.history.push({ 
            pathname: 'cadastrar-pacientes', 
            state: patient,
            new: true
        })
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
                    !props.patients.patients || props.patients.loader ? (
                        <Loader 
                            className="loader" 
                            type="TailSpin" 
                            color="#17A2B8" 
                            height={100} 
                            width={100} 
                        />
                    ) : (
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Name:</th>
                                    <th>RG:</th>
                                    <th>Celular:</th>
                                    <th>Ficha:</th>
                                    <th style={{textAlign: 'center'}}>Novo Atendimento:</th>
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
                                    <td><PatientRecordModal patientInfo={patient} /></td>
                                    <td style={{textAlign: 'center'}}>
                                        <button 
                                            id={patient.id} 
                                            onClick={ () => newAppointment(patient.id) } 
                                            className="btn edit-button"
                                        >
                                            <FontAwesomeIcon icon={faUserMd} />
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn edit-button"
                                            onClick={ () => handleEdit(patient) }
                                        >
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
                            <Pagination aria-label="Page navigation example">

                                <PaginationItem>
                                    <PaginationLink 
                                        className="page"
                                        first 
                                        onClick={() => handlePaginationClick(1)} 
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink 
                                        className="page"
                                        previous
                                        onClick={() => handlePaginationClick(props.patients.paginationData?.current_page - 1)} 
                                        disabled={props.patients.paginationData?.current_page == props.patients.paginationData?.from}
                                    />
                                </PaginationItem>
                                
                                {Array(props.patients.paginationData?.last_page).fill(1).map((el, i) =>
                                    <PaginationItem 
                                        key={i}
                                        className={
                                            (props.patients.paginationData?.current_page) == (i + 1) ?
                                            "selectedPage" : "page"
                                        }
                                    >
                                        <PaginationLink onClick={() => handlePaginationClick(i + 1)}>
                                        {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}
                                
                                <PaginationItem>
                                    <PaginationLink 
                                        className="page"
                                        next 
                                        onClick={() => handlePaginationClick(props.patients.paginationData?.current_page + 1)}
                                        disabled={props.patients.paginationData?.current_page == props.patients.paginationData?.last_page}
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink 
                                        className="page"
                                        last
                                        onClick={() => handlePaginationClick(props.patients.paginationData?.last_page)} 
                                    />
                                </PaginationItem>

                            </Pagination>
                        </Table>
                    )
                }
            </>
        </div>
    )
    
}

const mapDispatchToProps = dispatch => ({
    setPageTitle: title => dispatch(actions.setPageTitle(title)),
    filterPatients: patient => dispatch(actions.filterPatients(patient)),
    fetchPatients: page => dispatch(actions.fetchPatients(page)),
    deletePatient: id => dispatch(actions.deletePatient(id))
})

const mapStateToProps = store => {
    return{
        patients: store.patientsReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Patients)