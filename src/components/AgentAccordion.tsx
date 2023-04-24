import React, { useState } from 'react';
import '../assets/chat-home.css';
import '../assets/accordion.css';
interface AccordionProps{
    title:string;
    content:string;
    imageShow:boolean;
    image:string;
    agentName:string;
    time:string
}
const AgentAccordion: React.FC<AccordionProps> = ({ title, content,imageShow,image,agentName,time }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="faq-box ">

      <div className="faq_header_box " onClick={() => setIsActive(!isActive)}>
        <div className="text_img_box">

        {
          imageShow && <img src={image} alt="" />
        }
        <div className="">

        <p className='title'>{title}</p>
        {  
        <div className="details">
            <p>{agentName}</p>
            <p>{time}</p>
            
        </div> }
        </div>
        </div>
        <span>{isActive ? '' : '>'}</span>
      </div>
        {/* {isActive && <div className="accordion-content ">{content}</div>} */}
    </div>
   
  );
};

export default AgentAccordion;