import Image from "next/image";
// import localFont from "next/font/local";
import io from "socket.io-client"
import styles from "../styles/Home.module.css"
import { useState } from "react";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const socket = io("http://localhost:5001")

export default function Home() {
  const [message, setMessage] = useState("")
  const [list,setList] = useState([])

  const handleSendMessage = () => {
    //サーバーへ送信
    socket.emit("send_message",{message:message})
    setMessage("")
  }

  //サーバーから受信
  socket.on("received_message",(data)=>{
    console.log(data)
    setList([...list,data])
  })

  return (
    <div>
      <div className={styles.container}>
        <h2>チャットアプリ</h2>
        <div className={styles.chatInputButton}>
        <input
      type="text"
      placeholder="ちゃっと。。。"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSendMessage(); // エンターが押されたときに実行
        }
      }}
    />
          <button onClick={() => handleSendMessage()}>チャット送信</button>
        </div>
        {list.map((chat) =>(<div className={styles.chatArea} key={chat.message}>{chat.message}</div>))}
      </div>
    </div>
  );
}
