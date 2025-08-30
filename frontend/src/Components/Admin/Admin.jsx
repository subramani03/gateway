import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { BASE_URL } from '../../Utils/constants.js';
import ConfirmationBox from "./ConfirmationBox.jsx";
import { ToastContainer, toast } from 'react-toastify';
import FormContext from "../../Utils/FormContext.jsx";
import RegistrationCharts from "./RegistrationCharts";

const Admin = ({ isAuthenticated }) => {
  const [RegistrationDetails, setRegistrationDetails] = useState([]);
  const [FilterRegistrationDetails, setFilterRegistrationDetails] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [RegistrationFormStatus, setRegistrationFormStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { formData } = useContext(FormContext);

  const maxParticipants = FilterRegistrationDetails.reduce(
    (max, item) => Math.max(max, item.Participants.length),
    0
  );

  const totalPages = Math.ceil(FilterRegistrationDetails.length / itemsPerPage);
  const paginatedData = FilterRegistrationDetails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log(totalPages)
  useEffect(() => {
    fetchRegistrationData();
  }, []);

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

  const deleteRegistration = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}deteteOneRegistration/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data, {
        style: { backgroundColor: "#18181b", color: "#ffffff" },
        onClose: () => {
          const updated = RegistrationDetails.filter(item => item._id !== id);
          setRegistrationDetails(updated);
          setFilterRegistrationDetails(updated);
        }
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Deletion failed", {
        style: { backgroundColor: "#18181b", color: "#ffffff" }
      });
    }
  };

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
        style: { backgroundColor: "#18181b", color: "#ffffff" },
      });
      setRegistrationFormStatus(res.data.RegistrationFormClosed);
    } catch (err) {
      toast.error(err.response.data, {
        position: 'top-right',
        style: { backgroundColor: "#18181b", color: "#ffffff" },
      });
    }
  };

  const downloadExcelFile = () => {
    if (FilterRegistrationDetails.length === 0) {
      alert("No data to download");
      return;
    }

    const headers = ["S.No"];
    for (let i = 0; i < maxParticipants; i++) {
      headers.push(`Participant${i + 1} Name`, `Participant${i + 1} Roll No`);
    }
    headers.push("College", "Department", "Event", "Phone No");

    const tableData = [
      headers,
      ...FilterRegistrationDetails.map((item, index) => {
        const row = [index + 1];
        for (let i = 0; i < maxParticipants; i++) {
          row.push(item.Participants[i]?.name || "-", item.Participants[i]?.roll_no || "-");
        }
        row.push(item.college, item.department, item.events, item.phoneNo);
        return row;
      }),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(data, "RegistrationData.xlsx");
  };

  const filterFunction = (e) => {
    setCurrentPage(1);
    if (e.target.value === "All") {
      setFilterRegistrationDetails(RegistrationDetails);
    } else {
      setFilterRegistrationDetails(RegistrationDetails.filter((item) => item.events.includes(e.target.value)));
    }
  };

  if (!isAuthenticated || !formData) return null;

  return (
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
              formData?.events.map((e, index) => {
                console.log(e?.name)
                return (
                  <option key={index} value={e?.name}>{e?.name}</option>
                )
              })
            }
          </select>
        </fieldset>
      </div>
      {showConfirmation && <ConfirmationBox setFilterRegistrationDetails={setFilterRegistrationDetails} setRegistrationDetails={setRegistrationDetails} setShowConfirmation={setShowConfirmation} />}

  <div className="p-4 w-full">
  <div className="overflow-x-auto rounded-xl border border-zinc-700 bg-zinc-950 shadow-lg">
    <table className="min-w-max w-full text-sm text-left border-collapse">
      <thead className="bg-zinc-900 text-primary text-xs sticky top-0 z-10">
        <tr>
          <th className="border border-zinc-700 px-3 py-2 font-semibold whitespace-nowrap">S.No</th>
          {Array.from({ length: maxParticipants }).map((_, i) => (
            <React.Fragment key={i}>
              <th className="border border-zinc-700 px-3 py-2 font-semibold whitespace-nowrap">Participant {i + 1} Name</th>
              <th className="border border-zinc-700 px-3 py-2 font-semibold whitespace-nowrap">Participant {i + 1} Roll No</th>
            </React.Fragment>
          ))}
          <th className="border border-zinc-700 px-3 py-2 font-semibold whitespace-nowrap">College</th>
          <th className="border border-zinc-700 px-3 py-2 font-semibold whitespace-nowrap">Department</th>
          <th className="border border-zinc-700 px-3 py-2 font-semibold whitespace-nowrap">Event</th>
          <th className="border border-zinc-700 px-3 py-2 font-semibold whitespace-nowrap">Phone No</th>
          <th className="border border-zinc-700 px-3 py-2 font-semibold text-center whitespace-nowrap">Action</th>
        </tr>
      </thead>
      <tbody>
        {paginatedData.map((item, index) => (
          <tr key={item._id} className="odd:bg-zinc-950 even:bg-zinc-900 text-white text-center hover:bg-zinc-800 transition">
            <td className="border border-zinc-700 px-3 py-2 whitespace-nowrap">{(currentPage - 1) * itemsPerPage + index + 1}</td>
            {Array.from({ length: maxParticipants }).map((_, i) => (
              <React.Fragment key={i}>
                <td className="border border-zinc-700 px-3 py-2 whitespace-nowrap">{item.Participants[i]?.name || "-"}</td>
                <td className="border border-zinc-700 px-3 py-2 whitespace-nowrap">{item.Participants[i]?.roll_no || "-"}</td>
              </React.Fragment>
            ))}
            <td className="border border-zinc-700 px-3 py-2 whitespace-nowrap">{item.college}</td>
            <td className="border border-zinc-700 px-3 py-2 whitespace-nowrap">{item.department}</td>
            <td className="border border-zinc-700 px-3 py-2 whitespace-nowrap">{item.events}</td>
            <td className="border border-zinc-700 px-3 py-2 whitespace-nowrap">{item.phoneNo}</td>
            <td className="border border-zinc-700 px-3 py-2">
              <button
                onClick={() => deleteRegistration(item._id)}
                className="text-xs flex items-center justify-center gap-1 text-red-500 hover:text-white border border-red-500 rounded-full px-3 py-1 hover:bg-red-500 transition-all"
              >
                <i className="fa-solid fa-trash"></i> Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <ToastContainer />
</div>
 

      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        <button className="px-3 py-1 rounded-full text-sm text-primary hover:text-white disabled:opacity-30" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index} className={`px-3 py-1 border rounded-full text-sm ${currentPage === index + 1 ? 'bg-primary text-white font-bold' : 'text-primary border-primary hover:bg-primary hover:text-white'}`} onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
        ))}
        <button className="px-3 py-1 rounded-full text-sm text-primary hover:text-white disabled:opacity-30" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
      </div>

      <div className="flex justify-center mt-4">
        <button className="text-xs md:text-sm py-2 px-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition" onClick={downloadExcelFile}>
          Download
        </button>
      </div>


      <div className="flex justify-center w-full mt-10">
        <div className="w-full max-w-5xl">
          <RegistrationCharts data={FilterRegistrationDetails} />
        </div>
      </div>
    </div>
  );
};

