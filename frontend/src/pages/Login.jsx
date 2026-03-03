import { useState } from "react";
import "../styles/Login.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true); // toggle between login & create account

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name?.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(isLogin ? "Login Data:" : "Signup Data:", formData);
    alert(`${isLogin ? "Login" : "Account Created"} Successfully!`);
    e.target.reset();
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

          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create Account" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}