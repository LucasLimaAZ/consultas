import React from 'react'
import classNames from 'classnames'
import { Container } from 'reactstrap'
import NavBar from './Navbar'
import { Switch } from 'react-router-dom'
import { ProtectedRoute } from '../../protected.route'

import Home from '../Home'
import StorePatients from '../Patients/storePatient'
import Patients from '../Patients/patients'
import Appointments from '../Appointments/index'
import ListAppointments from '../Appointments/listAppointments'
import Files from '../Files/index'

export default props => (
    <Container fluid className={classNames('content', {'is-open': props.isOpen})}>
		<NavBar toggle={props.toggle}/>
		<Switch>
			<ProtectedRoute exact path="/" component={Home} />
			<ProtectedRoute exact path="/cadastrar-pacientes" component={StorePatients} />
			<ProtectedRoute exact path="/pacientes" component={Patients} />          
			<ProtectedRoute exact path="/cadastrar-atendimento" component={Appointments} />          
			<ProtectedRoute exact path="/atendimentos" component={ListAppointments} />
			<ProtectedRoute exact path="/material-apoio" component={Files} />
		</Switch>
    </Container>
)