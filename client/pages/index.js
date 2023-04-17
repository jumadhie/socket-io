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
    <div className={styles.container}>
      <input
        placeholder="kirim pesan"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={sendMessage}>Send Message</button>
      {chat.map((d, i) => {
        return <div key={i}>{d.pesan}</div>;
      })}
    </div>
  );
}
