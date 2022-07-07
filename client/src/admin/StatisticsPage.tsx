import React from 'react'
import { Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from 'recharts';
import useGet from '../hooks/useGet'

interface StatisticsItem {
  id: number,
  name: string,
  totalPending: number,
  totalWon: number,
  totalLost: number,
  totalCanceled: number,
}

export default function StatisticsPage() {
  const { data, loading } = useGet<StatisticsItem[]>('/statistics');
  if (loading) {
    return null;
  }
  return (
    <div>
      <div className='title'>
        Plays statistics
      </div>
      <div className='card'>
        <ResponsiveContainer minWidth='100%'
          aspect={2.2}
        >
          <BarChart
            data={data || []}
          >
            <XAxis dataKey='name' name='Play' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='totalPending' name='Total pending' fill="#8884d8" />
            <Bar dataKey='totalWon' name='Total won' fill="#27DF5E" />
            <Bar dataKey='totalLost' name='Total lost' fill="#DF2727" />
            <Bar dataKey='totalCanceled' name='Total canceled' fill="#D1D0C2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
