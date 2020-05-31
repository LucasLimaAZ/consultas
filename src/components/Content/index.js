import React from 'react';
import classNames from 'classnames';
import { Container } from 'reactstrap';
import NavBar from './Navbar';
import { Switch, Route } from 'react-router-dom';

import StorePatients from '../Patients/storePatient';
import Patients from '../Patients/patients';

export default props => (
    <Container fluid className={classNames('content', {'is-open': props.isOpen})}>
      <NavBar toggle={props.toggle}/>
      <Switch>
        <Route exact path="/" component={() => "Ainda não temos home..." } />
        <Route exact path="/cadastrar-pacientes" component={StorePatients} />
        <Route exact path="/pacientes" component={Patients} />
        <Route exact path="/faq" component={() => "FAQ" } />
        <Route exact path="/contact" component={() => "Contact" } />              
      </Switch>
    </Container>
)