import React from 'react';
import classNames from 'classnames';
import { Container } from 'reactstrap';
import NavBar from './Navbar';
import { Switch, Route } from 'react-router-dom';

import CadastrarPaciente from '../Pacientes/cadastrarPaciente';
import GerenciarPacientes from '../Pacientes/gerenciarPacientes';

export default props => (
    <Container fluid className={classNames('content', {'is-open': props.isOpen})}>
      <NavBar toggle={props.toggle}/>
      <Switch>
        <Route exact path="/" component={() => "Ainda não temos home..." } />
        <Route exact path="/cadastrar-pacientes" component={CadastrarPaciente} />
        <Route exact path="/pacientes" component={GerenciarPacientes} />
        <Route exact path="/faq" component={() => "FAQ" } />
        <Route exact path="/contact" component={() => "Contact" } />              
      </Switch>
    </Container>
)