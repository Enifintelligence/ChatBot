import "../assets/reset_and_normalize.css";
import "../assets/chat-message.css";
import "../assets/chat-home.css";
import Footer from "../layouts/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import io from "socket.io-client";
const socket = io("https://socketservice.29thnight.repl.co");

function getCookie(name:string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
function calcHeight(value:string) {
  const lines = value.split("\n");
  const height = lines.length * 16;
  return height;
}
const textarea:HTMLTextAreaElement|null = document.querySelector(".message-input");
textarea?.addEventListener("keyup", () => {
textarea!.style.height = calcHeight(textarea?.value) + "px";
});
const ChatMessage = () => {
  const navigate =useNavigate()
  const [chatId, setChatId] = useState("");
  const [textMessage, setTextMessage] = useState("");
  socket.on('connect', function() {
    socket.emit('join', {chat_id: chatId});
});
  
  
  
  const [messages, setMessages] = useState([
    {
      fromUserId: 1,
      toUserId: 0,
      text: 'I am a customer and I have a question',
    },
    {
      fromUserId: 0,
      toUserId: 1,
      text: 'Hey there!Tell me your name and your registered email address? This will assist me to confirm your issues on your account.Thanks',
    },
    {
      fromUserId: 0,
      toUserId: 1,
      text: "Please are you still with me?",
    },
    {
      fromUserId: 1,
      toUserId: 0,
      text: "            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus est dolorum expedita atque, optio quia ducimus quisquam minima accusantium quas.",
    },
      {
        fromUserId: 0,
        toUserId: 1,
        text: "Thank you!",
      },
      {
        fromUserId: 0,
        toUserId: 1,
        text: "You have question , so what would you like to know ?",
      },
  ]);
  const agentUser = {
    id: 0,
    name: "Alon Smith",
    path: "Image-3.jpeg",
    designation: "Software Developer",
  };

  const sendMessage = () => {
    if (textMessage.trim()) {
      const newMessage = {
        fromUserId: 1,
        toUserId: 0,
        text: textMessage,
      };
      setMessages([...messages, newMessage]);
      setTextMessage("");
    }
  };

  return (
    <>
      <div className="widget_message widget">
        <div className="widget_header">
          <div onClick={()=> navigate(-1)} className="vector">
            <img src="/images/Vector.png" alt="" />
          </div>
          <div className="widget_header_images">
            <div className="header_image_box">
              <img className="header_image" src="/images/Image-1.png" alt="" />
              <small>Funke</small>
            </div>
            <div className="header_image_box">
              <img className="header_image" src="/images/Image-2.png" alt="" />

              <small>Abdul</small>
            </div>
            <div className="header_image_box">
              <img className="header_image" src="/images/Image-3.png" alt="" />
              <small>John</small>
            </div>
          </div>
        </div>
        <div className="widget_message_body">
          <div className="text">
            <h2>We typically reply in few minutes</h2>
            <p>
              We help your business grow by connecting you to your customers
            </p>
          </div>
          
          <div className="message_box">
            <div className="message_icons_left">
              <textarea
                className="message_input"
                value={textMessage}
                onChange={(e: any) => setTextMessage(e.target.value)}
                placeholder="Start a conversation"
              />
              <div className="icons">
                <p>Aa</p>
                <p>x</p>
                <p>x</p>
              </div>
            </div>
            <div className="button">
              <button onClick={() => sendMessage()}>Send</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ChatMessage;
