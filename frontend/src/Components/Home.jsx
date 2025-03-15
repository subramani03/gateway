import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clg_logo from '../assets/clg_logo.avif';
import clg_iso_certified_img from '../assets/clg_iso_certified_img.avif';
import bgvideo from '../assets/021794daa81f80dbf49fc06af2091714 (1).mp4';
import gateway_logo from '../assets/gateway_logo.png';
import eventData from '../assets/events.json';

const Home = () => {
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.3; // Set playback speed to 50%
    }
  }, []);



  const eventDate = new Date("2025-04-01T00:00:00");
  const CalculateTimeLeft = () => {
    const difference = eventDate - new Date();
    if (difference <= 0) {
      return {
        day: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }

    return {
      day: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference /1000) % 60)
    }
  }
  const [timeCounter,settimeCounter] = useState(CalculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      settimeCounter(CalculateTimeLeft());   
    }, 1000);

    return ()=>clearInterval(timer);
    
  }, [timeCounter])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? eventData.events.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === eventData.events.length - 1 ? 0 : prev + 1));
  };



  return (
    <>
      {/* Background Video Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover "
          autoPlay
          ref={videoRef}
          loop
          muted
          playsInline
        >
          <source src={bgvideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay for Better Readability */}
        <div className="absolute inset-0 bg-black/75"></div>

        {/* Main Content */}
        <div className="relative h-full flex flex-col justify-center items-center m-auto w-full md:w-5/6 lg:w-4/6 text-white z-20">
          <div className="flex items-center justify-around w-full mt-5 sm:mt-1">
            <img src={clg_logo} alt="College Logo" className="w-10 md:w-12 lg:w-16 rounded-md" />
            <h2 className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold text-white">
              PSG COLLEGE OF ARTS & SCIENCE
            </h2>
            <img src={clg_iso_certified_img} alt="ISO Certification" className="w-16 md:w-24 rounded-md" />
          </div>

          {/* <div className="flex flex-col text-xs md:text-sm font-semibold text-center">
            <p>An Autonomous College - Affiliated to Bharathiar University</p>
            <p>Accredited with 'A++' Grade by NAAC (4th cycle)</p>
            <p>College with Potential for Excellence (UGC)</p>
            <p>STAR College Status Awarded by DBT-MST</p>
            <p>ISO 9001 : 2015 Certified Institution</p>
            <p>CIVIL AERODROME POST, COIMBATORE-641 014</p>
          </div> */}

          <h3 className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold mt-5 mb-3 text-primary">
            DEPARTMENT OF COMPUTATIONAL SCIENCES
          </h3>
          <h6 className="text-xs md:text-sm font-mono">(CS, MCA, BCA, IT, SS, CT, NMA, DA)</h6>
          <h4 className="text-lg font-semibold">Organizes</h4>
          <p className="text-xs sm:text-lg md:text-xl font-semibold">
            A NATIONAL LEVEL INTER COLLEGIATE TECHNICAL SYMPOSIUM
          </p>

          <div className="flex items-center justify-center mt-5 sm:mt-2">
            <img src={gateway_logo} alt="Gateway Logo" className="w-20 md:w-28" />
            <p className='text-3xl sm:text-4xl md:text-5xl my-4 text-primary text-center font-serif ' style={{ textShadow: "1px 1px 4px #00fff5" }}><b>GATEWAY '25 </b></p>
          </div>

          <button className=" text-primary border border-primary font-bold px-6 py-2 rounded-full mt-5">
            <Link to="/event">Register</Link>
          </button>
        </div>
      </div>



      {/* counttown */}
      <div className="m-auto w-full md:w-5/6 lg:w-4/6 p-10 flex gap-2  md:gap-9 items-center justify-center mt-8 md:mt-16">
        <div className='p-3 bg-zinc-950 w-36 flex justify-center items-center flex-col rounded-lg shadow-sm  shadow-primary'>
          <p className='text-3xl sm:text-4xl md:text-6xl font-semibold'>{timeCounter.day}</p>
          <p className='text-sm sm:text-base md:text-lg text-primary font-bold mt-1'>Days</p>
        </div>
        <div className='p-3 bg-zinc-950 w-36 flex justify-center items-center flex-col rounded-lg shadow-sm  shadow-primary'>
          <p className='text-3xl sm:text-4xl md:text-6xl font-semibold'>{timeCounter.hours}</p>
          <p className='text-sm sm:text-base md:text-lg font-bold  text-primary mt-1'>Hours</p>
        </div>
        <div className='p-3 bg-zinc-950 w-36 flex justify-center items-center flex-col rounded-lg shadow-sm  shadow-primary'>
          <p className='text-3xl sm:text-4xl md:text-6xl font-semibold'>{timeCounter.minutes}</p>
          <p className='text-sm sm:text-base md:text-lg  text-primary font-bold mt-1'>Minutes</p>
        </div>
        <div className='p-3 bg-zinc-950 w-36 flex justify-center items-center flex-col rounded-lg shadow-sm  shadow-primary'>
          <p className='text-3xl sm:text-4xl md:text-6xl font-semibold'>{timeCounter.seconds}</p>
          <p className='text-sm sm:text-base md:text-lg  text-primary font-bold mt-1'>Seconds</p>
        </div>



      </div>

      {/* Events Carousel Section */}
      <div className="m-auto w-full md:w-5/6 lg:w-4/6 p-10">
      <div className='flex flex-col items-start'>
        <h2 className='text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold mt-8'>Events</h2>
        <div className="mx-2 w-10 h-1 text-center bg-primary"></div>
      </div>

        {/* Carousel Container */}
        <div className="relative flex flex-col items-center mt-10">
          <div className="relative w-96 h-64 overflow-hidden mx-auto">
            {/* Carousel Content */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {eventData.events.map((event, index) => (
                <div key={index} className="w-96 flex-shrink-0">
                  <Link to={`/event/${event.id - 1}`}>
                    <img src={event.imgUrl} alt={event.name} className="w-full h-5/6 object-center  rounded-lg" />
                    <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-1 rounded-md text-lg font-semibold">
                      {event.name}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button onClick={prevSlide} className="absolute top-1/2 left-4 bg-base-100 -translate-y-1/2  border-primary border text-base w-10 h-10  md:w-12 md:h-12 md:text-xl text-primary p-2 rounded-full">
            ❮
          </button>
          <button onClick={nextSlide} className="absolute top-1/2 right-4 bg-base-100 -translate-y-1/2 border-primary border text-base w-10 h-10  md:w-12 md:h-12 md:text-xl text-primary p-2 rounded-full">
            ❯
          </button>
        </div>
      </div>



    </>
  );
};

export default Home;
