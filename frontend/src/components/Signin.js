import React, { useState } from "react";
import axios from "axios";
import "./Signin.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
let name_of_user = "";

const Signin = ({ setUser }) => {
  // const [username, setUsername] = useState();
  const notifyA = (msg) => toast.success(msg);
  const notifyB = (msg) => toast.error(msg);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }
  async function signin() {
    // name_of_user = document.getElementById("username").value;
    const res = await axios.post("http://localhost:5000/signin", data);
    // console.log(res)
    setUser(res.data.user);
    if (res.data.error) {
      notifyB(res.data.error);
    } else {
      notifyA(res.data.message);
      // console.log(res);
      // name_of_user = data.name;

      navigate("/chatting");
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        name="name"
        id="username"
        value={data.name}
        onChange={handleChange}
        placeholder="Enter your Name"
      ></input>
      <input
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        placeholder="Enter your Password"
      ></input>
      <div className="button" onClick={signin}>
        Login
      </div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/")}>
        SignUp
      </div>
    </div>
  );
};

export default Signin;
// export { name_of_user };
