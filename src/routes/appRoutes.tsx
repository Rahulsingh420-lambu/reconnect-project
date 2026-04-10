import { Routes, Route } from "react-router-dom";

// Public Pages
import GetStarted from "../pages/getStarted";
import Login from "../pages/login";
import Register from "../pages/register";
import Signup from "../pages/signup";

// Dashboard Pages
import Dashboard from "../pages/dashboard";
import Missing from "../pages/missing";   // ✅ updated
import Found from "../pages/found";
import Analytics from "../pages/analytics";
import AddCase from "../pages/addCase";

// Layout
import Layout from "../components/layout"; // ✅ capital L

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<GetStarted />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="missing" element={<Missing />} />   {/* ✅ fixed */}
        <Route path="found" element={<Found />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="add" element={<AddCase />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;