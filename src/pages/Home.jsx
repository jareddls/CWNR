import React from 'react'
// import { Link } from 'react-router-dom'
import Button from '../components/Button'


const home = () => {
  return (
    <div>
      <header className="cwnr_header">
        <h1 className="top_middle">CWNR</h1>
      </header>
      <br/>
      <div className="button_container">
        <Button text="MANUAL GAME" url="/game"/>
        <Button text="DEMO GAME" url="/demo"/>
        <Button text="BACKRANK BATTLE" url="/custom"/>
      </div>
      
    </div>
  )
}

export default home