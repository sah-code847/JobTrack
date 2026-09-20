import { useState } from "react";
import Modal from "./Modal";
import ApplicationCard from "./ApplicationCard";

const ApplicationList=({applications,deleteApplication,startEdit,
    setApplications
})=>{
    const [search,setSearch]=useState("");
    const [status,setStatus]=useState("all");
    const [clearModal,setClearModal]=useState(false);

   const pinnedApplication = (id) => {
  const updateApplication = applications.map((application) => {
    if (application.id === id) {
      return {
        ...application,
        pinned: !application.pinned,
      };
    } else {
      return application;
    }
  });

  setApplications(updateApplication);
};

    const clear=()=>{
        setClearModal(true)
    }

    const confirmClear=()=>{
    setApplications([]);
    setClearModal(false);
}

const closeModal=()=>{
    setClearModal(false);
}
    
  const filteredApplications = applications.filter(
  (application) =>
    (
      application.company.toLowerCase().includes(search.toLowerCase()) ||
      application.position.toLowerCase().includes(search.toLowerCase()) ||
      application.status.toLowerCase().includes(search.toLowerCase())
    ) &&
    (
      status === "all" ||
      application.status.toLowerCase() === status
    )
);

const sortedApplications = [...filteredApplications].sort(
  (a, b) => b.pinned - a.pinned
);

const clearSearch=()=>{
    setSearch("");
}


   return (
  <div>
    <Modal
      clearModal={clearModal}
      confirmClear={confirmClear}
      message="Are you sure clear this?"
      closeModal={closeModal}
    />

    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 bg-white p-4 rounded-xl shadow">
      <select
        value={status}
        className="w-full sm:w-40 border border-slate-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="all">All Status</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="rejected">Rejected</option>
        <option value="selected">Selected</option>
      </select>

      <input
        type="text"
        className="w-full sm:w-64 border border-slate-300 rounded-lg px-4 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        onClick={clearSearch}
        className="w-full sm:w-auto bg-slate-100 text-slate-700 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-300 cursor-pointer transition"
      >
        Clear Search
      </button>

      <button
        onClick={clear}
        className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-red-700 hover:shadow cursor-pointer transition"
      >
        Clear All
      </button>
    </div>

    {filteredApplications.length === 0 ? (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-xl font-semibold !text-slate-900">
          {applications.length === 0
            ? "No Applications Yet"
            : "No Matching Applications"}
        </h2>

        <p className="!text-slate-500 mt-2">
          {applications.length === 0
            ? "Add your first job application to get started."
            : "Try changing your search or status filter."}
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
        {sortedApplications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            pinnedApplication={pinnedApplication}
            startEdit={startEdit}
            deleteApplication={deleteApplication}
          />
        ))}
      </div>
    )}
  </div>
);

}
export default ApplicationList;