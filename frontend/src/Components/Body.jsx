import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import FormContext from '../Utils/FormContext'



const Body = () => {

  const { formData } = useContext(FormContext);

  useEffect(() => {
    if (formData?.name) {
      document.title = formData.name; // Change title
    } else {
      document.title = "Event title"; // Fallback title
    }
    const favicon = document.getElementById("favicon");
    if (favicon) {
      favicon.href = formData?.logo || "/psgDiamondLogo.png"; // fallback logo
    }
  }, [formData]);

  return (
    <div >
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
