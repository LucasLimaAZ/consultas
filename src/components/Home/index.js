import { faUser, faBook, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Col, Row, Table } from "reactstrap";
import * as actions from "../../store/actions"
import { connect } from "react-redux"
import "./style.scss"

const Home = props => {

    useEffect(() => {
        props.fetchPatients()
        props.fetchAppointments()
        props.fetchFiles()
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
                            <h1 className={props.appointments?.length > 0 ? "box-num animate" : "box-num"}>
                                {props.appointments?.length > 0 ? 
                                props.appointments[0]?.paginationData?.total : 0}
                            </h1>
                            <h1 className="box-icon"><FontAwesomeIcon icon={faClipboardList} /></h1>
                        </div>
                        <h4 className="box-info">Atendimentos</h4>
                    </div>
                </Col>

                <Col md={4}>
                    <div className="box padding">
                        <div className="flex">
                            <h1 className={props.files?.length ? "box-num animate" : "box-num"}>
                                {props.files?.length}
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
                                <tr>
                                    <td>Teste</td>
                                    <td>12:00</td>
                                    <td>Lorem ipsum dolor sit amet.</td>
                                </tr>
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
        appointments: store.appointmentsReducer.appointments,
        files: store.filesReducer.files
    }
}

const mapDispatchToProps = dispatch => ({
    fetchPatients: () => dispatch(actions.fetchPatients(1)),
    fetchAppointments: () => dispatch(actions.fetchAllAppointments(1)),
    fetchFiles: () => dispatch(actions.fetchFiles(1))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)