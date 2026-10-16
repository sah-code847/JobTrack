import { useState } from "react";

import Patients from "./pages/Patients";
import RecentAppointments from "./components/RecentAppointments";
import AppointmentsChart from "./components/AppointmentsChart";
import StatCard from "./components/StatCard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";

const App = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const [darkMode,setDarkMode] = useState(false);
  const [activePage,setActivePage] = useState("Dashboard");
  const [globalSearch,setGlobalSearch] = useState("");


  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? "bg-slate-950 text-white" : "bg-gray-100 text-gray-900"
    }`}>


      <Navbar setOpenSideBar={setOpenSideBar} 
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      search={globalSearch}
      setSearch={setGlobalSearch}
      onSearch={()=>setActivePage("Patients")}
      />

      <div className="flex min-w-0-full">
        <Sidebar
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar}
            darkMode={darkMode}
            activePage={activePage}
            setActivePage={setActivePage}
          />

        <main className="flex-1 min-w-0 w-0 p-3 sm:p-6">
          {/* <h1>Welcome to Hospital Dashboard</h1> */}

          {
            activePage === "Patients" && (
              <Patients darkMode={darkMode} 
              globalSearch={globalSearch}
              />
            )
          }

        {activePage === "Doctors" && (
       <Doctors darkMode={darkMode} />
       )}

          {activePage === "Appointments" && (
        <Appointments darkMode={darkMode} />
     )}

    
{activePage === "Dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Total Patients"
              value="1248"
              change="+12% this month"
              darkMode={darkMode}
            />

            <StatCard
              title="Total Doctors"
              value="86"
              change="+5% this month"
              darkMode={darkMode}/>

            <StatCard
              title="Appointments"
              value="324"
              change="+8% this month"
              darkMode={darkMode}
            />

            <StatCard
              title="Available Beds"
              value="42"
              change="6 bed occupied today"
              darkMode={darkMode}
            />
          </div>
         )}
        {activePage === "Dashboard" && (
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
      <AppointmentsChart darkMode={darkMode} />
      <RecentAppointments darkMode={darkMode} />
     </div>
        )}

        </main>
      </div>
    </div>
  );
};

export default App;