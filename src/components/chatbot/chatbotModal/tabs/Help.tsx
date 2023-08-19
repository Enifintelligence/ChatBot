import { FC, useEffect, useState } from 'react';
import './tab.css';
import '../chatBotModal.css';
import '../../../../assets/single-message.css';
import "../../../../assets/chat-message.css";
import axios from 'axios';
interface ChatProps {
    chatIdentifier: string,
    businessId: string | undefined,
}

const Help:FC<ChatProps> = (props): JSX.Element =>{

    let businessId = props.businessId

    let serverUrl = "http://localhost:8000";
    const [faqs, setFaqs] = useState<any>([]);
    const [show, setShow] = useState<any>();

    useEffect(() => {
        let url = `${serverUrl}/api/business/get/${businessId}`
        axios({url: url, method: 'get' }).then(res => {
            console.log(res.data)
            setFaqs(res.data.knowledgeBase.faqs)
        })
    }, [])

    return (
        <div className='chatbot_modal_messages_con'>
            <div className='chatbot_modal_messages'>
                {faqs.map( (faq:any, index:any) => {
                    return(
                        <div key={index} className='help_container'>
                            <div onClick={() => setShow(index)} className='help_question'>
                                <h4>{faq.question}</h4>
                                <p>^</p>
                            </div>
                            {show == index &&
                            <div className='help_answer'>
                                <p>
                                    {faq.reply}
                                </p>
                            </div>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Help;