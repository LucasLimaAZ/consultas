import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPowerOff, faHospitalAlt, faUserMd, faUsers } from '@fortawesome/free-solid-svg-icons';
import SubMenu from './SubMenu';
import { NavItem, NavLink, Nav } from 'reactstrap';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

const SideBar = props => (
    <div className={classNames('sidebar', {'is-open': props.isOpen})}>
      <div className="sidebar-header">
        <span color="info" onClick={props.toggle} style={{color: '#fff'}}>&times;</span>
        <h3 className="sidebar-title"><FontAwesomeIcon icon={faHospitalAlt} /> Consultas</h3>
      </div>
      <div className="side-menu">
        <Nav style={{cursor: 'pointer'}} vertical className="list-unstyled pb-3">
          <p>Bem vindo Usuário</p>
            <SubMenu title="Pacientes" icon={faUsers} items={submenus[0]}/>
            <SubMenu title="Agendamento" icon={faUserMd} items={submenus[1]}/>
          <NavItem>
            <NavLink tag={Link} to={'/logout'}>
              <FontAwesomeIcon icon={faPowerOff} className="mr-2"/>Sair
            </NavLink>
          </NavItem>
        </Nav>        
      </div>
    </div>
  );

  const submenus = [
    [
      {
        title: "Cadastrar pacientes",
        target: "cadastrar-pacientes"
      },
      {
        title: "Gerenciar pacientes",
        target: "pacientes",        
      }
    ],
    [
      {
        title: "Novo",
        target: "cadastrar-atendimento",          
      },
      {
        title: "Agendamentos",
        target: "agendamentos",        
      },
      {
        title: "Material de Apoio",
        target: "material-apoio",        
      }
    ]
  ]
  

export default SideBar;