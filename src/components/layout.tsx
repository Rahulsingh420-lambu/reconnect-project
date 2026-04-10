import { Outlet } from "react-router-dom";
import SideBar from "./sideBar";

const Layout = () => {
  return (
    <div className="dashboard-container">
      
      {/* ✅ SIDEBAR */}
      <SideBar />

      {/* ✅ MAIN */}
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;