import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// ✅ Props define karo
interface Props {
  data: {
    totalMissing: number;
    totalFound: number;
  };
}

const AnalyticsChart = ({ data }: Props) => {
  const chartData = {
    labels: ["Data"],
    datasets: [
      {
        label: "Missing",
        data: [data.totalMissing],
        backgroundColor: "#3b82f6",
      },
      {
        label: "Found",
        data: [data.totalFound],
        backgroundColor: "#22c55e",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default AnalyticsChart;