import React, { useState } from 'react';
import '../assets/chat-home.css';
// import '../assets/accordion.css';
interface AccordionProps{
    title:string;
    content:string;
    imageShow:boolean;
    image:string
}
const Accordion: React.FC<AccordionProps> = ({ title, content,imageShow,image }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="faq-box ">

      <div className="faq_header_box " onClick={() => setIsActive(!isActive)}>
        <div className="text_img_box">

        {
          imageShow && <img src={image} alt="" />
        }
        <p>{title}</p>
        { imageShow && <></>}
        </div>
        <span className='accordion_toggle'>{isActive ? '-' : '+'}</span>
      </div>
        {isActive && <div className="accordion-content ">{content}</div>}
    </div>
   
  );
};

export default Accordion;