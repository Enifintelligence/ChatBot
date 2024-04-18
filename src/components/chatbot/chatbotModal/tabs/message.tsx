import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import "../chatBotModal.css";
import "../../../../assets/single-message.css";
import "../../../../assets/chat-message.css";
// import io from "socket.io-client";
import axios from "axios";
import Rating from "../../Rating/Rating";
// import ReactHtmlParser, { processNodes, convertNodeToElement } from 'react-html-parser';
// import parse from 'html-dom-parser'
interface ChatProps {
  chatDetails: any;
  businessId: string | undefined;
  messages?: any;
}

const Message: FC<ChatProps> = (props): JSX.Element => {
  const [socket, setSocket] = useState<any>();
  const [image, setImage] = useState<any | null>(null);
  const [imageURL, setImageURL] = useState<string>("");

  // let { id: businessId } = useParams();

  // let id = props.businessId
  let businessId = props.businessId;
  // https://enif-business-production.up.railway.app
  let serverUrl = import.meta.env.VITE_API_BASE_URL;
  const [message, setMessage] = useState<any>([]);
  const [id, setId] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [agentName, setAgentName] = useState("");
  const [typing, setTyping] = useState(false);
  const [businessTypingId, setBusinessTypingId] = useState<string>();

  const fetchMessages = async (id: string) => {
    console.log("dfef");
    try {
      let url = `${serverUrl}${
        serverUrl[serverUrl.length - 1] === "/" ? "" : "/"
      }api/chat/messages/${id}`;
      axios({ url: url, method: "get" }).then((res) => {
        // setCookie("email", res.data.email, 2)
        formatMessages(res.data.data);
      });
    } catch (error: any) {
      console.log("fetch messages errors", { error });
    }
  };

  useEffect(() => {
    console.log(props.messages);
    props.chatDetails.customer_email &&
      setCookie("email", props.chatDetails.customer_email, 2);
    let id = getCookie("ticketId");
    console.log(id);
    id && fetchMessages(id);
    id && setId(id);
    props.messages &&
      props.messages.length > 0 &&
      formatMessages(props.messages);

    if (localStorage.getItem("agentName")) {
      setAgentName(localStorage.getItem("agentName") as string);
    }
  }, []);

  useEffect(() => {
    // let id = localStorage.getItem('ticketId')
    id && reJoin(id);
    console.log(id);
    if (localStorage.getItem("agentName")) {
      setAgentName(localStorage.getItem("agentName") as string);
    }
  }, [id]);

  const formatMessages = (messages: any) => {
    let prevMessages = [];
    for (let i = 0; i < messages.length; i++) {
      let message = messages[i];
      console.log(message);
      // if(message.role == "user"){
      //     prevMessages.push({
      //         content: message.content.trim(),
      //         role: "user",
      //         sent_time: message.createdAt,
      //     })
      //     continue
      // }

      if (message.status === "draft") {
        continue;
      }

      if (message.content) {
        let msg = message.content;
        let name = message.content.match(/\[(.*?)\]/);
        let image = message.content.match(/\((.*?)\)/);

        if (name || image) {
          msg = msg.replace(/\[(.*?)\]/g, "<br>");
          let images = msg.match(/\((.*?)\)/g);
          if (images) {
            for (let i = 0; i < images.length; i++) {
              const image = images[i];
              let exImage = image.match(/\((.*?)\)/);
              if (
                exImage[1].lastIndexOf(".jpg") > -1 ||
                exImage[1].lastIndexOf(".png") > -1 ||
                exImage[1].lastIndexOf(".jpeg") > -1 ||
                exImage[1].lastIndexOf(".gif") > -1 ||
                exImage[1].lastIndexOf(".webp") > -1
              ) {
                msg = msg.replace(
                  exImage[0],
                  `<br><img className="" src="${exImage[1]}" alt="product image" />`
                );
                msg = msg.replace("!", "");
                // msg = msg.replace(' - ', '<>&emsp</>')
              } else {
                if (exImage[1].indexOf("http") > -1) {
                  msg = msg.replace(
                    exImage[0],
                    `<a className="" href="${exImage[1]}" target='_blank' >Link</a> <br>`
                  );
                  msg = msg.replace("!", "");
                }
              }
            }
          }
        }
        msg = msg.replace(/\n/g, "<br>");
        prevMessages.push({
          content: msg,
          role: message.role == "user" ? "user" : "assistance",
          sent_time: message.created_date,
        });
      }
    }
    setMessage(prevMessages);
    scrollToBottom();
  };

  // useEffect(() => {
  //     if (.name) {
  //       // const newSocket = io("http://127.0.0.1:3009/", {
  //       const newSocket = io("https://api.enif.ai", {
  //         extraHeaders: {
  //           Authorization: `${id}--${.name}`,
  //         },
  //       });
  //       // Add this code to handle the 'message' event
  //       newSocket.on("message", (data) => {
  //         console.log(data);
  //         let newMessage = {
  //           content: data.message,
  //           sender: "agent",
  //           sent_time: new Date(),
  //         };
  //         console.log({ data });
  //         setMessage((previousMessages: any) => {
  //           return [...previousMessages, newMessage];
  //         });
  //         // scrollToBottom();
  //         // setEachConversation({ messages: [...eachConversation.messages, newMessage] });
  //       });

  //       newSocket.on("connect", () => {
  //         console.log("Connected to socket server");
  //         // newSocket.emit("hello", "Hello server!");
  //       });

  //       newSocket.on("disconnect", () => {
  //         console.log("Disconnected from socket server");
  //       });

  //       // Save the socket instance to the state variable
  //       setSocket(newSocket);
  //       console.log(.name);

  //       // Clean up the socket connection when the component unmounts
  //       return () => {
  //         newSocket.disconnect();
  //       };
  //     }
  // }, [.name]);

  /*const initConnection = async (id: string) => {
    // const newSocket = io(serverUrl, {
    //   extraHeaders: {
    //     Authorization: `${id}`,
    //   },
    // })

    //   newSocket.on("message", (data) => {
    //     let newMessage = {
    //       content: data.message,
    //       sender: "agent",
    //       sent_time: new Date(),
    //     };
    //     console.log({ data });
    //     setMessage((previousMessages: any) => {
    //       return [...previousMessages, newMessage];
    //     });
    //     // scrollToBottom();
    //     // setEachConversation({ messages: [...eachConversation.messages, newMessage] });
    //   });

    // newSocket.on("newmessage", (data) => {
    //   console.log(data)
    //   let newMessage = {
    //       content: data?.reply.content,
    //       sender: "assistance",
    //       sent_time: data?.reply.created_date,
    //   };
    //   setMessage((previousMessages: any) => {
    //   return [...previousMessages, newMessage];
    //   });
    //   scrollToBottom();
    //   // setEachConversation({ messages: [...eachConversation.messages, newMessage] });
    // });

    // newSocket.on("connect", () => {
    //   console.log("Connected to socket server");
    //   // socket.emit("hello", "Hello server!");
    // });

    // newSocket.on("disconnect", () => {
    //   console.log("Disconnected from socket server");
    // });

    // setSocket(newSocket);

    const handleNewMessageEvent = (data: any) => {
      //   console.log(data)
      console.log("handleNewMessageEvent", { data });
      let newMessage = {
        content: data?.reply.content,
        sender: "assistance",
        sent_time: data?.reply.created_date,
      };
      setMessage((previousMessages: any) => {
        return [...previousMessages, newMessage];
      });
      scrollToBottom();
      // setEachConversation({ messages: [...eachConversation.messages, newMessage] });
    };

    const socket = new WebSocket(`wss://${serverUrl.split("//")[1]}`, id);
    setSocket(socket);
    socket.addEventListener("open", (event) => {
      // WebSocket connection is open
      console.log(event);
    });

    socket.addEventListener("message", (event) => {
      // Handle incoming WebSocket messages
      console.log(event.data);
      console.log("handleResponse", { event, data: event?.data });
      if (event.data) {
        let ticketId = getCookie("ticketId");
        let parseData = JSON.parse(event.data);
        if (parseData.event === "newmessage") {
          handleNewMessageEvent(parseData.data);
        }
        if (parseData.event === "responseMessage") {
          setTimeout(() => {
            handleResponse(parseData.data, ticketId);
          }, 2000);
        }

        if (parseData.event === "businessTyping") {
          if (parseData.data.typing) {
            setBusinessTypingId(parseData.data.businessId);
          } else {
            setBusinessTypingId("");
          }
          scrollToBottom();
        }
      }
    });

    socket.addEventListener("close", (event) => {
      // WebSocket connection is closed
    });
  };*/

  const initConnection = async (id: string) => {
    try {
      const handleNewMessageEvent = (data: any) => {
        console.log("handleNewMessageEvent", { data });
        let newMessage = {
          content: data?.reply.content,
          sender: "assistance",
          sent_time: data?.reply.created_date,
        };
        setMessage((previousMessages: any) => {
          return [...previousMessages, newMessage];
        });
        scrollToBottom();
      };
  
      const socket = new WebSocket(`wss://${serverUrl.split("//")[1]}`, id);
      setSocket(socket);
  
      socket.addEventListener("open", (event) => {
        console.log("WebSocket connection opened:", event);
      });
  
      socket.addEventListener("message", (event) => {
        console.log("Received WebSocket message:", event.data);
        const ticketId = getCookie("ticketId");
        const parseData = JSON.parse(event.data);
        
        switch (parseData.event) {
          case "newmessage":
            handleNewMessageEvent(parseData.data);
            break;
          case "responseMessage":
            setTimeout(() => {
              handleResponse(parseData.data, ticketId);
            }, 2000);
            break;
          case "businessTyping":
            setBusinessTypingId(parseData.data.typing ? parseData.data.businessId : "");
            scrollToBottom();
            break;
          default:
            break;
        }
      });
  
      socket.addEventListener("close", (event) => {
        console.log("WebSocket connection closed:", event);
      });
    } catch (error) {
      console.error("WebSocket connection error:", error);
    }
  };
  
  
  const sendMessage = async () => {
    userTyping(false);
    let msg = textMessage.trim();
    let imageMsg;
    if (image) {
      var formData = new FormData();
      formData.append("images", image);
      let imageRes = await imageUpload(formData);
      console.log(imageRes);
      imageMsg = imageRes.data[0];
      msg += ` (${imageMsg})`;
    }
    console.log(msg);
    if (msg.length <= 0) {
      return;
    }

    if (props.chatDetails.customer_email)
      setCookie("email", props.chatDetails.customer_email, 2);

    setTextMessage("");
    setImageURL("");
    setImage(null);
    setTimeout(() => {
      // setTyping(true)
      scrollToBottom();
    }, 3000);
    // emitMessage(.name as string, id as string);

    try {
      let text = msg;
      let image = msg.match(/\((.*?)\)/);

      if (image) {
        text = text.replace(/\[(.*?)\]/g, "<br>");
        let image = text.match(/\((.*?)\)/);

        if (image) {
          if (
            image[1].lastIndexOf(".jpg") > -1 ||
            image[1].lastIndexOf(".png") > -1 ||
            image[1].lastIndexOf(".jpeg") > -1 ||
            image[1].lastIndexOf(".gif") > -1 ||
            image[1].lastIndexOf(".webp") > -1
          ) {
            text = text.replace(
              image[0],
              `<br><img className="" src="${image[1]}" alt="product image" />`
            );
            text = text.replace("!", "");
            // text = text.replace(' - ', '<>&emsp</>')
          } else {
            if (image[1].indexOf("http") > -1) {
              text = text.replace(
                image[0],
                `<a className="" href="${image[1]}" target='_blank' >Link</a> <br>`
              );
              text = text.replace("!", "");
            }
          }
        }
      }

      setMessage((previousMessage: any) => {
        return [
          ...previousMessage,
          {
            content: text,
            role: "user",
            sent_time: new Date(),
          },
        ];
      });
      scrollToBottom();
      setTimeout(async () => {
        let ticketId = getCookie("ticketId");
        let email = getCookie("email");
        let data: any = {
          businessId: businessId,
          channel: "chat",
          customer: props.chatDetails.name,
          email: email,
          promptMsg: msg,
        };
        if (ticketId) {
          data["ticketId"] = ticketId;
        }

        let url = `${serverUrl}${
          serverUrl[serverUrl.length - 1] === "/" ? "" : "/"
        }api/chat/send`;
        let response = await axios({ url: url, method: "post", data: data });
        handleResponse(response.data, ticketId);
      }, 5000);
    } catch (error: any) {
      setTyping(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const element: any = document.querySelector(".chatbot_modal_messages");
      element.behavior = "smooth";
      element.scrollTop = element.scrollHeight;
      console.log(element.scrollHeight);
    }, 10);
  };

  /*const handleResponse = (data: any, ticketId: any) => {
    console.log("handleResponse", { data });
    if (data?.replyMode === "supervised") {
      setTyping(false);
      return;
    } else if (data?.replyMode === "hybrid" && !data?.reply) {
      setTyping(false);
      return;
    }

    // setTyping(true)
    if (data?.reply) {
      localStorage.setItem("ticketId", data.ticketId);
      setCookie("ticketId", data.ticketId, 2);
      if (!ticketId) {
        initConnection(data.ticketId);
      } else {
        emitMessage(ticketId as string, businessId as string);
      }
      console.log(data?.reply.content.split("\n"));

      let msg = data?.reply.content;
      let name = data?.reply.content.match(/\[(.*?)\]/);
      let image = data?.reply.content.match(/\((.*?)\)/);

      if (name || image) {
        msg = msg.replace(/\[(.*?)\]/g, "<br>");
        let images = msg.match(/\((.*?)\)/g);
        if (images) {
          for (let i = 0; i < images.length; i++) {
            const image = images[i];
            let exImage = image.match(/\((.*?)\)/);
            if (
              exImage[1].lastIndexOf(".jpg") > -1 ||
              exImage[1].lastIndexOf(".png") > -1 ||
              exImage[1].lastIndexOf(".jpeg") > -1 ||
              exImage[1].lastIndexOf(".gif") > -1 ||
              exImage[1].lastIndexOf(".webp") > -1
            ) {
              msg = msg.replace(
                exImage[0],
                `<br><img className="" src="${exImage[1]}" alt="product image" />`
              );
              msg = msg.replace("!", "");
              // msg = msg.replace(' - ', '<>&emsp</>')
            } else {
              if (exImage[1].indexOf("http") > -1) {
                msg = msg.replace(
                  exImage[0],
                  `<a className="" href="${exImage[1]}" target='_blank' >Link</a> <br>`
                );
                msg = msg.replace("!", "");
              }
            }
          }
        }
      }
      msg = msg.replace(/\n/g, "<br>");
      setTyping(false);

      // for(let i=0; i<message.length; i++){
      //   let prevMsg = message[i]
      //   console.log(prevMsg)
      //   console.log(prevMsg!.content, msg)
      //   if(prevMsg.sent_time === data?.reply.createdAt && prevMsg!.content === msg){
      //     console.log("true")
      //   }
      // }
      setMessage((previousMessage: any) => {
        console.log(previousMessage);
        let found = false;
        for (let i = 0; i < previousMessage.length; i++) {
          let prevMsg = previousMessage[i];
          console.log(prevMsg);
          console.log(prevMsg!.content, msg);
          if (
            prevMsg.sent_time === data?.reply.createdAt &&
            prevMsg!.content === msg
          ) {
            console.log("true");
            found = true;
          }
        }
        if (found) {
          return [...previousMessage];
        } else {
          return [
            ...previousMessage,
            {
              content: msg,
              role: "assistance",
              sent_time: data?.reply.createdAt,
            },
          ];
        }
      });
      setTyping(false);
      scrollToBottom();
    } else {
      setTyping(false);
    }
  };*/

  const handleResponse = (data: any, ticketId: any) => {
    console.log("handleResponse", { data });
  
    if (data?.replyMode === "supervised" || (data?.replyMode === "hybrid" && !data?.reply)) {
      setTyping(false);
      return;
    }
  
    if (data?.reply) {
      const { reply } = data;
  
      localStorage.setItem("ticketId", reply.ticketId);
      setCookie("ticketId", reply.ticketId, 2);
  
      if (!ticketId) {
        initConnection(reply.ticketId);
      } else {
        emitMessage(ticketId as string, businessId as string);
      }
  
      let msg = reply.content.replace(/\n/g, "<br>");
  
      const nameMatch = reply.content.match(/\[(.*?)\]/);
      const imageMatch = reply.content.match(/\((.*?)\)/);
  
      if (nameMatch || imageMatch) {
        msg = msg.replace(/\[(.*?)\]/g, "<br>");
        const images = msg.match(/\((.*?)\)/g);
  
        if (images) {
          for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const exImage = image.match(/\((.*?)\)/);
            const imageSource = exImage[1];
  
            if (imageSource.endsWith(".jpg") || imageSource.endsWith(".png") || imageSource.endsWith(".jpeg") ||
                imageSource.endsWith(".gif") || imageSource.endsWith(".webp")) {
              msg = msg.replace(
                exImage[0],
                `<br><img className="" src="${imageSource}" alt="product image" />`
              );
            } else if (imageSource.startsWith("http")) {
              msg = msg.replace(
                exImage[0],
                `<a className="" href="${imageSource}" target='_blank' >Link</a> <br>`
              );
            }
          }
        }
      }
  
      setMessage((previousMessage: any) => {
        const found = previousMessage.some((prevMsg: any) =>
          prevMsg.sent_time === reply.createdAt && prevMsg.content === msg
        );
  
        if (found) {
          return [...previousMessage];
        } else {
          return [
            ...previousMessage,
            { content: msg, role: "assistance", sent_time: reply.createdAt },
          ];
        }
      });
  
      setTyping(false);
      scrollToBottom();
    } else {
      setTyping(false);
    }
  };
  
  const emitMessage = (customerId: string, businessId: string) => {
    console.log(customerId, businessId);
    // socket.emit("message", {
    //   businessId: businessId,
    //   message: textMessage,
    //   customerIdentifier: customerId,
    // });
  };

  const reJoin = (id: string) => {
    console.log(id);
    // const newSocket = io(serverUrl, {
    //   extraHeaders: {
    //     Authorization: `${id}`,
    //   },
    // })

    //   newSocket.on("message", (data) => {
    //     // let newMessage = {
    //     //   content: data.message,
    //     //   sender: "agent",
    //     //   sent_time: new Date(),
    //     // };
    //     console.log(data);
    //     // setMessage((previousMessages: any) => {
    //     //   return [...previousMessages, newMessage];
    //     // });
    //     // scrollToBottom();
    //     // setEachConversation({ messages: [...eachConversation.messages, newMessage] });
    //   });

    //   newSocket.on("newmessage", (data) => {
    //       console.log(data)
    //       let newMessage = {
    //           content: data?.reply.content,
    //           role: "assistance",
    //           sent_time: data?.reply.created_date,
    //       };
    //       setMessage((previousMessages: any) => {
    //       return [...previousMessages, newMessage];
    //       });
    //       scrollToBottom();
    //       // setEachConversation({ messages: [...eachConversation.messages, newMessage] });
    //   });

    //   newSocket.on("connect", () => {
    //       console.log("Connected to socket server");
    //       // socket.emit("hello", "Hello server!");
    //   });

    //   newSocket.on("disconnect", () => {
    //       console.log("Disconnected from socket server");
    //   });

    //   newSocket.emit("user_joined", {
    //       id: id,
    //   });

    // setSocket(newSocket);

    const handleNewMessageEvent = (data: any) => {
      //   console.log(data)
      let newMessage = {
        content: data?.reply.content,
        role: "assistance",
        sent_time: data?.reply.created_date,
      };
      setMessage((previousMessages: any) => {
        return [...previousMessages, newMessage];
      });
      scrollToBottom();
      // setEachConversation({ messages: [...eachConversation.messages, newMessage] });
    };

    const socket = new WebSocket(`wss://${serverUrl.split("//")[1]}`, id);
    setSocket(socket);
    socket.addEventListener("open", (event) => {
      // WebSocket connection is open
      console.log(event);
      console.log("WebSocket connection is open");
    });

    socket.addEventListener("message", (event) => {
      // Handle incoming WebSocket messages
      console.log(event.data);
      if (event.data) {
        let parseData = JSON.parse(event.data);
        let ticketId = getCookie("ticketId");
        if (parseData.event === "newmessage") {
          handleNewMessageEvent(parseData.data);
        }
        if (parseData.event === "responseMessage") {
          setTimeout(() => {
            handleResponse(parseData.data, ticketId);
          }, 2000);
        }

        if (parseData.event === "businessTyping") {
          if (parseData.data.typing) {
            setBusinessTypingId(parseData.data.businessId);
          } else {
            setBusinessTypingId("");
          }
          scrollToBottom();
        }
      }
    });

    socket.addEventListener("close", (event) => {
      // WebSocket connection is closed
      console.log("WebSocket connection is closed");
    });
  };

  const setCookie = (cname: String, cvalue: String, exdays: number) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";";
  };

  const getCookie = (cname: string) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  const handleKeyDown = (event: any) => {
    // console.log('User pressed: ', event.key);

    if (event.key === "Enter") {
      // 👇️ your logic here
      if (event.shiftKey) {
        console.log("shift enter was pressed");
      } else {
        event.preventDefault();
        sendMessage();
        console.log("Enter key pressed ✅");
      }
    }
  };

  const handleOnChange = (event: any) => {
    // userTyping(event)
    setTextMessage(event.target.value);
  };

  const userTyping = (isTyping: boolean) => {
    let ticketId = getCookie("ticketId");
    const typingEvent = {
      event: "userTyping",
      data: {
        businessId: props.businessId,
        ticketId: ticketId,
        typing: isTyping,
      },
    };
    socket.send(JSON.stringify(typingEvent));
  };

  const handleFileupload = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files);
      setImage(e.target.files?.[0]);
      let imageUrl = URL.createObjectURL(e.target.files[0]);
      setImageURL(imageUrl);
    }
  };

  const fileUpload = () => {
    const input = document.createElement("input");
    input.accept = ".png,.jpeg,.jpg,.webp";
    input.id = "inventory";
    input.name = "inventory";
    input.type = "file";
    input.onchange = (ev) => handleFileupload(ev);
    input.hidden = true;
    input.click();
  };

  const imageUpload = async (formData: FormData) => {
    if (formData) {
      // formData.append('images', image)
      try {
        const res = await axios.post(
          `${serverUrl}${
            serverUrl[serverUrl.length - 1] === "/" ? "" : "/"
          }api/chat/image/${businessId}`,
          formData
        );
        console.log(res.data);
        return res.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    }
  };

  const imageRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="chatbot_modal_messages_con">
      <div className="chatbot_modal_messages">
        {message.map((msg: any, index: number) => {
          // return <></>
          const messageBoxClass =
            msg.role === "user" ? "message-received" : "message-sent";
          const messageClass = msg.role === "assistance" ? "sent" : "received";
          return (
            <>
              <div
                key={index}
                className={`message-box ${messageBoxClass} ${
                  !typing && index == message.length - 1 ? " magb" : ""
                }`}
              >
                {message.fromUserId === 0 && (
                  <img className="" src="images/Image-1.png" alt="" />
                )}
                {/* {msg.role === "customer" && */}
                <div
                  key={index}
                  className={`message ${messageClass}`}
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                >
                  {/* {parse(msg.content)} */}
                </div>
                {/* } */}
                {/* <div className={`chat_content_con` }>
                          {msg.role === "agent" &&
                            msg.content.map((msg: any, idx: number) => {
                              return(
                                  <div className={`chat_content`}>
                                      <p>{ReactHtmlParser(msg.name)}</p>
                                      {msg.image &&
                                      <img className="" src={msg.image} alt={msg.name} />}
                                  </div>
                              )
                            })
                          }
                        </div> */}
              </div>
            </>
          );
        })}
        {/* {typing &&
                  <div className="chat_bubble">
                    <span style={{textTransform: "capitalize"}}>{agentName.length > 0 ? agentName : "Javis"}</span> is typing
                    <div className="typing">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  </div>
                } */}
        {businessTypingId === businessId && !typing && (
          <div className="chat_bubble">
            <span style={{ textTransform: "capitalize" }}>
              {agentName.length > 0 ? agentName : "Javis"}
            </span>{" "}
            is typing
            <div className="typing">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        )}
      </div>
      <Rating />
      {/* {.name && ( */}
      <div className="message_box">
        <div className="message_icons_left">
          <textarea
            className="message_input"
            value={textMessage}
            onKeyDown={handleKeyDown}
            onChange={handleOnChange}
            onFocus={() => userTyping(true)}
            onBlur={() => userTyping(false)}
            placeholder="Start a conversation"
          />
          <div className="icons"></div>
        </div>
        <div>
          <input
            type="file"
            ref={imageRef}
            onChange={handleFileupload}
            id={"file-upload"}
          />
        </div>
        {imageURL.length > 1 ? (
          <div className="image_uploaded">
            <img src={imageURL} />
            <div
              onClick={() => {
                setImageURL("");
                setImage(null);
              }}
            >
              x
            </div>
          </div>
        ) : (
          <div
            className="upload_image"
            onClick={(e) => {
              fileUpload();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
            </svg>
          </div>
        )}
        <div className="send_button">
          <button onClick={() => sendMessage()}>Send</button>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default Message;
