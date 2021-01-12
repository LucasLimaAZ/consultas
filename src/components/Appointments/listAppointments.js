import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from "../../store/actions"
import { faCalendar, faClock, faEdit, faTrash, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table } from 'reactstrap'
import Loader from 'react-loader-spinner'
import "./style.scss"
import Swal from "sweetalert2"

const ListAppointments = props => {

    useEffect(() => {
        props.setPageTitle("Gerenciar atendimentos")
        props.fetchAppointments()
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

    const handleEdit = id => {
        let currentAppointment = props.appointments.appointments
        .filter(appointment => appointment.id == id)[0]
        props.history.push({ 
            pathname: 'cadastrar-atendimento', 
            state: currentAppointment
        })
    }

    return (
        <div>
            {
                props.appointments.appointments?.length == 0 ?
                <p style={{color: '#666'}}>Nenhum atendimento cadastrado.</p> : 
                props.appointments.appointments ? (
                    props.appointments.appointments.map((appointment, index) => (
                        <div 
                            key={index} 
                            className="appointment" 
                            onClick={() => handleEdit(appointment.id)}
                        >
                            <div className="appointment-item">
                                <FontAwesomeIcon className="light-icon" icon={faCalendar} />
                                {appointment.date} 
                            </div>
                            <div className="appointment-item">
                                <FontAwesomeIcon className="light-icon" icon={faClock} />
                                {appointment.time} 
                            </div>
                            <div className="appointment-item patient-name">
                                <FontAwesomeIcon className="light-icon" icon={faUser} />
                                {appointment.patient.name} 
                            </div>
                            <div className="appointment-item">
                                <a
                                    id={appointment.id}
                                    onClick={() => deleteAppointment(appointment.id)}
                                    className="delete-button"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                        <Loader 
                            className="loader" 
                            type="TailSpin" 
                            color="#17A2B8" 
                            height={100} 
                            width={100} 
                        />
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