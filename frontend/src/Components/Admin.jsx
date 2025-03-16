import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { BASE_URL } from '../Utils/constants.js'
import ConfirmationBox from "./ConfirmationBox.jsx";
import { ToastContainer, toast } from 'react-toastify';


const Admin = () => {
  const [RegistrationDetails, setRegistrationDetails] = useState([]);
  const [FilterRegistrationDetails, setFilterRegistrationDetails] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [RegistrationFormStatus, setRegistrationFormStatus] = useState(null);
  const navigate = useNavigate();

  // Check authentication from the backend
  const checkAuth = async () => {
    try {
      const response = await axios.get(`${BASE_URL}checkAuth`, {
        withCredentials: true, // Ensures cookies are sent with the request
      });
      if (response.data.authenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setIsAuthenticated(false);
    }
  };
  useEffect(() => {
    checkAuth();
    if (isAuthenticated === false) {
      navigate("/login");
    } else if (isAuthenticated) {
      fetchRegistrationData(); //if user is admin fetch registration record
    }
  }, [isAuthenticated]); // Run only once on mount


  //fetch registration record
  const fetchRegistrationData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}getregisterationdetails`, {
        withCredentials: true,
      });
      setRegistrationDetails(response.data);
      setFilterRegistrationDetails(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const downloadWordDocument = () => {
  //   if (FilterRegistrationDetails.length === 0) {
  //     alert("No data to download");
  //     return;
  //   }

  //   const doc = new jsPDF();
  //   autoTable(doc, {
  //     head: [["S.No", "Participant1 Name", "Roll No", "Participant2 Name", "Roll No", "College", "Event", "Phone No"]],
  //     body: FilterRegistrationDetails.map((item, index) => [
  //       index + 1,
  //       item.Participant1_Name,
  //       item.Participant1_rollno,
  //       item.Participant2_Name,
  //       item.Participant2_rollno,
  //       item.college,
  //       item.events,
  //       item.phoneNo,
  //     ]),
  //   });
  //   doc.save("TableData.pdf");
  // };



  //open and close registration form 
 
 
  const toggleRegistrationFormStatus = async () => {
    let isClosed;
    try {
      const getStatus = await axios.get(`${BASE_URL}registration-status`, {
        withCredentials: true, 
      });
      isClosed=getStatus.data.isRegistrationClosed;

      let res = await axios.post(`${BASE_URL}registration-status`, {
        isClosed: !isClosed
      });
      toast.success(res.data.message, {
        position: 'top-right',
        style: {
          backgroundColor: "#18181b",
          color: "#ffffff",
        },
      });
     setRegistrationFormStatus(res.data.RegistrationFormClosed);
    console.log(res.data.RegistrationFormClosed);
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data, {
        position: 'top-right', style: {
          backgroundColor: "#18181b",
          color: "#ffffff",
        },
      });
    }
  }

  //download the registration details which in the table
  const downloadExcelFile = () => {
    if (FilterRegistrationDetails.length === 0) {
      alert("No data to download");
      return;
    }

    // Define the headers and map the data
    const tableData = [
      ["S.No", "Participant1 Name", "Roll No", "Participant2 Name", "Roll No", "College", "Event", "Phone No"],
      ...FilterRegistrationDetails.map((item, index) => [
        index + 1,
        item.Participant1_Name,
        item.Participant1_rollno,
        item.Participant2_Name,
        item.Participant2_rollno,
        item.college,
        item.events,
        item.phoneNo,
      ]),
    ];

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(tableData);

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    // Write the Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    saveAs(data, "RegistrationData.xlsx");
  };


  //filter the registration details based on the events
  const filterFunction = (e) => {
    if (e.target.value === "All") {
      setFilterRegistrationDetails(RegistrationDetails);
    } else {
      setFilterRegistrationDetails(RegistrationDetails.filter((item) => item.events.includes(e.target.value)));
    }
  };

  if (isAuthenticated === null) {
    return <p>Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return RegistrationDetails.length === 0 ? (
    <div>
      <p className="font-semibold text-center my-36" >No data found</p>
    </div>
  ) : (
    <div className="my-4">
      <div className="flex justify-end items-end gap-3 mx-4">
        {//close And open registration button
          <button className= {`text-xs md:text-sm border ${RegistrationFormStatus ?' border-green-500  text-green-500  hover:bg-green-500' : 'border-red-500  text-red-500 hover:bg-red-500'} rounded-full py-2 px-3 hover:text-white transition `} onClick={() => {toggleRegistrationFormStatus()}}>
           {RegistrationFormStatus?'open Registrations' :'close Registrations' }
          </button>
        }

        {/* delete all the registration */}
        <button className="text-xs md:text-sm border  border-red-500  text-red-500 rounded-full py-2 px-3 hover:bg-red-500 hover:text-white transition" onClick={() => { setShowConfirmation(true) }}>
          Delete All
        </button>

          {/* filter the details */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend font-semibold mb-1">Filter</legend>
          <select name="event" onChange={filterFunction} className="select w-28 md:w-32 border border-primary rounded-lg focus:ring focus:ring-primary">
            <option disabled>Select here</option>
            <option value="All">All</option>
            <option value="Event1">Event 1</option>
            <option value="Event2">Event 2</option>
            <option value="Event3">Event 3</option>
            <option value="Event4">Event 4</option>
          </select>
        </fieldset>
      </div>

      {/* delete confirmation box */}
      {showConfirmation && <ConfirmationBox setFilterRegistrationDetails={setFilterRegistrationDetails} setRegistrationDetails={setRegistrationDetails} setShowConfirmation={setShowConfirmation} />}

      {
        FilterRegistrationDetails.length === 0 ? (<div>
          <p className="font-semibold text-center my-36" >No data found</p>
        </div>) : (
          <div className="p-4 overflow-x-auto">
            <table className="border-collapse border  border-gray-300 w-full min-w-max text-sm md:text-base">
              <thead>
                <tr className="bg-zinc-950 text-primary">
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">Participant1 Name</th>
                  <th className="border p-2">Roll No</th>
                  <th className="border p-2">Participant2 Name</th>
                  <th className="border p-2">Roll No</th>
                  <th className="border p-2">College</th>
                  <th className="border p-2">Event</th>
                  <th className="border p-2">Phone No</th>
                </tr>
              </thead>
              <tbody>
                {FilterRegistrationDetails.map((item, index) => (
                  <tr key={item._id} className="text-center">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{item.Participant1_Name}</td>
                    <td className="border p-2">{item.Participant1_rollno}</td>
                    <td className="border p-2">{item.Participant2_Name}</td>
                    <td className="border p-2">{item.Participant2_rollno}</td>
                    <td className="border p-2">{item.college}</td>
                    <td className="border p-2">{item.events}</td>
                    <td className="border p-2">{item.phoneNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button
                className="text-xs md:text-sm py-2 px-3 border  border-primary  text-primary rounded-full hover:bg-primary hover:text-white transition"
                onClick={downloadExcelFile}>
                Download
              </button>
            </div>
            <ToastContainer />
          </div>

        )
      }
    </div>
  );
};

export default Admin;
