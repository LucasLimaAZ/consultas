import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Row, Col, Button } from "reactstrap"
import * as actions from "../../store/actions"
import StyledDropzone from "../Dropzone"
import Loader from 'react-loader-spinner'
import "./style.scss"
import Swal from "sweetalert2"

const Appointments = props => {

    const [requestBody, setRequestBody] = useState({})

    useEffect(() => {
        props.setPageTitle("Novo Atendimento")
        props.fetchPatients(1)
        checkSuccess()
    },[props.appointments]) 

    const handleRequestBody = e => {
        setRequestBody({
            ...requestBody,
            [e.target.name]: e.target.value
        })
    }

    const checkSuccess = () => {
        if (props.appointments.success) {
            Swal.fire({
                title: "Sucesso!",
                text: "Paciente cadastrado com sucesso.",
                icon: "success",
                confirmButtonColor: "#1492A5"
            })
            props.appointments.success = false
        }
        if (props.appointments.error) {
            Swal.fire({
                title: "Ooops!",
                text: "Ocorreu um erro, tente novamente mais tarde.",
                icon: "warning",
                confirmButtonColor: "#1492A5"
            })
            props.appointments.error = false
        }
    }

    const uploadFiles = async () => {
        let files = new FormData()
        await props.files.selectedFiles.forEach(file => {
            files.append('files[]', file)
        })
        if (props.files.selectedFiles.length > 0){
            await props.uploadFiles(files, requestBody.patient_id)
        }
    }

    const handleStoreAppointment = async e => {
        e.preventDefault()
        await props.storeAppointment(requestBody)
        await uploadFiles()
    }

    return (
        <form onSubmit={handleStoreAppointment} style={{marginBottom: '100px'}}>
            <Row>
                <Col md={12}>
                    <div className="box">
                        <Row>
                            <Col md={4}>
                                <label htmlFor="patient_id">Paciente: </label>
                                <select 
                                    onChange={handleRequestBody} 
                                    name="patient_id" 
                                    type="text" 
                                    placeholder="Buscar..." 
                                    className="form-control input"
                                    required
                                >
                                    <option>Selecione...</option>
                                    {
                                        props.patients.patients ? 
                                        props.patients.patients.map(patient => (
                                            <option key={patient.id} value={patient.id}>
                                                {patient.name}
                                            </option>
                                        )) : ("")
                                    }
                                </select>
                            </Col>
                            <Col md={4}>
                                <label htmlFor="link">Link: </label>
                                <input 
                                    onChange={handleRequestBody} 
                                    name="link" 
                                    type="text" 
                                    className="form-control input" 
                                    placeholder="http://exemplo.com.br/link" 
                                    required
                                />
                            </Col>
                            <Col md={2}>
                                <label htmlFor="date">Data: </label>
                                <input 
                                    onChange={handleRequestBody} 
                                    name="date" 
                                    type="date" 
                                    className="form-control input" 
                                    required
                                />
                            </Col>
                            <Col md={2}>
                                <label htmlFor="time">Hora: </label>
                                <input 
                                    onChange={handleRequestBody} 
                                    name="time" 
                                    type="time" 
                                    className="form-control input" 
                                    required
                                />
                            </Col>
                        </Row>
                        <Row style={{marginTop: '50px'}}>
                            <Col md={6}>
                                <label htmlFor="notes">Notas: </label>
                                <textarea 
                                    onChange={handleRequestBody} 
                                    name="notes" 
                                    className="form-control"
                                ></textarea>
                            </Col>
                            <Col md={6}>
                                <label htmlFor="cronogram">Cronograma: </label>
                                <textarea 
                                    onChange={handleRequestBody} 
                                    name="cronogram" 
                                    className="form-control"
                                ></textarea>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '50px'}}>
                            <Col md={6}>
                                <label htmlFor="abstract">Resumo: </label>
                                <textarea 
                                    onChange={handleRequestBody} 
                                    name="abstract" 
                                    className="form-control"
                                ></textarea>
                            </Col>
                            <Col md={6}>
                                <label htmlFor="todo_list">Tarefas: </label>
                                <textarea 
                                    onChange={handleRequestBody} 
                                    name="todo_list" 
                                    className="form-control"
                                ></textarea>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '50px'}}>
                            <Col md={12} className="dropzone">
                                <StyledDropzone />
                            </Col>
                            <Col md={12} style={{textAlign: 'center', marginTop: '32px'}}>
                                <Button
                                    className="storeAppointmentButton shadow-none"
                                    disabled={props.appointments.isLoading}
                                >
                                    CADASTRAR ATENDIMENTO 
                                    {
                                        props.appointments.isLoading ?
                                            <Loader type="TailSpin" color="#ffffff" height={40} width={40} />
                                        : ""
                                    }
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </form>
    )

}

const mapStateToProps = store => {
    return{
        patients: store.patientsReducer,
        appointments: store.appointmentsReducer,
        files: store.filesReducer
    }
}

const mapDispatchToProps = dispatch => ({
    storeAppointment: data => dispatch(actions.storeAppointments(data)),
    setPageTitle: title => dispatch(actions.setPageTitle(title)),
    fetchPatients: () => dispatch(actions.fetchPatients(1)),
    uploadFiles: (files, patient_id) => dispatch(actions.uploadFiles(files, patient_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Appointments)