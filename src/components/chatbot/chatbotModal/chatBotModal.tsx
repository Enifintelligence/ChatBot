import { FC, useState } from 'react';
import './chatBotModal.css';
import HomeTab from './tabs/home';
import Details from './tabs/datails';
import Messages from './tabs/messages';
import Help from './tabs/Help';
import Message from './tabs/message';

interface ChatProps {
    changeTab: Function,
    tabOpen: string,
    businessId: string | undefined
}

const ChatBotModal:FC<ChatProps> = (props): JSX.Element =>{
    const [chatDetails, setChatDetails] = useState({})
    const [messages, setMessages] = useState([])

    return (
      <div className="chatbot_modal_container">
        <div className='chatbot_modal'>
            <div className='chatbot_modal_top'>
                <div></div>
                <h2>Chat with us</h2>
                <div></div>
            </div>
            <div className='chatbot_modal_middle'>
                {props.tabOpen === 'home' &&
                    <HomeTab changeTab={props.changeTab} />
                }
                {props.tabOpen === 'details' &&
                    <Details businessId={props.businessId} setChatDetails={setChatDetails} changeTab={props.changeTab} />
                }
                {props.tabOpen === 'message' &&
                    <Message businessId={props.businessId} chatDetails={chatDetails} messages={messages} />
                }
                {props.tabOpen === 'messages' &&
                    <Messages businessId={props.businessId} setMessages={setMessages} chatDetails={chatDetails} changeTab={props.changeTab} />
                }
                {props.tabOpen === 'help' &&
                    <Help businessId={props.businessId} chatDetails={chatDetails} />
                }
            </div>
            <div className='chatbot_modal_bottom'>
                <BottomIcon
                    changeTab={props.changeTab}
                    src1="https://cdn.lordicon.com/slduhdil.json"
                    src2="https://cdn.lordicon.com/osuxyevn.json"
                    trigger="hover"
                    tabOpen={props.tabOpen}
                    tab={['home', 'details', 'message']}
                    text='Home'
                />
                <BottomIcon
                    changeTab={props.changeTab}
                    src1="https://cdn.lordicon.com/pkmkagva.json"
                    src2="https://cdn.lordicon.com/hpivxauj.json"
                    trigger="hover"
                    tabOpen={props.tabOpen}
                    tab={['messages']}
                    text='Messages'
                    chatDetails={chatDetails}
                />
                <BottomIcon
                    changeTab={props.changeTab}
                    src1="https://cdn.lordicon.com/nocvdjmh.json"
                    src2="https://cdn.lordicon.com/enzmygww.json"
                    trigger="hover"
                    tabOpen={props.tabOpen}
                    tab={['help']}
                    text='Help'
                    chatDetails={chatDetails}
                />
                <BottomIcon
                    changeTab={props.changeTab}
                    src1="https://cdn.lordicon.com/msetysan.json"
                    src2="https://cdn.lordicon.com/psnhyobz.json"
                    trigger="hover"
                    tabOpen={props.tabOpen}
                    tab={['news']}
                    text='News'
                    chatDetails={chatDetails}
                />
            </div>
        </div>
      </div>
    );
}
  
export default ChatBotModal;

interface ChatPropsBottom {
    changeTab: Function,
    tabOpen: string,
    tab: any,
    src1: string, 
    src2: string, 
    trigger: any, 
    text: string, 
    chatDetails?: any,
}

 const BottomIcon:FC<ChatPropsBottom> = (props): JSX.Element =>{

    const [hover, setHover] = useState(false)

    function handleHover(value: boolean){
        setHover(value)
    }

    return(
        <div className='chatbot_modal_bottom_btn'
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            // onClick={() => props.changeTab((props.tabOpen !== props.tab && (props.chatDetails && props.chatDetails.length > 0) ? props.tab : props.tab === 'home' ? 'home' : 'details'))}
            onClick={() => props.changeTab( props.tab[0] )}
        >
        {
            // props.tabOpen === props.tab && (props.chatDetails && props.chatDetails.length > 0)
            props.tab.includes(props.tabOpen)
            ?
            <lord-icon
                src={props.src1}
                trigger="hover"
                colors="primary:#0057ff"
                className='chatbot_modal_bottom_btn'
                style={{
                    width: '80%',
                    height: '80%',
                    marginTop: '4px',
                }}>
            </lord-icon>
            :
            props.tab.includes(props.tabOpen) ?
            <lord-icon
                src={props.src1}
                trigger="hover"
                colors="primary:#0057ff"
                className='chatbot_modal_bottom_btn'
                style={{
                    width: '80%',
                    height: '80%',
                    marginTop: '4px',
                }}>
            </lord-icon>
            :
            <lord-icon
                src={props.src2}
                trigger={props.trigger}
                colors={hover ? "primary:#0057ff": "primary:#1a1a1a"}
                className='chatbot_modal_bottom_btn'
                style={{
                    width: '80%',
                    height: '80%',
                    marginTop: '4px',
                }}>
            </lord-icon>
        }
        <p style={{color: hover ? "#0057ff": "#1a1a1a"}}>{props.text}</p>
    </div>
    )
 } 