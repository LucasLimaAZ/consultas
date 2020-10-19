import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import * as actions from '../../store/actions'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

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
				<ModalHeader toggle={toggle}>Ficha do Paciente</ModalHeader>
				<ModalBody>
				Nome: {patientInfo?.name}
				<br />
				<Button className="color-button" onClick={toggleNested}>Atendimentos</Button>
				<Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
					<ModalHeader>Atendimentos do Paciente</ModalHeader>
					<ModalBody>
						<ul>
							<li>Teste 1</li>
							<li>Teste 2</li>
							<li>Teste 3</li>
							<li>Teste 4</li>
						</ul>
					</ModalBody>
					<ModalFooter>
					<Button className="color-button" onClick={toggleNested}>Fechar</Button>
					</ModalFooter>
				</Modal>
				</ModalBody>
				<ModalFooter>
					<Button className="color-button" onClick={toggle}>Fechar</Button>
				</ModalFooter>
			</Modal>
		</div>
	)
}

const mapStateToProps = store => {
	return {
		patient: store.patientsReducer.patient
	}
}

const mapDispatchToProps = dispatch => ({
	fetchPatientAppointments: patientId => dispatch(actions.fetchPatientAppointments(patientId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalExample)