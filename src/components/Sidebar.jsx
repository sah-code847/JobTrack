
const Sidebar = ({ openSideBar,
  setOpenSideBar,
  darkMode,
  activePage,
  setActivePage}) =>{




    return(

        <div>
            
            {
                openSideBar && (
                    
                       <aside className={`
  fixed top-0 left-0 z-[60] w-64 h-screen
  text-white p-4
  transform transition-transform duration-300
  ${darkMode ? "bg-slate-950" : "bg-slate-800"}
  ${openSideBar ? "translate-x-0" : "-translate-x-full"}
`}>
                        <div className="flex justify-end">
                <button onClick={()=>setOpenSideBar(false)}  aria-label="Close sidebar"
  className="text-3xl text-white cursor-pointer hover:text-gray-300 transition">←</button>
                        </div>
          
<ul className="space-y-2">
  {[
    "Dashboard",
    "Patients",
    "Doctors",
    "Appointments",
  ].map((page) => (
    <li key={page}>
      <button
        onClick={() => {
          setActivePage(page);
          setOpenSideBar(false);
        }}
        className={`block w-full text-left rounded-lg px-4 py-3 transition ${
          activePage === page
            ? "bg-blue-600 text-white"
            : "hover:bg-slate-700"
        }`}
      >
        {page}
      </button>
    </li>
  ))}
</ul>

            </aside>
                )
            }
        </div>
      
    )
}
export default Sidebar;