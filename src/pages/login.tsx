import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // ✅ ADD THIS
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ LOGIN FUNCTION
const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    alert("Login Successful ✅");

    // 🔥 ADD THIS LINE
    navigate("/dashboard");

  } catch (err: any) {
    alert(err?.response?.data?.msg || "Login Failed ❌");
  }
};

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="login-left">

        <div className="left-top">
          <h1>Reconnect</h1>
          <p>
            Reconnect is a platform that helps find missing people and reunite
            them with their families. It allows users to report missing persons,
            view found individuals, and contribute to bringing people back
            together safely.Millions of people go missing, but they are never truly
             gone — they live in the hearts of those who love them. Love is what keeps 
             the search alive. Love is what refuses to give up. Reconnect is not just a
             platform.it is a movement driven by compassion, powered by technology, 
            and united by one purpose — to bring the missing back home. Because behind 
            every search is a story, behind every story is love, and behind that love is 
            an unbreakable hope that one day, they will return.
          </p>
        </div>

        {/* FOOTER */}
        <div className="left-footer">
          <h4>Contact Us</h4>
          <p>📞 7282806257</p>
          <p>📧 ak9006355260@gmail.com</p>

          <h4>Helpdesk / Report Info</h4>
          <p>Report missing or found persons through dashboard.</p>
        </div>

      </div>

      {/* RIGHT SIDE LOGIN */}
      <div className="login-box">

        <h2>Welcome Back</h2>

        {/* ✅ EMAIL */}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* ✅ PASSWORD */}
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        <div className="remember">
          <input type="checkbox" /> Remember Me
        </div>

        {/* ✅ LOGIN BUTTON */}
        <button onClick={handleLogin}>
          Login
        </button>

        {/* SIGNUP LINK */}
        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          New user?{" "}
          <span
            style={{ color: "#3b82f6", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>

      </div>

    </div>
  );
};

export default Login;