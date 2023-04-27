import "../assets/reset_and_normalize.css";
import "../assets/chat-home.css";
import "../assets/chat-message.css";
import "../assets/single-message.css";
import "../assets/all-messages.css";

import "../assets/footer.css";
import Footer from "../layouts/Footer";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

const SingleMessage = () => {
  let { id, customerId } = useParams();
  const [message, setMessage] = useState<any>([]);
  const fetchMessages = async () => {
    try {
      const response = await Axios.get(
        "https://chat-enif.oluwaseyialaka.repl.co/chat/get-messages/" +
          id +
          "/" +
          customerId +
          "/"
      );
      setMessage(response.data.messages);
    } catch (error: any) {}
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  const navigate = useNavigate();
  const [textMessage, setTextMessage] = useState("");

  const scrollToBottom = () => {
    setTimeout(() => {
      const element: any = document.querySelector(".chat-box");
      element.behavior = "smooth";
      element.scrollTop = element.scrollHeight;
    });
  };
  const sendMessage = async () => {
    setTextMessage("");
    try {
      const response = await Axios.post(
        "https://chat-enif.oluwaseyialaka.repl.co/chat/send-message/" +
          id +
          "/" +
          customerId,
        {
          sender: "customer",
          content: textMessage,
        }
      );
      if (response.data.success) {
        setMessage((previousMessage: any) => {
          return [
            ...previousMessage,
            {
              content: textMessage.trim(),
              sender: "customer",
              sent_time: new Date(),
            },
          ];
        });
        scrollToBottom();
      }
    } catch (error: any) {}
  };

  return (
    <>
      <div className="widget_message widget">
        <div className="widget_header">
          <div className="widget_header_images">
            <div className="widget_image_element">
              <div onClick={() => navigate(-1)} className="vector">
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
            {message.map((message: any, index: number) => {
              // return <></>
              const messageBoxClass =
                message.sender === "customer"
                  ? "message-received"
                  : "message-sent";
              const messageClass =
                message.sender === "agent" ? "sent" : "received";
              return (
                <div key={index} className={`message-box ${messageBoxClass}`}>
                  {message.fromUserId === 0 && (
                    <img className="" src="images/Image-1.png" alt="" />
                  )}
                  <div key={index} className={`message ${messageClass}`}>
                    {message.content}
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
