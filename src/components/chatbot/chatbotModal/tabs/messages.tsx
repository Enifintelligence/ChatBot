import { FC, useEffect, useState } from 'react';
import './tab.css';
import '../chatBotModal.css';
import '../../../../assets/single-message.css';
import "../../../../assets/chat-message.css";
import axios from 'axios';
interface ChatProps {
    chatDetails: any,
    businessId: string | undefined,
    setMessages: Function,
    changeTab: Function,

}

const Messages:FC<ChatProps> = (props): JSX.Element =>{

    // let businessId = props.businessId

    let serverUrl = import.meta.env.VITE_API_BASE_URL;
    const [messages, setMessages] = useState<any>([]);

    useEffect(() => {
        let email = getCookie('email')
        let url = `${serverUrl}/api/chat/user/${email}`
        axios({url: url, method: 'get' }).then(res => {
            console.log(res.data)
            setMessages(res.data.ticket)
        }).catch((err) => {
          props.changeTab('details')
        })
    }, [])

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

    const handleSelectMessage = (message :any) => {
      if(message.email)
      setCookie("email", message.email, 2);

      setCookie("ticketId", message.id, 2)

      localStorage.removeItem("agentName")

      if(message.agentName)
      localStorage.setItem("agentName", message.agentName)

      axios
      .get(`${serverUrl}/api/chat/messages/${message.id}`)
      .then((response) => {
        console.log(response.data);
        props.setMessages(response.data?.data);
        props.changeTab('message')
      })
      .catch((error) => {
        // if (error instanceof AxiosError) {
        //   const errMessage = error.response?.data?.message;
        //   setError(errMessage);
        // }
        // setIsLoading(false);
      });
    }

    return (
        <div className='chatbot_modal_messages_con'>
            <div className='chatbot_modal_messages'>
                {messages.map( (message:any, index:any) => {
                    return(
                        <div key={index} className='help_container'>
                            <div onClick={() => handleSelectMessage(message)} className='help_question'>
                                <h4>{message.category ? message.category : "General Inquiries"}</h4>
                                <p>^</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Messages;