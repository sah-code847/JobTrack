import "./App.css";
import { useState, useEffect } from "react";
import ApplicationList from "./components/ApplicationList";
import ApplicationForm from "./components/ApplicationForm";
import StatsCard from "./components/StatsCard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";


function App() {
  const [applications, setApplications] = useState(() => {
  const savedApplications = localStorage.getItem("applications");

  return savedApplications ? JSON.parse(savedApplications) : [];
});


useEffect(() => {
  localStorage.setItem("applications", JSON.stringify(applications));
}, [applications]);

  const [editId,setEditId]=useState(null);
  const [editApplication,setEditApplication]=useState(null);

  const cancelEdit = () => {
  setEditId(null);
  setEditApplication(null);
};

  const deleteApplication=(id)=>{
    const updateApplication=applications.filter((application)=>application.id !==id);
    setApplications(updateApplication);
  }

  const startEdit=(id)=>{
    const updateApplication=applications.find((application)=>application.id===id);
    setEditId(id);
    setEditApplication(updateApplication);

  }

 

  const appliedApplication=applications.filter((application)=>application.status==="applied");

  const totalApplied=appliedApplication.length;

 const interviewerApplication = applications.filter(
  (application) => application.status === "interview"
);

const totalInterviewer = interviewerApplication.length;

  const rejectedApplication=applications.filter((application)=>application.status==="rejected");

  const totalRejected=rejectedApplication.length;

  const selectedApplication=applications.filter((application)=>application.status==="selected");

  const totalSelected=selectedApplication.length;

  

  return (
    <>
    <Navbar/>

<div className="flex">
    <Sidebar/>

<main className="flex-1 min-w-0 p-4 md:p-6 bg-slate-50">
  

      <ApplicationList
       applications={applications} 
      deleteApplication={deleteApplication} 
      startEdit={startEdit}
      setApplications={setApplications}
     />

      <ApplicationForm 
      applications={applications}
      setApplications={setApplications} 
       editId={editId} 
       editApplication={editApplication}
       setEditId={setEditId}
       cancelEdit={cancelEdit}
       />
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
       <StatsCard
  title="Applied"
  count={totalApplied}
/>

<StatsCard
  title="Interview"
  count={totalInterviewer}
/>

<StatsCard
  title="Rejected"
  count={totalRejected}
/>

<StatsCard
  title="Selected"
  count={totalSelected}
/>
</div>
</main>
        </div>
    </>
  );
}

export default App;