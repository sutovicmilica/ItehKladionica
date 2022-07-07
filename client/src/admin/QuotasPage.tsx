import axios from 'axios';
import React, { useState } from 'react'
import { Button, ButtonGroup, ButtonToolbar, Table } from 'rsuite';
import useGet from '../hooks/useGet'
import { Game, Play, PlayStatus, Quota } from '../types'
import QuotaForm from './QuotaForm';



export default function QuotasPage() {
  const { data: quotas, setData: setQuotas, loading } = useGet<Quota[]>('/admin/quota');
  const [openForm, setOpenForm] = useState(false)
  if (loading) {
    return null;
  }

  const changeStatus = async (id: number, status: PlayStatus | 'CANCELED') => {
    await axios.patch('/admin/quota/' + id, { status });
    setQuotas(prev => {
      if (!prev) {
        return []
      }
      return prev.map(e => {
        if (e.id === id) {
          return {
            ...e,
            status,
          }
        }
        return e;
      })
    })
  }

  return (
    <div>

      <QuotaForm
        open={openForm}
        onClose={() => { setOpenForm(false) }}
        onSubmit={async (val: any) => {
          const res = await axios.post('/admin/quota', val);
          setQuotas(prev => {
            if (!prev) {
              return [res.data];
            }
            return [...prev, res.data];
          })
        }}
      />

      <div className='title'>
        Quotas
      </div>
      <Button
        onClick={() => {
          setOpenForm(true);
        }}
      >Create</Button>
      <Table
        autoHeight
        rowHeight={60}
        data={quotas}
        style={{ width: '100%', color: 'rgb(25, 25, 67)' }}
      >
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.Cell dataKey='id' />
        </Table.Column>
        <Table.Column flexGrow={5}>
          <Table.HeaderCell>Game</Table.HeaderCell>
          <Table.Cell>
            {
              (quota: any) => {
                const q = quota as Quota;
                return (q.game?.host.name || '') + ' - ' + (q.game?.guest.name || '')
              }
            }
          </Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Play</Table.HeaderCell>
          <Table.Cell dataKey='play.name' />
        </Table.Column>
        <Table.Column>
          <Table.HeaderCell flexGrow={2}>Value</Table.HeaderCell>
          <Table.Cell dataKey='value' />
        </Table.Column>
        <Table.Column>
          <Table.HeaderCell flexGrow={3}>Status</Table.HeaderCell>
          <Table.Cell dataKey='status' />
        </Table.Column>
        <Table.Column flexGrow={3}>
          <Table.HeaderCell>Change status</Table.HeaderCell>
          <Table.Cell>
            {
              (quota: any) => {
                const q = quota as Quota;
                return (
                  <ButtonToolbar>
                    <ButtonGroup>
                      <Button
                        onClick={() => {
                          changeStatus(q.id || 0, 'PENDING')
                        }}
                      >PENDING</Button>
                      <Button
                        onClick={() => {
                          changeStatus(q.id || 0, 'WON')
                        }}
                        style={{ backgroundColor: 'blue', color: 'white' }}>WON</Button>
                      <Button
                        onClick={() => {
                          changeStatus(q.id || 0, 'LOST')
                        }}
                        style={{ backgroundColor: 'red', color: 'white' }}>LOST</Button>
                      <Button
                        onClick={() => {
                          changeStatus(q.id || 0, 'CANCELED')
                        }}
                      >CANCELED</Button>
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
