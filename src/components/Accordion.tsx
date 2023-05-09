import React, { useState } from 'react';
import '../assets/chat-home.css';
import '../assets/accordion.css';
interface AccordionProps{
    title:string;
    content:string;
    imageShow:boolean;
    image:string;
    fullPage:boolean;
    className:string
}
const Accordion: React.FC<AccordionProps> = ({ title, content,imageShow,image,fullPage, className }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="faq-box ">

      <div className={`${className} " faq_header_box "`} onClick={() => setIsActive(!isActive)}>
        <div className="text_img_box">

        {
          imageShow && <img src={image} alt="" />
        }
        <p className={`${fullPage?'faq_title':''} `}>{title}</p>
        { imageShow && <></>}
        </div>
        <span className='accordion_toggle'>
          <img className={`${isActive?'arrow_down':''}`} src="/images/Arrow.png" alt="" />
        </span>
      </div>
        {isActive && <div className={`${className} accordion-content `}>{content}</div>}
        <div className="space"></div>
    </div>
   
  );
};

export default Accordion;