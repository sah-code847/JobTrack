import { useState , useEffect } from "react";
const Appointments = ({darkMode}) =>{

    const [appointment,setAppointment]=useState(()=>{
        const saveAppt = localStorage.getItem("appointment");
        return saveAppt ? JSON.parse(saveAppt) : [];
    });

   useEffect(()=>{

localStorage.setItem("appointment",JSON.stringify(appointment));

   },[appointment]);


    const [formData,setFormData] = useState({
        patient:"",
        doctor:"",
        date:"",
        time:"",
        reason:"",
        status:""
    });

    const [errors,setErrors]=useState({
        patient:"",
        doctor:"",
        date:"",
        time:"",
        reason:"",
        status:""
    });

    const [patients,setPatients] = useState(()=>{
        return JSON.parse(localStorage.getItem("patients") || "[]");
    });

    const [doctors,setDoctors] = useState(()=>{
        return JSON.parse(localStorage.getItem("doctors") || "[]");
    });

    const [editId,setEditId] = useState(null);

    const [search,setSearch] = useState("");

    const [statusFilter,setStatusFilter] =useState("All");

    const [sortOrder,setSortOrder] = useState("asc");

    const [currentPage,setCurrentPage] = useState(1);

    const [toast,setToast] = useState("");

    const itemPerPage = 5;
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;


    const pinAppt = (id) =>{
        const updateAppointment = appointment.map((appt)=>{
            if(appt.id===id){
                return{
                    ...appt,
                    pinned:!appt.pinned
                }
            }else{
                return appt;
            }
        });
        setAppointment(updateAppointment);
    };

    const clearAll = () =>{
        const confirmClearAll = window.confirm("Are you sure you want to clear all appointments?");
        if(confirmClearAll){
            setAppointment([])
        }
    }


    const cancelEdit = ()=>{
        const confirmCancel = window.confirm("Are you sure cancel ?");
        if(confirmCancel){
            setFormData({
                patient:"",
                doctor:"",
                date:"",
                time:"",
                reason:"",
                status:"",
            });
        setEditId(null)
        }
    }

const startEdit = (id) =>{
    const confirmEdit=window.confirm("Are you sure edit this ?");
    
    if(confirmEdit){
        const updateAppointment = appointment.find((appt)=>appt.id===id);
        setEditId(id);
        setFormData({
           patient:updateAppointment.patient,
           doctor:updateAppointment.doctor,
           date:updateAppointment.date,
           time:updateAppointment.time,
           reason:updateAppointment.reason,
           status:updateAppointment.status

        });
        
    }
}

const saveEdit = ()=>{
   const newErrors = {};

  if (formData.patient === "") {
    newErrors.patient = "Patient is required";
  }

  if (formData.doctor === "") {
    newErrors.doctor = "Doctor is required";
  }

  if (formData.date === "") {
    newErrors.date = "Date is required";
  }

  if (formData.time === "") {
    newErrors.time = "Time is required";
  }

  if (formData.reason.trim() === "") {
    newErrors.reason = "Reason is required";
  }

  if (formData.status === "") {
    newErrors.status = "Status is required";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    return;
  }

    const updateAppointment = appointment.map((appt)=>{
        if(appt.id===editId){
            return{
                ...appt,
                ...formData
            }
        }else{
            return appt;
        }
    });
    setAppointment(updateAppointment);
    setFormData({
        patient:"",
        doctor:"",
        date:"",
        time:"",
        reason:"",
        status:""
    })
setEditId(null);

setToast("Appointment updated successfully ✅");

setTimeout(()=>{
    setToast("");
},3000);


}

    const deleteAppointment = (id) =>{
        const confirmDelete = window.confirm("Are you sure delete this ?");
      
        if(confirmDelete){
            const updateAppointment=appointment.filter((appt)=>appt.id !==id);
            setAppointment(updateAppointment);
            setToast("Appointment deleted successfully ✅");
            setTimeout(()=>{
                setToast("");
            },3000);
        }
        

    }

    const addAppointment = () =>{
        const errors = {};
      
       if(formData.patient===""){
        errors.patient="Patient is required"
       }
       if(formData.doctor===""){
        errors.doctor="Doctor is required"
       }
       if(formData.date===""){
        errors.date="Date is required"
       }
       if(formData.reason.trim() === ""){
        errors.reason="Reason is required"
       }
       if(formData.status===""){
        errors.status="Status is required"
       }
       if(formData.time===""){
        errors.time="Time is required";
       }

       setErrors(errors);
       if(Object.keys(errors).length>0){
        return;
       }
       
       const newAppointment=[...appointment,{
        id:Date.now(),
        patient:formData.patient,
        doctor:formData.doctor,
        time:formData.time,
        date:formData.date,
        reason:formData.reason,
        status:formData.status,
        pinned:false
       }];
      setAppointment(newAppointment)
      setFormData({
        patient:"",
        doctor:"",
        time:"",
        date:"",
        reason:"",
        status:""
      });

    setToast("Appointment added successfully✅");

    setTimeout(()=>{
        setToast("");
    },3000);

    }

    const filterAppt = appointment.filter((appt)=>
    appt.patient.toLowerCase().includes(search.toLowerCase()) || 
appt.doctor.toLowerCase().includes(search.toLowerCase()))
.filter((appt)=>statusFilter ==="All" || appt.status===statusFilter)
.sort((a,b) =>{
    if(a.pinned !==b.pinned){
        return Number(b.pinned) - Number(a.pinned);
    }
    return sortOrder === "asc" ?
    new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
});

const currentItems = filterAppt.slice(indexOfFirstItem,indexOfLastItem);
const totalPages = Math.ceil(filterAppt.length / itemPerPage);

    return(
        <div className="w-full max-w-4xl mx-auto p-6">

<div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Appointment</h1>
          <p className="text-gray-500 mt-1">
            Manage and view all Appointments
          </p>
        </div>
      </div>

<div className="w-full max-w-4xl mx-auto mb-5 flex gap-3 mt-5">
            <input type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search..."
            className={`flex-1 w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 
                "bg-slate-800 text-white border-slate-600"
                : "bg-white text-gray-900 border-gray-300"
            }`}
            />

            <select 
            value={statusFilter}
            onChange={(e)=>setStatusFilter(e.target.value)}
            className={`rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
  darkMode
    ? "bg-slate-800 text-white border border-slate-600"
    : "bg-white text-gray-900 border border-gray-300"
}`}
            >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select>

            <select
            value={sortOrder}
            onChange={(e)=>setSortOrder(e.target.value)}
           className={`rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
  darkMode
    ? "bg-slate-800 text-white border border-slate-600"
    : "bg-white text-gray-900 border border-gray-300"
}`}
            >
                <option value="asc">Oldest to Newest</option>
                <option value="desc">Newest to Oldest</option>
            </select>
</div>
        <label>Patients</label>
        <select
        className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 
                 "bg-slate-800 text-white border border-slate-600"
                : "bg-white text-gray-900 border border-gray-300"
             }`}
       value={formData.patient}
       onChange={(e)=>
        setFormData({
            ...formData,
            patient:e.target.value
        })
       }
       >
        
            <option value="">Select Patients</option>
            {
                patients.map((patient)=>(
                    <option key={patient.id} value={patient.name}>{patient.name}</option>
                ))
            }
        </select>

        {
            errors.patient && (
                <p className="text-red-500 text-sm">
                    {errors.patient}
                </p>
            )
        }

        <label>Doctor</label>
 <select
  className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
    darkMode ? 
    "bg-slate-800 text-white border border-slate-600"
    : "bg-white text-gray-900 border border-gray-300"
  }`}
 value={formData.doctor}
 onChange={(e)=>
    setFormData({
        ...formData,
        doctor:e.target.value
    })
 }
 >
    
    <option value="">Select Doctor</option>
    {
        doctors.map((doctor)=>(
            <option value={doctor.name} key={doctor.id}>
                {doctor.name}
            </option>
        ))
    }
 </select>

 {
        errors.doctor && (
            <p className="text-red-500 text-sm">
                {errors.doctor}
            </p>
        )
    }

    
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
<label>Date</label>
<input type="date"
 className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
    darkMode ? 
    "bg-slate-800 text-white border border-slate-600"
    : "bg-white text-gray-900 border border-gray-300"
  }`}
  value={formData.date}
onChange={(e)=>
    setFormData({
        ...formData,
        date:e.target.value
    })
}
/>
{
    errors.date && (
        <p className="text-red-500 text-sm">
            {errors.date}
        </p>
    )
}
</div>



<div>
<label>Time</label>
<input type="time" 
 className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
    darkMode ? 
    "bg-slate-800 text-white border border-slate-600"
    : "bg-white text-gray-900 border border-gray-300"
  }`}
