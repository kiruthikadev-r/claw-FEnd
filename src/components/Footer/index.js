import { ImFacebook2 } from 'react-icons/im';
import { FaInstagram, FaTwitter } from 'react-icons/fa';

import './index.css';

const Footer = () => (
  <footer className="footer-container">
    <div className="footer-content">
      <p className="footer-contact">
        For any queries, contact +91 9876543210 <br /> or email us at help@nxtmart.co.in
      </p>
      <div className="social-icons">
        <ImFacebook2 className="icon" aria-label="Facebook" />
        <FaInstagram className="icon" aria-label="Instagram" />
        <FaTwitter className="icon" aria-label="Twitter" />
      </div>
    </div>
    <p className="footer-copyright">
      Copyright © 2023 NxtMart Grocery Supplies Pvt Ltd
    </p>
  </footer>
);

export default Footer;
