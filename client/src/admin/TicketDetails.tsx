import React, { useState } from 'react'
import { Button, Form, List, Modal, Schema } from 'rsuite'
import { Ticket, TicketItem } from '../types'

interface Props {
  open: boolean,
  onClose: () => void,
  items: TicketItem[]
}
interface AdminProps {
  playing?: false
}

interface UserProps {
  playing: true,
  onSubmit: (amount: number) => Promise<void>
}

export default function TicketDetails(props: Props & (AdminProps | UserProps)) {

  const totalQuota = (props.items)
    .filter(item => item.quota?.status !== 'CANCELED')
    .reduce((acc, element) => acc * element.quotaValue, 1);
  const [formState, setFormState] = useState<any>({});
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      size='lg'
    >
      <Modal.Header>
        <Modal.Title className='title'>
          Items
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ padding: '20px' }}
      >
        <List
          style={{ width: '100%' }}
        >
          {
            (props.items).map(item => {
              return (
                <List.Item
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div>
                    {
                      item.quota?.game ? (`${item.quota.game?.host.name}-${item.quota.game?.guest.name}`) : `GAME DOESN'T EXIST ANYMORE`
                    }
                  </div>
                  <div
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  >
                    {
                      item.quota?.play && (
                        <div>
                          {item.quota.play.name}
                        </div>
                      )
                    }
                    <div>
                      {(item.quota?.status === 'CANCELED') ? 1 : item.quotaValue}
                    </div>
                  </div>
                </List.Item>
              )
            })
          }
          <List.Item
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              TOTAL
            </div>
            <div>
              {totalQuota}
            </div>
          </List.Item>
        </List>
        {
          props.playing && (
            <Form
              fluid
              formValue={formState}
              onChange={val => {
                setFormState({
                  amount: val.amount,
                  posibleWin: val.amount * totalQuota
                })
              }}
              onSubmit={async (valid) => {
                if (!valid) {
                  return;
                }
                await props.onSubmit(formState.amount);
                props.onClose()
              }}
              model={model}
            >
              <Form.Group>
                <Form.ControlLabel>Amount</Form.ControlLabel>
                <Form.Control name='amount' />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Posible win</Form.ControlLabel>
                <Form.Control disabled name='posibleWin' />
              </Form.Group>
              <Button appearance='primary' style={{ width: '100%' }} type='submit'>Bet</Button>
            </Form>
          )
        }
      </Modal.Body>
    </Modal>
  )
}
const model = Schema.Model({
  amount: Schema.Types.NumberType().isRequired().min(20)
})