export default Admin;

// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// // import { jsPDF } from "jspdf";
// // import autoTable from "jspdf-autotable";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import { BASE_URL } from '../../Utils/constants.js'
// import ConfirmationBox from "./ConfirmationBox.jsx";
// import { ToastContainer, toast } from 'react-toastify';
// import FormContext from "../../Utils/FormContext.jsx";

// import RegistrationCharts from "./RegistrationCharts";



// const Admin = ({ isAuthenticated }) => {
//   const [RegistrationDetails, setRegistrationDetails] = useState([]);
//   const [FilterRegistrationDetails, setFilterRegistrationDetails] = useState([]);
//   // const [isAuthenticated, setIsAuthenticated] = useState(null);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [RegistrationFormStatus, setRegistrationFormStatus] = useState(null);
//   const { formData } = useContext(FormContext);

//   // console.log(formData)
//   // Get the maximum number of participants across all registrations
//   const maxParticipants = FilterRegistrationDetails.reduce(
//     (max, item) => Math.max(max, item.Participants.length),
//     0
//   );

//   useEffect(() => {
//     fetchRegistrationData(); //if user is admin fetch registration record
//   }, []);

//   //fetch registration record
//   const fetchRegistrationData = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}getregisterationdetails`, {
//         withCredentials: true,
//       });
//       setRegistrationDetails(response.data);
//       setFilterRegistrationDetails(response.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   console.log(FilterRegistrationDetails);

