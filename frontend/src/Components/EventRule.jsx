import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'
import FormContext from '../Utils/FormContext'

const EventRule = () => {
  let { id } = useParams()
  const { formData } = useContext(FormContext)
  const [event, setEvent] = useState(null)
  const [openRound, setOpenRound] = useState(null)

  useEffect(() => {
    if (formData?.events) {
      let selectedEvent = formData?.events.find((e) => e._id === id)
      setEvent(selectedEvent)
    }
  }, [formData, id])

  if (!event) {
    return <div className="text-white text-center mt-10">Event Data Loading...</div>
  }

  return (
    <div className="flex justify-center items-center flex-col w-full mx-auto md:w-5/6 lg:w-4/6 p-6 md:p-10 text-white">
      {/* ✅ Header */}
      <div className="flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          {event?.name}
        </h2>
        <div className="mx-10 w-16 h-1 bg-primary rounded mt-2"></div>
      </div>

      <p className="text-sm sm:text-base md:text-lg text-center my-4 opacity-80">
        {event?.description}
      </p>

      <div className="mt-4 border border-zinc-800 w-full"></div>

      {/* ✅ Rules Section */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 mb-4 text-primary text-center sm:text-left">
        Rules & Regulations
      </h2>

      <div className="space-y-4 w-full">
        {event?.rounds?.map((round, rIdx) => {
          const isOpen = openRound === rIdx
          return (
            <div
              key={rIdx}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Round Header */}
              <button
                onClick={() => setOpenRound(isOpen ? null : rIdx)}
                className="flex justify-between items-center w-full px-4 sm:px-5 py-3 sm:py-4 text-left hover:bg-zinc-800 transition"
              >
                <span className="text-base sm:text-lg md:text-xl font-semibold text-primary">
                  {round.roundName || `Round ${rIdx + 1}`}
                </span>
                {isOpen ? (
                  <ChevronUp className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <ChevronDown className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>

              {/* Rules Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-3 sm:px-6 pb-4"
                  >
                    <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg">
                      {round.rules.map((rule, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 leading-relaxed mt-1"
                        >
                          <CheckCircle className="text-primary w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0 mt-1" />
                                           <span className="text-sm md:text-base text-white opacity-90">
                                             {rule}
                                           </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* ✅ Event Info */}
      <div className="p-6 mt-8 w-full shadow-lg">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary mb-4">
          Event Details
        </h3>
        <ul className="space-y-3 text-sm sm:text-base md:text-lg">
          <li className="flex items-center gap-2">
            <i className="fa-solid fa-calendar-days text-primary"></i>
            <span className="text-primary">Date :</span>
            {event?.date?.split('T')[0]}
          </li>
          <li className="flex items-center gap-2">
            <i className="fa-solid fa-clock text-primary"></i>
            <span className="text-primary">Time :</span>
            {event?.time}
          </li>
          <li className="flex items-center gap-2">
            <i className="fa-solid fa-location-dot text-primary"></i>
            <span className="text-primary">Venue :</span>
            {event?.venue}
          </li>
        </ul>
      </div>

      {/* ✅ Register Button */}
      <div className="flex justify-center mt-8">
        <Link
          to="/register"
          className="text-xs sm:text-sm md:text-base lg:text-lg 
             text-primary border border-primary font-bold
             px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 
             rounded-full mt-4 sm:mt-5
             hover:bg-primary hover:text-white transition
             w-auto sm:w-fit"
        >
          Register
        </Link>
      </div>
    </div>
  )
}

export default EventRule



// import React, { useContext, useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import FormContext from '../Utils/FormContext'

// const EventRule = () => {
//   let { id } = useParams()
//   const { formData } = useContext(FormContext)
//   const [event, setEvent] = useState(null)

//   useEffect(() => {
//     if (formData?.events) {
//       let selectedEvent = formData?.events.find((e) => e._id === id)
//       setEvent(selectedEvent)
//     }
//   }, [formData, id])

//   if (!event) {
//     return <div className="text-white text-center mt-10">Event Data Loading...</div>
//   }

//   return (
//     <div className="flex justify-center items-center flex-col w-full mx-auto md:w-5/6 lg:w-4/6 p-6 md:p-10 text-white">
//       <div className="flex flex-col items-center">
//         <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">{event?.name}</h2>
//         <div className="mx-10 w-12 h-1 bg-primary rounded mt-2"></div>
//       </div>

//       <p className="text-sm md:text-base text-center my-4 opacity-80">
//         {event?.description}
//       </p>

//       <div className="mt-4 border border-zinc-800"></div>

//       <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-4 text-primary">
//         Rules & Regulations
//       </h2>

//       {/* ✅ Rounds with Rules */}
//       <div className="space-y-6 w-full">
//         {event?.rounds?.map((round, rIdx) => (
//           <div
//             key={rIdx}
//             className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 shadow-lg"
//           >
//             <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">
//               {round.roundName || `Round ${rIdx + 1}`}
//             </h3>
//             <ul className="list-disc list-inside space-y-2 text-sm md:text-base marker:text-primary">
//               {round.rules.map((rule, idx) => (
//                 <li key={idx} className="leading-relaxed">
//                   {rule}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Event Info */}
//       <div className="p-6 mt-8 w-full shadow-lg">
//         <h3 className="text-lg md:text-xl font-semibold text-primary mb-4">
//           Event Details
//         </h3>
//         <ul className="space-y-3 text-sm md:text-base">
//           <li className="flex items-center gap-2">
//             <i className="fa-solid fa-calendar-days text-primary"></i>
//             <span className="text-primary">Date :</span>
//             {event?.date?.split('T')[0]}
//           </li>
//           <li className="flex items-center gap-2">
//             <i className="fa-solid fa-clock text-primary"></i>
//             <span className="text-primary">Time :</span>
//             {event?.time}
//           </li>
//           <li className="flex items-center gap-2">
//             <i className="fa-solid fa-location-dot text-primary"></i>
//             <span className="text-primary">Venue :</span>
//             {event?.venue}
//           </li>
//         </ul>
//       </div>

//       {/* ✅ Register Button */}
//       <div className="flex justify-center mt-8">
//         <Link
//           to="/register"
//           className="text-sm md:text-base text-primary border border-primary hover:text-white hover:bg-primary font-bold px-8 py-3 rounded-full transition"
//         >
//           Register
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default EventRule


// !

// import React, { useContext, useEffect, useState } from 'react'
// import eventData from '../assets/events.json'
// import { Link } from 'react-router-dom'
// import { useParams } from "react-router-dom";
// import FormContext from '../Utils/FormContext';

// const EventRule = () => {

//   let { id } = useParams();
//   const {formData} = useContext(FormContext);
//   console.log(id);
//   const [event, setEvent] = useState(null);

//   useEffect(()=>{
//     if(formData?.events){
//       let selectedEvent = formData?.events.filter((e)=>e._id ===id);
//       setEvent(selectedEvent[0]);
//     }
//   },[formData,id])
//   console.log(event)


//   if(!event){
//     return (
//       <div>Event Data loading</div>
//     )
//   }
//   return (
//     <div className='flex justify-center items-center flex-col w-full m-auto  md:w-5/6 lg:w-4/6 p-10'>
//       {/* {eventData.events.map((event, index) => ( */}
//       <div>
//         <div className='flex flex-col items-center'>
//           <h2 className='text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold text-center'>{event?.name}</h2>
//           <div className="mx-10 w-10 h-1 bg-primary"></div>
//         </div>

//         <p className='text-xs  md:text-sm text-center my-2'>{event?.description}</p>
//         <div className='mt-2 border border-zinc-800 border-solid'></div>

//         <h2 className='text-lg sm:text-xl md:text-2xl font-semibold m-3 text-primary mt-3'>Rules and regulation</h2>

//         <ul className='text-sm  md:text-base list-disc marker:text-primary' >
//           {
//             event?.rules?.map((rule, index) => {
//               return (
//                 <li key={index} className='mt-1'>{rule}</li>
//               )
//             })
//           }
//         </ul>

//         <ul className='font-semibold my-8 px-2 text-sm  md:text-base'>
//           <li className='flex items-center gap-2 mt-2'><i className="fa-solid fa-calendar-days text-primary"></i><span className='text-primary'>Date :</span>{event?.date.split('T')[0]}</li>
//           <li className='flex items-center gap-1 mt-2'><i className="fa-solid fa-clock text-primary "></i><span className='text-primary'>Time  :</span>{event?.time}</li>
//           <li className='flex items-center gap-2 mt-2'><i className="fa-solid fa-location-dot text-primary"></i><span className='text-primary'>Venue :</span>{event?.venue}</li>
//         </ul>

//         <div className='flex justify-center mt-5'>
//         <button className="text-sm  md:text-base text-primary border border-primary hover:text-white hover:bg-primary font-bold px-6 py-2 rounded-full mt-5 ">
//           <Link to="/register">Register</Link>
//         </button>
//         </div>
      
//       </div>
//       {/* ))} */}


//     </div>



//   )




// }

// export default EventRule;
