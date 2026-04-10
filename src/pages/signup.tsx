import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (!form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    // save in localStorage
    localStorage.setItem("user", JSON.stringify(form));

    alert("Signup successful ✅");
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create Account</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />

        <button onClick={handleSignup}>Sign Up</button>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={{ color: "#3b82f6", cursor: "pointer" }}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;