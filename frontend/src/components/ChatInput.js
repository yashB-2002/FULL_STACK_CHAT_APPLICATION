import React from "react";
import "./ChatInput.css";
export const ChatInput = (props) => {
  if (props.user == "Admin") {
    return <div className=" center">{`${props.user}: ${props.message}`}</div>;
  }
  if (props.user) {
    return (
      <div
        className={`box ${props.classes}`}
      >{`${props.user}: ${props.message}`}</div>
    );
  } else {
    return <div className={`box ${props.classes}`}>You: {props.message}</div>;
  }
};
