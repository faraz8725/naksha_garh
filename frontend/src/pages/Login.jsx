

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name?.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      if (isLogin) {
        // 🔐 LOGIN API
        const res = await axios.post(
          "http://localhost:5000/api/user/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        console.log("LOGIN RESPONSE:", res.data);

        // ✅ Save token & user
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));


        // 🔥 SAFE ROLE CHECK
        if (res.data.user && res.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }

      } else {
        // 📝 REGISTER API
        const res = await axios.post(
          "http://localhost:5000/api/user/register",
          formData
        );

       

        // 🔥 After signup → go to home
        alert("Signup Successful ✅");

// Switch to login view instead of navigating
setIsLogin(true);

// OR if you want direct home:
navigate("/", { replace: true });

        // OR if you want signup ke baad login page hi aaye:
        // setIsLogin(true);
      }

      e.target.reset();

    } catch (err) {
      console.error("AUTH ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          <button type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create Account" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}