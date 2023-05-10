import React from 'react'
import Button from '../components/Button'

// NEW CODE
const logout = async () => {

  // await signOut(auth);
  localStorage.removeItem("isLoggedIn");
  localStorage.setItem('isLoggedIn', false);
  window.location.href = "login"
};
// NEW CODE

const home = () => {
  return (
    <div>
      <header className="cwnr_header">
        <h1 className="top_middle">CWNR</h1>

        {/* NEW CODE */}
        <button onClick={logout} className="btn logout">LOGOUT</button>
        {/* NEW CODE */}
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