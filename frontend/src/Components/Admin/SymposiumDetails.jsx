import React, { useContext, useState, useEffect } from 'react';
import upload_area from '../../assets/upload_area_dark.png';
import axios from 'axios';
import { BASE_URL } from '../../Utils/constants';
import FormContext from '../../Utils/FormContext';
import { Link } from 'react-router-dom';

const SymposiumDetails = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const { formData, setFormData } = useContext(FormContext);
  const [uploading, setUploading] = useState({});

  const setUploadStatus = (field, value) => {
    setUploading(prev => ({ ...prev, [field]: value }));
  };

  const createMediaUrl = async (file) => {
    const formdata = new FormData();
    formdata.append('media', file);
    try {
      const response = await axios.post(`${BASE_URL}upload-media`, formdata, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (response.data.success) return response.data.image_url;
    } catch (err) {
      console.error('Upload failed', err);
    }
    return '';
  };

  const handleInputChange = (e, path) => {
    const value = e.target.value;
    const keys = path.split('.');
    setFormData(prev => {
      const updated = { ...prev };
      let target = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!target[keys[i]]) target[keys[i]] = {};
        target = target[keys[i]];
      }
      target[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-24 p-4 bg-zinc-950">
      <div className="flex items-center justify-center z-10 relative">
        <div className="bg-zinc-950 p-8 rounded-2xl shadow-xl w-full max-w-3xl border border-zinc-700">
          <h3 className="text-2xl font-bold text-primary text-center mb-6">Main Event Details</h3>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {["name", "description", "about", "organizers", "organizers_description", "Date", "location", "RegistrationFees", "perTeamSize"].map((field) => (
              <fieldset key={field} className="mb-4">
                <legend className="text-sm text-gray-400 capitalize mb-1">
                  {field.replace(/_/g, ' ')}
                </legend>
                {['about', 'description'].includes(field) ? (
                  <textarea
                    value={formData?.[field] || ''}
                    onChange={(e) => handleInputChange(e, field)}
                    className="w-full p-3 bg-zinc-900 border input border-zinc-600 rounded-xl text-white text-sm resize-none h-32"
                    rows={1}
                    required
                  />
                ) : (
                  <input
                    type={field === 'Date' ? 'date' : 'text'}
                    value={field === 'Date' ? (formData?.[field] ? formData[field].split('T')[0] : '') : formData?.[field] || ''}
                    onChange={(e) => handleInputChange(e, field)}
                    className="w-full p-3 input bg-zinc-900 border border-zinc-600 rounded-xl text-white text-sm"
                    required
                  />
                )}
              </fieldset>
            ))}

            <div className="flex justify-evenly">
              <fieldset>
                <legend className="text-sm text-gray-400">Event Logo</legend>
                <label htmlFor="file-input-image">
                  <img
                    src={formData?.logo || imagePreview || upload_area}
                    className="w-28 h-28 m-3 object-cover rounded-xl cursor-pointer border border-zinc-700"
                    alt="Upload"
                  />
                </label>
                <input
                  type="file"
                  hidden
                  id="file-input-image"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setImagePreview(URL.createObjectURL(file));
                    setUploadStatus('logo', true);
                    const url = await createMediaUrl(file);
                    if (url) setFormData(prev => ({ ...prev, logo: url }));
                    setUploadStatus('logo', false);
                  }}
                />
              </fieldset>

              <fieldset>
                <legend className="text-sm text-gray-400">Background Video</legend>
                <label htmlFor="file-input-video">
                  <div className="relative w-28 h-28 m-3 rounded-xl overflow-hidden cursor-pointer border border-zinc-700">
                    {formData?.back_groud_video || videoPreview ? (
                      <video
                        src={formData?.back_groud_video || videoPreview}
                        className="w-full h-full object-cover pointer-events-none"
                        muted
                        autoPlay
                        loop
                      />
                    ) : (
                      <img src={upload_area} className="w-full h-full object-cover" alt="Upload" />
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  hidden
                  id="file-input-video"
                  accept="video/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setVideoPreview(URL.createObjectURL(file));
                    setUploadStatus('bgVideo', true);
                    const url = await createMediaUrl(file);
                    if (url) setFormData(prev => ({ ...prev, back_groud_video: url }));
                    setUploadStatus('bgVideo', false);
                  }}
                />
              </fieldset>
            </div>

            <h1 className="font-bold mt-8 text-white">Contact Details</h1>

            <h3 className="font-semibold text-primary mt-4 mb-2">For Registration</h3>
            <div className="grid grid-cols-1 gap-4">
              {[0, 1].map(i => (
                <div key={i} className="grid grid-cols-2 gap-3">
                  <fieldset>
                    <legend className="font-semibold mb-1 md:text-sm text-xs text-gray-300">Name</legend>
                    <input
                      type="text"
                      value={formData?.contact?.forRegistrationDetails?.[i]?.name || ''}
                      required
                      onChange={(e) => {
                        const updated = JSON.parse(JSON.stringify(formData));
                        updated.contact.forRegistrationDetails[i].name = e.target.value;
                        setFormData(updated);
                      }}
                      className="input w-full p-2 bg-zinc-900 border border-zinc-600 rounded-xl text-white text-sm"
                    />
                  </fieldset>
                  <fieldset>
                    <legend className="font-semibold mb-1 md:text-sm text-xs text-gray-300">Phone</legend>
                    <input
                      type="text"
                      required
                      value={formData?.contact?.forRegistrationDetails?.[i]?.ph_no || ''}
                      onChange={(e) => {
                        const updated = JSON.parse(JSON.stringify(formData));
                        updated.contact.forRegistrationDetails[i].ph_no = e.target.value;
                        setFormData(updated);
                      }}
                      className="input w-full p-2 bg-zinc-900 border border-zinc-600 rounded-xl text-white text-sm"
                    />
                  </fieldset>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-primary mt-6 mb-2">For Event</h3>
            <div className="grid grid-cols-1 gap-4">
              {[0, 1].map(i => (
                <div key={i} className="grid grid-cols-2 gap-3">
                  <fieldset>
                    <legend className="font-semibold mb-1 md:text-sm text-xs text-gray-300">Name</legend>
                    <input
                      type="text"
                      required
                      value={formData?.contact?.forEventDetails?.[i]?.name || ''}
                      onChange={(e) => {
                        const updated = JSON.parse(JSON.stringify(formData));
                        updated.contact.forEventDetails[i].name = e.target.value;
                        setFormData(updated);
                      }}
                      className="input w-full p-2 bg-zinc-900 border border-zinc-600 rounded-xl text-white text-sm"
                    />
                  </fieldset>
                  <fieldset>
                    <legend className="font-semibold mb-1 md:text-sm text-xs text-gray-300">Phone</legend>
                    <input
                      type="text"
                      required
                      value={formData?.contact?.forEventDetails?.[i]?.ph_no || ''}
                      onChange={(e) => {
                        const updated = JSON.parse(JSON.stringify(formData));
                        updated.contact.forEventDetails[i].ph_no = e.target.value;
                        setFormData(updated);
                      }}
                      className="input w-full p-2 bg-zinc-900 border border-zinc-600 rounded-xl text-white text-sm"
                    />
                  </fieldset>
                </div>
              ))}
            </div>

            <fieldset>
              <legend className="text-sm text-gray-400">Instagram</legend>
              <input
                type="text"
                value={formData?.social_media?.instagram || ''}
                onChange={(e) => handleInputChange(e, 'social_media.instagram')}
                className="input w-full p-3 bg-zinc-900 border border-zinc-600 rounded-xl text-white text-sm"
                required
              />
            </fieldset>
            <fieldset>
              <legend className="text-sm text-gray-400">Email</legend>
              <input
                type="email"
                value={formData?.social_media?.mail || ''}
                onChange={(e) => handleInputChange(e, 'social_media.mail')}
                className="input w-full p-3 bg-zinc-900 border border-zinc-600 rounded-xl text-white text-sm"
                required
              />
            </fieldset>

            <div className="flex justify-center">
              <Link to="/admin/EventDetails">
                <button
                  className="text-xs md:text-sm w-32 py-2 px-3 font-semibold mt-6 border-primary border text-primary rounded-full hover:bg-primary hover:text-white transition"
                >
                  Next
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SymposiumDetails;


// import React, { useContext, useState } from 'react';
// import upload_area from '../../assets/upload_area_dark.png';
// import axios from 'axios';
// import { BASE_URL } from '../../Utils/constants';
// import FormContext from '../../Utils/FormContext';
// import { Link } from 'react-router-dom';

// const SymposiumDetails = () => {
//   const [imagePreview, setImagePreview] = useState(null);
//   const [videoPreview, setVideoPreview] = useState(null);
//   const { formData, setFormData } = useContext(FormContext);
//   const [uploading, setUploading] = useState({});
//   const setUploadStatus = (field, value) => {
//     setUploading(prev => ({ ...prev, [field]: value }));
//   };

//   const createMediaUrl = async (file) => {
//     const formdata = new FormData();
//     formdata.append('media', file);

//     try {
//       const response = await axios.post(`${BASE_URL}upload-media`, formdata, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         withCredentials: true,
//       });

//       if (response.data.success) {
//         return response.data.image_url;
//       } else {
//         console.error('Upload failed', response.data);
//         return '';
//       }
//     } catch (err) {
//       console.error('Error uploading media', err);
//       return '';
//     }
//   };

//   const handleInputChange = (e, path) => {
//     const value = e.target.value;
//     const keys = path.split('.');

//     setFormData(prev => {
//       const updated = { ...prev };
//       let target = updated;

//       for (let i = 0; i < keys.length - 1; i++) {
//         if (!target[keys[i]]) target[keys[i]] = {};
//         target = target[keys[i]];
//       }

//       target[keys[keys.length - 1]] = value;
//       return updated;
//     });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4 mt-10">
//       <div className="bg-zinc-950 p-8 rounded-lg shadow-xl w-full max-w-md">
//         <h3 className='text-sm sm:text-base md:text-xl text-primary font-bold text-center mb-3'>Main Event Details</h3>

//         <form onSubmit={(e) => e.preventDefault()} className="p-4 space-y-4">
//           {/* Text inputs */}
//           <fieldset>
//             <legend className="font-semibold mb-1 md:text-sm text-xs">Event Name</legend>
//             <input type="text" value={formData?.name || ''} onChange={(e) => handleInputChange(e, 'name')}
//               className="input w-full p-3 border focus:ring focus:ring-primary border-primary rounded-lg text-sm" required />
//           </fieldset>

//           <fieldset>
//             <legend className="font-semibold mb-1 md:text-sm text-xs">Event Description</legend>
//             <textarea value={formData?.description || ''} onChange={(e) => handleInputChange(e, 'description')}
//               className="input text-sm w-full h-fit focus:ring focus:ring-primary p-3 border border-primary rounded-lg" />
//           </fieldset>

//           <fieldset>
//             <legend className="font-semibold mb-1 md:text-sm text-xs">About the event</legend>
//             <textarea value={formData?.about || ''} onChange={(e) => handleInputChange(e, 'about')}
//               className="input text-sm w-full focus:ring focus:ring-primary h-fit p-3 border border-primary rounded-lg" rows="5" />
//           </fieldset>

//           <fieldset>
//             <legend className="font-semibold mb-1 md:text-sm text-xs">Event Organizers</legend>
//             <input type="text" value={formData?.organizers || ''} onChange={(e) => handleInputChange(e, 'organizers')}
//               className="input text-sm w-full focus:ring focus:ring-primary p-3 border border-primary rounded-lg" />
//           </fieldset>

//           <fieldset>
//             <legend className="font-semibold mb-1 md:text-sm text-xs">Organizers Description</legend>
//             <input type="text" value={formData?.organizers_description || ''} onChange={(e) => handleInputChange(e, 'organizers_description')}
//               className="input text-sm w-full focus:ring focus:ring-primary p-3 border border-primary rounded-lg" />
//           </fieldset>

//           <fieldset>
//             <legend className="font-semibold mb-1 md:text-sm text-xs">Date</legend>
//             <input type="date" value={formData?.Date?.split('T')[0] || ''} onChange={(e) => handleInputChange(e, 'Date')}
//               className="input w-full p-3 focus:ring focus:ring-primary border border-primary rounded-lg text-sm" />
//           </fieldset>

//           {/* Logo upload */}
//           <fieldset>
//             <legend className="font-semibold mb-1 md:text-sm text-xs">Event Logo</legend>
//             <label htmlFor="file-input-image">
//               <div className="relative w-28 h-28 m-5 rounded-lg overflow-hidden cursor-pointer border">
//                 <img
//                   src={formData?.logo || imagePreview || upload_area}
//                   className="w-full h-full object-cover rounded-lg"
//                   alt="Upload"
//                 />
//                 {uploading["logo"] && (
//                   <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                     <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   </div>
//                 )}
//               </div>
//             </label>

//             <input
//               type="file"
//               hidden
//               id="file-input-image"
//               accept="image/*"
//               onChange={async (e) => {
//                 const file = e.target.files[0];
//                 if (!file) return;

//                 // Show preview immediately
//                 setImagePreview(URL.createObjectURL(file));

//                 // Set uploading to true BEFORE starting upload
//                 setUploadStatus("logo", true);

//                 const url = await createMediaUrl(file);
//                 if (url) {
//                   setFormData(prev => ({ ...prev, logo: url }));
//                 }

//                 // After upload completes
//                 setUploadStatus("logo", false);

//               }}
//             />
//           </fieldset>

//           {/* Video upload */}
//           <fieldset>
//             <legend className="font-semibold mb-1 md:text-sm text-xs">Home Background Video</legend>
//             <label htmlFor="file-input-video">
//               <div className="relative w-28 h-28 m-5 rounded-lg overflow-hidden cursor-pointer border">
//                 {formData?.back_groud_video || videoPreview ? (
//                   <video
//                     src={formData?.back_groud_video || videoPreview}
//                     className="w-full h-full object-cover pointer-events-none"
//                     muted
//                     autoPlay
//                     loop
//                   />
//                 ) : (
//                   <img src={upload_area} className="w-full h-full object-cover" alt="Upload" />
//                 )}

//                 <div className="absolute inset-0 bg-black/40 text-white flex items-center justify-center text-xs opacity-0 hover:opacity-100 transition">
//                   Click to change video
//                 </div>

//                 {uploading["bgVideo"] && (
//                   <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                     <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   </div>
//                 )}
//               </div>
//             </label>
//             <input
//               type="file"
//               hidden
//               id="file-input-video"
//               accept="video/*"
//               onChange={async (e) => {
//                 const file = e.target.files[0];
//                 if (!file) return;
//                 setVideoPreview(URL.createObjectURL(file));
//                 setUploadStatus("bgVideo", true);
//                 const url = await createMediaUrl(file);
//                 if (url) {
//                   setFormData(prev => ({ ...prev, back_groud_video: url }));
//                 }
//                 setUploadStatus("bgVideo", false);
//               }}
//             />
//           </fieldset>

//           {/* Location, Fees, Team size */}
//           <fieldset>
//             <legend className="font-semibold mb-1 md:text-sm text-xs">Location</legend>
//             <input type="text" value={formData?.location || ''} onChange={(e) => handleInputChange(e, 'location')}
//               className="input w-full p-3 focus:ring focus:ring-primary border border-primary rounded-lg text-sm" />
//           </fieldset>

//           <fieldset>
//             <legend className="font-semibold mb-1 md:text-sm text-xs">Registration Fees</legend>
//             <input type="number" value={formData?.RegistrationFees || ''} onChange={(e) => handleInputChange(e, 'RegistrationFees')}
//               className="input w-full p-3 focus:ring focus:ring-primary border border-primary rounded-lg text-sm" />
//           </fieldset>

//           <fieldset>
//             <legend className="font-semibold mb-1 md:text-sm text-xs">Maximum members per team</legend>
//             <input type="number" value={formData?.perTeamSize || ''} onChange={(e) => handleInputChange(e, 'perTeamSize')}
//               className="input w-full p-3 focus:ring focus:ring-primary border border-primary rounded-lg text-sm" />
//           </fieldset>

//           {/* Contact Details */}
//           <h1 className='font-bold'>Contact Details</h1>
//           <h3 className='font-semibold text-primary'>For Registration</h3>
//           {[0, 1].map(i => (
//             <div className='flex gap-2 mb-2' key={i}>
//               <fieldset>
//                 <legend className="font-semibold mb-1 md:text-sm text-xs">Name</legend>
//                 <input type="text"
//                   value={formData?.contact?.forRegistrationDetails?.[i]?.name || ''}
//                   onChange={(e) => {
//                     const updated = JSON.parse(JSON.stringify(formData));
//                     updated.contact.forRegistrationDetails[i].name = e.target.value;
//                     setFormData(updated);
//                   }}
//                   className="input w-full focus:ring focus:ring-primary p-3 border border-primary rounded-lg text-sm"
//                 />
//               </fieldset>
//               <fieldset>
//                 <legend className="font-semibold mb-1 md:text-sm text-xs">Phone</legend>
//                 <input type="text"
//                   value={formData?.contact?.forRegistrationDetails?.[i]?.ph_no || ''}
//                   onChange={(e) => {
//                     const updated = JSON.parse(JSON.stringify(formData));
//                     updated.contact.forRegistrationDetails[i].ph_no = e.target.value;
//                     setFormData(updated);
//                   }}
//                   className="input w-full focus:ring focus:ring-primary p-3 border border-primary rounded-lg text-sm"
//                 />
//               </fieldset>
//             </div>
//           ))}

//           <h3 className='font-semibold text-primary'>For Event</h3>
//           {[0, 1].map(i => (
//             <div className='flex gap-2 mb-2' key={i}>
//               <fieldset>
//                 <legend className="font-semibold mb-1 md:text-sm text-xs">Name</legend>
//                 <input type="text"
//                   value={formData?.contact?.forEventDetails?.[i]?.name || ''}
//                   onChange={(e) => {
//                     const updated = JSON.parse(JSON.stringify(formData));
//                     updated.contact.forEventDetails[i].name = e.target.value;
//                     setFormData(updated);
//                   }}
//                   className="input w-full focus:ring focus:ring-primary p-3 border border-primary rounded-lg text-sm"
//                 />
//               </fieldset>
//               <fieldset>
//                 <legend className="font-semibold mb-1 md:text-sm text-xs">Phone</legend>
//                 <input type="text"
//                   value={formData?.contact?.forEventDetails?.[i]?.ph_no || ''}
//                   onChange={(e) => {
//                     const updated = JSON.parse(JSON.stringify(formData));
//                     updated.contact.forEventDetails[i].ph_no = e.target.value;
//                     setFormData(updated);
//                   }}
//                   className="input w-full focus:ring focus:ring-primary p-3 border border-primary rounded-lg text-sm"
//                 />
//               </fieldset>
//             </div>
//           ))}

//           {/* Social Media */}
//           <fieldset>
//             <legend className="font-semibold mb-1 md:text-sm text-xs">Instagram</legend>
//             <input type="text" value={formData?.social_media?.instagram || ''} onChange={(e) => handleInputChange(e, 'social_media.instagram')}
//               className="input w-full p-3 border focus:ring focus:ring-primary border-primary rounded-lg text-sm" />
//           </fieldset>

//           <fieldset>
//             <legend className="font-semibold mb-1 md:text-sm text-xs">Mail</legend>
//             <input type="email" value={formData?.social_media?.mail || ''} onChange={(e) => handleInputChange(e, 'social_media.mail')}
//               className="input w-full  focus:ring focus:ring-primary p-3 border border-primary rounded-lg text-sm" />
//           </fieldset>

//           {/* Navigation */}
//           <div className="flex justify-center">
//             <Link to="/admin/EventDetails">
//               <button
//                 className="text-xs md:text-sm w-32 py-2 px-3 font-semibold mt-6 border-primary border text-primary rounded-full hover:bg-primary hover:text-white transition"
//                 onClick={() => console.log(formData)}
//               >
//                 Next
//               </button>
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SymposiumDetails;

