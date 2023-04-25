import "../assets/reset_and_normalize.css";
import "../assets/chat-home.css";
import { useState } from "react";
import Accordion from "../components/Accordion";
import Footer from "../layouts/Footer";
import UserInfo from "../components/UserInfoModal";
const ChatHome = () => {
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
  const [widgetStatus, setWidgetStatus] = useState(false);

  const [openInfoModal, setOpenInfoModal] = useState(false);
  return (
    <>
      {  (
        <div id="widget_home" className="widget">
          <header className="header">
            <div className="logo_header_container">
              <div className="logo_box">
                <img src="/images/Logo.png" alt="" />
                <div className="logo_text">
                  <p className="">enif</p>
                </div>
              </div>
              <div className="header_images">
                <div className="header_image_box">
                  <img
                    className="header_image"
                    src="/images/Image-1.png"
                    alt=""
                  />
                  <small>Funke</small>
                </div>
                <div className="header_image_box">
                  <img
                    className="header_image"
                    src="/images/Image-2.png"
                    alt=""
                  />

                  <small>Abdul</small>
                </div>
                <div className="header_image_box">
                  <img
                    className="header_image"
                    src="/images/Image-3.png"
                    alt=""
                  />
                  <small>John</small>
                </div>
              </div>
            </div>
            <div className="header_text">
              <h2>Hello there</h2>
              <p>How can we help ?</p>
            </div>
          </header>
          <div className="widget_home_body">
            <div
              className="live_chat_signal"
              onClick={() => setOpenInfoModal(true)}
            >
              <div className="live_chat_text">
                <p>Live chat</p>
                <small>We typically reply in few minutes...</small>
              </div>
              <img src="/images/Send.png" className="live_chat_image" alt="" />
            </div>
            <div className="live_chat_faq">
              <form action="">
                <div className="search_box">
                  <input type="search" name="" id="" placeholder="search" />
                </div>
              </form>
              <div className="faqs">
                {accordionData.map(({ title, content }) => (
                  <Accordion
                    key={title}
                    imageShow={false}
                    image={""}
                    title={title}
                    content={content}
                  />
                ))}
              </div>
            </div>
          </div>
          {openInfoModal && <UserInfo closeModal={setOpenInfoModal} />}
          <Footer />
        </div>
      )}
      
    </>
  );
};

export default ChatHome;
