import React from "react";
import { Front } from "./Front";
import { About } from "./About";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { Footer } from "./Footer";

const Home = () => {
  return (
    <div id="homePage">
      <Front />
      <About />
      <Skills />
      <Projects />
      <Footer />
    </div>
  );
};

export default Home;
