import React from 'react'
import './App.css'
import Chart from './Chart'

const data = [
  {
    month: '2017-06-01',
    value: 10,
  },
  {
    month: '2017-07-01',
    value: 5,
  },
  {
    month: '2017-08-01',
    value: 0,
  },
  {
    month: '2017-09-01',
    value: 2,
  },
]

const App = () => (
  <div className="App">
    <Chart data={data} size={[500, 500]} />
  </div>
)

export default App