//   //delete  individual registration
//   const deleteRegistration = async (id) => {
//     try {
//       const res = await axios.delete(`${BASE_URL}deteteOneRegistration/${id}`, {
//         withCredentials: true,
//       });
//       console.log(res);
//       toast.success(res.data, {
//         style: {
//           backgroundColor: "#18181b",
//           color: "#ffffff",
//         }, onClose: () => {
//           // remove from UI
//           const updated = RegistrationDetails.filter(item => item._id !== id);
//           setRegistrationDetails(updated);
//           setFilterRegistrationDetails(updated);

//         }
//       });
//     } catch (err) {
//       console.error("Delete failed", err);
//       toast.error(err.response?.data?.message || "Deletion failed", {
//         style: {
//           backgroundColor: "#18181b",
//           color: "#ffffff",
//         }
//       });
//     }
//   };
//   // const downloadWordDocument = () => {
//   //   if (FilterRegistrationDetails.length === 0) {
//   //     alert("No data to download");
//   //     return;
//   //   }

//   //   const doc = new jsPDF();
//   //   autoTable(doc, {
//   //     head: [["S.No", "Participant1 Name", "Roll No", "Participant2 Name", "Roll No", "College", "Event", "Phone No"]],
//   //     body: FilterRegistrationDetails.map((item, index) => [
//   //       index + 1,
//   //       item.Participant1_Name,
//   //       item.Participant1_rollno,
//   //       item.Participant2_Name,
//   //       item.Participant2_rollno,
//   //       item.college,
//   //       item.events,
//   //       item.phoneNo,
//   //     ]),
//   //   });
//   //   doc.save("TableData.pdf");
//   // };



//   //open and close registration form
//   const toggleRegistrationFormStatus = async () => {
//     let isClosed;
//     try {
//       const getStatus = await axios.get(`${BASE_URL}registration-status`, {
//         withCredentials: true,
//       });
//       isClosed = getStatus.data.isRegistrationClosed;

//       let res = await axios.post(`${BASE_URL}registration-status`, {
//         isClosed: !isClosed
//       });
//       toast.success(res.data.message, {
//         position: 'top-right',
//         style: {
//           backgroundColor: "#18181b",
//           color: "#ffffff",
//         },
//       });
//       setRegistrationFormStatus(res.data.RegistrationFormClosed);
//       console.log(res.data.RegistrationFormClosed);
//     }
//     catch (err) {
//       console.log(err);
//       toast.error(err.response.data, {
//         position: 'top-right', style: {
//           backgroundColor: "#18181b",
//           color: "#ffffff",
//         },
//       });
//     }
//   }

//   //download the registration details which in the table
//   const downloadExcelFile = () => {
//     if (FilterRegistrationDetails.length === 0) {
//       alert("No data to download");
//       return;
//     }

//     // Build dynamic headers
//     const headers = ["S.No"];
//     for (let i = 0; i < maxParticipants; i++) {
//       headers.push(`Participant${i + 1} Name`, `Participant${i + 1} Roll No`);
//     }
//     headers.push("College", "Department", "Event", "Phone No");

//     // Build table rows dynamically
//     const tableData = [
//       headers,
//       ...FilterRegistrationDetails.map((item, index) => {
//         const row = [index + 1];

//         // Add participant name & roll no or fallback "-"
//         for (let i = 0; i < maxParticipants; i++) {
//           row.push(item.Participants[i]?.name || "-", item.Participants[i]?.roll_no || "-");
//         }

//         row.push(item.college, item.events, item.phoneNo);
//         return row;
//       }),
//     ];

//     // Create worksheet and workbook
//     const worksheet = XLSX.utils.aoa_to_sheet(tableData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

//     // Convert to Excel and download
//     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });

//     saveAs(data, "RegistrationData.xlsx");
//   };

//   //filter the registration details based on the events
//   const filterFunction = (e) => {
//     if (e.target.value === "All") {
//       setFilterRegistrationDetails(RegistrationDetails);
//     } else {
//       setFilterRegistrationDetails(RegistrationDetails.filter((item) => item.events.includes(e.target.value)));
//     }
//   };

//   if (isAuthenticated === null) {
//     return <p>Checking authentication...</p>;
//   }

//   if (!formData) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     )
//   }

//   if (!isAuthenticated) {
//     return null;
//   }

//   console.log(RegistrationDetails)

