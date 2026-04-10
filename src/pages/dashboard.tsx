import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import MapView from "../components/mapView";

const Dashboard = () => {
  const [missing, setMissing] = useState<any[]>([]);
  const [found, setFound] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  // ✅ LOGOUT FUNCTION (FIXED)
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res1 = await API.get("/missing");
      const res2 = await API.get("/found");
      setMissing(res1.data || []);
      setFound(res2.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const total = missing.length + found.length;

  return (
    <div className="main">

      {/* TOPBAR */}
      <div className="topbar">
        <h2>Dashboard</h2>
        <div className="user">
          <div className="avatar">RK</div>
          Rahul Kumar
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="search-row">
        <input
          className="search-inp"
          placeholder="Search by name..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="search-inp"
          placeholder="Filter by location..."
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* STATS */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">TOTAL CASES</div>
          <div className="stat-value">{total}</div>
        </div>

        <div
          className="stat-card missing cursor-pointer"
          onClick={() => navigate("/dashboard/missing")}
        >
          <div className="stat-label">MISSING</div>
          <div className="stat-value">{missing.length}</div>
        </div>

        <div
          className="stat-card found cursor-pointer"
          onClick={() => navigate("/dashboard/found")}
        >
          <div className="stat-label">FOUND</div>
          <div className="stat-value">{found.length}</div>
        </div>
      </div>

      {/* CASES */}
      <div className="sections-grid">
        <div
          className="section-card cursor-pointer"
          onClick={() => navigate("/dashboard/missing")}
        >
          <div className="section-head">Recent Missing Cases</div>
          {missing.length === 0 ? "No recent cases" : "View Data"}
        </div>

        <div
          className="section-card cursor-pointer"
          onClick={() => navigate("/dashboard/found")}
        >
          <div className="section-head">Found / Reunited</div>
          {found.length === 0 ? "No reunited cases" : "View Data"}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="actions-row">
        <button
          className="btn-primary"
          onClick={() => navigate("/dashboard/add")}
        >
          + Add Case
        </button>

        <button
          className="btn-secondary"
          onClick={() => navigate("/dashboard/found")}
        >
          Report Found
        </button>
      </div>

      {/* MAP */}
      <div className="map-card">
        <MapView data={[...missing, ...found]} />
      </div>
    </div>
  );
};

export default Dashboard;