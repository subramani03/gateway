import React, { useContext, useEffect, useState } from 'react'
import eventData from '../assets/events.json'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import FormContext from '../Utils/FormContext';

const EventRule = () => {

  let { id } = useParams();
  const {formData} = useContext(FormContext);
  console.log(id);
  const [event, setEvent] = useState(null);

  useEffect(()=>{
    if(formData?.events){
      let selectedEvent = formData?.events.filter((e)=>e._id ===id);
      setEvent(selectedEvent[0]);
    }
  },[formData,id])
  console.log(event)


  if(!event){
    return (
      <div>Event Data loading</div>
    )
  }
  return (
    <div className='flex justify-center items-center flex-col w-full m-auto  md:w-5/6 lg:w-4/6 p-10'>
      {/* {eventData.events.map((event, index) => ( */}
      <div>
        <div className='flex flex-col items-center'>
          <h2 className='text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold text-center'>{event?.name}</h2>
          <div className="mx-10 w-10 h-1 bg-primary"></div>
        </div>

        <p className='text-xs  md:text-sm text-center my-2'>{event?.description}</p>
        <div className='mt-2 border border-zinc-800 border-solid'></div>

        <h2 className='text-lg sm:text-xl md:text-2xl font-semibold m-3 text-primary mt-3'>Rules and regulation</h2>

        <ul className='text-sm  md:text-base list-disc marker:text-primary' >
          {
            event?.rules?.map((rule, index) => {
              return (
                <li key={index} className='mt-1'>{rule}</li>
              )
            })
          }
        </ul>

        <ul className='font-semibold my-8 px-2 text-sm  md:text-base'>
          <li className='flex items-center gap-2 mt-2'><i className="fa-solid fa-calendar-days text-primary"></i><span className='text-primary'>Date :</span>{event?.date.split('T')[0]}</li>
          <li className='flex items-center gap-1 mt-2'><i className="fa-solid fa-clock text-primary "></i><span className='text-primary'>Time  :</span>{event?.time}</li>
          <li className='flex items-center gap-2 mt-2'><i className="fa-solid fa-location-dot text-primary"></i><span className='text-primary'>Venue :</span>{event?.venue}</li>
        </ul>

        <div className='flex justify-center mt-5'>
        <button className="text-sm  md:text-base text-primary border border-primary hover:text-white hover:bg-primary font-bold px-6 py-2 rounded-full mt-5 ">
          <Link to="/register">Register</Link>
        </button>
        </div>
      
      </div>
      {/* ))} */}


    </div>



  )




}

export default EventRule;
