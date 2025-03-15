import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Components/Body'
import Home from './Components/Home'
import Event from './Components/Event'
import About from './Components/About'
import Admin from './Components/Admin'
import Registration from './Components/Registration'
import Login from './Components/Login'
import EventRule from './Components/EventRule'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Body/>} >
      <Route path="/" index element={<Home />} />
      <Route path="/event" element={<Event />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/event/:id" element={<EventRule/>} />
      <Route path="/register" element={<Registration/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
export default App









