import React from "react";
import "./Contact.css";
import Title from "../../components/Title/Title";
import { assets } from "../../assets/assets";
import NewsLetterBox from "../../components/NewsLetterBox/NewsLetterBox";
function Contact() {
  return (
    <div className="contact-us-container">
      <div className="contact-us-title">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="contact-us-content">
        <img src={assets.contact_img} alt="contact us image" className="contact-us-image"/>

        <div className="contact-us-details">
          <p className="mini-heading">Our Store</p>
          <p>
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p>Tel: (415) 555-0132</p>
          <p>Email: admin@forever.com</p>
          <p className="mini-heading">Careers at Forever</p>
          <p>Learn more about our teams and job openings.</p>

          <button className="exploreJobs-btn">Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
}

export default Contact;
