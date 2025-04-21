import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { BASE_URL } from '../../Utils/constants.js'
import ConfirmationBox from "./ConfirmationBox.jsx";
import { ToastContainer, toast } from 'react-toastify';
import FormContext from "../../Utils/FormContext.jsx";

const Admin = ({ isAuthenticated }) => {
  const [RegistrationDetails, setRegistrationDetails] = useState([]);
  const [FilterRegistrationDetails, setFilterRegistrationDetails] = useState([]);
  // const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [RegistrationFormStatus, setRegistrationFormStatus] = useState(null);
  const { formData } = useContext(FormContext);

  // Get the maximum number of participants across all registrations
  const maxParticipants = FilterRegistrationDetails.reduce(
    (max, item) => Math.max(max, item.Participants.length),
    0
  );

  useEffect(() => {
    fetchRegistrationData(); //if user is admin fetch registration record
  }, []);

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
  console.log(FilterRegistrationDetails);

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
      isClosed = getStatus.data.isRegistrationClosed;

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

    // Build dynamic headers
    const headers = ["S.No"];
    for (let i = 0; i < maxParticipants; i++) {
      headers.push(`Participant${i + 1} Name`, `Participant${i + 1} Roll No`);
    }
    headers.push("College", "Event", "Phone No");

    // Build table rows dynamically
    const tableData = [
      headers,
      ...FilterRegistrationDetails.map((item, index) => {
        const row = [index + 1];

        // Add participant name & roll no or fallback "-"
        for (let i = 0; i < maxParticipants; i++) {
          row.push(item.Participants[i]?.name || "-", item.Participants[i]?.roll_no || "-");
        }

        row.push(item.college, item.events, item.phoneNo);
        return row;
      }),
    ];

    // Create worksheet and workbook
    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    // Convert to Excel and download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

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
          <button className={`text-xs md:text-sm border ${RegistrationFormStatus ? ' border-green-500  text-green-500  hover:bg-green-500' : 'border-red-500  text-red-500 hover:bg-red-500'} rounded-full py-2 px-3 hover:text-white transition `} onClick={() => { toggleRegistrationFormStatus() }}>
            {RegistrationFormStatus ? 'open Registrations' : 'close Registrations'}
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
            {
              formData?.events.map((e,index) => {
                console.log(e?.name)
                return (
                    <option key={index} value={e?.name}>{e?.name}</option>
                )
              })
            }
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
                  {/* <th className="border p-2">Participant1 Name</th>
                  <th className="border p-2">Roll No</th>
                  <th className="border p-2">Participant2 Name</th>
                  <th className="border p-2">Roll No</th> */}

                  {/* Dynamically render participant columns */}
                  {Array.from({ length: maxParticipants }).map((_, index) => (
                    <React.Fragment key={index}>
                      <th className="border p-2">{`Participant${index + 1} Name`}</th>
                      <th className="border p-2">{`Participant${index + 1} Roll No`}</th>
                    </React.Fragment>
                  ))}



                  <th className="border p-2">College</th>
                  <th className="border p-2">Event</th>
                  <th className="border p-2">Phone No</th>
                </tr>
              </thead>
              <tbody>
                {FilterRegistrationDetails.map((item, index) => (
                  <tr key={item._id} className="text-center">
                    <td className="border p-2">{index + 1}</td>
                    {/* Participant rows */}
                    {Array.from({ length: maxParticipants }).map((_, i) => (
                      <React.Fragment key={i}>
                        <td className="border p-2">{item.Participants[i]?.name || "-"}</td>
                        <td className="border p-2">{item.Participants[i]?.roll_no || "-"}</td>
                      </React.Fragment>
                    ))}
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


export default Admin
