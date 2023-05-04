// rafce
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Home from './pages/Home'
import Demo from './pages/Demo'
import Game from './pages/Game'
// import BackrankBattle from './pages/BackrankBattle'
import Custom from './pages/Custom'
import Host from './pages/Host'
import Recovery from './pages/Recovery'
import PrivateRoute from './util/PrivateRoute'

// if you want something on every page add here

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>

      <Routes>

        {/* default */}
        <Route path = '/' element = {<Landing/>} />

        <Route path = '/login' element = {<Login setIsLoggedIn={setIsLoggedIn}/>} />

        {/* private routes */}
        <Route element={<PrivateRoute isLoggedIn={isLoggedIn}/>}>
              <Route path="/home" element={<Home/>} />
        </Route>


        <Route path = '/demo' element = {<Demo/>} />

        <Route path = '/game' element = {<Game/>} />

        {/* <Route path = '/bb' element = {<BackrankBattle/>} /> */}

        <Route path = '/custom' element = {<Custom/>} />
        
        <Route path = '/host' element = {<Host/>} />
      </Routes>

    </BrowserRouter>
    
  )
}

export default App