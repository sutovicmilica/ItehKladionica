import React from 'react'
import { NavLink } from 'react-router-dom'
import { Dropdown, Nav, Navbar } from 'rsuite'
import { User } from '../types'

interface Props {
  user: User,
  onLogout: () => void
}

export default function AdminNavbar(props: Props) {
  return (
    <Navbar>
      <Navbar.Brand >
        BETOFON
      </Navbar.Brand>

      <Nav>
        <Nav.Item as={NavLink} to='/'>Tickets</Nav.Item>
        <Nav.Item as={NavLink} to='/quota'>Quotas</Nav.Item>
        <Nav.Item as={NavLink} to='/game'>Games</Nav.Item>
        <Nav.Item as={NavLink} to='/statistics'>Statistics</Nav.Item>
      </Nav>
      <Nav pullRight>
        <Dropdown style={{ width: '100%' }} title={props.user.firstName + ' ' + props.user.lastName}>
          <Dropdown.Item onClick={props.onLogout}>Logout</Dropdown.Item>
        </Dropdown>
      </Nav>
    </Navbar >
  )
}
