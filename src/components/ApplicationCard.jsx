const ApplicationCard=({application,pinnedApplication,
    startEdit,deleteApplication
})=>{
    return(
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition w-full min-w-0">
      <h1 className="text-xl font-bold !text-slate-900 tracking-tight leading-tight">{application.company}</h1>
      <h2 className="text-lg !text-slate-600 mt-1 font-medium">{application.position}</h2>
      <h2
      className="inline-block bg-slate-100 !text-slate-700 px-3 py-1 rounded-full mt-2 text-sm font-medium tracking-wide">
        {application.status}</h2>
        <div className="flex flex-wrap gap-2 mt-4">
      <button onClick={()=>pinnedApplication(application.id)}
        className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-300 cursor-pointer border border-slate-200 transition">
        {application.pinned ? "Unpin📌" : "Pin📌"}
      </button>
      <button onClick={()=>startEdit(application.id)}
        className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 cursor-pointer shadow-sm transition"
        >Edit</button>
      <button onClick={()=>deleteApplication(application.id)}
        className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 cursor-pointer shadow-sm transition"
        >Delete</button>
        </div>
        </div>
    )
}
export default ApplicationCard;