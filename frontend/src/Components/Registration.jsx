import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../Utils/constants';

const Registration = () => {
    const navigate = useNavigate();
    const [isRegistrationClose,setisRegistrationClose]=useState(null);

    useEffect(()=>{
        const GetRegistrationFormStatus = async () => {
            try{
                const res= await axios.get(`${BASE_URL}registration-status`, {
                    withCredentials: true, // Ensures cookies are sent with the request
                  });
                  console.log(res.data.isRegistrationClosed)
                  setisRegistrationClose(res.data.isRegistrationClosed)
            }catch(err){
                console.log("err :"+err);
            }      
        }
        GetRegistrationFormStatus();

    },[])

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
            let res = await axios.post(`${BASE_URL}register`, {
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
    console.log(isRegistrationClose); 
    {return isRegistrationClose?(
        <div className='flex justify-center items-center h-96  m-auto w-full md:w-5/6 p-5 '>
            <p className='font-semibold'>We're sorry, but registration is currently closed. Stay tuned for upcoming opportunities!</p>   
        </div>
         ):(
        <div className="flex items-center justify-center min-h-screen p-4 mt-10">
            <div className="bg-zinc-950 p-8 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-center">
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-center text-primary mb-4">Registration Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs ">Participant 1 Name</legend>
                        <input type="text" placeholder="Type here"
                            name="Participant1_Name"
                            value={formData.Participant1_Name}
                            onChange={handleChange}
                            className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                            required />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs">Participant 1 Rollno</legend>
                        <input type="text" placeholder="Type here" name="Participant1_rollno" value={formData.Participant1_rollno} onChange={handleChange}
                            className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                            required />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs">Participant 2 Name</legend>
                        <input type="text" placeholder="Type here" name="Participant2_Name" value={formData.Participant2_Name} onChange={handleChange}
                            className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary "
                            />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs">Participant 2 Rollno</legend>
                        <input type="text" placeholder="Type here" name="Participant2_rollno" value={formData.Participant2_rollno} onChange={handleChange}
                            className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary "
                            />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs">College Name</legend>
                        <input type="text" placeholder="Type here" name="college" value={formData.college} onChange={handleChange}
                            className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                            required />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold mb-1 md:text-sm text-xs">Phone no</legend>
                        <input type="text" placeholder="Type here" name="phoneNo" value={formData.phoneNo} onChange={handleChange}
                            className="input text-sm w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                            required />
                    </fieldset>

                    <fieldset className="fieldset p-2 bg-base-100 border border-primary rounded-lg w-full">
                        <legend className="fieldset-legend font-bold md:text-sm text-xs">Select Events</legend>

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
                                            className="checkbox text-sm checkbox-accent border-primary rounded-md checked:bg-primary" />
                                        {events}
                                    </label>
                                )
                            })
                        }

                    </fieldset>
                    <div className='flex justify-center '>
                    <button
                        type="submit"
                        className="text-xs md:text-sm w-32 py-2 px-3 font-semibold mt-6 border-primary border text-base text-primary  rounded-full p-2 hover:bg-primary hover:text-white transition"
                    >
                        Register
                    </button>
                    </div>
                  
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
}
}

export default Registration

