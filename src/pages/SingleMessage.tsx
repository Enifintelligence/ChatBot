import "../assets/reset_and_normalize.css";
import "../assets/chat-home.css";
import "../assets/chat-message.css";
import "../assets/single-message.css";
import "../assets/all-messages.css";

import "../assets/footer.css";
import Footer from "../layouts/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const SingleMessage = () => {
  
  const navigate = useNavigate()
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      fromUserId: 1,
      toUserId: 0,
      text: "I am a customer and I have a question",
    },
    {
      fromUserId: 0,
      toUserId: 1,
      text: "Hey there!Tell me your name and your registered email address? This will assist me to confirm your issues on your account.Thanks",
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
const scrollToBottom=()=>{
  setTimeout(() => {
    const element: any = document.querySelector('.chat-box');
    element.behavior = 'smooth';
    element.scrollTop = element.scrollHeight;
});
}
  const sendMessage = () => {
    if (textMessage.trim()) {
      const newMessage = {
        fromUserId: 1,
        toUserId: 0,
        text: textMessage,
      };
      setMessages([...messages, newMessage]);
      setTextMessage("");
      scrollToBottom()
    }
  };

  return (
    <>
      <div className="widget_message widget">
        <div className="widget_header">
          <div className="widget_header_images">
            <div className="widget_image_element">
              <div onClick={()=> navigate(-1)} className="vector">
                <img src="/images/Vector.png" className="vector-image" alt="" />
              </div>
              <div className="header_image_box">
                <img
                  className="header_image"
                  src="/images/Image-1.png"
                  alt=""
                />
                <small>Funke</small>
              </div>
            </div>
            <button>x</button>
          </div>
        </div>
        <div className="widget_message_body">
          <div className="chat-box">
            {messages.map((message, index) => {
              const messageBoxClass =
                message.fromUserId === 0 ? "message-sent" : "message-received";
              const messageClass =
                message.fromUserId === 0 ? "sent" : "received";
              return (
                <div key={index} className={`message-box ${messageBoxClass}`}>
                  {message.fromUserId === 0 && (
                    <img className="" src="images/Image-1.png" alt="" />
                  )}
                  <div key={index} className={`message ${messageClass}`}>
                    {message.text}
                  </div>
                </div>
              );
            })}
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

export default SingleMessage;
