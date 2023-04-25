import '../assets/reset_and_normalize.css'
import '../assets/footer.css';

import { useNavigate,Link } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate()
    return (  
    <>
        <footer className="footer">
            <div className="footer_element_box">
                <Link to='/asdfghjklkhdss' className="element_box">
                    <img src="/images/Home.png" alt="" />
                    <p>Home</p>
                </Link>
                <Link to='/messages' className="element_box">
                    <img src="/images/Message.png" alt="" />
                    <p>Message</p>
                </Link>
                <Link to='' className="element_box">
                    <img src="/images/Help.png" alt="" />
                    <p>Help</p>
                </Link>
            </div>
        </footer>
    </>);
}
 
export default Footer;