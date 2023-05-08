// rafce
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Home from './pages/Home'
import Demo from './pages/Demo'
import Game from './pages/Game'
import BackrankBattle from './pages/BackrankBattle'
import Custom from './pages/Custom'
import Host from './pages/Host'
import TestingSocket from './pages/TestingSocket'
import PrivateRoute from './util/PrivateRoute'

// if you want something on every page add here

const App = () => {

  return (
    <BrowserRouter>

      <Routes>

        {/* default */}
        <Route path = '/' element = {<Landing/>} />

        <Route path = '/login' element = {<Login/>}/>

        {/* private routes */}
        <Route element={<PrivateRoute/>}>
              <Route path="/home" element={<Home/>} />
        </Route>


        <Route path = '/demo' element = {<Demo/>} />

        <Route path = '/game' element = {<Game/>} />

        <Route path = '/bb' element = {<BackrankBattle/>} />

        <Route path = '/custom' element = {<Custom/>} />
        
        <Route path = '/host' element = {<Host/>} />

        <Route path = '/ts' element = {<TestingSocket/>} />
      </Routes>

    </BrowserRouter>
    
  )
}

export default App