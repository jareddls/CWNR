// rafce
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Home from './pages/Home'
import Demo from './pages/Demo'
import Game from './pages/Game'
import Recovery from './pages/Recovery'

import Navbar from './components/Navbar'

// if you want something on every page add here
const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        {/* default */}
        <Route path = '/' element = {<Landing/>} />

        <Route path = '/login' element = {<Login/>} />

        <Route path = '/home' element = {<Home/>} />

        <Route path = '/demo' element = {<Demo/>} />

        <Route path = '/game' element = {<Game/>} />
      </Routes>
    </BrowserRouter>

    
  )
}

export default App