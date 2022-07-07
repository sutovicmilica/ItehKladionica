import React, { useState } from 'react'
import { Button, DatePicker, Form, Modal, Schema, SelectPicker } from 'rsuite'
import useGet from '../hooks/useGet';
import { Play, Game, Quota, Page, Team } from '../types';

interface Props {
  open: boolean,
  onClose: () => void,
  onSubmit: (qouta: any) => Promise<void>
}
const model = Schema.Model({
  hostId: Schema.Types.NumberType().isRequired(),
  guestId: Schema.Types.NumberType().isRequired(),
  date: Schema.Types.DateType().isRequired().min(new Date())
})

export default function GameForm(props: Props) {
  const [formState, setFormState] = useState({});
  const { data: teams } = useGet<Team[]>('/team')

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Modal.Header>
        <Modal.Title className='title'>
          Create game
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          formValue={formState}
          onChange={val => {
            //@ts-ignore
            setFormState(val);
          }}
          model={model}
          fluid
          onSubmit={async (valid: boolean) => {
            if (!valid) {
              return;
            }
            await props.onSubmit(formState);
            props.onClose();
          }}
        >
          <Form.Group>
            <Form.ControlLabel>Host</Form.ControlLabel>
            <Form.Control name='hostId' accepter={SelectPicker}
              data={(teams || []).map(e => {
                return {
                  label: e.name,
                  value: e.id
                }
              })} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Guest</Form.ControlLabel>
            <Form.Control name='guestId' accepter={SelectPicker}
              data={(teams || []).map(e => {
                return {
                  label: e.name,
                  value: e.id
                }
              })} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Date</Form.ControlLabel>
            <Form.Control name='date' accepter={DatePicker} format='dd.MM.yyyy HH:mm' />
          </Form.Group>
          <Button type='submit' appearance='primary'>Create</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
