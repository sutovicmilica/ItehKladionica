import React, { useState } from 'react'
import { Button, Form, Modal, Schema, SelectPicker } from 'rsuite'
import useGet from '../hooks/useGet';
import { Play, Game, Quota, Page } from '../types';

interface Props {
  open: boolean,
  onClose: () => void,
  onSubmit: (qouta: any) => void
}
const model = Schema.Model({
  gameId: Schema.Types.NumberType().isRequired(),
  playId: Schema.Types.NumberType().isRequired(),
  value: Schema.Types.NumberType().isRequired().min(1.01),
})

const now = Date.now()
export default function QuotaForm(props: Props) {
  const { data: plays } = useGet<Play[]>('/play');
  const [formState, setFormState] = useState({});
  const [playSearch, setPlaySearch] = useState('')
  const { data: games } = useGet<Page<Game>>('/game', { search: playSearch, date: now });

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Modal.Header>
        <Modal.Title className='title'>
          Create quota
        </Modal.Title>
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
              <Form.ControlLabel>Game</Form.ControlLabel>
              <Form.Control name='gameId' accepter={SelectPicker}
                onSearch={(val: string) => {
                  setPlaySearch(val);
                }}
                data={(games?.data || []).map(e => {
                  return {
                    label: `${e.host.name || ''} - ${e.guest.name || ''}`,
                    value: e.id
                  }
                })} />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Play</Form.ControlLabel>
              <Form.Control name='playId' accepter={SelectPicker}
                data={(plays || []).map(e => {
                  return {
                    label: e.name,
                    value: e.id
                  }
                })} />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Quota</Form.ControlLabel>
              <Form.Control name='value' />
            </Form.Group>
            <Button type='submit' appearance='primary'>Create</Button>
          </Form>
        </Modal.Body>
      </Modal.Header>
    </Modal>
  )
}
