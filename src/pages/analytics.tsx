import { useEffect, useState } from "react";
import API from "../api";

// Optional (agar tumne charts banaye hain)
import AnalyticsChart from "../components/analyticsChart";
import PieChart from "../components/pieChart";

interface Stats {
  totalMissing: number;
  totalFound: number;
}

const Analytics = () => {
  const [stats, setStats] = useState<Stats>({
    totalMissing: 0,
    totalFound: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await API.get("/analytics"); // backend route
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-blue-100 rounded shadow">
              <h2 className="text-lg font-semibold">Total Missing</h2>
              <p className="text-2xl">{stats.totalMissing}</p>
            </div>

            <div className="p-4 bg-green-100 rounded shadow">
              <h2 className="text-lg font-semibold">Total Found</h2>
              <p className="text-2xl">{stats.totalFound}</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded shadow">
              <h3 className="mb-2 font-semibold">Trend Analysis</h3>
              <AnalyticsChart data={stats} />
            </div>

            <div className="p-4 border rounded shadow">
              <h3 className="mb-2 font-semibold">Distribution</h3>
              <PieChart data={stats} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;