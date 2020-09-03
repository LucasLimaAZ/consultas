import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from "../../store/actions"
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Table } from 'reactstrap'
import Loader from 'react-loader-spinner'
import "./style.scss"
import Swal from "sweetalert2"

const ListAppointments = props => {

    useEffect(() => {
        props.setPageTitle("Gerenciar atendimentos")
        props.fetchAppointments()
        console.log(props.appointments)
    }, [])

    const deleteAppointment = id => {
        Swal.fire({
            title: 'Tem certeza que deseja excluir este atendimento?',
            text: 'Todos os registros vinculados ao atendimento serão completamente excluídos!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Excluir',
            confirmButtonColor: 'red',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#1492A5'
        })
            .then(res => {
                if (res.value)
                    props.deleteAppointment(id)
            })
    }
    return (
        <div className="box">
            {
                props.appointments.appointments ? (
                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th>Data:</th>
                                <th>Hora:</th>
                                <th>Paciente:</th>
                                <th>Editar:</th>
                                <th>Deletar:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.appointments.appointments.map((appointment, index) => (
                                <tr key={index}>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.patient_id}</td>
                                    <td>
                                        <button onClick={() => Swal.fire('Em construção')} className="btn edit-button">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            id={appointment.id}
                                            onClick={() => deleteAppointment(appointment.id)}
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
        </div>
    )

}

const mapDispatchToProps = dispatch => ({
    setPageTitle: title => dispatch(actions.setPageTitle(title)),
    fetchAppointments: () => dispatch(actions.fetchAllAppointments()),
    deleteAppointment: id => dispatch(actions.deleteAppointment(id))
})

const mapStateToProps = store => {
    return {
        appointments: store.appointmentsReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAppointments)