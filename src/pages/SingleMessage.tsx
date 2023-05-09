import "../assets/reset_and_normalize.css";
import "../assets/chat-home.css";
import "../assets/chat-message.css";
import "../assets/all-messages.css";
import "../assets/single-message.css";
import "../assets/all-messages.css";
import io from "socket.io-client";
import "../assets/footer.css";
import Footer from "../layouts/Footer";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "../api";
import axios from "axios";

const SingleMessage = () => {
  let { id, customerId } = useParams();
  const [message, setMessage] = useState<any>([]);
  const [socket, setSocket] = useState<any>(null);
  const fetchMessages = async () => {
    try {
      const response = await Axios.get(`get-conversation/${id}/${customerId}`);
      setMessage(response.data.data);
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
    emitMessage(customerId as string, id as string);
    try {
      const response = await Axios.post(`send-chat/` + id + "/" + customerId, {
        // const response = await Axios.post(`sendChat/` + id + "/" + customerId, {
        sender: "customer",
        content: textMessage,
      });
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
  const emitMessage = (customerId: string, businessId: string) => {
    console.log(customerId, businessId);
    socket.emit("message", {
      message: textMessage,
      customerIdentifier: customerId,
    });
  };

  useEffect(() => {
    const newSocket = io("http://127.0.0.1:3009/", {
      // const newSocket = io("https://api.enif.ai", {
      extraHeaders: {
        Authorization: `${id}--${customerId}`,
      },
    });
    // Add this code to handle the 'message' event
    newSocket.on("message", (data) => {
      console.log(data);
      let newMessage = {
        content: data.message,
        sender: "agent",
        sent_time: new Date(),
      };
      console.log({ data });
      setMessage((previousMessages: any) => {
        return [...previousMessages, newMessage];
      });
      scrollToBottom();
      // setEachConversation({ messages: [...eachConversation.messages, newMessage] });

      console.log("Received message from server: ", data);
    });

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      // newSocket.emit("hello", "Hello server!");
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    // Save the socket instance to the state variable
    setSocket(newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [id, customerId]);

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
            <div className="">
              <form className="flex-col flex gap-4 mt-8 ">
                <div className="shadow-md bg-white">
                  <label htmlFor="Full name" className="">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="pt-[1.98rem] bg-red-300 pb-[2rem] s"
                  />
                </div>
                <div className="shadow-md bg-white">
                  <label htmlFor="Email" className="">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your name"
                    className="pt-[1.98rem] bg-red-300 pb-[2rem] s"
                  />
                </div>
                <div className="shadow-md bg-white">
                  <label htmlFor="Phone number" className="">
                    Phone number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your number"
                    className="pt-[1.98rem] bg-red-300 pb-[2rem] s"
                  />
                </div>
              </form>
            </div>
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
                <p>xs</p>
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
