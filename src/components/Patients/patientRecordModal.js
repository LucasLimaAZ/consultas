import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import * as actions from '../../store/actions'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap'
import Loader from 'react-loader-spinner'

const ModalExample = (props) => {
	const { patientInfo, className } = props

	const [modal, setModal] = useState(false)
	const [nestedModal, setNestedModal] = useState(false)
	const [closeAll, setCloseAll] = useState(false)

	const toggle = () => setModal(!modal)

	const toggleNested = () => {
		props.fetchPatientAppointments(patientInfo.id)
		setNestedModal(!nestedModal)
		setCloseAll(false)
	}

	return (
		<div>
			<Button className="edit-button" style={{border: '#17a2b8'}} onClick={toggle}>
				<FontAwesomeIcon icon={faClipboard} /></Button>
			<Modal isOpen={modal} toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>
					<h4 className="patient-record-title">
						FICHA DO PACIENTE <FontAwesomeIcon icon={faClipboard} />
					</h4>
				</ModalHeader>
				<ModalBody>
				<b>Nome:</b> {patientInfo?.name} <br />
				<b>Data de Nascimento:</b> {patientInfo?.birthday} <br />
				<b>Telefone:</b> {patientInfo?.phone} <br />
				<b>CPF:</b> {patientInfo?.cpf} <br />
				<b>RG:</b> {patientInfo?.rg} <br />
				<Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
					<ModalHeader>Atendimentos do Paciente</ModalHeader>
					<ModalBody>
						{
							props.patient.appointments ?
							(
								<Table responsive striped>
									<thead>
										<tr>
											<th>Data: </th>
											<th>Hora: </th>
											<th>Resumo: </th>
										</tr>
									</thead>
									<tbody>
										{props.patient.appointments?.map(appointment => (
											<tr>
												<td>{appointment.date}</td>
												<td>{appointment.time}</td>
												<td>{appointment.abstract}</td>
											</tr>
										))}
									</tbody>
								</Table>
							) :
							<Loader 
								className="loader" 
								type="TailSpin" 
								color="#17A2B8" 
								height={100} 
								width={100} 
							/>
						}
					</ModalBody>
					<ModalFooter>
					<Button className="color-button shadow-none" onClick={toggleNested}>Fechar</Button>
					</ModalFooter>
				</Modal>
				</ModalBody>
				<ModalFooter>
					<Button className="color-button shadow-none" onClick={toggleNested}>Atendimentos</Button>
					<Button className="color-button shadow-none" onClick={toggle}>Fechar</Button>
				</ModalFooter>
			</Modal>
		</div>
	)
}

const mapStateToProps = store => {
	return {
		patient: store.patientsReducer
	}
}

const mapDispatchToProps = dispatch => ({
	fetchPatientAppointments: patientId => dispatch(actions.fetchPatientAppointments(patientId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalExample)