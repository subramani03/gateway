import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Components/Body'
import Home from './Components/Home'
import Event from './Components/Event'
import About from './Components/About'
import Admin from './Components/Admin'
import Registration from './Components/Registration'
import Login from './Components/Login'
import EventRule from './Components/EventRule'
import ConfirmationBox from './Components/ConfirmationBox'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import AppStore, { persistor } from './Utils/AppStore'; // Import persistor
const App = () => {
  return (

    <Provider store={AppStore}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/" index element={<Home />} />
            <Route path="/event" element={<Event />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ConfirmationBox" element={<ConfirmationBox />} />
            <Route path="/event/:id" element={<EventRule />} />
            <Route path="/register" element={<Registration />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </PersistGate>
    </Provider>

  )
}
export default App









