import React, { useContext } from 'react'
import FormContext from '../Utils/FormContext';

const Footer = () => {
  const {formData}=useContext(FormContext);
  return (
    <footer className='foot m-auto w-full md:w-5/6 p-5 '>
      <div className='w-full h-0.5 bg-gray-500'></div>
      <div className='flex justify-between items-center py-5'>
        <div>
          <p className='text-xs md:text-sm mb-4 text-primary'>{`© ${new Date().getFullYear()} ${formData?.name}. All rights reserved.`}</p>
          <div className='flex gap-5 items-center mb-2'>
          <i className="fa-brands fa-instagram text-primary"></i>
          <p className='text-xs md:text-sm'><a href={`https://www.instagram.com/${formData?.social_media?.instagram}/`} target='_blank'>{formData?.social_media?.instagram}</a></p>
          </div>
          <div  className='flex gap-5 items-center mb-2'>
          <i className="fa-solid fa-envelope text-primary"></i>
          <p className='text-xs md:text-sm'><a href={`mailto:${formData?.social_media?.mail}`} target='_blank'>{formData?.social_media?.mail}</a></p>
          </div>
        </div>
        <div>
          <p className="text-md text-primary font-bold text-center mb-3">Contact</p>
          <div className='flex flex-col justify-center gap-5 items-center sm:flex-row'>
            <div className='text-center'>
              <p className="text-sm md:text-md text-primary font-bold ">For Registration details</p>
              <p className='text-xs md:text-sm mt-1'>{`${formData?.contact?.forRegistrationDetails[0]?.name} -`} <a href={`tel:+${formData?.contact?.forRegistrationDetails[0]?.ph_no}`} >{formData?.contact?.forRegistrationDetails[0]?.ph_no}</a></p>
              <p className='text-xs md:text-sm mt-1'>{`${formData?.contact?.forRegistrationDetails[1]?.name} -`} <a href={`tel:+${formData?.contact?.forRegistrationDetails[1]?.ph_no}`} >{formData?.contact?.forRegistrationDetails[1]?.ph_no}</a></p>
            </div>
            <div className='text-center'>
              <p className="text-sm md:text-md text-primary font-bold">For Event details</p>
              <p className='text-xs md:text-sm mt-1'>{`${formData?.contact?.forEventDetails[0]?.name} -`} <a href={`tel:+${formData?.contact?.forEventDetails[0]?.ph_no}`} >{formData?.contact?.forEventDetails[0]?.ph_no}</a></p>
              <p className='text-xs md:text-sm mt-1'>{`${formData?.contact?.forEventDetails[1]?.name} -`} <a href={`tel:+${formData?.contact?.forEventDetails[1]?.ph_no}`} >{formData?.contact?.forEventDetails[1]?.ph_no}</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