value={formData.time}
onChange={(e)=>
    setFormData({
        ...formData,
      time:e.target.value
    })
}
/>
{
    errors.time && (
        <p className="text-red-500 text-sm">
            {errors.time}
        </p>
    )
}
</div>
</div>

<label>Reason</label>
<textarea
 className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
    darkMode ? 
    "bg-slate-800 text-white border border-slate-600"
    : "bg-white text-gray-900 border border-gray-300"
  }`}
value={formData.reason}
onChange={(e)=>
    setFormData({
        ...formData,
        reason:e.target.value
    })
}
>

</textarea>

    {
        errors.reason && (
            <p className="text-red-500 text-sm">
                {errors.reason}
            </p>
        )
    }

<label>Status</label>

<select
 className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
    darkMode ? 
    "bg-slate-800 text-white border border-slate-600"
    : "bg-white text-gray-900 border border-gray-300"
  }`}
value={formData.status}
onChange={(e)=>
    setFormData({
        ...formData,
        status:e.target.value
    })
}
>
  
<option value="">Select Status</option>
<option value="Pending">Pending</option>
<option value="Confirmed">Confirmed</option>
<option value="Completed">Completed</option>
<option value="Cancelled">Cancelled</option>
</select>
  {
    errors.status && (
        <p className="text-red-500 text-sm">
            {errors.status}
        </p>
    )
}

