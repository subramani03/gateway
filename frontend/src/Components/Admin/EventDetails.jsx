import React, { useContext, useState, useRef } from 'react';
import upload_area from '../../assets/upload_area_dark.png';
import axios from 'axios';
import { BASE_URL } from '../../Utils/constants';
import FormContext from '../../Utils/FormContext';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const EventDetails = () => {
    const { formData, setFormData, fetchEventDetails } = useContext(FormContext);
    const [imagePreviews, setImagePreviews] = useState([]);
    const textareaRef = useRef(null);

    const addNewEvent = () => {
        const updated = { ...formData };
        updated.events.push({
            name: '',
            date: '',
            venue: '',
            imgUrl: '',
            time: '',
            description: '',
            rules: [''],
        });
        setFormData(updated);
        setImagePreviews((prev) => [...prev, '']);
    };

    // const createImageUrl = async (file) => {
    //     let formdata = new FormData();
    //     formdata.append('eventLogo', file);
    //     try {
    //         let response = await axios.post(`${BASE_URL}upload`, formdata, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //             withCredentials: true,
    //         });

    //         if (response.data.success) {
    //             return response.data.image_url;
    //         } else {
    //             console.error('Upload failed', response.data);
    //             return '';
    //         }
    //     } catch (err) {
    //         console.error('Error uploading image', err);
    //         return '';
    //     }
    // };


    const createImageUrl = async (file) => {
        let formdata = new FormData();
        formdata.append('media', file);
        try {
            let response = await axios.post(`${BASE_URL}upload-media`, formdata, {
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



    const handleImageChange = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        const updatedPreviews = [...imagePreviews];
        updatedPreviews[index] = previewUrl;
        setImagePreviews(updatedPreviews);
        const imageUrl = await createImageUrl(file);
        if (imageUrl) {
            const updated = { ...formData };
            updated.events[index].imgUrl = imageUrl;
            setFormData(updated);
        }
    };

    const handleEventChange = (index, field, value) => {
        const updated = { ...formData };
        updated.events[index][field] = value;
        setFormData(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const res = await axios.put(`${BASE_URL}updateEventDetails`, formData); // use POST if it's a new doc
            console.log(res.data);
            toast.success(res.data, {
                position: 'top-right',
                style: {
                    backgroundColor: "#18181b",
                    color: "#ffffff",
                },
            });
        } catch (err) {
            toast.error(err.response.data, {
                position: 'top-right', style: {
                    backgroundColor: "#18181b",
                    color: "#ffffff",
                },
            }); console.error(err);

        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 mt-10">
            <div className="bg-zinc-950 p-8 rounded-lg shadow-xl w-full max-w-md">
                <div className='relative'>
                    <button className='absolute top-1 text-base md:text-xl w-3  font-semibold  text-primary'>
                        <Link to={'/admin/SymposiumDetails'}><i className="fa-solid fa-arrow-left"></i>
                        </Link>
                    </button>
                    <h3 className='text-sm sm:text-base md:text-xl text-primary font-bold text-center mb-10'>Event Details</h3>
                </div>

                {formData?.events?.map((element, index) => (
                    <div key={index}>
                        <div className='flex justify-between items-center'>
                            <h3 className='text-sm sm:text-base md:text-xl text-primary font-bold'>{`Event ${index + 1}`}</h3>
                            {formData.events.length > 1 && (
                                <button
                                    type="button"
                                    className="text-red-500 font-bold text-lg hover:text-red-700"
                                    onClick={() => {
                                        const updated = { ...formData };
                                        updated.events.splice(index, 1);
                                        setFormData(updated);
                                    }}
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            )}
                        </div>

                        {/* Event Name */}
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs">Event Name</legend>
                            <input
                                type="text"
                                placeholder="Event Name"
                                value={element.name}
                                className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                                onChange={(e) => handleEventChange(index, 'name', e.target.value)}
                            />
                        </fieldset>

                        {/* Date */}
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs">Date</legend>
                            <input
                                type="date"
                                value={element.date.split('T')[0]}
                                className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                                onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                            />
                        </fieldset>

                        {/* Location */}
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs">Venue</legend>
                            <input
                                type="text"
                                placeholder="Venue"
                                value={element.venue}
                                className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                                onChange={(e) => handleEventChange(index, 'venue', e.target.value)}
                            />
                        </fieldset>

                        {/* Image Upload */}
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs">Event logo</legend>
                            <label htmlFor={`file-input-${index}`}>
                                <img
                                    src={imagePreviews[index] || element.imgUrl || upload_area}
                                    className="w-28 h-28 m-5 object-cover rounded-lg cursor-pointer"
                                    alt="Upload"
                                />
                            </label>
                            <input
                                type="file"
                                hidden
                                id={`file-input-${index}`}
                                onChange={(e) => {
                                    handleImageChange(e, index)
                                    console.log(imagePreviews);
                                }
                                }
                            />
                        </fieldset>

                        {/* Time */}
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs">Time</legend>
                            <input
                                type="time"
                                placeholder="Time"
                                value={element.time}
                                className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                                onChange={(e) => handleEventChange(index, 'time', e.target.value)}
                            />
                        </fieldset>

                        {/* Description */}
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs">Event Description</legend>
                            <textarea
                                placeholder="Event Description"
                                value={element.description}
                                className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                                onChange={(e) => handleEventChange(index, 'description', e.target.value)}
                            />
                        </fieldset>

                        {/* Rules */}
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs">Rules</legend>
                            {element.rules.map((rule, ruleIndex) => (
                                <div key={ruleIndex} className="flex gap-2 items-center mb-2">
                                    <textarea
                                        onChange={(e) => {
                                            const updated = { ...formData };
                                            updated.events[index].rules[ruleIndex] = e.target.value;
                                            setFormData(updated);
                                        }}
                                        rows={4}
                                        placeholder={`Rule ${ruleIndex + 1}`}
                                        value={rule}
                                        className="w-full textarea text-sm  p-2  border border-primary rounded-lg focus:ring focus:ring-primary"
                                    />
                                    {element.rules.length > 1 && (
                                        <button
                                            type="button"
                                            className="text-red-500 font-bold text-lg hover:text-red-700"
                                            onClick={() => {
                                                const updated = { ...formData };
                                                updated.events[index].rules.splice(ruleIndex, 1);
                                                setFormData(updated);
                                            }}
                                        >
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                className="text-sm mt-1 px-3 py-1 border border-primary text-primary rounded hover:bg-primary hover:text-white transition"
                                onClick={() => {
                                    const updated = { ...formData };
                                    updated.events[index].rules.push('');
                                    setFormData(updated);
                                }}
                            >
                                + Add Rule
                            </button>
                        </fieldset>
                        <div className='my-10 border border-zinc-800 border-solid'></div>
                    </div>
                ))}

                <div className='flex justify-end'>
                    <button
                        className="text-sm sm:text-base md:text-lg flex items-center justify-center w-10 h-10 font-bold  border-primary border text-primary rounded-full p-2 hover:bg-primary hover:text-white transition"
                        onClick={addNewEvent}
                    >
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>

                <div className='flex justify-around'>
                    <button
                        className="text-xs md:text-sm w-28 py-2 px-3 font-semibold mt-6 border-primary border  text-primary  rounded-full p-2 hover:bg-primary hover:text-white transition"
                        onClick={(e) => { handleSubmit(e) }}
                    >
                        update
                    </button>

                    <button
                        className="text-xs md:text-sm w-28 py-2 px-3 font-semibold mt-6 border-red-500 border text-red-500  rounded-full p-2 hover:bg-red-500 hover:text-white transition"
                        onClick={() => {
                            fetchEventDetails();
                            toast.error('No changes were applied', {
                                position: 'top-right', style: {
                                    backgroundColor: "#18181b",
                                    color: "#ffffff",
                                },
                            });
                        }}
                    >
                        cancel
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EventDetails;
