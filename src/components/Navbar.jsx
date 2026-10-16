import { useState } from "react";


const Navbar = ({setOpenSideBar, darkMode , setDarkMode,
  search,
  setSearch,
  onSearch
})=>{

const [openProfile,setOpenProfile] = useState(false);

    return(
        <nav className={`sticky top-0 z-50 min-h-16 border-b flex flex-wrap items-center justify-between gap-3 px-3 sm:px-6 py-3 transition-colors duration-300 ${
  darkMode
    ? "bg-slate-900 text-white border-slate-700"
    : "bg-white text-gray-900 border-gray-200"
}`}>
            <button onClick={()=>setOpenSideBar(true)} className="mr-3 shrink-0 cursor-pointer hover:text-gray-400 transition">☰</button>
            <h2 className="text-xl font-bold">Hospital Dashboard</h2>
          <input type="text"
          placeholder="Search..." 
          className={`w-64 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode ? 
            "bg-slate-800 text-white border-slate-600 placeholder-gray-400"
            : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
          }`}
          value={search}
          onChange={(e) => {
      setSearch(e.target.value);
    onSearch();
    }}
          
         />

          <button
  onClick={() => setDarkMode(prev => !prev)}
  className={`rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
    darkMode
      ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
      : "bg-slate-900 text-white hover:bg-slate-700"
  }`}
>
  {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
</button>

          <div className="flex items-center gap-4">
         <button className="text-xl">🔔</button>
        <button
        onClick={()=>setOpenProfile(prev=>!prev)}
  className={`flex items-center gap-2 rounded-lg px-3 py-2 transition ${
    darkMode
      ? "hover:bg-slate-800"
      : "hover:bg-gray-100"
  }`}
>
  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
    A
  </div>

  <span className="font-medium">Admin</span>

  <span>⌄</span>
</button>

{openProfile && (
  <div className={`absolute right-4 top-16 w-48 rounded-lg border p-2 shadow-lg ${
  darkMode
    ? "bg-slate-800 text-white border-slate-700"
    : "bg-white text-gray-900 border-gray-200"
}`}>

<button
  onClick={() => setOpenProfile(false)}
  className={`mb-2 ml-auto block rounded px-2 py-1 ${
    darkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
  }`}
>
  ✕
</button>

    <button className={`w-full rounded px-3 py-2 text-left ${
  darkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
}`}>
      Profile Details
    </button>

    <button className={`w-full rounded px-3 py-2 text-left ${
  darkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
}`}>
      Settings
    </button>

    <button className={`w-full rounded px-3 py-2 text-left ${
  darkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
}`}>
      Logout
    </button>
  </div>
)}
          </div>
        </nav>
    )
}
export default Navbar;