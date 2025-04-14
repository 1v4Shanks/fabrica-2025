import React from "react";
import "./Title.css";
function Title({ text1, text2 }) {
  return (
    <div className="title-box">
      <h2>
        <span>{text1}</span> {text2}
      </h2>
      <p className="title-line"></p>
    </div>
  );
}

export default Title;
