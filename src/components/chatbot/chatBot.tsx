import ChatIcon from './chaticon/icon.js';
import './chatbot.css';
import ChatBotModal from './chatbotModal/chatBotModal.js';
import { FC, useState } from 'react';

interface ChatProps {
  businessId: string | undefined
}

const ChatBot:FC<ChatProps> = (props): JSX.Element => {
    const [openChatBot, setOpenChatBot] = useState(false);
    const [chatBotIcon, setChatBotIcon] = useState('hpivxauj.json')
    const [tabOpen, setTabOpen] = useState('home')

    function handleOpenChatBot(){
        if(openChatBot){
          setChatBotIcon('hpivxauj.json');
          setOpenChatBot(false);
        }else{
          setChatBotIcon('rxufjlal.json');
          setOpenChatBot(true);
        }
    }

    function changeTab(tab:string){
        setTabOpen(tab);
    }

    return (
      <div className="chatbot_container">
        {openChatBot && <ChatBotModal businessId={props.businessId}  changeTab={changeTab} tabOpen={tabOpen} />}
        <ChatIcon handleOpenChatBot={handleOpenChatBot} chatBotIcon={chatBotIcon} />
      </div>
    );
  }
  
  export default ChatBot;