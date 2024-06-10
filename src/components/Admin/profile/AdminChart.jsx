import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminChart = ({ data }) => {
  console.log(data);
  const chartData = {
    labels: ["Total Earnings", "Total Bookings", "Cancelled Bookings"],
    datasets: [
      {
        label: "User Dashboard Stats",
        data: [
          data?.totalSales,
          data?.orderNo,
          data?.cancelledOrders,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default AdminChart;
