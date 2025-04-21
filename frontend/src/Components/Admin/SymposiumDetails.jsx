import React, { useContext, useState } from 'react'
import upload_area from '../../assets/upload_area_dark.png';
import axios from 'axios';
import { BASE_URL } from '../../Utils/constants';
import FormContext from '../../Utils/FormContext';
import { Link } from 'react-router-dom';

const SymposiumDetails = () => {
  const [image, setImage] = useState(null);
  const { formData, setFormData } = useContext(FormContext);

  console.log(formData);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //   }
  // }

  const createImageUrl = async (file) => {
    let formdata = new FormData();
    formdata.append('eventLogo', file);
    try {
      let response = await axios.post(`${BASE_URL}upload`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.data.success) {
        return response.data.image_url;
      } else {
        console.error('Upload failed', response.data);
        return '';
      }
    } catch (err) {
      console.error('Error uploading image', err);
      return '';
    }
  };


  const handleChange = (e, path) => {
    const keys = path.split('.');
    const value = e.target.value;

    setFormData(prev => {
      const updated = { ...prev };
      let target = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        target = target[key];
      }

      target[keys[keys.length - 1]] = value;
      console.log(updated);
      return updated;
    });
  };


  return (

    <div className="flex items-center justify-center min-h-screen p-4 mt-10">
      <div className="bg-zinc-950 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h3 className='text-sm sm:text-base md:text-xl text-primary font-bold text-center mb-3'>Main Event Details</h3>
        <form onSubmit={(e) => { e.preventDefault() }} className="p-4 space-y-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Event Name</legend>
            <input type="text" placeholder="Name"
              value={formData?.name}
              className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
              onChange={(e) => handleChange(e, 'name')} required />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Event Description</legend>
            <textarea type="text" placeholder="Description" value={formData?.description}
              className="input text-sm w-full h-fit p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
              onChange={(e) => handleChange(e, 'description')} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">About the event</legend>
            <textarea type="text" placeholder="About" value={formData?.about}
              className="input text-sm w-full h-fit p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
              onChange={(e) => handleChange(e, 'about')} rows={'5'} />
          </fieldset>


          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Event Organizers </legend>
            <input type="text" placeholder="Organizers" value={formData?.organizers}
              className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
              onChange={(e) => handleChange(e, 'organizers')} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Organizers Description</legend>
            <input type="text" placeholder="Organizers Description" value={formData?.organizers_description}
              className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
              onChange={(e) => handleChange(e, 'organizers_description')} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Date</legend>
            <input type="date" placeholder="Organizers Description" value={formData?.Date.split('T')[0]}
              className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
              onChange={(e) => handleChange(e, 'Date')} />
          </fieldset>

          <fieldset className="fieldset my-2">
            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs">Event logo</legend>
            <label htmlFor={`file-input`}>
              <img
                src={formData?.logo ? formData?.logo : image ? URL.createObjectURL(image) : upload_area}
                className="w-28 h-28 m-5 object-cover rounded-lg cursor-pointer"
                alt="Upload"
              />
            </label>
            <input
              type="file"
              hidden
              id={`file-input`}
              onChange={async (e) => {
                const file = e.target.files[0];
                setImage(file);
                const urls = await createImageUrl(file);
                console.log(urls);
                const updated = { ...formData };
                updated.logo = urls;
                setFormData(updated);
              }} />

          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Backgroud video</legend>
            <input type="text" placeholder="Background Video URL" value={formData?.back_groud_video}
              className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
              onChange={(e) => handleChange(e, 'back_groud_video')} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Location</legend>
            <input type="text" placeholder="location" value={formData?.location}
              className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
              onChange={(e) => handleChange(e, 'location')} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Registration Fees</legend>
            <input type="number" placeholder="Registration Fees" value={formData?.RegistrationFees}
              className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
              onChange={(e) => handleChange(e, 'RegistrationFees')} />
          </fieldset>


          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Maximum members per team</legend>
            <input type="number" placeholder="Per team size" value={formData?.perTeamSize}
              className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
              onChange={(e) => handleChange(e, 'perTeamSize')} />
          </fieldset>
          {/* Contacts  */}
          <h1 className='font-bold '>Contact Details</h1>

          {/* Registration Contacts */}

          <div>
            <h3 className='font-semibold text-primary'>For Registration</h3>
            <div className='flex gap-2 mb-2'>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Name</legend>
                <input type="text" placeholder="Registration Contact Name"
                  className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                  value={formData?.contact?.forRegistrationDetails[0]?.name} onChange={(e) => {
                    const updated = { ...formData };
                    updated.contact.forRegistrationDetails[0].name = e.target.value;
                    setFormData(updated);
                  }} />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Phone</legend>
                <input type="text" placeholder="Registration Phone"
                  className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                  value={formData?.contact?.forRegistrationDetails[0]?.ph_no} onChange={(e) => {
                    const updated = { ...formData };
                    updated.contact.forRegistrationDetails[0].ph_no = e.target.value;
                    setFormData(updated);
                  }} />
              </fieldset>
            </div>
            <div className='flex gap-2 mb-2'>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Name</legend>
                <input type="text" placeholder="Registration Contact Name"
                  className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                  value={formData?.contact?.forRegistrationDetails[1]?.name} onChange={(e) => {
                    const updated = { ...formData };
                    updated.contact.forRegistrationDetails[1].name = e.target.value;
                    setFormData(updated);
                  }} />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Phone</legend>
                <input type="text" placeholder="Registration Phone"
                  className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                  value={formData?.contact?.forRegistrationDetails[1]?.ph_no} onChange={(e) => {
                    const updated = { ...formData };
                    updated.contact.forRegistrationDetails[1].ph_no = e.target.value;
                    setFormData(updated);
                  }} />
              </fieldset>
            </div>
          </div>

          {/*Contact Event Details */}

          <div>
            <h3 className='font-semibold text-primary'>For Event</h3>

            <div className='flex gap-2 mb-2'>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Name</legend>
                <input type="text" placeholder="Registration Contact Name"
                  className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                  value={formData?.contact?.forEventDetails[0]?.name} onChange={(e) => {
                    const updated = { ...formData };
                    updated.contact.forEventDetails[0].name = e.target.value;
                    setFormData(updated);
                  }} />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Contact</legend>
                <input type="text" placeholder="Registration Phone"
                  className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                  value={formData?.contact?.forEventDetails[0]?.ph_no} onChange={(e) => {
                    const updated = { ...formData };
                    updated.contact.forEventDetails[0].ph_no = e.target.value;
                    setFormData(updated);
                  }} />
              </fieldset>
            </div>

            <div className='flex gap-2 mb-2'>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Name</legend>
                <input type="text" placeholder="Registration Contact Name"
                  className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                  value={formData?.contact?.forEventDetails[1]?.name} onChange={(e) => {
                    const updated = { ...formData };
                    updated.contact.forEventDetails[1].name = e.target.value;
                    setFormData(updated);
                  }} />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Contact</legend>
                <input type="text" placeholder="Registration Phone"
                  className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                  value={formData?.contact?.forEventDetails[1]?.ph_no} onChange={(e) => {
                    const updated = { ...formData };
                    updated.contact.forEventDetails[1].ph_no = e.target.value;
                    setFormData(updated);
                  }} />
              </fieldset>
            </div>
          </div>
          {/* Social media */}

          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">instagram</legend>
            <input type="text" placeholder="Instagram" value={formData?.social_media?.instagram}
              className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
              onChange={(e) => handleChange(e, 'social_media.instagram')} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">mail</legend>
            <input type="email" placeholder="Mail" value={formData?.social_media?.mail}
              className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
              onChange={(e) => handleChange(e, 'social_media.mail')} />
          </fieldset>



          <div className='flex justify-center'>
            <button className="text-xs md:text-sm w-32 py-2 px-3 font-semibold mt-6 border-primary border text-primary  rounded-full p-2 hover:bg-primary hover:text-white transition"
              onClick={() => { console.log(formData) }}
            ><Link to={'/admin/EventDetails'}>Next</Link></button>
          </div>
        </form>
      </div>
    </div>
  );

  // return (

  // <button onClick={setProductData}>Add</button>
  //   </div >
  // )
}

export default SymposiumDetails;
