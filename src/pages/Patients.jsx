import { useEffect, useState } from "react";


const Patients = ({darkMode, globalSearch}) => {
  const [patients, setPatients] = useState(()=>{
    try{
      const saved = localStorage.getItem("patients");
      return saved ? JSON.parse(saved) : [] ;
    }catch{
      return [];
    }
  });

  useEffect(()=>{
    localStorage.setItem("patients",JSON.stringify(patients));
  },[patients]);
 

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    department: "",
    phone: "",
    status: "",
  });

  const [errors,setError]=useState({});

  const [editId,setEditId]=useState(null);

  const [search,setSearch]=useState("");

  const [sortOption,setSortOption]=useState("");

  const [filterStatus,setFilterStatus]=useState("");

  const [filterDepartment,setFilterDepartment]=useState("");

  const [viewDetails,setViewDetails]=useState(null);

  const [currentPage,setCurrentPage]=useState(1);

  const [toast,setToast]=useState("");

const resetForm = () =>{
  setFormData({
    name:"",
    age:"",
    gender:"",
    department:"",
    phone:"",
    status:"",
  });
  setError({});
}
  
  
const clearAll = () => {
  const confirmClear = window.confirm("Are you sure?");

  if (confirmClear) {
    setPatients([]);
    setCurrentPage(1);
    setToast("All patients cleared successfully ✅");

    setTimeout(() => {
      setToast("");
    }, 3000);
  }
};


const activeSearch = globalSearch?.trim()
  ? globalSearch.trim().toLowerCase()
  : search.trim().toLowerCase();

let filteredPatient = patients.filter((patient) =>
  patient.name.toLowerCase().includes(activeSearch)
);

if (filterStatus !== "") {
  filteredPatient = filteredPatient.filter(
    (patient) => patient.status === filterStatus
  );
}

if (filterDepartment !== "") {
  filteredPatient = filteredPatient.filter(
    (patient) => patient.department === filterDepartment
  );
}


filteredPatient.sort((a, b) => {
  if (a.pinned !== b.pinned) {
    return Number(b.pinned) - Number(a.pinned);
  } else if (sortOption === "name-asc") {
    return a.name.localeCompare(b.name);
  } else if (sortOption === "name-desc") {
    return b.name.localeCompare(a.name);
  } else if (sortOption === "age-asc") {
    return Number(a.age) - Number(b.age);
  } else if (sortOption === "age-desc") {
    return Number(b.age) - Number(a.age);
  }

  return 0;
});


   const patientsPerPage = 5;

  const startIndex = (currentPage-1) * patientsPerPage;

  const endIndex = startIndex + patientsPerPage;

  const currentPatients = filteredPatient.slice(startIndex , endIndex)

  const totalPages = Math.ceil(filteredPatient.length / patientsPerPage);

