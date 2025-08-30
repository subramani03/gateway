import React, { useEffect, useState } from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Body from './Components/Body'
import Home from './Components/Home'
import Event from './Components/Event'
import About from './Components/About'
import Admin from './Components/Admin/Admin'
import Registration from './Components/Registration'
import Login from './Components/Login'
import EventRule from './Components/EventRule' 
import ConfirmationBox from './Components/Admin/ConfirmationBox'
import ProtectedRoutes from './Components/ProtectedRoutes'
import SymposiumDetails from './Components/Admin/SymposiumDetails'
import EventDetails from './Components/Admin/EventDetails'
import FormContext from './Utils/FormContext'
import { BASE_URL } from './Utils/constants'
import axios from 'axios'

const App = () => {

  const [formData, setFormData] = useState(null);

  const fetchEventDetails=async ()=>{
    try{
      let result = await axios.get(`${BASE_URL}getEventDetails`,{
        withCredentials:true,
      })
      console.log(result.data);
      setFormData(result.data);

    }catch(err){
      console.log("error in fetch event details :" +err.message);
    }
  };
  useEffect(()=>{
    fetchEventDetails();
  },[])

  // const [formData, setFormData] = useState({
  //   name: 'gateway',
  //   description: 'gateway',
  //   about: 'super event',
  //   organizers: 'mala akka',
  //   organizers_description: 'super akka',
  //   logo: 'logo',
  //   back_groud_video: 'video',
  //   Date: new Date("December 17, 1995 03:24:00"),
  //   location: 'psgcas',
  //   RegistrationFees: '150',
  //   social_media: {
  //     instagram: 'mani',
  //     mail: 'mani@gmail.com'
  //   },
  //   contact: {
  //     forRegistrationDetails: [{ name: 'surya', ph_no: '9965464662' }],
  //     forEventDetails: [{ name: 'gowri', ph_no: '99654646672' }]
  //   },
  //   events: [
  //     {
  //       name: 'jallikattu',
  //       date: new Date("December 17, 1995 03:24:00"),
  //       venue: 'E block',
  //       imgUrl: '',
  //       time: '11',
  //       description: 'tamilar games',
  //       rules: ['no rules']
  //     }
  //   ]
  // });

  return (
    <FormContext.Provider value={{formData,setFormData,fetchEventDetails}}>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />} >
          <Route path="/" index element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/about" element={<About />} />
          {/* ✅ Protected routes */}
          <Route path="/admin" element={
            <ProtectedRoutes >
              <Admin isAuthenticated={true}/>
            </ProtectedRoutes>
          } />
          <Route path="/admin/SymposiumDetails" element={
            <ProtectedRoutes >
              <SymposiumDetails />
            </ProtectedRoutes>
          } />
          <Route path='/admin/EventDetails' element={
            <ProtectedRoutes>
              <EventDetails/>
            </ProtectedRoutes>
          }/>
          <Route path="/login" element={<Login />} />
          <Route path="/ConfirmationBox" element={<ConfirmationBox />} />
          <Route path="/event/:id" element={<EventRule />} />
          <Route path="/register" element={<Registration />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </FormContext.Provider>
   
  )
}
export default App









