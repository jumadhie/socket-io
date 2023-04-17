import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:5000");

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([{ pesan: "" }]);
  useEffect(() => {
    socket.on("receive_message", (messages) => {
      setChat((chats) => [...chats, { pesan: messages }]);
    });
  }, [socket]);

  const sendMessage = () => {
    socket.emit("send-message", message);
    setMessage("");
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
        background: "#f7f8fc",
        height: "95vh",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ background: "#f7f8fc", flex: 1 }}>
        {chat.map((d, i) => {
          return <div key={i}>{d.pesan}</div>;
        })}
      </div>
      <div
        style={{
          background: "white",
          display: "flex",
          margin: "0 auto",
          width: "100%",
          // marginBottom: 32,
        }}
      >
        <input
          style={{ width: "100%" }}
          placeholder="kirim pesan"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
}
