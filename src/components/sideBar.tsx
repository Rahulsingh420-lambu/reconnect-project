import { useNavigate, useLocation } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2>Reconnect</h2>

      <div
        onClick={() => navigate("/dashboard")}
        className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""}`}
      >
        Dashboard
      </div>

      <div
        onClick={() => navigate("/dashboard/missing")}
        className={`nav-item ${location.pathname.includes("missing") ? "active" : ""}`}
      >
        Missing
      </div>

      <div
        onClick={() => navigate("/dashboard/found")}
        className={`nav-item ${location.pathname.includes("found") ? "active" : ""}`}
      >
        Found
      </div>

      <div
        onClick={() => navigate("/dashboard/analytics")}
        className={`nav-item ${location.pathname.includes("analytics") ? "active" : ""}`}
      >
        Analytics
      </div>
    </div>
  );
};

export default SideBar;