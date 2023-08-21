import { FC } from 'react';
import '../chatBotModal.css';

interface ChatProps {
    changeTab: Function,
}

const HomeTab:FC<ChatProps> = (props): JSX.Element =>{

    const newChat = () => {
        setCookie("email", '', -2)
        setCookie("chatId", '', -2)
        props.changeTab('details')
    }

    const setCookie = (cname: String, cvalue: String, exdays: number) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";";
    }
    
    return (
        <div className='chatbot_modal_middle_box'>
            <div className='chatbot_modal_middle_msgModal'>
                <div className='chatbot_modal_middle_userIcon_con'>
                    <div className='chatbot_modal_middle_userIcon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256"><path fill="currentColor" d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56Z"/></svg>
                    </div>
                </div>

                <div className='chatbot_modal_middle_msg_con'>
                    <div className='chatbot_modal_middle_msg'>
                        <p>
                        Hello 👋 Nice to see you here!
                        By pressing the "Start chat" button you agree to have your personal data processed as described in our Privacy Policy
                        </p>
                    </div>
                </div>

                <div onClick={() => newChat()} className='chatbot_modal_middle_msgModal_btn'>
                    Start Chat
                </div>
            </div>
            {/* <div
            className="live_chat_signal"
            onClick={() => props.changeTab('details')}
            >
                <div className="live_chat_text">
                    <p>Live chat</p>
                    <small>We typically reply in few minutes...</small>
                </div>
                <img src="/images/Send.png" className="live_chat_image" alt="" />
            </div> */}
        </div>

    );
}

export default HomeTab;