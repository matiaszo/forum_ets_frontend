import React, { useState } from "react";

export const Messages = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Olá, como vai?", sender: "group" },
    { id: 2, text: "Estou bem, e você?", sender: "user" },
  ]);

  return (
    <div className="flex flex-col bg-alice rounded-md w-[50%] p-4 h-[500px] overflow-y-auto">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex mb-4 ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`${
              msg.sender === "user" ? "bg-blue1" : "bg-blue0"
            } text-white p-3 rounded-lg max-w-[70%]`}
          >
            <p>{msg.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
