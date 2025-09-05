import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import FormContext from '../Utils/FormContext'

const Event = () => {
  const { formData } = useContext(FormContext)

  // General rules for all events
  const generalRules = [
    "Participants must carry a college ID card.",
    "Team Participation: Each team must consist of 2 members.",
    "“Each event will consist of two rounds.",
    "Online Registration is mandatory for all events.",
    "Late entries will not be entertained.",
    "Judge's decisions will be final.",
    "Students from any computer science department can participate in the event",
    "Top 5 Teams will be selected for final round."
  ]

  return (
    <>
      {/* ✅ Page Title */}
      <div className="flex flex-col items-center">
        <h2 className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold mt-8 text-white">
          Events
        </h2>
        <div className="mx-10 w-12 h-1 text-center bg-primary rounded"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto">
        {/* ✅ Event Cards Grid (max 3 per row, clean layout) */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 place-items-center">
          {formData?.events?.map((event, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-full max-w-xs"
            >
              <Link to={`/event/${event._id}`}>
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-md hover:shadow-primary transition-shadow duration-300 h-80 flex flex-col">
                  <figure className="h-44 w-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                      src={event.imgUrl}
                      alt={event.name}
                    />
                  </figure>
                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-primary font-semibold text-lg truncate">
                      {event.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-white opacity-80 mt-2 line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 place-items-center">
  {formData?.events?.map((event, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className="w-full max-w-xs"
    >
      <Link to={`/event/${event._id}`}>
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-md hover:shadow-primary transition-shadow duration-300 h-80 flex flex-col">
          <figure className="h-44 w-full flex items-center justify-center bg-black">
            <img
              className="max-h-full max-w-full object-contain p-4 transition-transform duration-500"
              src={event.imgUrl}
              alt={event.name}
            />
          </figure>
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-primary font-semibold text-lg truncate">
              {event.name}
            </h2>
            <p className="text-xs sm:text-sm text-white opacity-80 mt-2 line-clamp-3">
              {event.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  ))}
</div>


        {/* ✅ Advanced General Rules Section */}
        <div className="w-full md:w-5/6 lg:w-4/6 mx-auto mt-10 px-10">
          <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-700 rounded-2xl shadow-lg p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-primary mb-6">
              General Rules
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {generalRules.map((rule, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 150 }}
                  className="flex items-center gap-3 bg-zinc-800/50 border border-zinc-700 rounded-xl p-3 sm:p-4 hover:border-primary transition"
                >
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-white opacity-90">
                    {rule}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Event


// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { CheckCircle } from 'lucide-react'
// import FormContext from '../Utils/FormContext'

// const Event = () => {
//   const { formData } = useContext(FormContext)

//   // General rules for all events
//   const generalRules = [
//     "Participants must carry a valid college ID card.",
//     "Registration is mandatory for all events.",
//     "Late entries will not be entertained.",
//     "Judges' decisions will be final and binding.",
//     "Participants should maintain discipline and decorum."
//   ]

//   return (
//     <>
//       {/* ✅ Page Title */}
//       <div className="flex flex-col items-center">
//         <h2 className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold mt-8 text-white">
//           Events
//         </h2>
//         <div className="mx-10 w-12 h-1 text-center bg-primary rounded"></div>
//       </div>

//       <div className="w-full max-w-7xl mx-auto">


//         {/* ✅ Event Cards Grid (max 3 per row, auto-fit clean layout) */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 place-items-center">
//           {formData?.events?.map((event, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: 'spring', stiffness: 200 }}
//               className="w-full max-w-xs"
//             >
//               <Link to={`/event/${event._id}`}>
//                 <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-md hover:shadow-primary transition-shadow duration-300 h-80 flex flex-col">
//                   <figure className="h-44 w-full overflow-hidden">
//                     <img
//                       className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
//                       src={event.imgUrl}
//                       alt={event.name}
//                     />
//                   </figure>
//                   <div className="p-4 flex flex-col flex-grow">
//                     <h2 className="text-primary font-semibold text-lg truncate">
//                       {event.name}
//                     </h2>
//                     <p className="text-xs sm:text-sm text-white opacity-80 mt-2 line-clamp-3">
//                       {event.description}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}

//         </div>

//         {/* ✅ General Rules Section */}
//         <div className="w-full md:w-5/6 lg:w-4/6 mx-auto mt-6 p-4 sm:p-6 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-lg">
//           <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary mb-3">
//             General Rules
//           </h3>
//           <ul className="space-y-2 text-xs sm:text-sm md:text-base text-white opacity-90">
//             {generalRules.map((rule, idx) => (
//               <li key={idx} className="flex items-start gap-2">
//                 <CheckCircle className="text-primary w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
//                 <span>{rule}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Event



// import React, { useContext, useState } from 'react'
// import eventData from '../assets/events.json'
// import { Link } from 'react-router-dom'
// import FormContext from '../Utils/FormContext'
// const Event = () => {

//   const {formData}= useContext(FormContext);
//   console.log(formData?.events);
//   return (
//     <>

//       <div className='flex flex-col items-center'>
//         <h2 className='text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold mt-8'>Events</h2>
//         <div className="mx-10 w-10 h-1 text-center bg-primary"></div>
//       </div>


//       <div className='flex justify-around items-center gap-5 flex-wrap w-full m-auto  md:w-5/6 lg:w-4/6 p-5'>
//         {formData?.events.map((event, index) => (
//           <div key={index} className="">
//             <Link to={`/event/${event._id}`}>
//               <div key={index} className="card bg-zinc-950 w-72 h-80  md:w-64 lg:w-72 shadow-md shadow-primary mt-3">
//                 <figure>
//                   <img className='w-full h-60' src={event.imgUrl} alt="" />
//                 </figure>
//                 <div className="card-body">
//                   <h2 className="card-title text-primary ">{event.name}</h2>
//                   <p>{event.description}</p>
//                 </div>
//               </div>
//             </Link>

//           </div>


//         ))}
//       </div>

//     </>

//   )
// }

// export default Event