const resetFilter=()=>{
  setSearch("");
  setFilterStatus("");
  setFilterDepartment("");
  setSortOption("");
}

  const deletePatient=(id)=>{

    const confirmDelete =window.confirm("Are you Sure");

    if(confirmDelete){
      const updatePatient=patients.filter((patient)=>patient.id !==id);
      setPatients(updatePatient);

      setToast("Patients deleted successfully ✅");
      setTimeout(()=>{
        setToast("");
      },3000);

    }
   
  };

  const saveEdit = () =>{

const errors={};

if(formData.name.trim()===""){
  errors.name="Name is required";
}


if (formData.age === "") {
  errors.age = "Age is required";
} else if (Number(formData.age) < 1 || Number(formData.age) > 120) {
  errors.age = "Please write valid age";
}


if(formData.department.trim()===""){
  errors.department="Department is required";
}

if(formData.gender===""){
  errors.gender="Gender is required";
}


if (formData.phone === "") {
  errors.phone = "Phone is required";
} else if (formData.phone.length !== 10) {
  errors.phone = "Please write 10 digit";
} else if (!/^\d+$/.test(formData.phone)) {
  errors.phone = "Please write number";
}


if(formData.status===""){
  errors.status="Status is required";
}

if(Object.keys(errors).length>0){
      setError(errors);
      return;
    }


    const updatePatient=patients.map((patient)=>{
      if(patient.id===editId){
        return{
          ...patient,
          ...formData,
        }
      }else{
        return patient;
      }
    });
    setPatients(updatePatient);

      resetForm();

    setEditId(null);

    setToast("Patients updated successfully  ✅");

    setTimeout(()=>{
      setToast("");
    },3000);
  }

  

  const startEdit=(id)=>{
   
    const confirmEdit = window.confirm("Are you sure ?");

    if(confirmEdit){
       const updatePatient=patients.find((patient)=>patient.id===id);
    setEditId(id);
    setFormData({
      name:updatePatient.name,
      age:updatePatient.age,
      gender:updatePatient.gender,
      department:updatePatient.department,
      phone:updatePatient.phone,
      status:updatePatient.status
    });
    }

  }

  const cancelEdit = () =>{

    resetForm();

    setEditId(null);
  }

  const addPatients = () => {
const errors = {};


    if (formData.name.trim()===""){
      errors.name="Name is required";
    }
    if(formData.age===""){
      errors.age="Age is required";
    }else if(formData.age<1 || formData.age>120){
      errors.age="Please write valid age";
    }
    
    if(formData.gender===""){
      errors.gender="Gender is required";
    }

    const departments = [
        "Cardiology",
        "Neurology",
        "Pediatrics",
        "Dermatology"
      ];

    if(formData.department.trim()===""){
      errors.department="Department is required";
    }else if(!departments.includes(formData.department)){
      errors.department="Please enter a valid department"
    }

    if(formData.status===""){
      errors.status="Status is required";
    }
   if (formData.phone === "") {
  errors.phone = "Phone is required";

} else if (formData.phone.length !== 10) {
  errors.phone = "Please write 10 digit";

} else if (!/^\d+$/.test(formData.phone)) {
  errors.phone = "Please write number";
}

      

    if(Object.keys(errors).length>0){
      setError(errors);
      return;
    }

  

    const newPatient = {
      id: Date.now(),
      name: formData.name.trim(),
      age: formData.age,
      gender: formData.gender,
      department: formData.department.trim(),
      phone: formData.phone,
      status: formData.status,
      pinned:false
    };

    setPatients([...patients, newPatient]);


     setToast("Patients added successfully ✅");
     setTimeout(() => {
      setToast("");
     }, 3000);

     resetForm();

  };

  const pinnedPatient=(id)=>{
    const updatePatient=patients.map((patient)=>{
      if(patient.id===id){
        return{
          ...patient,
          pinned : !patient.pinned
        }
      }else{
        return patient;
      }
    });
    setPatients(updatePatient);
  }

  return (
    <div className={`w-full min-w-0 max-w-full p-3 sm:p-6 ${
      darkMode ? 
      "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}
    >

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Patients</h1>
          <p className="text-gray-500 mt-1">
            Manage and view all patients
          </p>
        </div>
      </div>


      {/* RESPONSIVE: filters + form ab grid me hain (1 col mobile, 2 col tablet, 3 col laptop) */}
      <div className={`mt-6 border rounded-xl shadow-xl p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-start ${
        darkMode ?
        "bg-gray-800 border-gray-700"
        : "bg-white border-gray-200"
      }`}>


   
<div className="min-w-0">
<select
  value={sortOption}
  onChange={(e) => setSortOption(e.target.value)}
  className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
    darkMode
      ? "bg-gray-800 border-gray-600 text-white"
      : "bg-white border-gray-300 text-gray-900"
  }`}
>
  <option value="">Sort By</option>
  <option value="name-asc">Name A-Z</option>
  <option value="name-desc">Name Z-A</option>
  <option value="age-asc">Age Low-High</option>
  <option value="age-desc">Age High-Low</option>
</select>
</div>


<div className="min-w-0">
      <input type="text"
      placeholder="Search..."
      value={search}
      onChange={(e)=>setSearch(e.target.value)} 
     
className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
  darkMode
    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
    : "bg-white border-gray-300 text-gray-900"
}`}
      />
</div>

<div className="min-w-0">
<select 
value={filterStatus}
onChange={(e)=>setFilterStatus(e.target.value)}

className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
  darkMode
    ? "bg-gray-800 border-gray-600 text-white"
    : "bg-white border-gray-300 text-gray-900"
}`}

