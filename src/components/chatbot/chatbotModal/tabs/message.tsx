import { FC, useEffect, useState } from 'react';
import '../chatBotModal.css';
import '../../../../assets/single-message.css';
import "../../../../assets/chat-message.css";
// import io from "socket.io-client";
import axios from 'axios';
// import ReactHtmlParser, { processNodes, convertNodeToElement } from 'react-html-parser';
// import parse from 'html-dom-parser'
interface ChatProps {
    chatDetails: any,
    businessId: string | undefined,
    messages?: any
}

const Message:FC<ChatProps> = (props): JSX.Element =>{

    // let { id: businessId } = useParams();

    // let id = props.businessId
    let businessId = props.businessId
    // https://enif-business-production.up.railway.app
    let serverUrl = import.meta.env.VITE_API_BASE_URL;
    const [message, setMessage] = useState<any>([]);
    const [id, setId] = useState("");
    const [textMessage, setTextMessage] = useState("");
    const [agentName, setAgentName] = useState("");
    const [typing, setTyping] = useState(false);
    const [socket, setSocket] = useState<any>(null);

    const fetchMessages = async (id: string) => {
      console.log("dfef")
        try {
        let url = `${serverUrl}${serverUrl[serverUrl.length-1] === "/" ? "": "/"}api/chat/conversation/${id}`
        axios({url: url, method: 'get' }).then(res => {
            setCookie("email", res.data.email, 2)
            formatMessages(res.data.messages)
        })
        } catch (error: any) {}
    };

    useEffect(() => {
      console.log(props.messages)
      props.chatDetails.customer_email && setCookie("email", props.chatDetails.customer_email, 2);
      let id = getCookie('ticketId')
      !props.messages && id && fetchMessages(id);
      id && setId(id)
      props.messages && formatMessages(props.messages)

      if(localStorage.getItem("agentName")){
        setAgentName(localStorage.getItem("agentName") as string)
      }
    }, [])

    useEffect(() => {
        // let id = localStorage.getItem('ticketId')
        id && reJoin(id);
        console.log(id);
        if(localStorage.getItem("agentName")){
          setAgentName(localStorage.getItem("agentName") as string)
        }

    }, [id]);

    const formatMessages = (messages: any) => {
        let prevMessages = []
        for(let i=0; i < messages.length; i++ ){
            let message = messages[i]
            console.log(message)
            if(message.role == "user"){
                prevMessages.push({
                    content: message.content.trim(),
                    role: "user",
                    sent_time: message.created_date,
                })
                continue
            }

            if(message.status === 'draft'){
              continue
            }
            
            if(message.content){
              let msg = message.content;
              let name = message.content.match(/\[(.*?)\]/)
              let image = message.content.match(/\((.*?)\)/)
              
              if(name || image){
              msg = msg.replace(/\[(.*?)\]/g, '<br>')
              let images = msg.match(/\((.*?)\)/g)
              if(images){
                  for (let i = 0; i < images.length; i++) {
                  const image = images[i];
                  let exImage = image.match(/\((.*?)\)/);
                  if(exImage[1].lastIndexOf('.jpg') > -1 || exImage[1].lastIndexOf('.png') > -1 || exImage[1].lastIndexOf('.jpeg') > -1 || exImage[1].lastIndexOf('.gif') > -1){
                      msg = msg.replace(exImage[0], `<br><img className="" src="${exImage[1]}" alt="product image" />`)
                      msg = msg.replace('!', '')
                      // msg = msg.replace(' - ', '<>&emsp</>')
                  }else{
                      if(exImage[1].indexOf('http') > -1){
                      msg = msg.replace(exImage[0], `<a className="" href="${exImage[1]}" target='_blank' >Link</a> <br>`)
                      msg = msg.replace('!', '')
                      }
                  }
                  }
              }
              }
              msg = msg.replace(/\n/g, '<br>')
              prevMessages.push(
                  {
                      content: msg,
                      role: "assistance",
                      sent_time: message.created_date,
                  }
              )
            }
        }
        setMessage(prevMessages)
        scrollToBottom()
    }
    
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

    const initConnection = async (id:string) => {
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
      //       content: data.reply.content,
      //       sender: "assistance",
      //       sent_time: data.reply.created_date,
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
        let newMessage = {
            content: data.reply.content,
            sender: "assistance",
            sent_time: data.reply.created_date,
        };
        setMessage((previousMessages: any) => {
        return [...previousMessages, newMessage];
        });
        scrollToBottom();
        // setEachConversation({ messages: [...eachConversation.messages, newMessage] });
      }

      const socket = new WebSocket(`wss://${serverUrl.split("//")[1]}`, id);

      socket.addEventListener('open', (event) => {
        // WebSocket connection is open
        console.log(event)
      });

      socket.addEventListener('message', (event) => {
        // Handle incoming WebSocket messages
        console.log(event.data)
        if(event.data){
          let parseData = JSON.parse(event.data);
          if(parseData.event === "newmessage"){
            handleNewMessageEvent(parseData.data)
          }
        }
      });

      socket.addEventListener('close', (event) => {
        // WebSocket connection is closed
      });
    }

    const sendMessage = async () => {
        if(props.chatDetails.customer_email)
        setCookie("email", props.chatDetails.customer_email, 2);

        setTextMessage("");
        setTimeout(() => {
          setTyping(true)
          scrollToBottom();
        }, 3000)
        // emitMessage(.name as string, id as string);

        try {
          setMessage((previousMessage: any) => {
            return [
              ...previousMessage,
              {
                content: textMessage.trim(),
                role: "user",
                sent_time: new Date(),
              },
            ];
          });
          scrollToBottom();
          setTimeout(async () => {

            let ticketId = getCookie('ticketId')
            let email = getCookie('email')
            let data: any = {
              businessId: businessId, 
              channel: "chat", 
              customer: props.chatDetails.name, 
              email: email, 
              promptMsg: textMessage.trim()
            }
            if(ticketId){
              data["ticketId"] = ticketId;
            }
            let url = `${serverUrl}${serverUrl[serverUrl.length-1] === "/" ? "": "/"}api/chat/send`
            let response = await axios({url: url, method: 'post', data: data })

            if(response.data.replyMode === 'supervised'){
                setTyping(false)
                return
            }else if(response.data.replyMode === 'hybrid' && !response.data.reply){
                setTyping(false)
                return
            }
            
            // setTyping(true)
            if (response.data.reply.content) {
              localStorage.setItem('ticketId', response.data.ticketId)
              setCookie("ticketId", response.data.ticketId, 2)
              if(!ticketId){
                initConnection(response.data.ticketId)
              }else{
                emitMessage(ticketId as string, businessId as string);
              }
              console.log(response.data.reply.content.split('\n'));

              let msg =response.data.reply.content;
              let name = response.data.reply.content.match(/\[(.*?)\]/)
              let image = response.data.reply.content.match(/\((.*?)\)/)
              
              if(name || image){
                msg = msg.replace(/\[(.*?)\]/g, '<br>')
                let images = msg.match(/\((.*?)\)/g)
                if(images){
                  for (let i = 0; i < images.length; i++) {
                    const image = images[i];
                    let exImage = image.match(/\((.*?)\)/);
                    if(exImage[1].lastIndexOf('.jpg') > -1 || exImage[1].lastIndexOf('.png') > -1 || exImage[1].lastIndexOf('.jpeg') > -1 || exImage[1].lastIndexOf('.gif') > -1){
                      msg = msg.replace(exImage[0], `<br><img className="" src="${exImage[1]}" alt="product image" />`)
                      msg = msg.replace('!', '')
                      // msg = msg.replace(' - ', '<>&emsp</>')
                    }else{
                      if(exImage[1].indexOf('http') > -1){
                        msg = msg.replace(exImage[0], `<a className="" href="${exImage[1]}" target='_blank' >Link</a> <br>`)
                        msg = msg.replace('!', '')
                      }
                    }
                  }
                }
              }
              msg = msg.replace(/\n/g, '<br>')
              setTyping(false)
              setMessage((previousMessage: any) => {
                return [
                  ...previousMessage,
                  {
                    content: msg,
                    role: "assistance",
                    sent_time: new Date(),
                  },
                ];
              });
              setTyping(false)
              scrollToBottom();
            }else{
              setTyping(false)
            }
          }, 5000)
        } catch (error: any) {}
    };

    const scrollToBottom = () => {
        setTimeout(() => {
          const element: any = document.querySelector(".chatbot_modal_messages");
          element.behavior = "smooth";
          element.scrollTop = element.scrollHeight;
        });
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
      console.log(id)
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
      //           content: data.reply.content,
      //           role: "assistance",
      //           sent_time: data.reply.created_date,
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
            content: data.reply.content,
            role: "assistance",
            sent_time: data.reply.created_date,
        };
        setMessage((previousMessages: any) => {
        return [...previousMessages, newMessage];
        });
        scrollToBottom();
        // setEachConversation({ messages: [...eachConversation.messages, newMessage] });
      }

      const socket = new WebSocket(`wss://${serverUrl.split("//")[1]}`, id);

      socket.addEventListener('open', (event) => {
        // WebSocket connection is open
        console.log(event)
      });

      socket.addEventListener('message', (event) => {
        // Handle incoming WebSocket messages
        console.log(event.data)
        if(event.data){
          let parseData = JSON.parse(event.data);
          if(parseData.event === "newmessage"){
            handleNewMessageEvent(parseData.data)
          }
        }
      });

      socket.addEventListener('close', (event) => {
        // WebSocket connection is closed
      });
    };

    const setCookie = (cname: String, cvalue: String, exdays: number) => {
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";";
    }
    
    const getCookie = (cname:string) => {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    const handleKeyDown = (event: any) => {
      console.log('User pressed: ', event.key);
  
      if (event.key === 'Enter') {
        // 👇️ your logic here
        if(event.shiftKey)
        {
          console.log('shift enter was pressed');
        }else{
          event.preventDefault()
          sendMessage()
          console.log('Enter key pressed ✅');
        }
      }
    };

    const handleOnChange = (event: any) => {
      console.log(event.target.value)
      setTextMessage(event.target.value)
    };

    return (
        <div className='chatbot_modal_messages_con'>
            <div className='chatbot_modal_messages'>
                {message.map((msg: any, index: number) => {
                // return <></>
                const messageBoxClass =
                    msg.role === "user"
                    ? "message-received"
                    : "message-sent";
                const messageClass =
                    msg.role === "assistance" ? "sent" : "received";
                return (
                    <>
                      <div key={index} className={`message-box ${messageBoxClass} ${(!typing && index == message.length-1) ? " magb" : ""}` } >
                        {message.fromUserId === 0 && (
                            <img className="" src="images/Image-1.png" alt="" />
                        )}
                        {/* {msg.role === "customer" && */}
                        <div key={index} className={`message ${messageClass}`}
                          dangerouslySetInnerHTML={{__html: msg.content}}>

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
                {typing &&
                  <div className="chat_bubble">
                    <span style={{textTransform: "capitalize"}}>{agentName.length > 0 ? agentName : "Javis"}</span> is typing
                    <div className="typing">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  </div>
                }
            </div>
            {/* {.name && ( */}
                <div className="message_box">
                <div className="message_icons_left">
                    <textarea
                    className="message_input"
                    value={textMessage}
                    onKeyDown={handleKeyDown}
                    onChange={handleOnChange}
                    placeholder="Start a conversation"
                    />
                    <div className="icons"></div>
                </div>
                <div className="button">
                    <button onClick={() => sendMessage()}>Send</button>
                </div>
                </div>
            {/* )} */}
        </div>
    );
}

export default Message;