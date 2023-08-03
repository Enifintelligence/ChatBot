import { FC, useState } from 'react';
import './chaticon.css';

interface ChatProps {
  handleOpenChatBot: Function,
  chatBotIcon: string,
}

const ChatIcon:FC<ChatProps> = (props): JSX.Element => {
  const [containerCss, setContainerCss] = useState('chaticon_container')

  function setCssDown(){
    setContainerCss('chaticon_container chaticon_container_down')
  }

  function setCssUp(){
    setContainerCss('chaticon_container')
  }

    return (
      <button className={containerCss} onClick={() => props.handleOpenChatBot()} onKeyDown={setCssDown} onKeyUp={setCssUp}>
        <div className="chaticon">
            <lord-icon
                src={`https://cdn.lordicon.com/${props.chatBotIcon}`}
                trigger="hover"
                state={props.chatBotIcon === "rxufjlal.json" ? "hover-2" : "hover"}
                colors="primary:#ffffff"
                style={{
                    width: '60%',
                    height: '60%',
                }}>
            </lord-icon>
        </div>
      </button>
    );
  }
  
  export default ChatIcon;