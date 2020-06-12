import React from 'react'
import classNames from 'classnames'
import { Container } from 'reactstrap'
import NavBar from './Navbar'
import { Switch } from 'react-router-dom'
import { ProtectedRoute } from '../../protected.route'

import StorePatients from '../Patients/storePatient'
import Patients from '../Patients/patients'

export default props => (
    <Container fluid className={classNames('content', {'is-open': props.isOpen})}>
		<NavBar toggle={props.toggle}/>
		<Switch>
			<ProtectedRoute exact path="/" component={() => "Em construção..." } />
			<ProtectedRoute exact path="/cadastrar-pacientes" component={StorePatients} />
			<ProtectedRoute exact path="/pacientes" component={Patients} />          
		</Switch>
    </Container>
)