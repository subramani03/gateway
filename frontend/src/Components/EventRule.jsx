import React, { useState } from 'react'
import eventData from '../assets/events.json'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";

const EventRule = () => {

  console.log(eventData.events[0].rules);


  let { id } = useParams();
  let [event, setEvent] = useState(eventData.events[id]);
  return (
    <div className='flex justify-center items-center flex-col w-full m-auto  md:w-5/6 lg:w-4/6 p-10'>
      {/* {eventData.events.map((event, index) => ( */}
      <div>
        <div className='flex flex-col items-center'>
          <h2 className='text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold text-center'>{event.name}</h2>
          <div className="mx-10 w-10 h-1 bg-primary"></div>

        </div>


        <h2 className='text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold m-3 text-white'>Rules and regulation</h2>

        <ul className='text-sm  md:text-base list-disc marker:text-primary' >
          {
            event.rules.map((rule, index) => {
              return (
                <li key={index} className='mt-1'>{rule}</li>
              )
            })
          }
        </ul>

        <div className='flex justify-center mt-5'>
          
        <button className=" text-primary border border-primary font-bold px-6 py-2 rounded-full mt-5 ">
          <Link to="/register">Register</Link>
        </button>
        </div>
      
      </div>
      {/* ))} */}


    </div>



  )




}

export default EventRule;
