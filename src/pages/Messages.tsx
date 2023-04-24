import "../assets/reset_and_normalize.css";
import "../assets/chat-message.css";
import "../assets/chat-home.css";
import "../assets/all-messages.css";
import "../assets/footer.css";

import Footer from "../layouts/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import AgentAccordion from "../components/AgentAccordion";

const AllMessages = () => {
  const navigate= useNavigate()
  const accordionData = [
    {
      title: "Rate your conversation",
      content: ``,
      path: "/images/Image-1.png",
      agentName: "Bola .",
      time: " 23wks ago",
    },
    {
      title: "Rate your conversation",
      content: ``,
      path: "/images/Image-1.png",
      agentName: "Bola .",
      time: " 23wks ago",
    },
    {
      title: "Rate your conversation",
      content: ``,
      path: "/images/Image-1.png",
      agentName: "Bola .",
      time: " 23wks ago",
    },

    {
      title: "Rate your conversation",
      content: ``,
      path: "/images/Image-1.png",
      agentName: "Bola .",
      time: " 23wks ago",
    },
    {
      title: "Rate your conversation",
      content: ``,
      path: "/images/Image-1.png",
      agentName: "Bola .",
      time: " 23wks ago",
    },
    {
      title: "Rate your conversation",
      content: ``,
      path: "/images/Image-1.png",
      agentName: "Bola .",
      time: " 23wks ago",
    },
    {
      title: "Rate your conversation",
      content: ``,
      path: "/images/Image-1.png",
      agentName: "Bola .",
      time: " 23wks ago",
    },
    {
      title: "Rate your conversation",
      content: ``,
      path: "/images/Image-2.png",
      agentName: "Bola .",
      time: " 23wks ago",
    },
    {
      title: "Rate your conversation",
      content: ``,
      path: "/images/Image-3.png",
      agentName: "Bola .",
      time: " 23wks ago",
    },
    {
      title: "Rate your conversation",
      content: ``,
      path: "/images/Image-3.png",
      agentName: "Bola .",
      time: " 23wks ago",
    },
    {
      title: "Rate your conversation",
      content: ``,
      path: "/images/Image-2.png",
      agentName: "Bola .",
      time: " 23wks ago",
    },
    {
      title: "Rate your conversation",
      content: ``,
      path: "/images/Image-1.png",
      agentName: "Bola .",
      time: " 23wks ago",
    },
    {
      title: "Rate your conversation",
      content: ``,
      path: "/images/Image-1.png",
      agentName: "Bola .",
      time: " 23wks ago",
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
                <button  onClick={()=>navigate(-1)} className="vector">
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
        <NavLink to='/review' className="messages_accordion_box">
          {accordionData.map(({ title, content, path, agentName, time }) => (
            <AgentAccordion
              agentName={agentName}
              time={time}
              imageShow={true}
              image={path}
              title={title}
              content={content}
            />
          ))}
        </NavLink>
        <Footer />
      </div>
    </>
  );
};

export default AllMessages;
