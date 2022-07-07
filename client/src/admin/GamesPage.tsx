import React, { useEffect, useState } from 'react'
import { Button, Table, ButtonToolbar, ButtonGroup, Pagination, Drawer, Form, DatePicker } from 'rsuite';
import useGet from '../hooks/useGet';
import { Game, Page, Quota, Team, User } from '../types';
import * as dateFns from 'date-fns'
import axios from 'axios';
import GameForm from './GameForm';
import { Link } from 'react-router-dom';
interface Filter {
  page: number,
  size: number,
  date: number | null | undefined,
  search: string
}
interface Props {
  user: User
}
export default function GamesPage(props: Props) {
  const [openForm, setOpenForm] = useState(false)
  const [filter, setFilter] = useState<Filter>({
    date: undefined,
    page: 0,
    size: 20,
    search: ''
  })
  const [openFilter, setOpenFilter] = useState(false);
  const { data: games, refetch } = useGet<Page<Game>>('/game', filter as any);

  const changeFilter = (val: Partial<Filter>) => {
    setFilter(prev => {
      return {
        ...prev,
        ...val
      }
    })
  }

  return (
    <div>
      {
        props.user.type === 'admin' && (
          <GameForm
            open={openForm}
            onClose={() => setOpenForm(false)}
            onSubmit={async (val: any) => {
              await axios.post('/game', {
                ...val,
                date: val.date.getTime()
              })
              refetch();
            }}
          />
        )
      }
      <div className='title'>
        Games
      </div>
      {
        props.user.type === 'admin' && (
          <Button
            onClick={() => {
              setOpenForm(true);
            }}
          >Create</Button>
        )
      }
      <Button
        onClick={() => {
          setOpenFilter(true);
        }}
      >Filter</Button>
      <Filter
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        initial={filter}
        onSubmit={val => {
          changeFilter({
            ...val,
            date: val.date ? dateFns.startOfDay(val.date).getTime() : undefined
          })
        }}
      />
      <Table
        autoHeight
        rowHeight={60}
        data={games?.data || []}
        style={{ width: '100%', color: 'rgb(25, 25, 67)' }}
      >
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.Cell dataKey='id' />
        </Table.Column>
        <Table.Column flexGrow={4}>
          <Table.HeaderCell >Date</Table.HeaderCell>
          <Table.Cell>
            {
              (q: any) => {
                return dateFns.format(new Date(q.date), 'HH:mm dd.MM.yyyy')
              }
            }
          </Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={3}>
          <Table.HeaderCell>Host</Table.HeaderCell>
          <Table.Cell dataKey='host.name' />
        </Table.Column>
        <Table.Column flexGrow={3}>
          <Table.HeaderCell>Guest</Table.HeaderCell>
          <Table.Cell dataKey='guest.name' />
        </Table.Column>
        <Table.Column flexGrow={3}>
          <Table.HeaderCell >Field</Table.HeaderCell>
          <Table.Cell dataKey='host.fieldName' />
        </Table.Column>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>{props.user.type === 'admin' ? 'Delete' : 'Details'}</Table.HeaderCell>
          <Table.Cell>
            {
              (quota: any) => {
                const q = quota as Quota;
                return (
                  <ButtonToolbar>
                    <ButtonGroup>
                      {
                        props.user.type === 'admin' ? (
                          <Button
                            onClick={async () => {
                              await axios.delete('/game/' + q.id);
                              refetch();
                            }}
                            style={{ backgroundColor: 'red', color: 'white' }}>Delete</Button>
                        ) : (
                          <Link to={'/game/' + q.id}>
                            <Button>Details</Button>
                          </Link>
                        )
                      }
                    </ButtonGroup>
                  </ButtonToolbar>
                )
              }
            }
          </Table.Cell>
        </Table.Column>
      </Table>
      <Pagination
        prev
        next
        first
        last
        activePage={filter.page + 1}
        total={games?.total || 0}
        limit={filter.size}
        limitOptions={limitOptions}
        onChangeLimit={limit => {
          changeFilter({ size: limit })
        }}
        layout={['total', '-', 'limit', '|', 'pager']}
        onChangePage={page => {
          changeFilter({ page: page - 1 })
        }}
      />
    </div>
  )
}

const limitOptions = [10, 20, 50];

interface FilterProps {
  open: boolean,
  onClose: () => void,
  initial: any,
  onSubmit: (val: any) => void
}

function Filter(props: FilterProps) {
  const [formState, setFormState] = useState({})

  useEffect(() => {
    setFormState({
      ...props.initial,
      date: props.initial.date ? new Date(props.initial.date) : null
    })
  }, [props.initial])

  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
    >
      <Drawer.Header>
        <Drawer.Title>Search</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <Form
          fluid
          formValue={formState}
          onChange={(val: any) => {
            setFormState(val);
          }}
          onSubmit={() => {
            props.onSubmit(formState)
          }}
        >
          <Form.Group>
            <Form.ControlLabel>Search</Form.ControlLabel>
            <Form.Control name='search' />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Date</Form.ControlLabel>
            <Form.Control name='date' accepter={DatePicker} oneTap />
          </Form.Group>
          <Button type='submit'>Search</Button>
        </Form>
      </Drawer.Body>
    </Drawer>
  )
}