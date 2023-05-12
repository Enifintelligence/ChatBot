import "../assets/reset_and_normalize.css";
import "../assets/chat-home.css";
import "../assets/chat-message.css";
import "../assets/all-messages.css";
import "../assets/single-message.css";
import "../assets/all-messages.css";
import io from "socket.io-client";
import "../assets/footer.css";
import Footer from "../layouts/Footer";
import { useForm } from "react-hook-form";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "../api";
import axios from "axios";

const SingleMessage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm();

  const watchName = watch("name", "");
  const watchEmail = watch("customer_email", "");
  const watchPassword = watch("phone_number", "");
  let { id: businessId } = useParams();

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
    customerId && fetchMessages();
  }, [customerId]);
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

      const response = await Axios.post(`send-chat/` + id + "/" + customerId, {
        // const response = await Axios.post(`sendChat/` + id + "/" + customerId, {
        sender: "customer",
        content: textMessage,
      });
      if (response.data.success) {
        // setMessage((previousMessage: any) => {
        //   return [
        //     ...previousMessage,
        //     {
        //       content: textMessage.trim(),
        //       sender: "customer",
        //       sent_time: new Date(),
        //     },
        //   ];
        // });
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
    if (customerId) {
      // const newSocket = io("http://127.0.0.1:3009/", {
        const newSocket = io("https://api.enif.ai", {
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
      console.log(customerId);

      // Clean up the socket connection when the component unmounts
      return () => {
        newSocket.disconnect();
      };
    }
  }, [customerId]);
  const [showElements, setShowElements] = useState<Array<number>>([]);

  const handleFieldDisplay = (value: number): any => {
    setShowElements((oldValue) => {
      return [...oldValue, value];
    });
  };

  const onSubmit = async (data: any) => {
    let newConversation = {
      ...data,
      business_id: businessId,
    };
    try {
      let response = await Axios.post(
        `/start-conversation/${businessId}/`,
        data
      );
        console.log('hello')
      let { business_id, chat_identifier } = response?.data?.data;
      console.log(business_id, chat_identifier);
      navigate("/message/" + business_id + "/" + chat_identifier);
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
            {!customerId && (
              <div className="">
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                  <div className="display input_box">
                    <label htmlFor="Full name" className="">
                      Full name
                    </label>
                    <div className={`input_border `}>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className=""
                        {...register("name", { required: true })}
                      />

                      {watchName.length > 0 ? (
                        <img
                          // onClick={() => handleFieldDisplay(2)}
                          className="check_img_2"
                          src="/images/Check.png"
                          alt=""
                        />
                      ) : (
                        <img
                          onClick={() => handleFieldDisplay(2)}
                          className="check_img"
                          src="/images/Shape.png"
                          alt=""
                        />
                      )}
                      {errors?.customer_name &&
                        errors?.customer_name.type === "required" && (
                          <p>Customer name is required</p>
                        )}
                    </div>
                  </div>
                  <div
                    className={`input_box display ${
                      showElements.includes(1) ? "" : ""
                    }`}
                  >
                    <label htmlFor="Email" className="">
                      Email
                    </label>
                    <div className={`input_border `}>
                      <input
                        type="email"
                        required
                        placeholder="Enter your Email"
                        className="pt-[1.98rem] bg-red-300 pb-[2rem] s"
                        {...register("customer_email", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                      />
                      {watchEmail.length > 0 ? (
                        <img
                          onClick={() => handleFieldDisplay(2)}
                          className="check_img_2"
                          src="/images/Check.png"
                          alt=""
                        />
                      ) : (
                        <img
                          onClick={() => handleFieldDisplay(2)}
                          className="check_img"
                          src="/images/Shape.png"
                          alt=""
                        />
                      )}
                      {errors.customer_email &&
                        errors.customer_email.type === "required" && (
                          <p>Email is required</p>
                        )}
                      {errors.customer_email &&
                        errors.customer_email.type === "pattern" && (
                          <p>Email address is invalid</p>
                        )}
                    </div>
                  </div>
                  <div
                    className={`input_box display ${
                      showElements.includes(2) ? "" : ""
                    }`}
                  >
                    <label htmlFor="Phone number" className="">
                      Phone number
                    </label>
                    <div className={`input_border `}>
                      <input
                        type="text"
                        placeholder="Enter your number"
                        className="pt-[1.98rem] bg-red-300 pb-[2rem] s"
                        {...register("phone_number", {
                          required: true,
                          minLength: 10,
                          maxLength: 12,
                          validate: (value) => {
                            const regex = /^\d{10,12}$/;
                            return regex.test(value);
                          },
                        })}
                      />
                      {/* {watchPassword.length > 0 ? (
                        <img
                          onClick={handleSubmit(onSubmit)}
                          className="check_img_2"
                          src="/images/Check.png"
                          alt=""
                        />
                      ) : (
                        <img
                          onClick={handleSubmit(onSubmit)}
                          className="check_img"
                          src="/images/Shape.png"
                          alt=""
                        />
                      )} */}
                      <img
                          onClick={handleSubmit(onSubmit)}
                          className="check_img"
                          src="/images/Shape.png"
                          alt=""
                        />
                      {errors.phone_number &&
                        errors.phone_number.type === "required" && (
                          <p>Phone number is required</p>
                        )}
                      {errors.phone_number && <p>Phone number is invalid</p>}
                    </div>
                  </div>
                </form>
              </div>
            )}
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
          {customerId && (
            <div className="message_box">
              <div className="message_icons_left">
                <textarea
                  className="message_input"
                  value={textMessage}
                  onChange={(e: any) => setTextMessage(e.target.value)}
                  placeholder="Start a conversation"
                />
                <div className="icons"></div>
              </div>
              <div className="button">
                <button onClick={() => sendMessage()}>Send</button>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SingleMessage;
