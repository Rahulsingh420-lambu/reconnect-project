import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// ✅ Props define karo
interface Props {
  data: {
    totalMissing: number;
    totalFound: number;
  };
}

const PieChart = ({ data }: Props) => {
  const chartData = {
    labels: ["Missing", "Found"],
    datasets: [
      {
        data: [data.totalMissing, data.totalFound],
        backgroundColor: ["#3b82f6", "#22c55e"],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;