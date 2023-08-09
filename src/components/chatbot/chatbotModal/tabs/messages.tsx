import { FC, useEffect, useState } from 'react';
import '../chatBotModal.css';
import '../../../../assets/single-message.css';
import "../../../../assets/chat-message.css";
import Axios from "../../../../api";
import io from "socket.io-client";
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement } from 'react-html-parser';

interface ChatProps {
    chatIdentifier: string,
    businessId: string | undefined,
}

const Messages:FC<ChatProps> = (props): JSX.Element =>{

    // let { id: businessId } = useParams();

    let id = props.businessId


    const [message, setMessage] = useState<any>([]);
    const [textMessage, setTextMessage] = useState("");
    const [typing, setTyping] = useState(false);
    const [socket, setSocket] = useState<any>(null);
    const fetchMessages = async () => {
        try {
        const response = await Axios.get(`get-conversation/${id}/${props.chatIdentifier}`);
        setMessage(response.data.data);
        } catch (error: any) {}
    };
    useEffect(() => {
        props.chatIdentifier && fetchMessages();
    }, [props.chatIdentifier]);
    
    useEffect(() => {
        if (props.chatIdentifier) {
          // const newSocket = io("http://127.0.0.1:3009/", {
          const newSocket = io("https://api.enif.ai", {
            extraHeaders: {
              Authorization: `${id}--${props.chatIdentifier}`,
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
            // scrollToBottom();
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
          console.log(props.chatIdentifier);
    
          // Clean up the socket connection when the component unmounts
          return () => {
            newSocket.disconnect();
          };
        }
    }, [props.chatIdentifier]);

    const sendMessage = async () => {
        setTextMessage("");
        setTimeout(async () => {
          setTyping(true)
          scrollToBottom();
        }, 3000)
        emitMessage(props.chatIdentifier as string, id as string);
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
          setTimeout(async () => {
            // const response = await Axios.post(`send-chat/` + id + "/" + props.chatIdentifier, {
            //   // const response = await Axios.post(`sendChat/` + id + "/" + props.chatIdentifier, {
            //   sender: "customer",
            //   content: textMessage,
            // });
            
            // if (response.data.success) {
            //   // setMessage((previousMessage: any) => {
            //   //   return [
            //   //     ...previousMessage,
            //   //     {
            //   //       content: textMessage.trim(),
            //   //       sender: "customer",
            //   //       sent_time: new Date(),
            //   //     },
            //   //   ];
            //   // });
            //   setTyping(false)
            //   scrollToBottom();
            // }
            let url = `http://localhost:3000/ai?prompt=${textMessage}`
            const response = await axios({url: url, method: 'get'});
            
            if (response.data.content) {
              console.log(response.data.content.split('\n'));
              // let contents = response.data.content.split('\n');
              // let msgs: any[] = []
              // if(contents.length > 1){
              //   for (let i = 0; i < contents.length; i++) {
              //     let data: any = {}
              //     let name = contents[i].match(/\[(.*?)\]/)
              //     let image = contents[i].match(/\((.*?)\)/)
              //     if(name){
              //       data['name'] = name[1];
              //       if(image){
              //         data['image'] = image[1];
              //       }
              //       msgs.push(data);
              //     }
              //   }
              // }else{
              //   let data: any = {}
              //   data['name'] = contents[0]
              //   msgs.push(data);
              // }
              // if(msgs.length == 0){
              //   let data: any = {}
              //   let msg =response.data.content;
              //   let name = response.data.content.match(/\[(.*?)\]/)
              //   let image = response.data.content.match(/\((.*?)\)/)
                
              //   if(name || image){
              //     msg = msg.replace(/\[(.*?)\]/g, '<br>')
              //     let images = msg.match(/\((.*?)\)/g)
              //     for (let i = 0; i < images.length; i++) {
              //       const image = images[i];
              //       let exImage = image.match(/\((.*?)\)/);
              //       msg = msg.replace(exImage[0], `<br><img className="" src="${exImage[1]}" alt="product image" />`)
              //       msg = msg.replace('!', '')
              //       // msg = msg.replace(' - ', '<>&emsp</>')
              //     }
              //   }
                
              //   data['name'] = msg.replace(/\n/g, '<br>')
              //   msgs.push(data);
              // }
              let msg =response.data.content;
              let name = response.data.content.match(/\[(.*?)\]/)
              let image = response.data.content.match(/\((.*?)\)/)
              
              if(name || image){
                msg = msg.replace(/\[(.*?)\]/g, '<br>')
                let images = msg.match(/\((.*?)\)/g)
                for (let i = 0; i < images.length; i++) {
                  const image = images[i];
                  let exImage = image.match(/\((.*?)\)/);
                  msg = msg.replace(exImage[0], `<br><img className="" src="${exImage[1]}" alt="product image" />`)
                  msg = msg.replace('!', '')
                  // msg = msg.replace(' - ', '<>&emsp</>')
                }
              }
              msg = msg.replace(/\n/g, '<br>')
              setMessage((previousMessage: any) => {
                return [
                  ...previousMessage,
                  {
                    content: msg,
                    sender: "agent",
                    sent_time: new Date(),
                  },
                ];
              });
              setTyping(false)
              scrollToBottom();
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
        socket.emit("message", {
          message: textMessage,
          customerIdentifier: customerId,
        });
    };


    return (
        <div className='chatbot_modal_messages_con'>
            <div className='chatbot_modal_messages'>
                {message.map((msg: any, index: number) => {
                // return <></>
                const messageBoxClass =
                    msg.sender === "customer"
                    ? "message-received"
                    : "message-sent";
                const messageClass =
                    msg.sender === "agent" ? "sent" : "received";
                return (
                    <>
                      <div key={index} className={`message-box ${messageBoxClass} ${(!typing && index == message.length-1) ? " magb" : ""}` } >
                        {message.fromUserId === 0 && (
                            <img className="" src="images/Image-1.png" alt="" />
                        )}
                        {/* {msg.sender === "customer" && */}
                        <div key={index} className={`message ${messageClass}`}>
                            {ReactHtmlParser(msg.content)}
                        </div>
                        {/* } */}
                        {/* <div className={`chat_content_con` }>
                          {msg.sender === "agent" &&
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
                    Javis is typing
                    <div className="typing">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  </div>
                }
            </div>
            {props.chatIdentifier && (
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
    );
}

export default Messages;