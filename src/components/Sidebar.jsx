const Sidebar=()=>{
    return(
        <aside className="hidden md:block w-64 min-h-screen bg-slate-800 p-6 shadow-md">
            <ul className="space-y-4">
                <li><a href="#" 
                className="block text-white hover:bg-slate-700 px-3 py-2 rounded-lg transition">Dashboard</a></li>
                <li><a href="#"
                className="block text-white hover:bg-slate-700 px-3 py-2 rounded-lg transition">Applications</a></li>
                <li><a href="#"
                className="block text-white hover:bg-slate-700 px-3 py-2 rounded-lg transition">Analytics</a></li>
                <li><a href="#"
                className="block text-white hover:bg-slate-700 px-3 py-2 rounded-lg transition">Setting</a></li>
            </ul>
        </aside>
    )
}
export default Sidebar