{
    editId ? (
        <div className="flex gap-3">
            <button onClick={saveEdit}
            className="bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer mt-4 px-5 py-2">Save</button>

<button onClick={cancelEdit}
className="bg-gray-600 text-white px-5 py-2 mt-4 rounded-lg hover:bg-gray-700 transition cursor-pointer"
>Cancel</button>

        </div>
    ):(
        <div className="flex gap-3">
            <button
onClick={addAppointment}
className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 mt-4 cursor-pointer"
>Add Appointment</button>

<button
onClick={clearAll}
className=" mt-4 bg-red-600 text-white rounded-lg px-5 py-2 hover:bg-red-700 transition cursor-pointer"
>Clear All</button>

        </div>
    )
}


{
    currentItems.map((appt)=>(
        <div key={appt.id}
        className={`border rounded-xl shadow-sm p-3 mb-3 w-full max-w-2xl mx-auto transition-colors duration-300 ${
            darkMode ? 
            "bg-slate-900 border-slate-700 text-white"
            :"bg-white border-gray-900 text-gray-900"
        }`}
       >
            <h2
           className={`text-lg font-bold mb-4 ${
           darkMode ? "text-white" : "text-gray-800"
           }`}
            >Appointment Details</h2>
          <div>
            <p className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-500"
            }`}>Patient : {appt.patient}</p>
            <p className={`font-semibold ${
                darkMode ? "text-white" : "text-gray-800"
            }`}>Doctor : {appt.doctor}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
            <p className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-500"
            }`}>Time : {appt.time}</p>
            <p className={`font-semibold ${
                darkMode ? "text-white" : "text-gray-800"
            }`}> Date : {appt.date}</p>
            </div>
            </div>

            <div className={`p-3 rounded-lg mb-3 ${
                darkMode ? "bg-slate-800" :  "bg-gray-50"
            }`}>

            <p className={`font-semibold ${
                darkMode ? "text-white" : "text-gray-500"
            }`}>Reason</p>
            <p className={`font-semibold ${
                darkMode ? "text-white" : "text-gray-500"
            }`}>{appt.reason}</p>
            </div>
            
       <div className="mb-4">
       <p className={`text-sm mb-2 ${
        darkMode ? "text-gray-400" : "text-gray-500"
       }`}>Status</p>

  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
    appt.status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : appt.status === "Confirmed"
      ? "bg-blue-100 text-blue-700"
      : appt.status === "Completed"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"
  }`}>
    {appt.status}
  </span>
</div>
<div className="flex gap-2">
            <button onClick={()=>deleteAppointment(appt.id)}
                className="bg-red-600 px-5 py-2 mt-4 hover:bg-red-700 transition cursor-pointer rounded-lg text-white"
                >Delete</button>
<button onClick={()=>startEdit(appt.id)}
    className="bg-blue-600 mt-4 px-5 py-2 hover:bg-blue-700 transition cursor-pointer rounded-lg text-white"
    >
    Edit
</button>

<button onClick={()=>pinAppt(appt.id)}
    className="bg-yellow-500 px-5 py-2 mt-4 text-white hover:bg-yellow-600 transition cursor-pointer rounded-lg"
    >
    {appt.pinned ? "Unpin📌" : "Pin📌"}
</button>
         </div>
        </div>
    ))
}
{totalPages > 0 && (
<div className="flex justify-center items-center gap-2 mt-6">
<button 
onClick={()=>setCurrentPage(currentPage-1)}
disabled={currentPage===1}
className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
>Previous</button>

 
    {
       Array.from(
  { length: totalPages },
  (_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`px-4 py-2 rounded-lg ${
        currentPage === i + 1
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-800"
      }`}
    >
      {i + 1}
    </button>
  )
)
    }

    <button
    onClick={()=>setCurrentPage(currentPage+1)}
    disabled={currentPage === totalPages}
    className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
    >Next</button>
    

   

</div>
    )}
    {
        toast && (
            <div className="fixed top-20 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg">
            <p>{toast}</p>
            </div>
        )
    }
        </div>
    )
}
export default Appointments;