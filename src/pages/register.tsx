import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="login-left">
        <h1>Reconnect</h1>
        <p>Create your account and help reunite families.</p>

        <div className="left-image">
          <img src="/bodyguard.png" alt="Reconnect" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-box">

        <h2>Create Account</h2>

        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        <button>Register</button>

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#60a5fa", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
};

export default Register;