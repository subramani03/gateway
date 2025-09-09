import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../Utils/constants';
import FormContext from '../Utils/FormContext';

const Registration = () => {
    const navigate = useNavigate();
    const { formData } = useContext(FormContext);
    const [isRegistrationClose, setIsRegistrationClose] = useState(null);

    // Load team size from context or localStorage
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    const initialTeamSize = formData?.perTeamSize || savedFormData?.perTeamSize || 0;
    const [teamSize, setTeamSize] = useState(initialTeamSize);

    // Load Event options from context or localStorage
    const EventOptions = formData?.events.map((event) => event?.name) || savedFormData?.events.map((event) => event?.name);
    console.log(EventOptions);


    // Store formData in localStorage when available
    useEffect(() => {
        if (formData?.perTeamSize) {
            localStorage.setItem('formData', JSON.stringify(formData));
            setTeamSize(formData.perTeamSize);
        }
    }, [formData]);

    // Fetch registration status
    useEffect(() => {
        const GetRegistrationFormStatus = async () => {
            try {
                const res = await axios.get(`${BASE_URL}registration-status`, {
                    withCredentials: true,
                });
                setIsRegistrationClose(res.data.isRegistrationClosed);
            } catch (err) {
                console.log("err :", err);
            }
        };
        GetRegistrationFormStatus();
    }, []);

    useEffect(() => {
        console.log(formData);

    }, [])

    const [formDatas, setFormDatas] = useState({
        Participants: [],
        college: "",
        department: "",
        phoneNo: "",
        events: []
    });

    useEffect(() => {
        if (formData?.symposiumType === "intra") {
            setFormDatas(prev => ({ ...prev, college: "PSGCAS" }));
        }
    }, [formData?.symposiumType, setFormDatas]);

    // Initialize participants array
    useEffect(() => {
        if (teamSize > 0) {
            const initialParticipants = Array.from({ length: teamSize }, () => ({
                name: '',
                roll_no: ''
            }));
            setFormDatas((prev) => ({
                ...prev,
                Participants: initialParticipants
            }));
        }
    }, [teamSize]);


    const [EventChecked, setEventChecked] = useState([]);

    const handleEventChecked = (e) => {
        const { checked, value } = e.target;
        setEventChecked((prev) => {
            if (checked) {
                if (prev.length >= 3) {
                    alert("You can only select up to 3 options!");
                    return prev;
                }
                return [...prev, value];
            } else {
                return prev.filter((val) => val !== value);
            }
        });
    };

    useEffect(() => {
        setFormDatas((prev) => ({
            ...prev,
            events: EventChecked
        }));
    }, [EventChecked]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDatas((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}register`, {
                formDatas
            });
            toast.success(res.data, {
                position: 'top-right',
                onClose: () => navigate('/'),
                style: {
                    backgroundColor: "#18181b",
                    color: "#ffffff",
                },
            });
        } catch (err) {
            toast.error(err.response?.data || "Registration failed", {
                position: 'top-right',
                style: {
                    backgroundColor: "#18181b",
                    color: "#ffffff",
                },
            });
        }
    };

    // Show loading if teamSize not ready yet
    if (teamSize === 0) {
        return <div className="text-white text-center mt-10">Loading...</div>;
    }

    // Show closed message
    if (isRegistrationClose) {
        return (
            <div className='flex justify-center items-center h-96 m-auto w-full md:w-5/6 p-5'>
                <p className='font-semibold'>
                    We are sorry, but registration is currently closed. Stay tuned for upcoming opportunities!
                </p>
            </div>
        );
    }

    // Main form
    return (
        <div className="flex items-center justify-center min-h-screen p-4 mt-10">
            <div className="bg-zinc-950 p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl md:text-2xl font-bold text-center text-primary mb-4">Registration Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {formDatas.Participants.map((participant, index) => (
                        <div key={index} className='flex flex-col gap-2'>
                            <fieldset className="fieldset">
                                <legend className="mb-1 font-semibold md:text-sm text-xs">{`Participant ${index + 1} Name`}</legend>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    value={participant.name}
                                    onChange={(e) => {
                                        const updated = [...formDatas.Participants];
                                        updated[index].name = e.target.value;
                                        setFormDatas({ ...formDatas, Participants: updated });
                                    }}
                                    className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                                    required
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="mb-1 font-semibold md:text-sm text-xs">{`Participant ${index + 1} Rollno`}</legend>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    value={participant.roll_no}
                                    onChange={(e) => {
                                        const updated = [...formDatas.Participants];
                                        updated[index].roll_no = e.target.value;
                                        setFormDatas({ ...formDatas, Participants: updated });
                                    }}
                                    className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                                    required
                                />
                            </fieldset>
                        </div>
                    ))}


                    {formData?.symposiumType === "intra" ?
                        (
                            // Hidden input only (not visible to user, but sent to backend)
                            <input type="hidden" name="college" value="PSGCAS" />
                        ) : (
                            <fieldset className="fieldset">
                                <legend className="font-semibold mb-1 text-xs md:text-sm">College Name</legend>
                                <input
                                    type="text"
                                    name="college"
                                    value={formDatas.college}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="input w-full p-3 text-sm border border-primary rounded-lg focus:ring-2 focus:ring-primary outline-none bg-black/30 placeholder-gray-400 transition-all"
                                    required
                                />
                            </fieldset>
                        )}

                    {/* <fieldset className="fieldset">
                        <legend className="font-semibold mb-1 md:text-sm text-xs">College Name</legend>
                        <input
                            type="text"
                            name="college"
                            value={formDatas.college}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                            required
                        />
                    </fieldset> */}

                    <fieldset className="fieldset">
                        <legend className="font-semibold mb-1 md:text-sm text-xs">Department</legend>
                        <input
                            type="text"
                            name="department"
                            value={formDatas.department}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                            required
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="font-semibold mb-1 md:text-sm text-xs">Phone No</legend>
                        <input
                            type="text"
                            name="phoneNo"
                            value={formDatas.phoneNo}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                            required
                        />
                    </fieldset>

                    <fieldset className="fieldset p-2 bg-base-100 border border-primary rounded-lg w-full">
                        <legend className="font-bold md:text-sm text-xs">Select Events</legend>
                        {EventOptions.map((event, index) => (
                            <label key={index} className="flex text-sm items-center gap-2 my-2">
                                <input
                                    type="checkbox"
                                    name="event"
                                    value={event}
                                    checked={EventChecked.includes(event)}
                                    onClick={handleEventChecked}
                                    disabled={!EventChecked.includes(event) && EventChecked.length >= 3}
                                    className="checkbox text-sm checkbox-accent border-primary rounded-md checked:bg-primary"
                                />
                                {event}
                            </label>
                        ))}
                    </fieldset>

                    <fieldset className="fieldset p-3 bg-base-100 border border-primary rounded-lg w-full">
                        <legend className="font-bold md:text-sm text-xs text-primary">
                            Join Our WhatsApp Group
                        </legend>

                        <p className="text-xs sm:text-sm md:text-base mb-2">
                            Stay updated with all event details by joining our official WhatsApp group:
                        </p>

                        <a
                            href="https://chat.whatsapp.com/F5J6ixyVDkS0prjH2kdLME?mode=ems_share_t"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-xs sm:text-sm md:text-base
               text-primary border border-primary font-bold
               px-4 sm:px-6 py-2 rounded-full
               hover:bg-primary hover:text-white transition"
                        >
                            👉 Join WhatsApp Group
                        </a>
                    </fieldset>


                    <div className='flex justify-center'>
                        <button
                            type="submit"
                            className="text-xs md:text-sm w-32 py-2 px-3 font-semibold mt-6 border-primary border text-base text-primary rounded-full hover:bg-primary hover:text-white transition"
                        >
                            Register
                        </button>
                    </div>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
};

export default Registration;
