import React from 'react'
import { useNavigate, useParams } from 'react-router'
import useGet from '../hooks/useGet';
import { Game, QoutaCollection, Quota } from '../types';
import { format } from 'date-fns'
import { Checkbox, Table } from 'rsuite';

interface Props {
  quotaIds: QoutaCollection,
  onChange: (quota: Quota) => void
}

export default function GameShowPage(props: Props) {
  const params = useParams();
  const navigate = useNavigate();
  const id = Number(params.id);
  const {
    data: game,
    loading
  } = useGet<Game>('/game/' + id);
  if (loading) {
    return null;
  }
  if (!game) {
    navigate('/');
    return null;
  }
  return (
    <div>
      <div className='date-header'>
        {format(new Date(game.date), ' dd.MM.yyyy HH:mm')}
      </div>
      <div className='title'>
        {`${game.host.name} - ${game.guest.name}`}
      </div>
      <div className='date-header'>
        {`Stadium ${game.host.fieldName}`}
      </div>
      {
        (new Date() < new Date(game.date) && (
          <div>
            <div className='title'>
              Qoutas
            </div>
            <Table
              data={game.quotas || []}
              autoHeight
              rowHeight={60}
              style={{ width: '100%', color: 'rgb(25, 25, 67)' }}
            >
              <Table.Column flexGrow={1}>
                <Table.HeaderCell>Play</Table.HeaderCell>
                <Table.Cell dataKey='play.name' />
              </Table.Column>
              <Table.Column flexGrow={1}>
                <Table.HeaderCell>Qouta</Table.HeaderCell>
                <Table.Cell dataKey='value' />
              </Table.Column>
              <Table.Column flexGrow={1}>
                <Table.HeaderCell>{''}</Table.HeaderCell>
                <Table.Cell>
                  {
                    (qouta: any) => {
                      return (
                        <Checkbox
                          checked={props.quotaIds[qouta.id] !== undefined}
                          onChange={() => {
                            props.onChange({
                              ...qouta,
                              game
                            });
                          }}
                        />
                      )
                    }
                  }
                </Table.Cell>
              </Table.Column>
            </Table>
          </div>
        ))
      }
    </div>
  )
}
