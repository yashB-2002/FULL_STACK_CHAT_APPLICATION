import React, { useEffect, useState } from "react";
import ReactScrollToBottom from "react-scroll-to-bottom";
// import { name_of_user } from "./Join";
import "./Chats.css";
import socketIO from "socket.io-client";
import { ChatInput } from "./ChatInput";
const end_point = "http://localhost:5000";
let socket;
const Chats = (props) => {
  const name_of_user = props.user.name;
  const [msg, setMsg] = useState([]);
  const [id, setId] = useState("");
  function sendMessage() {
    const msg = document.querySelector("#chatinput").value;
    socket.emit("send_message", { message: msg, id });
    document.querySelector("#chatinput").value = "";
  }
  console.log(msg);
  function handleEnter(e) {
    if (e.key == "Enter") {
      sendMessage();
    } else {
      return null;
    }
  }
  useEffect(() => {
    socket = socketIO(end_point, { transports: ["websocket"] });
    socket.on("connect", () => {
      setId(socket.id);
    });
    socket.emit("joined", { name_of_user });
    socket.on("welcome", (data) => {
      setMsg([...msg, data]);
    });
    socket.on("user_Joined", (data) => {
      setMsg([...msg, data]);
    });
    socket.on("user_Left", (data) => {
      setMsg([...msg, data]);
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);
  useEffect(() => {
    socket.on("sendmessage", (data) => {
      setMsg([...msg, data]);
    });

    return () => {
      socket.off();
    };
  }, [msg]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>My Chat App</h2>
        </div>
        <ReactScrollToBottom className="chatbox">
          {msg.map((m, idx) => (
            <ChatInput
              user={m.id === id ? "" : m.user}
              message={m.message}
              classes={m.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputbox">
          <input onKeyDown={handleEnter} type="text" id="chatinput" />
          <button onClick={sendMessage} className="sendbtn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chats;
