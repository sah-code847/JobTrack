
const StatCard = ({ title, value, change, darkMode }) => {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        darkMode
          ? "bg-slate-900 border-slate-700 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3
          className={`text-sm font-medium ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {title}
        </h3>

        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
          📊
        </span>
      </div>

      <p className="mt-4 text-3xl font-bold tracking-tight">
        {value}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-sm font-semibold text-green-500">
          ↗ {change}
        </span>
      </div>
    </div>
  );
};

export default StatCard