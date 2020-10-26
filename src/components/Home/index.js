import { faUser, faBook, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Col, Row, Table } from "reactstrap";
import * as actions from "../../store/actions"
import { connect } from "react-redux"
import "./style.scss"
import Loader from "react-loader-spinner";

const Home = props => {

    useEffect(() => {
        props.fetchPatients()
        props.fetchMadeAppointments()
        props.fetchFiles()
        props.fetchTodaysAppointments()
    },[])

    return(
        <>
            <Row>
                <Col md={4}>
                    <div className="box padding">
                        <div className="flex">
                            <h1 className={props.patients?.paginationData?.total ? "box-num animate" : "box-num"}>
                                {props.patients?.paginationData?.total}
                            </h1>
                            <h1 className="box-icon"><FontAwesomeIcon icon={faUser} /></h1>
                        </div>
                        <h4 className="box-info">Pacientes cadastrados</h4>
                    </div>
                </Col>

                <Col md={4}>
                    <div className="box padding">
                        <div className="flex">
                            <h1 className={props.madeAppointments > 0 ? "box-num animate" : "box-num"}>
                                {props.madeAppointments}
                            </h1>
                            <h1 className="box-icon"><FontAwesomeIcon icon={faClipboardList} /></h1>
                        </div>
                        <h4 className="box-info">Atendimentos realizados</h4>
                    </div>
                </Col>

                <Col md={4}>
                    <div className="box padding">
                        <div className="flex">
                            <h1 className={props.files ? "box-num animate" : "box-num"}>
                                {props.files?.length > 0 ? props.files.length : '0'}
                            </h1>
                            <h1 className="box-icon"><FontAwesomeIcon icon={faBook} /></h1>
                        </div>
                        <h4 className="box-info">Materiais de apoio</h4>
                    </div>
                </Col>
            </Row>

            <Row style={{marginTop:'64px'}}>
                <Col size={{md: '8', offset: '2'}}>
                    <div className="box">
                        <h3 className="box-info">Atendimentos do dia</h3>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Paciente:</th>
                                    <th>Horário:</th>
                                    <th>Resumo:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.appointments?.map(appointment => (
                                        <tr>
                                            <td>{appointment.patient_id}</td>
                                            <td>{appointment.time}</td>
                                            <td>{appointment.abstract}</td>
                                        </tr>
                                    ))
                                }
                                {
                                    !props.appointments ? 
                                        <Loader 
                                            className="loader" 
                                            type="TailSpin" 
                                            color="#17A2B8" 
                                            height={100} 
                                            width={100} 
                                        />
                                    : false
                                }
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = store => {
    return{
        patients: store.patientsReducer,
        appointments: store.appointmentsReducer.todaysAppointments,
        madeAppointments: store.appointmentsReducer.madeAppointments,
        files: store.filesReducer.files
    }
}

const mapDispatchToProps = dispatch => ({
    fetchPatients: () => dispatch(actions.fetchPatients(1)),
    fetchTodaysAppointments: () => dispatch(actions.fetchTodaysAppointments()),
    fetchFiles: () => dispatch(actions.fetchFiles(1)),
    fetchMadeAppointments: () => dispatch(actions.fetchMadeAppointments())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)