>
  <option value="">All</option>
  <option value="Active">Active</option>
  <option value="Inactive">Inactive</option>
  

</select>
</div>

<div className="min-w-0">
<select 
value={filterDepartment}
onChange={(e)=>setFilterDepartment(e.target.value)}

className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
  darkMode
    ? "bg-gray-800 border-gray-600 text-white"
    : "bg-white border-gray-300 text-gray-900"
}`}

>
  <option value="">All</option>
  <option value="Cardiology">Cardiology</option>
  <option value="Neurology">Neurology</option>
  <option value="Pediatrics">Pediatrics</option>
  <option value="Dermatology">Dermatology</option>
</select>
</div>

<div className="min-w-0">
<button onClick={resetFilter}
className={`w-full px-4 py-2 rounded-lg transition cursor-pointer ${
  darkMode ? 
  "bg-gray-700 text-white hover:bg-gray-600"
  : "bg-gray-200 text-gray-500 hover:bg-gray-300"
}`}
>Reset All Filters</button>
</div>

       
<div className="min-w-0">
  <input
  type="text"
  placeholder="Name.."
  value={formData.name}
  onChange={(e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    })

    setError({
      ...errors,
      name: ""
    })
  }}
className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
  darkMode
    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
    : "bg-white border-gray-300 text-gray-900"
}`}
/>

{errors.name && (
  <p className="text-red-500 text-sm mt-1">
    {errors.name}
  </p>
)}
</div>

<div className="min-w-0">
        <input
          type="number"
          placeholder="Age.."
          value={formData.age}
          onChange={(e) =>{
            setFormData({
              ...formData,
              age: e.target.value,
            })
            setError({
              ...errors,
              age:""
            })
        }  }
         className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
  darkMode
    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
    : "bg-white border-gray-300 text-gray-900"
}`}
        />

        {
          errors.age &&(
          <p className="text-red-500 text-sm mt-1">
            {errors.age}
          </p>
          )
        }
</div>

   
        <div   className={`min-w-0 border rounded-lg p-4 ${
         darkMode
      ? "bg-gray-800 border-gray-600"
      : "bg-white border-gray-300"
          }`}>
          <p 
        className={`text-sm font-medium mb-2 ${
        darkMode ? "text-gray-200" : "text-gray-700"
     }`}
>
            Gender
          </p>

          <div className="flex flex-col gap-2">

            <label className={`flex items-center gap-2 text-sm cursor-pointer ${
            darkMode ? "text-gray-200" : "text-gray-700" 
                }`}>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={(e) =>{
                  setFormData({
                    ...formData,
                    gender: e.target.value,
                  })
                  setError({
                    ...errors,
                    gender:""
                  })
                }}
              />
              Male
            </label>

            <label 
           className={`flex items-center gap-2 text-sm cursor-pointer ${
            darkMode ? "text-gray-200" : "text-gray-700"
           }`}
               >
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={(e) =>{
                  setFormData({
                    ...formData,
                    gender: e.target.value,
                  })
                  setError({
                    ...errors,
                    gender:""
                  })
                }}
              />
              Female
            </label>
            
           
            
{
  errors.gender && (
    <p className="text-red-500 text-sm mt-1">
      {errors.gender}
    </p>
  )
}
          </div>
        </div>

<div className="min-w-0">
       <select 
       value={formData.department}
       onChange={(e)=>{
        setFormData({
          ...formData,
          department:e.target.value
        })
        setError({
          ...errors,
          department:""
        })
       }}
      
              className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
          darkMode
            ? "bg-gray-800 border-gray-600 text-white"
           : "bg-white border-gray-300 text-gray-900"
              }`}

         >
        
        <option value="">Select Department</option>
         <option value="Cardiology">Cardiology</option>
         <option value="Neurology">Neurology</option>
         <option value="Pediatrics">Pediatrics</option>
         <option value="Dermatology">Dermatology</option>
       </select>

