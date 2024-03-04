import React, { useEffect } from "react";
import aboutImage from "../Img/about.jpg";

export const About = () => {
  return (
    <section id="aboutSection" data-aos="fade-right">
      <h2>About</h2>

      <div className={`row `}>
        <div className="col1">
          <div className="imageContainer">
            <img src={aboutImage} alt="" />
          </div>
        </div>
        <div className="col2">
          <div className="aboutContainer">
            <p>
              Welcome to my portfolio! I'm Rakesh Mallick, a passionate React developer dedicated to crafting dynamic
              websites with captivating user interfaces. My goal is to enhance the user experience, ensuring seamless
              interaction with every project I undertake.
            </p>
            <p>
              With a keen eye for design and a penchant for problem-solving, I'm committed to advancing React coding,
              constantly exploring new techniques and technologies to stay ahead of the curve.
            </p>
            <p>
              Beyond the digital realm, I believe in maintaining a balance between mind and body. When I'm not coding,
              you'll find me hiking, practicing yoga, or exploring new sports adventures.
            </p>
            <p>
              Let's embark on a journey of innovation, creativity, and growth together. Feel free to explore my
              portfolio and reach out for collaborations or projects. Let's create something remarkable!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
