import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("/");

function MyChatReact() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };

    setMessages([...messages, newMessage]);
    socket.emit("message", message);
  };
  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) =>
    setMessages((state) => [...state, message]);

  return (
    <>
      <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
          <h1 className="text-2xl font-bold my-2">My Chat React (MCR)</h1>
          <input
            type="text"
            placeholder="Write your message..."
            className="border-2 border-zinc-500 p-2 w-full text-black"
            onChange={(e) => setMessage(e.target.value)}
          />

          <ul>
            {messages.map((message, i) => (
              <li
                className={`my-2 p-2 table rounded-md ${
                  message.from === "Me" ? "bg-sky-700" : `bg-black`
                }`}
                key={i}
              >
                <span className="text-xs text-slate-300 block">
                  {message.from}
                </span>
                <span className="text-md">{message.body}</span>
              </li>
            ))}
          </ul>
        </form>
      </div>
    </>
  );
}

export default MyChatReact;
