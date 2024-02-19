import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

interface StatDisplayProps {
  label: string;
  value: number | string;
}

// Simulated data fetch function (this should eventually be replaced with your actual data fetching logic)
const fetchStudentProgress = () => {
  const completedCredits = 75; // For example, from SQL
  const totalCredits = 300; // For example, from SQL
  const percentageCompleted = (completedCredits / totalCredits) * 100;

  return percentageCompleted.toFixed(2); // Return only two decimal places
};

const StatDisplay: React.FC<StatDisplayProps> = ({ label, value }) => {
  const percentageCompleted = fetchStudentProgress(); // This would be the computed percentage

  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [Number(percentageCompleted), 100 - Number(percentageCompleted)],
        backgroundColor: ["#927C4E", "white"],
        borderWidth: 0, // No border
        cutout: "85%", // Adjust for doughnut thickness
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 0, // You can set the borderWidth to 0 if you don't want an outer border
      },
    },
    cutout: "85%", // Increase this percentage to make the doughnut ring thinner
  };

  return (
    <div className="bg-white flex p-4 items-center justify-center m-4">
      {label.toLowerCase() === "major progress" ? (
        <div className="relative w-32 h-32 lg:col-span-4">
          <Pie data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold">
              {percentageCompleted}%
            </span>
            <div className="absolute inset-0 mt-8 flex items-center justify-center">
              <span className="text-md pt-2">Completed</span>
            </div>
          </div>
          <p className="text-sm text-center mt-2">{label}</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-3xl font-semibold">{value}</p>
          <p className="text-md text-gray-600 mt-1">{label}</p>
        </div>
      )}
    </div>
  );
};

export default StatDisplay;
