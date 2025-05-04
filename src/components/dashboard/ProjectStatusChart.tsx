import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

type ProjectStatusChartProps = {
  timeFilter: string;
};

const ProjectStatusChart = ({ timeFilter }: ProjectStatusChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Data for different time filters
  const data = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Active',
          data: [4, 5, 7, 8, 6, 3, 4],
          backgroundColor: '#818CF8',
          borderColor: '#818CF8',
          borderWidth: 2,
          tension: 0.4,
        },
        {
          label: 'Completed',
          data: [2, 3, 4, 2, 3, 1, 2],
          backgroundColor: '#34D399',
          borderColor: '#34D399',
          borderWidth: 2,
          tension: 0.4,
        },
        {
          label: 'Overdue',
          data: [1, 0, 2, 1, 3, 2, 1],
          backgroundColor: '#F87171',
          borderColor: '#F87171',
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Active',
          data: [12, 15, 18, 14],
          backgroundColor: '#818CF8',
          borderColor: '#818CF8',
          borderWidth: 2,
          tension: 0.4,
        },
        {
          label: 'Completed',
          data: [8, 10, 12, 14],
          backgroundColor: '#34D399',
          borderColor: '#34D399',
          borderWidth: 2,
          tension: 0.4,
        },
        {
          label: 'Overdue',
          data: [3, 2, 4, 5],
          backgroundColor: '#F87171',
          borderColor: '#F87171',
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    },
    year: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Active',
          data: [10, 12, 15, 18, 20, 22, 25, 28, 30, 28, 25, 22],
          backgroundColor: '#818CF8',
          borderColor: '#818CF8',
          borderWidth: 2,
          tension: 0.4,
        },
        {
          label: 'Completed',
          data: [5, 8, 10, 15, 18, 20, 22, 24, 26, 28, 30, 35],
          backgroundColor: '#34D399',
          borderColor: '#34D399',
          borderWidth: 2,
          tension: 0.4,
        },
        {
          label: 'Overdue',
          data: [2, 3, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7],
          backgroundColor: '#F87171',
          borderColor: '#F87171',
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    },
  };

  // Effect to initialize and update chart
  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Get the selected data based on timeFilter
      const selectedData = data[timeFilter as keyof typeof data];

      // Create new chart
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: selectedData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 12,
                  boxHeight: 12,
                  usePointStyle: true,
                  pointStyle: 'circle',
                  padding: 20,
                },
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: 10,
                titleFont: {
                  size: 14,
                },
                bodyFont: {
                  size: 13,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  precision: 0,
                },
                grid: {
                  display: true,
                  drawBorder: false,
                  color: 'rgba(200, 200, 200, 0.2)',
                },
              },
              x: {
                grid: {
                  display: false,
                  drawBorder: false,
                },
              },
            },
            elements: {
              point: {
                radius: 3,
                hoverRadius: 5,
              },
            },
          },
        });
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [timeFilter]);

  return <canvas ref={chartRef} />;
};

export default ProjectStatusChart;