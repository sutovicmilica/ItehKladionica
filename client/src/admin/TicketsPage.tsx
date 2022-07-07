import React, { useState } from 'react'
import { Table, ButtonToolbar, ButtonGroup, Button } from 'rsuite';
import useGet from '../hooks/useGet';
import { Quota, Ticket } from '../types';
import * as dateFns from 'date-fns'
import TicketDetails from './TicketDetails';

export function TicketsPageAdmin() {

  const { data: tickets } = useGet<Ticket[]>('/admin/ticket')
  return (
    <TicketsPageInner showUser tickets={tickets || []} />
  )
}



export function TicketsPageUser() {

  const { data: tickets } = useGet<Ticket[]>('/user/ticket')
  return (
    <TicketsPageInner tickets={tickets || []} />
  )
}

interface Props {
  tickets: Ticket[],
  showUser?: boolean
}

function TicketsPageInner(props: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(undefined);
  return (
    <div>
      <TicketDetails
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedTicket(undefined)
        }}
        items={selectedTicket?.items || []}
      />
      <div className='title'>
        User tickets
      </div>
      <Table
        autoHeight
        rowHeight={60}
        data={props.tickets}
        style={{ width: '100%', color: 'rgb(25, 25, 67)' }}
      >
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.Cell dataKey='id' />
        </Table.Column>
        <Table.Column flexGrow={3}>
          <Table.HeaderCell >Date</Table.HeaderCell>
          <Table.Cell>
            {
              (q: any) => {
                return dateFns.format(new Date(q.date), 'HH:mm dd.MM.yyyy')
              }
            }
          </Table.Cell>
        </Table.Column>
        {
          props.showUser && (
            <Table.Column flexGrow={2}>
              <Table.HeaderCell >User</Table.HeaderCell>
              <Table.Cell dataKey='user.email' />
            </Table.Column>
          )
        }
        <Table.Column flexGrow={2}>
          <Table.HeaderCell >Amount</Table.HeaderCell>
          <Table.Cell dataKey='amount' />
        </Table.Column>

        <Table.Column flexGrow={2}>
          <Table.HeaderCell>Total qouta</Table.HeaderCell>
          <Table.Cell>
            {
              (t: any) => {
                const ticket = t as Ticket;
                const value = ticket.items.filter(e => e.quota?.status !== 'CANCELED').reduce((acc, element) => {
                  return acc * Number(element.quotaValue);
                }, 1).toFixed(2);
                return (
                  <>
                    {value}
                  </>
                )
              }
            }
          </Table.Cell>
        </Table.Column>

        <Table.Column flexGrow={2}>
          <Table.HeaderCell >Posible win</Table.HeaderCell>
          <Table.Cell dataKey='posibleWin' />
        </Table.Column>

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.Cell dataKey='status' />
        </Table.Column>
        <Table.Column flexGrow={2}>
          <Table.HeaderCell>Details</Table.HeaderCell>
          <Table.Cell>
            {
              (ticket: any) => {
                const t = ticket as Ticket;
                return (
                  <ButtonToolbar>
                    <ButtonGroup>
                      <Button
                        onClick={() => {
                          setOpenModal(true);
                          setSelectedTicket(t);
                        }}
                        style={{ backgroundColor: 'blue', color: 'white' }}>Items</Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                )
              }
            }
          </Table.Cell>
        </Table.Column>
      </Table>
    </div>
  )
}