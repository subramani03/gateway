import React, { useContext, useState } from 'react'
import eventData from '../assets/events.json'
import { Link } from 'react-router-dom'
import FormContext from '../Utils/FormContext'
const Event = () => {

  const {formData}= useContext(FormContext);
  console.log(formData?.events);
  return (
    <>

      <div className='flex flex-col items-center'>
        <h2 className='text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold mt-8'>Events</h2>
        <div className="mx-10 w-10 h-1 text-center bg-primary"></div>
      </div>


      <div className='flex justify-around items-center gap-5 flex-wrap w-full m-auto  md:w-5/6 lg:w-4/6 p-5'>
        {formData?.events.map((event, index) => (
          <div key={index} className="">
            <Link to={`/event/${event._id}`}>
              <div key={index} className="card bg-zinc-950 w-72 h-80  md:w-64 lg:w-72 shadow-md shadow-primary mt-3">
                <figure>
                  <img className='w-full h-60' src={event.imgUrl} alt="" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-primary ">{event.name}</h2>
                  <p>{event.description}</p>
                </div>
              </div>
            </Link>

          </div>


        ))}
      </div>

    </>

  )
}

export default Event
