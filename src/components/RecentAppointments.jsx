
const RecentAppointments = ({darkMode}) =>{
    const appointments = [
  {
    id: 1,
    patient: "Rahul",
    doctor: "Dr. Sharma",
    date: "29 Sep",
    status: "Completed",
  },
  {
    id: 2,
    patient: "Amit",
    doctor: "Dr. Khan",
    date: "29 Sep",
    status: "Pending",
  },
  {
    id: 3,
    patient: "Sita",
    doctor: "Dr. Rai",
    date: "30 Sep",
    status: "Confirmed",
  },
];

    return(
        <div className={`border rounded-xl p-5 shadow-sm transition-colors duration-300 ${
    darkMode
      ? "bg-slate-900 border-slate-700 text-white"
      : "bg-white border-gray-200 text-gray-900"
  }`}>
      <h3 className="text-lg font-semibld mb-4">Recent Appointments</h3>

<table className="w-full">
    <thead>
        <tr className={`text-left text-sm ${
      darkMode ? "text-gray-300" : "text-gray-500"
    }`}>
            <th className="py-3">Patients</th>
            <th className="py-3"> Doctors</th>
            <th className="py-3">Date</th>
            <th className="py-3">Status</th>
        </tr>
    </thead>
    <tbody className={darkMode ? "text-gray-200" : "text-gray-700"}>
       {
        appointments.map((appointment)=>(
            <tr key={appointment.id}
           className={`border-t ${
  darkMode ? "border-slate-700" : "border-gray-100"
}`}
            >
                <td>{appointment.patient}</td>
                <td>{appointment.doctor}</td>
                <td>{appointment.date}</td>
                <td>
                    {
                        appointment.status==="Completed" && (
                            <span
                             className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"
                            >🟢Completed</span>
                        )
                    }
                    {
                        appointment.status==="Pending" && (
                            <span
                            >🟡Pending</span>
                        )
                    }
                    {
                        appointment.status==="Confirmed" && (
                            <span>🔵Confirmed</span>
                        )
                    }
                </td>
    
            </tr>
        ))
       }
    </tbody>
</table>
    

        </div>
    )
}
export default RecentAppointments;