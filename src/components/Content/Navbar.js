import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Button, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const NavBar = props => {

  const [isOpen, setOpen] = useState(true)
  const toggle = () => setOpen(!isOpen)

  useEffect(() => {
    //console.log(props)
  })
  
  return (
    <Navbar color="light" light className="navbar shadow-sm p-3 mb-5 bg-white rounded" expand="md">
      <Button color="info" onClick={props.toggle}>
        <FontAwesomeIcon icon={faBars}/>
      </Button>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="m-auto" navbar>
          <NavItem>
            <div className="page-title">
              <h1 className="title">
                {props.pageTitle}
              </h1>
            </div>
            {/* <NavLink tag={Link} to={'/page-1'}>Usuário</NavLink> */}
          </NavItem>
      </Nav>
      </Collapse>
    </Navbar>
  )
}

const mapStateToProps = store => {
  return{
    pageTitle: store.pageReducer.pageTitle
  }
}

export default connect(mapStateToProps)(NavBar)