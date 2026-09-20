
import { useEffect, useState } from "react";

const ApplicationForm=({setApplications,editId,editApplication,applications, setEditId,
    cancelEdit
})=>{
    const [form,setForm]=useState({
        company:"",
        position:"",
        status:""
    });

    const handleCancelEdit = () => {
  cancelEdit();

  setForm({
    company: "",
    position: "",
    status: "",
  });
};

useEffect(() => {
  if (editApplication) {
    setForm({
      company: editApplication.company,
      position: editApplication.position,
      status: editApplication.status,
    });
  }
}, [editApplication]);

    const saveEdit = () => {
  const updateApplication = applications.map((application) => {
    if (application.id === editId) {
      return {
        ...application,
        company: form.company.trim(),
        position: form.position.trim(),
        status: form.status.trim(),
      };
    } else {
      return application;
    }
  });

  setApplications(updateApplication);

  setForm({
    company: "",
    position: "",
    status: "",
  });

  setEditId(null);
};

const addApplication = () => {
  if (
    form.company.trim() === "" ||
    form.position.trim() === "" ||
    form.status.trim() === ""
  ) {
    return;
  }

  const newApplication = {
    ...form,
    id: Date.now(),
    company: form.company.trim(),
    position: form.position.trim(),
    status: form.status.trim(),
    pinned: false,
  };

  setApplications((prev) => [...prev, newApplication]);

  setForm({
    company: "",
    position: "",
    status: "",
  });
};

    return(
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 mt-3 text-slate-900 w-full max-w-2xl">
            <p
            className="text-xl font-semibold !text-slate-900 mb-6 tracking-tight"
            >Application Form</p>
            <input type="text"
            className="w-full border border-slate-300 rounded-lg px-4 py-2 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500
            text-slate-800 placeholder:text-slate-400 transition"
            placeholder="Company..."
            value={form.company}
            onChange={(e)=>
                setForm({...form,company:e.target.value})
            } />

     <input type="text"
     className="w-full border border-slate-300 rounded-lg px-4 py-2 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500
     text-slate-800 placeholder:text-slate-400 transition"
     placeholder="Position..."
     value={form.position}
     onChange={(e)=>setForm({...form,position:e.target.value})} />

     <select
  value={form.status}
  onChange={(e) => setForm({ ...form, status: e.target.value })}
  className="w-full border border-slate-300 rounded-lg px-4 py-2 mt-3 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
>
  <option value="">Select Status</option>
  <option value="applied">Applied</option>
  <option value="interview">Interview</option>
  <option value="rejected">Rejected</option>
  <option value="selected">Selected</option>
</select>
    {
        editId !==null ?(
            <div className="flex flex-wrap gap-3 mt-5">
                <button onClick={saveEdit}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer 
                shadow-sm hover:shadow transition"
                >Save</button>
                <button onClick={handleCancelEdit}
                className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-300 cursor-pointer transition"
                >Cancel</button>
            </div>
        ):(
            <div className="flex gap-2 mt-3">
                <button onClick={addApplication}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer 
                shadow-sm hover:shadow transition"
                >Add Application</button>
            </div>
        )
    }

        </div>
    )
}
export default ApplicationForm;