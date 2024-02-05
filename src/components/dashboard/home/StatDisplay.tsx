import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './DashboardStyle.css';

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
// Inside your StatDisplay component...
    return (
        <div className="stat-display pie-chart-card">
        <div className="pie-chart-wrapper">
            <Pie data={data} options={options} />
            <div className="percentage-label">
            <span className="chart-value">{percentageCompleted}%</span>
            <span className="chart-center-text">In-Progress</span>
            </div>
        </div>
        <div className="label">{label}</div>
        </div>
    );
    }

  return (
    <div className="stat-display">
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </div>
  );
};

export default StatDisplay;

