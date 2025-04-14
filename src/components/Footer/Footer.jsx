import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content-box">
        <div className="footer-logo-box">
          <img
            src={assets.logo}
            alt="logo"
            className="footer-logo footer-headings"
          />
          <p>
            Fabrica – Where fashion meets quality. Explore our collection of
            stylish, high-quality clothes designed for every occasion. Crafted
            with care, made for you.
          </p>
        </div>
        <div>
          <h2 className="footer-headings">COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <h2 className="footer-headings">GET IN TOUCH</h2>
          <ul>
            <li>+1-000-000-0000</li>
            <li>fabricaglobal@gmail.com</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="footer-copyright">
        <p>Copyright 2025@ Fabrica - All Right Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
