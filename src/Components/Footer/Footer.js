import React from 'react';
import logo from '../images/ultras_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fonts from '@fortawesome/free-brands-svg-icons'
import './Footer.css';

function Footer() {
  return (
    <footer>
      <section className="footer_info">
        <div className="footer_blocks">
          <h2>Quick Links</h2>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
          <a href="#">Best Of</a>
        </div>
        <div className="footer_blocks">
          <h2>Most Popular Articles</h2>
          <a href="#">Who is ultras</a>
          <a href="#">Ultras rules</a>
          <a href="#">No Pyro No Party</a>
          <a href="#">Top 10 Ultras Movies</a>
        </div>
        <div className="footer_blocks">
          <h2>Follow Us</h2>
          <div className="footer_logo">
            <img src={logo} alt="Footer logo" />
          </div>
          <div className="follow_us_icons">
            <FontAwesomeIcon icon={fonts.faFacebook} /> 
            <FontAwesomeIcon icon={fonts.faYoutube} /> 
            <FontAwesomeIcon icon={fonts.faInstagram} /> 
            <FontAwesomeIcon icon={fonts.faTwitter} /> 
          </div>
        </div>
      </section>
      <section className="copy_right">
        <p>Copy Right &copy; 2012 all rights reserved</p>
      </section>
    </footer>
  );
}

export default Footer;