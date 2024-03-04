import React from "react";
import ProfilePic from "../Img/profilePic.png";

import linkedin from "../Img/linkedin.png";
import twitter from "../Img/twitter.png";
import instagram from "../Img/instagram.png";

export const Front = () => {
  return (
    <section className="frontSection" data-aos="fade-left">
      <div className="row">
        <div className="col1">
          <h4> " Hi</h4>
          <h5>I am Rakesh Mallick</h5>
          <h6>React Developer "</h6>
          <div className="socialMediaAccounts">
            <img src={linkedin} alt="" />
            <img src={twitter} alt="" />
            <img src={instagram} alt="" />
          </div>
        </div>
        <div className="col2">
          <div className="imgContainer">
            <img src={ProfilePic} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};
