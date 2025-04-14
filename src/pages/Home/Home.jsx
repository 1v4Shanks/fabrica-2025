import React from "react";
import "./Home.css";
import Hero from "../../components/Hero/Hero";
import LatestCollection from "../../components/LatestCollection/LatestCollection";
import BestSeller from "../../components/BestSeller/BestSeller";
import Policy from "../../components/Policy/Policy";
import NewsLetterBox from "../../components/NewsLetterBox/NewsLetterBox";

function Home() {
  return (
    <div className="home-container">
      <Hero />
      <LatestCollection />
      <BestSeller />
      <Policy />
      <NewsLetterBox />
    </div>
  );
}

export default Home;
