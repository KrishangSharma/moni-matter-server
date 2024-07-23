import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement} from 'chart.js';

// Register the components you need
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const Graph = ({ transactions }) => {
  // Prepare chart data
  const chartData = {
    labels: transactions.map(d => d.date),
    datasets: [
      {
        label: 'Expenses',
        data: transactions.map(d => (d.type === 'expense' ? d.amount : null)).filter(d => d !== null),
        borderColor: 'red',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        tension: 0.1
      },
      {
        label: 'Income',
        data: transactions.map(d => (d.type === 'income' ? d.amount : null)).filter(d => d !== null),
        borderColor: 'green',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.1
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ₹${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount (INR)'
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Graph;
