import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Row, Col, Button } from "reactstrap"
import * as actions from "../../store/actions"
import StyledDropzone from "../../components/Dropzone"
import Loader from 'react-loader-spinner'
import "./style.scss"

const Appointments = props => {

    const [requestBody, setRequestBody] = useState({})

    useEffect(() => {
        props.setPageTitle( 
            props.location.state ?
            "ATUALIZAR ATENDIMENTO" :
            "NOVO ATENDIMENTO "
        )
        props.fetchPatients()

        if (props.location.state) {
            setRequestBody(props.location.state)
        }
        if (props.location.patient) {
            setRequestBody({ patient_id: props.location.patient })
        }
    },[]) 

    const handleRequestBody = e => {
        setRequestBody({ ...requestBody, [e.target.name]: e.target.value })
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

        if (props.location.state) {
            await props.updateAppointment(requestBody)
        }
        else {
            await props.storeAppointment(requestBody)
        }
            
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
                                    value={requestBody.patient_id || ''}
                                >
                                    <option>Selecione...</option>
                                    {
                                        props.patients.patients ? 
                                        props.patients.patients.map(patient => (
                                            <option key={patient.id} value={patient.id || ''}>
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
                                    value={requestBody.link || ''}
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
                                    value={requestBody.date || ''}
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
                                    value={requestBody.time || ''}
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
                                    value={requestBody.notes || ''}
                                ></textarea>
                            </Col>
                            <Col md={6}>
                                <label htmlFor="cronogram">Cronograma: </label>
                                <textarea 
                                    onChange={handleRequestBody} 
                                    name="cronogram" 
                                    className="form-control"
                                    value={requestBody.cronogram || ''}
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
                                    value={requestBody.abstract || ''}
                                ></textarea>
                            </Col>
                            <Col md={6}>
                                <label htmlFor="todo_list">Tarefas: </label>
                                <textarea 
                                    onChange={handleRequestBody} 
                                    name="todo_list" 
                                    className="form-control"
                                    value={requestBody.todo_list || ''}
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
                                    disabled={props.appointments?.isLoading}
                                >
                                    {
                                        props.location.state ?
                                        "ATUALIZAR ATENDIMENTO" :
                                        "CADASTRAR ATENDIMENTO "
                                    }
                                    {
                                        props.loader ?
                                            <Loader 
                                                type="TailSpin" 
                                                color="#ffffff"
                                                height={40} 
                                                width={40} 
                                            />
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
        files: store.filesReducer,
        loader: store.resultReducer.loader
    }
}

const mapDispatchToProps = dispatch => ({
    storeAppointment: data => dispatch(actions.storeAppointments(data)),
    updateAppointment: data => dispatch(actions.updateAppointments(data)),
    setPageTitle: title => dispatch(actions.setPageTitle(title)),
    fetchPatients: () => dispatch(actions.fetchAllPatients()),
    uploadFiles: (files, patient_id) => dispatch(actions.uploadFiles(files, patient_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Appointments)