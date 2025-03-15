import React from 'react'

const Footer = () => {
  return (
    <footer className='foot m-auto w-full md:w-5/6 p-5 '>
      <div className='w-full h-0.5 bg-gray-500'></div>
      <div className='flex justify-between items-center py-5'>
        <div>
          <p className='text-xs md:text-sm mb-4 text-primary'>© 2025 Gateway '25. All rights reserved.</p>
          <div className='flex gap-5 items-center mb-2'>
          <i className="fa-brands fa-instagram text-primary"></i>
          <p className='text-xs md:text-sm'><a href="https://www.instagram.com/gateway_psg?igsh=cTltb2s4bzVvN3Jy" target='_blank'>Gateway_psg</a></p>
          </div>
          <div  className='flex gap-5 items-center mb-2'>
          <i className="fa-solid fa-envelope text-primary"></i>
          <p className='text-xs md:text-sm'><a href="mailto:smani32006@gmail.com" target='_blank'>smani32006@gmail.com</a></p>
          </div>
        </div>
        <div>
          <p className="text-md text-primary font-bold text-center mb-3">Contact</p>
          <div className='flex flex-col justify-center gap-5 items-center sm:flex-row'>
            <div className='text-center'>
              <p className="text-sm md:text-md text-primary font-bold ">For Registration details</p>
              <p className='text-xs md:text-sm mt-1'>Mani - <a href="tel:+9384725988" >9384725988</a></p>
              <p className='text-xs md:text-sm'>Surya - <a href="tel:+9384725988" >9384725988</a></p>
            </div>
            <div className='text-center'>
              <p className="text-sm md:text-md text-primary font-bold">For Event details</p>
              <p className='text-xs md:text-sm mt-1'>Sudha - <a href="tel:+9384725988" >9384725988</a></p>
              <p className='text-xs md:text-sm'>Gowri - <a href="tel:+9384725988" >9384725988</a></p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
