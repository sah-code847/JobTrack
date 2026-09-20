
const Navbar=()=>{
    return(
        <div>
     
     <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 bg-slate-900 shadow-md"> 
        <h1 className="text-2xl font-bold text-white">JobTracker</h1>
 
        <ul className="flex gap-4 sm:gap-6 text-white">
            <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Applications</a></li>
        </ul>
        <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 hover:shadow cursor-pointer transition"
        >+ Add Job</button>
     </nav>

        </div>
    )
}
export default Navbar;