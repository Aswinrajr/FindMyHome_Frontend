import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const AdminSalesAnalytics = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const renderChart = () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      const ctx = document.getElementById("salesChart").getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Day"],
          datasets: [
            {
              label: "Sales",
              data: [9],
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    renderChart();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">Sales Analytics</h1>
      <canvas id="salesChart" width="30" height="15"></canvas> 
    </div>
  );
};

export default AdminSalesAnalytics;
