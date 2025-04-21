import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../Utils/constants';

const ConfirmationBox = ({setFilterRegistrationDetails,setRegistrationDetails,setShowConfirmation}) => {
    const deleteRecords = async () => {
        try {
          await axios.delete(`${BASE_URL}deteteRegistration`, {
            withCredentials: true,
          });
          setFilterRegistrationDetails([]);
          setRegistrationDetails([]);
        } catch (err) {
          console.log(err);
        }
      };
    return (
        <div className='fixed  inset-0 flex justify-center items-center bg-black/90'>
            <div className='bg-zinc-950 p-8 font-bold'>
                <p>Do You want to delete all the Registration?</p>
                <div className='flex justify-around mt-5'>
                    <button className="border  border-primary  text-primary rounded-full p-2 w-28 hover:bg-primary hover:text-white transition" onClick={()=>{setShowConfirmation(false)}}>  
                        Cancel                      
                    </button>
                    <button className="border  border-red-500  text-red-500 rounded-full p-2 w-28 hover:bg-red-500 hover:text-white transition" onClick={deleteRecords}>
                        Delete
                    </button>
                </div>
            </div>
        </div>

    )
}

export default ConfirmationBox
