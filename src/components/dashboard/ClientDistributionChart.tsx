import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

const ClientDistributionChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Mock data for client distribution
  const data = {
    labels: ['Fashion', 'Tech', 'Food', 'Health', 'Finance', 'Other'],
    datasets: [
      {
        data: [25, 20, 15, 15, 10, 15],
        backgroundColor: [
          '#7C3AED', // Primary (purple)
          '#0D9488', // Secondary (teal)
          '#F97066', // Accent (coral)
          '#10B981', // Success (green)
          '#F59E0B', // Warning (amber)
          '#6B7280', // Gray
        ],
        borderWidth: 1,
        borderColor: '#fff',
      },
    ],
  };

  // Effect to initialize chart
  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  boxWidth: 12,
                  boxHeight: 12,
                  usePointStyle: true,
                  pointStyle: 'circle',
                  padding: 10,
                  font: {
                    size: 11,
                  },
                },
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: 8,
                titleFont: {
                  size: 13,
                },
                bodyFont: {
                  size: 12,
                },
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const value = context.raw as number;
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => (a as number) + (b as number), 0) as number;
                    const percentage = Math.round((value / total) * 100);
                    return `${label}: ${percentage}%`;
                  }
                }
              },
            },
            cutout: '65%',
            elements: {
              arc: {
                borderWidth: 1,
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
  }, []);

  return <canvas ref={chartRef} />;
};

export default ClientDistributionChart;