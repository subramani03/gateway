import React from 'react'
import logo from '../assets/6193472.jpg'

const About = () => {
  return (
    <div className='text-xs sm:text-sm md:text-base  m-auto w-full md:w-5/6 lg:w-4/6 p-5'>
      <div>
        <h1 className='font-semibold mb-2 text-center lg:text-xl text-primary'>Greetings from PSG COLLEGE OF ARTS & SCIENCE, Coimbatore - 14.</h1>
        <p className='font-semibold mb-2 text-center text-primary'>The School of Computational Sciences proudly presents</p>
        <p className='text-lg sm:text-xl md:text-2xl lg:text-4xl m-4 text-primary text-center font-serif ' style={{ textShadow: "1px 1px 4px #00fff5" }}><b>GATEWAY '25 </b></p>
        <p className='mb-2'> One Day National Level Inter Collegiate Technical Symposiums is scheduled on <b>12th March, 2025 </b>. We cordially invite you all for the same and motivate your students to actively participate in this mega event. </p>
        <p className='mb-2'>Enroll now & showcase your skills in exciting Technical events and Grab the attractive cash prizes</p>
        <ul className='font-semibold my-5 px-4'>
          <li className='flex items-center gap-2'><i className="fa-solid fa-calendar-days text-primary"></i>  : 12th March, 2025</li>
          <li className='flex items-center gap-1 mt-1'><i className="fa-solid fa-clock text-primary "></i> : 9:00 AM onwards</li>
          <li className='flex items-center gap-2 mt-1'><i className="fa-solid fa-location-dot text-primary"></i>  : PSGCAS</li>
        </ul>
        <p className='font-semibold text-base lg:text-xl text-primary'>Honoring our Esteemed Chief Guest:</p>
        <div className='flex justify-around gap-4 items-center shadow-xl rounded-xl p-3 mb-3 bg-zinc-950 mt-3'>
          <div>
            <p className='font-bold text-sm sm:text-base text-primary'> Shri Rajendran Dandapani</p>
            <p>Business Solutions Evangelist, Zoho Corporation
              President, Zoho Schools of Learning</p>
          </div>
          <img src={logo} alt="logo"  className='w-44 rounded-md'/>

        </div>

        <p className='font-bold my-2 text-primary'> Why Participate?</p>
        <ul className='list-disc m-3 marker:text-primary'>
          <li> Attractive Cash Prizes for Winners!</li>
          <li>Exciting Challenges & Networking!</li>
          <li>Chance to Showcase Your Skills & Creativity!</li>
        </ul>

        <p  className='font-bold my-2 text-primary'>Registration Fee : Rs. 150 per participant</p>

        <p>Don’t miss this golden opportunity to push your boundaries, compete with the best, and make your mark in the tech world!</p>
      </div>
    </div>
  )
}

export default About
