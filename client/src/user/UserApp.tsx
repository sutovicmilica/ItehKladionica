import axios from 'axios'
import React, { useState } from 'react'
import { Routes, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import GamesPage from '../admin/GamesPage'
import TicketDetails from '../admin/TicketDetails'
import { TicketsPageUser } from '../admin/TicketsPage'
import { User, Quota, QoutaCollection } from '../types'
import GameShowPage from './GameShowPage'
import UserNavbar from './UserNavbar'

interface Props {
  user: User,
  onLogout: () => void
}

export default function UserApp(props: Props) {

  const [openTicketForm, setOpenTicketForm] = useState(false);
  const [qoutas, setQoutas] = useState<QoutaCollection>({})

  return (
    <BrowserRouter>
      <div className='container'>
        <TicketDetails
          playing
          onSubmit={async val => {
            await axios.post('/user/ticket', {
              amount: val,
              quotas: Object.keys(qoutas).map(e => Number(e))
            })
            setQoutas({});
          }}
          open={openTicketForm}
          onClose={() => setOpenTicketForm(false)}
          items={Object.values(qoutas).map(q => {
            return {
              quotaValue: q.value,
              quota: q,
              quotaId: q.id
            }
          })}
        />
        <UserNavbar
          showButton={Object.keys(qoutas).length > 0}
          onClick={() => { setOpenTicketForm(true) }}
          user={props.user} onLogout={props.onLogout} />
        <div className='admin-main content'>
          <Routes>
            <Route path='/ticket' element={(<TicketsPageUser />)} />
            <Route path='/' element={(<GamesPage user={props.user} />)} />
            <Route path='/game/:id' element={(<GameShowPage quotaIds={qoutas}
              onChange={(qouta) => {
                setQoutas(prev => {
                  if (!qouta.id) {
                    return prev;
                  }
                  const state = { ...prev };
                  if (state[qouta.id]) {
                    delete state[qouta.id];
                  } else {
                    state[qouta.id] = qouta
                  }
                  return state;
                })
              }}
            />)} />
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  )
}
