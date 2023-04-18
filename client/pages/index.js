import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { io } from "socket.io-client";
import Image from "next/image";

const socket = io.connect("http://localhost:5000");

const dataUser = [
  {
    name: "paijo",
    date: "11:00",
    isichat: "lorem lorem lorem lorem",
  },
  { name: "Tukiyem", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Sujono", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Kartono", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Painem", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Widiyono", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Sarwendah", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Bambang", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Bambang", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Bambang", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Bambang", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Bambang", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Bambang", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Bambang", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Bambang", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Bambang", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Bambang", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Bambang", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Bambang", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Bambang", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Bambang", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Bambang", date: "11:00", isichat: "lorem lorem lorem lorem" },
  { name: "Bambang", date: "11:00", isichat: "lorem lorem lorem lorem" },
];

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
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
      <div className={styles.sidebaruser}>
        <ul>
          {dataUser.map((data, i) => {
            return (
              <li key={i} className={styles.listuser}>
                <Image
                  className={styles.imglistuser}
                  height="24"
                  width="24"
                  alt="The guitarist in the concert."
                  src="https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
                />
                <div style={{ width: "100%" }}>
                  <div className={styles.wraptitledate}>
                    <p>{data.name}</p> <span>{data.date}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13 }}>{data.isichat}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.containerchat}>
        <div className={styles.wrapmessage}>
          {chat.map((d, i) => {
            return (
              <div className={styles.listchat} key={i}>
                {d.pesan}
              </div>
            );
          })}
        </div>
        <div className={styles.containerbutton}>
          <input
            className={styles.sendinput}
            placeholder="kirim pesan"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <button className={styles.sendbutton} onClick={sendMessage}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