{
  errors.department && (
    <p className="text-red-500 text-sm mt-1">
      {errors.department}
    </p>
  )
}
</div>
        
<div className="min-w-0">
        <input
          type="number"
          placeholder="Phone Number..."
          value={formData.phone}
          onChange={(e) =>{
            setFormData({
              ...formData,
              phone: e.target.value,
            })
            setError({
              ...errors,
              phone:""
            })
          }}
          
     className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
     darkMode
      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
    : "bg-white border-gray-300 text-gray-900"
     }`}
        />
{
  errors.phone &&(
    <p className="text-red-500 text-sm mt-1">
      {errors.phone}
    </p>
  )
}
</div>
       
<div className="min-w-0">
        <select
          value={formData.status}
          onChange={(e) =>{
            setFormData({
              ...formData,
              status: e.target.value,
            })
            setError({
              ...errors,
              status:""
            })
          }}
          
     className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
     darkMode
    ? "bg-gray-800 border-gray-600 text-white"
    : "bg-white border-gray-300 text-gray-900"
   }`}

        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
{
  errors.status &&(
    <p className="text-red-500 text-sm mt-1">
      {errors.status}
    </p>
  )
}
</div>

      </div>

      {/* Add Button */}
   
{
  editId ===null ? (
    <div className="flex flex-wrap items-center gap-3">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer mt-4"
        onClick={addPatients}
      >
        Add Patient
      </button>
      <button onClick={clearAll}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer mt-4"
      >Clear All</button>
    </div>
  ):(
    <div className="flex flex-wrap items-center gap-3">
       <button onClick={saveEdit}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer mt-4"
     >Save</button>
     <button onClick={cancelEdit}
     className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition cursor-pointer mt-4"
     >Cancel</button>
    </div>
  )
}

      {/* Patient List */}
      <div className={`w-0 min-w-full max-w-full mt-6 border rounded-xl shadow-sm overflow-x-auto ${
  darkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200"
}`}>
        <table className="w-full min-w-[900px]">
       
  <thead
  className={darkMode ? "bg-gray-700" : "bg-gray-50"}
  >
    <tr
    className="border-b border-gray-200"
    >
     
    <th className={`text-left px-3 sm:px-6 py-4 text-sm font-semibold ${
    darkMode ? "text-gray-100" : "text-gray-600"
    }`}>
    Patient
    </th>
      <th className={`text-left px-3 sm:px-6 py-4 text-sm font-semibold ${
        darkMode ? "text-gray-100" : "text-gray-600"
      }`}>Age</th>
      <th className={`text-left px-3 sm:px-6 py-4 text-sm font-semibold ${
        darkMode ? "text-gray-100" : "text-gray-600"
      }`}>Gender</th>
      <th className={`text-left px-3 sm:px-6 py-4 text-sm font-semibold ${
        darkMode ? "text-gray-100" : "text-gray-600"
      }`}>Department</th>
      <th className={`text-left px-3 sm:px-6 py-4 text-sm font-semibold ${
        darkMode ? "text-gray-100" : "text-gray-600"
      }`}>Phone</th>
      <th className={`text-left px-3 sm:px-6 py-4 text-sm font-semibold ${
        darkMode ? "text-gray-100" : "text-gray-600"
      }`}>Status</th>
    </tr>
  </thead>

  <tbody>
     {
      filteredPatient.length===0 ?(
        <tr>
          <td 
          colSpan={10}
          className="px-3 sm:px-6 py-10 text-center text-gray-500">
              <h2
              className="text-lg font-medium"
              >No patients yet</h2>
          </td>
        </tr>
      ):(
        currentPatients.map((patient) => (
        <tr key={patient.id}
       className={`border-b transition ${
       darkMode
    ? "border-gray-700 hover:bg-gray-700"
     : "border-gray-100 hover:bg-gray-50"
    }`}>
          <td className={`px-3 sm:px-6 py-4 text-sm ${
  darkMode ? "text-gray-100" : "text-gray-700"
}`}>{patient.name}</td>
          <td className={`px-3 sm:px-6 py-4 text-sm ${
  darkMode ? "text-gray-100" : "text-gray-700"
}`}>{patient.age}</td>
          <td className={`px-3 sm:px-6 py-4 text-sm ${
  darkMode ? "text-gray-100" : "text-gray-700"
}`}>{patient.gender}</td>
          <td className={`px-3 sm:px-6 py-4 text-sm ${
  darkMode ? "text-gray-100" : "text-gray-700"
}`}>{patient.department}</td>
          <td className={`px-3 sm:px-6 py-4 text-sm ${
  darkMode ? "text-gray-100" : "text-gray-700"
}`}>{patient.phone}</td>
        <td className="px-3 sm:px-6 py-4">
  <span
    className={`px-3 py-1 rounded-full text-xs font-medium ${
      patient.status === "Active"
        ? "bg-green-100 text-green-700"
        : "bg-gray-100 text-gray-600"
    }`}
  >
    {patient.status}
  </span>

</td>
<td className="px-3 sm:px-6 py-4">
  <button
    onClick={() => setViewDetails(patient)}
    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition mt-5"
  >
    View Detail
  </button>
</td>
  


<td className="px-3 sm:px-6 py-4">
  <button onClick={()=>startEdit(patient.id)}
    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition cursor-pointer"
    >Edit</button>

</td>

<td className="px-3 sm:px-6 py-4">
  <button onClick={()=>deletePatient(patient.id)}
     className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition cursor-pointer"
    >Delete</button>
</td>

<td className="px-3 sm:px-6 py-4">
  <button onClick={()=>pinnedPatient(patient.id)}
    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition cursor-pointer"
    >
    {patient.pinned ? "Unpin📌" : "Pin📌"}
  </button>
</td>
        
        </tr>
      ))
      )
     }
  </tbody>

        </table>

     {viewDetails && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

    <div className={`rounded-xl shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto ${
      darkMode ?
      "bg-gray-800 text-white"
      : "bg-white text-gray-900"
    }`}>

      <h2 className="text-2xl font-bold">
        {viewDetails.name}
      </h2>

      <p>Age: {viewDetails.age}</p>
      <p>Gender: {viewDetails.gender}</p>
      <p>Department: {viewDetails.department}</p>
      <p>Phone: {viewDetails.phone}</p>
      <p>Status: {viewDetails.status}</p>

      <button
        onClick={() => setViewDetails(null)}
        className="bg-red-600 hover:bg-red-700 text-sm text-white px-3 py-1 rounded-lg mt-6 transition cursor-pointer"
      >
        Close View Detail
      </button>

    </div>
  </div>
)}
        
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
       <button onClick={()=>{
        if(currentPage > 1){
          setCurrentPage(prev=>prev-1)
        }
       }}
       className={`px-4 py-2 rounded-lg transition ${
        darkMode ? 
        "bg-gray-700 text-white hover:bg-gray-600"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
       }`}
       >Previous Page </button>
    <button onClick={()=>{
      if(currentPage < totalPages){
        setCurrentPage(prev=>prev+1)
      }
    }}
    className={`px-4 py-2 rounded-lg transition ${
      darkMode ? 
      "bg-gray-700 text-white hover:bg-gray-600"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
    >Next Page</button>

      </div>

      {
        toast && (
          <div className="fixed top-5 right-5 left-5 sm:left-auto z-[9999] bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg">
            <p>{toast}</p>
          </div>
        )
      }

    </div>
  );
};

export default Patients;