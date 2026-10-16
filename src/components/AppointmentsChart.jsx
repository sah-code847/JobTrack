import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);





const AppointmentsChart = ({darkMode})=>{

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: darkMode ? "#e5e7eb" : "#374151",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: darkMode ? "#d1d5db" : "#4b5563",
      },
      grid: {
        color: darkMode ? "#374151" : "#e5e7eb",
      },
    },
    y: {
      ticks: {
        color: darkMode ? "#d1d5db" : "#4b5563",
      },
      grid: {
        color: darkMode ? "#374151" : "#e5e7eb",
      },
    },
  },
};



const data ={
  labels : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  
  datasets: [
  {
    label: "Appointments",
    data: [32, 45, 38, 52, 41, 48, 25],

    borderColor: "#3b82f6",
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    pointBackgroundColor: "#3b82f6",
    pointBorderColor: darkMode ? "#e5e7eb" : "#ffffff",
    pointRadius: 4,
    pointHoverRadius: 6,
    tension: 0.3,
  },
],
};


return(
   <div
    className={`border rounded-xl p-5 shadow-sm transition-colors duration-300 ${
      darkMode
        ? "bg-slate-900 border-slate-700"
        : "bg-white border-gray-200"
    }`}
  >
    <div className="w-full h-80">
      <Line data={data} options={options} />
    </div>
  </div>
);
}
export default AppointmentsChart;