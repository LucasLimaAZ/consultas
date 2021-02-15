import React from 'react'
import classNames from 'classnames'
import { Container } from 'reactstrap'
import NavBar from './Navbar'
import { Switch } from 'react-router-dom'
import { ProtectedRoute } from '../../protected.route'

import Home from '../../pages/Home'
import StorePatients from '../../pages/Patients/storePatient'
import Patients from '../../pages/Patients/patients'
import Appointments from '../../pages/Appointments/index'
import ListAppointments from '../../pages/Appointments/listAppointments'
import Files from '../../pages/Files/index'

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