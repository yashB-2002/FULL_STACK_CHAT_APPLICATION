import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Signup.css";
const Signup = () => {
  const notifyA = (msg) => toast.success(msg);
  const notifyB = (msg) => toast.error(msg);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }
  async function Signup() {
    if (data.name && data.email && data.password) {
      const res = await axios.post("http://localhost:5000/signup", data);
      if (res.data.error) {
        notifyB(res.data.error);
      } else {
        notifyA(res.data.message);
        navigate("/signin");
      }
    } else {
      notifyB("Please add all the fields.");
    }
  }
  return (
    <div className="register">
      <h1>SignUp</h1>
      <input
        type="text"
        name="name"
        value={data.name}
        placeholder="Your Name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        value={data.email}
        placeholder="Your Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={data.password}
        placeholder="Your Password"
        onChange={handleChange}
      />
      <div className="button" onClick={Signup}>
        SignUp
      </div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/signin")}>
        Login
      </div>
    </div>
  );
};

export default Signup;
