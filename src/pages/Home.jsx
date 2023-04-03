import React from 'react'
// import { Link } from 'react-router-dom'
import Button from '../components/Button'

const home = () => {
  return (
    <div className='centered'>
      <Button text="MANUAL GAME" url="/game"/>
      <Button text="DEMO GAME" url="/demo"/>
      <Button text="CREATE CUSTOM GAME" url="/custom"/>
    </div>
  )
}

export default home