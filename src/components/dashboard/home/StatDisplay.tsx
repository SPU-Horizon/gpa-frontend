import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

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
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [Number(percentageCompleted), 100 - Number(percentageCompleted)],
        backgroundColor: ['#927C4E', 'white'],
        borderWidth: 0, // No border
        cutout: '90%', // Adjust for doughnut thickness
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
    cutout: '90%', // Increase this percentage to make the doughnut ring thinner
  };

  if (label.toLowerCase() === 'major progress') {
    return (
      <div className="flex-1 p-4 flex items-center justify-center border-l border-white border-opacity-50 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-900">
        <div className="flex items-center">
          <div className="w-20 h-20 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Pie data={data} options={options} />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-bold">
              <span className="block leading-none">{percentageCompleted}%</span>
              <span className="block text-xs">In-Progress</span>
            </div>
          </div>
          <div className="ml-4">
            <div className="label">{label}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stat">
      <div className="stat-figure text-primary">
        {/* Include your icon or image here */}
      </div>
      <div className="stat-title">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-desc">More info about this stat</div>
    </div>
  );   
};

export default StatDisplay;