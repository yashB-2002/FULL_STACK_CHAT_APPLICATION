import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chats from "./components/Chats";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin setUser={setUser} />} />
          <Route path="/chatting" element={<Chats user={user} />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
