import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {

    const navigate = useNavigate();
    // const notify = () => {
    //     toast.success("Registered successfully!", {
    //       position: "top-right",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //   };


    const [formData, setFormData] = useState({
        Participant1_Name: "",
        Participant1_rollno: "",
        Participant2_Name: "",
        Participant2_rollno: "",
        college: "",
        phoneNo: "",
        events: []
    });

    let EventOption = ["Event1", "Event2", "Event3", "Event4"];
    let [EventChecked, setEventChecked] = useState([]);

    let handleEventChecked = (e) => {
        let { checked, value } = e.target;
        // setEventChecked((prev) => checked ? [...prev, value] : prev.filter((events) => events !== value));
        setEventChecked((prev) => {
            if (checked) {
                // If already 3 items are selected, prevent adding more
                if (prev.length >= 3) {
                    alert("You can only select up to 3 options!");
                    return prev;
                }
                return [...prev, value];
            } else {
                // Remove unchecked value
                return prev.filter((val) => val !== value);
            }
        });
    };



    useEffect(() => {
        setFormData({ ...formData, events: EventChecked });
        console.log(EventChecked);
    }, [EventChecked])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let res = await axios.post("http://localhost:3000/register", {
                formData
            });
            toast.success(res.data, {
                position: 'top-right',
                onClose: () => {
                    navigate('/');
                },
                style: {
                    backgroundColor: "#18181b", 
                    color: "#ffffff",           
                  }, 
            });
            console.log(res.data);
        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data, { position: 'top-right',  style: {
                backgroundColor: "#18181b", 
                color: "#ffffff",           
              }, 
            });
        }
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(formData);
    //     alert("Registration successful!");
    // };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 mt-10">
            <div className="bg-zinc-950 p-8 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-center">
                </div>
                <h2 className="text-2xl font-bold text-center text-primary mb-4">Registration Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold mb-1">Participant 1 Name</legend>
                        <input type="text" placeholder="Type here"
                            name="Participant1_Name"
                            value={formData.Participant1_Name}
                            onChange={handleChange}
                            className="input w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                            required />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold mb-1">Participant 1 Rollno</legend>
                        <input type="text" placeholder="Type here" name="Participant1_rollno" value={formData.Participant1_rollno} onChange={handleChange}
                            className="input w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                            required />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold mb-1">Participant 2 Name</legend>
                        <input type="text" placeholder="Type here" name="Participant2_Name" value={formData.Participant2_Name} onChange={handleChange}
                            className="input w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary "
                            required />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold mb-1">Participant 2 Rollno</legend>
                        <input type="text" placeholder="Type here" name="Participant2_rollno" value={formData.Participant2_rollno} onChange={handleChange}
                            className="input w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary "
                            required />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold mb-1">College Name</legend>
                        <input type="text" placeholder="Type here" name="college" value={formData.college} onChange={handleChange}
                            className="input w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                            required />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold mb-1">Phone no</legend>
                        <input type="text" placeholder="Type here" name="phoneNo" value={formData.phoneNo} onChange={handleChange}
                            className="input w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                            required />
                    </fieldset>

                    {/* <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold mb-1">Select a Event</legend>
                        <select defaultValue="Pick a browser" name="event" value={formData.event} onChange={handleChange} className="select  w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200">
                            <option disabled={true}>Select here</option>
                            <option>Event 1</option>
                            <option>Event 2</option>
                            <option>Event 3</option>
                            <option>Event 4</option>
                        </select>
                    </fieldset> */}

                    <fieldset className="fieldset p-2 bg-base-100 border border-primary rounded-lg w-full">
                        <legend className="fieldset-legend font-bold">Select Events</legend>

                        {
                            EventOption.map((events, index) => {
                                return (
                                    <label key={index} className="fieldset-label flex items-center gap-2 my-2">
                                        <input type="checkbox"
                                            name="event"
                                            value={events}
                                            checked={EventChecked.includes(events)}
                                            onClick={(e) => { handleEventChecked(e) }}
                                            disabled={!EventChecked.includes(events) && EventChecked.length >= 3}
                                            className="checkbox checkbox-accent border-primary rounded-md checked:bg-primary" />
                                        {events}
                                    </label>
                                )
                            })
                        }
                        {/* <label className="fieldset-label flex items-center gap-2 my-2">
                            <input type="checkbox"  className="checkbox" />
                             Event1
                        </label>
                        <label className="fieldset-label flex items-center gap-2 my-2">
                            <input type="checkbox"  className="checkbox" />
                             Event2
                        </label>
                        <label className="fieldset-label flex items-center gap-2 my-2">
                            <input type="checkbox"  className="checkbox" />
                             Event3
                        </label>
                        <label className="fieldset-label flex items-center gap-2 my-2">
                            <input type="checkbox"  className="checkbox" />
                             Event4
                        </label> */}

                    </fieldset>

                    <button
                        type="submit"
                        // onClick={notify}
                        className="w-full font-bold  border-primary border text-xl text-primary  rounded-full p-3 hover:bg-primary hover:text-white transition"
                    >
                        Register
                    </button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
}

export default Registration

