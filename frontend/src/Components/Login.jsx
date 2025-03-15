import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer ,toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res =await axios.post("http://localhost:3000/adminLogin", {
                formData
            },{
                withCredentials: true,
            })
            console.log(res);
            toast.success(res.data,{position:"top-right", style: {
                backgroundColor: "#18181b", 
                color: "#ffffff",           
              }}, );
            navigate('/admin')
        } catch (err) {
            console.log("error :" + err);
            toast.error(err.response.data, {position: 'top-right', style: {
                backgroundColor: "#18181b", 
                color: "#ffffff",           
              }}, );
        }

    };
    return (
        <div className="flex justify-center p-4 my-10">
            <div className="bg-zinc-950 p-8 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-center">
                </div>
                <h2 className="text-2xl font-bold text-center text-primary mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold mb-3">User Name</legend>
                        <input type="text" placeholder="Type here"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="input w-full p-3 border border-primary rounded-lg focus:ring focus:ring-primary"
                            required />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold mb-3">Password</legend>
                        <input type="password" placeholder="Type here" name="password"
                            value={formData.password} onChange={handleChange} className="input w-full mb-5 p-3 border border-primary rounded-lg focus:ring focus:ring-primary" required />
                    </fieldset>

                    <button
                        type="submit"
                        // onClick={notify}
                        className="w-full  font-bold  border-primary border text-xl text-primary  rounded-full p-3 hover:bg-primary hover:text-white transition"
                    >
                        Login
                    </button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}

export default Login
