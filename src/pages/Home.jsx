import React from 'react'
import { Link } from 'react-router-dom'

const home = () => {
  return (
    <div className='centered'>
      <Link to='/game'> MANUAL GAME</Link>
      <br/>
      <Link to='/demo'> DEMO GAME</Link>
    </div>
  )
}

export default home