//   return RegistrationDetails.length === 0 ? (
//     <div>
//       <p className="font-semibold text-center my-36" >No data found</p>
//     </div>
//   ) : (
//     <div className="my-4">
//       <div className="flex justify-end items-end gap-3 mx-4">
//         {//close And open registration button
//           <button className={`text-xs md:text-sm border ${RegistrationFormStatus ? ' border-green-500  text-green-500  hover:bg-green-500' : 'border-red-500  text-red-500 hover:bg-red-500'} rounded-full py-2 px-3 hover:text-white transition `} onClick={() => { toggleRegistrationFormStatus() }}>
//             {RegistrationFormStatus ? 'open Registrations' : 'close Registrations'}
//           </button>
//         }

//         {/* delete all the registration */}
//         <button className="text-xs md:text-sm border  border-red-500  text-red-500 rounded-full py-2 px-3 hover:bg-red-500 hover:text-white transition" onClick={() => { setShowConfirmation(true) }}>
//           Delete All
//         </button>

//         {/* filter the details */}
//         <fieldset className="fieldset">
//           <legend className="fieldset-legend font-semibold mb-1">Filter</legend>
//           <select name="event" onChange={filterFunction} className="select w-28 md:w-32 border border-primary rounded-lg focus:ring focus:ring-primary">
//             <option disabled>Select here</option>
//             <option value="All">All</option>
//             {
//               formData?.events.map((e, index) => {
//                 console.log(e?.name)
//                 return (
//                   <option key={index} value={e?.name}>{e?.name}</option>
//                 )
//               })
//             }
//           </select>
//         </fieldset>
//       </div>

//       {/* delete confirmation box */}
//       {showConfirmation && <ConfirmationBox setFilterRegistrationDetails={setFilterRegistrationDetails} setRegistrationDetails={setRegistrationDetails} setShowConfirmation={setShowConfirmation} />}

//       {
//         FilterRegistrationDetails.length === 0 ? (<div>
//           <p className="font-semibold text-center my-36" >No data found</p>
//         </div>) : (

//           <div>
//             <div className="p-4 overflow-x-auto">
//               <table className="border-collapse border  border-gray-300 w-full min-w-max text-sm md:text-base">
//                 <thead>
//                   <tr className="bg-zinc-950 text-primary">
//                     <th className="border p-2">S.No</th>
//                     {/* <th className="border p-2">Participant1 Name</th>
//                   <th className="border p-2">Roll No</th>
//                   <th className="border p-2">Participant2 Name</th>
//                   <th className="border p-2">Roll No</th> */}

//                     {/* Dynamically render participant columns */}
//                     {Array.from({ length: maxParticipants }).map((_, index) => (
//                       <React.Fragment key={index}>
//                         <th className="border p-2">{`Participant${index + 1} Name`}</th>
//                         <th className="border p-2">{`Participant${index + 1} Roll No`}</th>
//                       </React.Fragment>
//                     ))}
//                     <th className="border p-2">College</th>
//                     <th className="border p-2">Department</th>
//                     <th className="border p-2">Event</th>
//                     <th className="border p-2">Phone No</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {
//                     FilterRegistrationDetails.map((item, index) => (
//                       <tr key={item._id} className="text-center">
//                         <td className="border p-2">{index + 1}</td>
//                         {/* Participant rows */}
//                         {Array.from({ length: maxParticipants }).map((_, i) => (
//                           <React.Fragment key={i}>
//                             <td className="border p-2">{item.Participants[i]?.name || "-"}</td>
//                             <td className="border p-2">{item.Participants[i]?.roll_no || "-"}</td>
//                           </React.Fragment>
//                         ))}
//                         <td className="border p-2">{item?.college}</td>
//                         <td className="border p-2">{item?.department}</td>
//                         <td className="border p-2">{item?.events}</td>
//                         <td className="border p-2">{item?.phoneNo}</td>
//                         <td className="border p-2"> <button
//                           className="text-xs text-red-500 hover:text-white border border-red-500 rounded-full px-3 py-1 hover:bg-red-500 transition"
//                           onClick={() => deleteRegistration(item._id)}
//                         >
//                           Delete
//                         </button></td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>

//               <ToastContainer />
//             </div>
//             <div className="flex justify-center mt-4">
//               <button
//                 className="text-xs md:text-sm py-2 px-3 border  border-primary  text-primary rounded-full hover:bg-primary hover:text-white transition"
//                 onClick={downloadExcelFile}>
//                 Download
//               </button>
//             </div>

//             <div className="flex justify-center w-full">
//               <div className="w-full max-w-5xl">
//                 <RegistrationCharts data={FilterRegistrationDetails} />
//               </div>
//             </div>


//           </div>


//         )
//       }
//     </div>
//   );
// };


// export default Admin
