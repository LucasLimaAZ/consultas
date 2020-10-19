import React, { useEffect } from "react"
import "./style.scss"
import { Col, Row, Table } from "reactstrap"
import { connect } from "react-redux"
import * as actions from "../../store/actions"
import Loader from 'react-loader-spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons"

const Files = props => {

    useEffect(() => {
        props.fetchFiles(1)
        props.setPageTitle("Material de Apoio")
        props.fetchAllPatients()
    },[])

    const handlePatientChange = e => {
        if (e.target.value != "Selecione um paciente")
            props.fetchFilesByPatient(e.target.value)
    }

    return(
            <Row>
                <Col md={4}>
                    <div className="box">
                        <label htmlFor="selected-patient">Paciente: </label>
                        <select className="selected-patient" onChange={handlePatientChange}>
                            <option>Selecione um paciente</option>
                            {
                                props.patients?.map(patient => (
                                    <option value={patient.id}>{patient.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </Col>
                <Col md={8}>
                    <div className="box">
                    {
                        props.loader ?
                        (
                        <Loader 
                            className="loader" 
                            type="TailSpin" 
                            color="#17A2B8" 
                            height={100} 
                            width={100} 
                        />
                        ) :
                        (
                        props.files?.length == 0 ? 
                        <p style={{color: '#666'}}>Nenhum material de apoio cadastrado.</p> :
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>Arquivo: </th>
                                    <th>Upload: </th>
                                    <th>Visualizar: </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.files?.map(file => (
                                        <tr>
                                            <td>{file.name}</td>
                                            <td>{file.created_at.split('.')[0].replace("T", " ")}</td>
                                            <td style={{textAlign: 'center'}}>
                                                <a target="_blank" href={file.path}>
                                                    <button className="btn edit-button">
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </button>
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>  
                        )
                    }
                    </div>
                </Col>
            </Row>
    )
}

const mapStateToProps = store => {
    return {
        files: store.filesReducer.files,
        loader: store.filesReducer.loader,
        patients: store.patientsReducer.patients
    }
}

const mapDispatchToProps = dispatch => ({
    fetchFiles: page => dispatch(actions.fetchFiles(page)),
    setPageTitle: title => dispatch(actions.setPageTitle(title)),
    fetchAllPatients: () => dispatch(actions.fetchAllPatients()),
    fetchFilesByPatient: patient => dispatch(actions.fetchFilesByPatient(patient))
})

export default connect(mapStateToProps, mapDispatchToProps)(Files)