import { NavLink, useNavigate } from "react-router-dom";
import "../assets/reset_and_normalize.css";
import "../assets/chat-message.css";
import "../assets/chat-home.css";
import "../assets/review.css";
import "../assets/footer.css";
import "../assets/all-messages.css";
import "../assets/help-page.css";
import Footer from "../layouts/Footer";
import Accordion from "../components/Accordion";
import { useState } from "react";
const accordionData = [
  {
    title: "Tell me about Credpal Credit card",
    content: `Credit Builder is a financial tool to help people improve their credit scores. It can involve making small purchases and paying them back on time, or taking out a special loan and making timely repayments. Both options result in a positive credit history and higher credit score.`,
  },
  {
    title: "Tell me about CredPal BNPL",
    content: `We understand that by using CredPal's Buy Now Pay Later, you place your trust in us to handle your transactional data and personal information with the utmost discretion. We comply with standard practices in protecting your data and encrypting the details you supply.`,
  },
  {
    title: "Tell me about CredPal Savings ",
    content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
      quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
      dolor ut sequi minus iste? Quas?`,
  },
  {
    title: "Tell me about CredPal Investment ",
    content: `You can access CredPal's Buy Now Pay Later with our merchant partners online and offline.
    **Use Buy Now Pay Later in 3 ways:**
    
    Visit 'Shop' on your mobile app
    Use CredPal at checkout on the merchant's website
    Scan our QR code in the merchant's store.`,
  },
];
const buttons = ["Savings", "Credit Builder", "BNPL", "Investment"];
const Help = () => {
    const [active, setActive] = useState(0);
    const handleAccordionContentChange = (value: number) => {
        setActive(value);
    };
  const navigate = useNavigate();
  return (
    <>
      <div className="help_page ">
        <div className="widget_header">
          <div className="widget_header_images">
            <div className="widget_image_element">
              <div onClick={() => navigate(-1)} className="vector">
                <img src="/images/Vector.png" className="vector-image" alt="" />

              </div>
            </div>
              <h2>Tell me about Credpal</h2>
            <NavLink to="/">
              <button>x</button>
            </NavLink>
          </div>
        </div>
        <form action="">
          <div className="search_box">
            <input
              type="search"
              className="search_input"
              name=""
              id=""
              placeholder="search"
            />
          </div>
        </form>
        <div className="faq_selector">
          {buttons.map((item, id) => (
            <div
              onClick={() => handleAccordionContentChange(id)}
              className={`faq_button ${active==id?'active':""} `}
            >
              <p className="button_text">{item}</p>
            </div>
          ))}
        </div>

        {accordionData.map(({ title, content }) => (
          <Accordion
            key={title}
            imageShow={false}
            image={""}
            title={title}
            content={content}
            fullPage={true}
          />
        ))}
        <Footer></Footer>
      </div>
    </>
  );
};

export default Help;
