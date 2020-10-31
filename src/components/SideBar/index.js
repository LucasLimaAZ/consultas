import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
	faHome, 
	faPowerOff, 
	faHospitalAlt, 
	faUserMd, 
	faUsers, 
	faTimesCircle 
} from '@fortawesome/free-solid-svg-icons'
import SubMenu from './SubMenu'
import { NavItem, NavLink, Nav } from 'reactstrap'
import classNames from 'classnames'
import auth from '../../auth'
import "./style.scss"
import { withRouter } from 'react-router-dom'

const SideBar = props => {
	return (
		<div className={classNames('sidebar', {'is-open': props.isOpen})}>
			<div className="sidebar-header">
				<span 
					color="info" 
					onClick={props.toggle} 
					style={{color: '#fff'}}
				>
					<FontAwesomeIcon icon={faTimesCircle} />
				</span>
				<h3 className="sidebar-title">
					<FontAwesomeIcon icon={faHospitalAlt} /> 
					Consultas
				</h3>
			</div>
			<div className="side-menu">
				<Nav 
					style={{cursor: 'pointer'}} 
					vertical 
					className="list-unstyled pb-3"
				>
					<p>Bem vindo Usuário</p>
					<NavItem>
						<NavLink onClick={() => props.history.push("/")}>
							<FontAwesomeIcon icon={faHome} className="mr-2"/>Home
						</NavLink>
					</NavItem>
					<SubMenu 
						title="Pacientes" 
						icon={faUsers}
						items={submenus[0]}
					/>
					<SubMenu 
						title="Atendimentos" 
						icon={faUserMd} 
						items={submenus[1]}
					/>
					<NavItem>
						<NavLink onClick={() => auth.logout(() => window.location.reload(false))}>
							<FontAwesomeIcon icon={faPowerOff} className="mr-2"/>Sair
						</NavLink>
					</NavItem>
				</Nav>				
			</div>
		</div>
	)
}

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
	title: "Atendimentos",
	target: "atendimentos",				
	},
	{
	title: "Material de Apoio",
	target: "material-apoio",				
	}
]
]
	

export default withRouter(SideBar)