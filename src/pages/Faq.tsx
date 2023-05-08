import "../assets/reset_and_normalize.css";
import "../assets/chat-message.css";
import "../assets/chat-home.css";
import "../assets/all-messages.css";
import "../assets/footer.css";

import Footer from "../layouts/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import AgentAccordion from "../components/AgentAccordion";
import Accordion from "../components/Accordion";

const Faq = () => {
  const navigate = useNavigate();
  const accordionData = [
    {
      title: "Tell me about Credpal Credit card",
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
      laborum cupiditate possimus labore, hic temporibus velit dicta earum
      suscipit commodi eum enim atque at? Et perspiciatis dolore iure
      voluptatem.`,
    },
    {
      title: "Tell me about CredPal BNPL",
      content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia veniam
      reprehenderit nam assumenda voluptatem ut. Ipsum eius dicta, officiis
      quaerat iure quos dolorum accusantium ducimus in illum vero commodi
      pariatur? Impedit autem esse nostrum quasi, fugiat a aut error cumque
      quidem maiores doloremque est numquam praesentium eos voluptatem amet!
      Repudiandae, mollitia id reprehenderit a ab odit!`,
    },
    {
      title: "Tell me about CredPal Savings ",
      content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
      quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
      dolor ut sequi minus iste? Quas?`,
    },
    {
      title: "Tell me about CredPal Investment ",
      content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
      quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
      dolor ut sequi minus iste? Quas?`,
    },
  ];
  // const {title,content}= accordionData
  return (
    <>
      <div className="widget">
        <div className="messages-header ">
          <div className="widget_header">
            <div className="widget_header_images">
              <div className="widget_image_element">
                <button onClick={() => navigate(-1)} className="vector">
                  <img
                    src="/images/Vector.png"
                    className="vector-image"
                    alt=""
                  />
                </button>
                <div className="header_image_box">
                  <img
                    className="header_image"
                    src="/images/Image-1.png"
                    alt=""
                  />
                  <small>Funke</small>
                </div>
              </div>
              <p>x</p>
            </div>
          </div>
        </div>
        <div className="all_messages_box">
          
            {accordionData.map(({ title, content}) => (
              <Accordion
                key={title}
                imageShow={false}
                image={""}
                title={title}
                content={content}
                fullPage={true}

              />
            ))}
         
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Faq;
