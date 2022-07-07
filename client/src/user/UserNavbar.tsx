import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Dropdown, Nav, Navbar } from 'rsuite'
import { User } from '../types'

interface Props {
  user: User,
  onLogout: () => void,
  showButton: boolean,
  onClick: () => void
}

export default function UserNavbar(props: Props) {
  const [weather, setWeather] = useState<any>(undefined);


  useEffect(() => {
    axios.get('/weather')
      .then(res => {
        setWeather(res.data);
      })
  }, [])
  return (
    <Navbar appearance='subtle'>
      <Navbar.Brand >
        BETOFON
      </Navbar.Brand>

      <Nav>
        <Nav.Item as={NavLink} to='/'>Games</Nav.Item>
        <Nav.Item as={NavLink} to='/ticket'>Tickets</Nav.Item>
      </Nav>
      <Nav appearance='subtle' pullRight>
        {
          props.showButton && (
            <Nav.Item >
              <Button onClick={props.onClick} style={{ color: 'white', backgroundColor: 'rgb(25, 25, 67)' }}>
                Submit ticket
              </Button>
            </Nav.Item>
          )
        }
        {
          weather && (
            <Nav >
              <Nav.Item>
                Weather: {weather.weather}
              </Nav.Item>
              <Nav.Item>
                Temperature: {weather.temp2m.min} - {weather.temp2m.max}
              </Nav.Item>
            </Nav>

          )
        }
        <Dropdown style={{ width: '100%' }} title={props.user.firstName + ' ' + props.user.lastName}>
          <Dropdown.Item onClick={props.onLogout}>Logout</Dropdown.Item>
        </Dropdown>
      </Nav>
    </Navbar >
  )
}
