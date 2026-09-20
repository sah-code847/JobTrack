const StatsCard=({
    title,count,
   
})=>{
      return(
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
            <h2 className="text-sm font-semibold !text-slate-500 uppercase tracking-wide">{title}</h2>
            <h2 className="text-3xl font-bold !text-slate-900 mt-2 tracking-tight">{count}</h2>
            
        </div>
      )
}
export default StatsCard;