import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Row, Col, Button } from "reactstrap"
import * as actions from "../../store/actions"
import StyledDropzone from "../Dropzone"
import "./style.scss"

const Appointments = props => {

    useEffect(() => {
        props.setPageTitle("Novo Atendimento")
    })

    const handleStoreAppointment = e => {
        e.preventDefault()
    }

    return (
        <form>
            <Row>
                <Col md={12}>
                    <div className="box">
                        <Row>
                            <Col md={4}>
                                <label htmlFor="patient">Paciente: </label>
                                <input name="patient" type="text" placeholder="Buscar..." className="form-control input" />
                            </Col>
                            <Col md={4}>
                                <label htmlFor="date">Data do Atendimento: </label>
                                <input name="date" type="date" className="form-control input" />
                            </Col>
                            <Col md={4}>
                                <label htmlFor="notes">Notas: </label>
                                <textarea name="notes" className="form-control"></textarea>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '50px'}}>
                            <Col md={4}>
                                <label htmlFor="cronogram">Cronograma: </label>
                                <textarea name="cronogram" className="form-control"></textarea>
                            </Col>
                            <Col md={4}>
                                <label htmlFor="abstract">Resumo: </label>
                                <textarea name="abstract" className="form-control"></textarea>
                            </Col>
                            <Col md={4}>
                                <label htmlFor="todo_list">Tarefas: </label>
                                <textarea name="todo_list" className="form-control"></textarea>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '50px'}}>
                            <Col md={{size: 6, offset: 3}} className="dropzone">
                                <StyledDropzone />
                            </Col>
                            <Col md={{size: 6, offset: 3}} style={{textAlign: 'center', marginTop: '32px'}}>
                                <Button
                                    className="storeAppointmentButton shadow-none"
                                    onClick={handleStoreAppointment}
                                >
                                    CADASTRAR ATENDIMENTO
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </form>
    )

}

const mapDispatchToProps = dispatch => ({
    setPageTitle: title => dispatch(actions.setPageTitle(title))
})

export default connect(null, mapDispatchToProps)(Appointments)