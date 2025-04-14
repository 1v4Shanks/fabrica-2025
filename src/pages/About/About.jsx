import React from "react";
import "./About.css";
import Title from "../../components/Title/Title";
import { assets } from "../../assets/assets";
import Policy from "../../components/Policy/Policy";
import NewsLetterBox from "../../components/NewsLetterBox/NewsLetterBox";
function About() {
  return (
    <div className="about-us-container">
      {/* //-----------------ABOUT US-----------------//  */}

      <div className="about-us-title">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="about-us-content">
        <img
          src={assets.about_img}
          alt="about us image"
          className="about-us-image"
        />
        <div className="about-us-details">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <p className="mission">Our Mission</p>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      {/* //-----------------WHY CHOOSE US-----------------// */}

      <div className="why-choose-us-title">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="why-choose-us-content">
        <div className="details">
          <p className="mini-heading">Quality Assurance:</p>
          <p>
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>

        <div className="details">
          <p className="mini-heading">Convenience:</p>
          <p>
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>

        <div className="details">
          <p className="mini-heading">Exceptional Customer Service:</p>
          <p>
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}

export default About;
