import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";

export const Projects = () => {
  const [listOfProjects, setListOfProjects] = useState([]);
  useEffect(() => {
    const getProjectList = async () => {
      let temArray = [];
      const querySnapshot = await getDocs(collection(db, "Projects"));
      querySnapshot.forEach((doc) => {
        temArray.push(doc.data());
        setListOfProjects(temArray);
      });
    };
    getProjectList();
  }, []);
  return (
    <section id="projectsSection" data-aos="fade-right">
      <h2>Projects</h2>
      <div className="projectContainer">
        {listOfProjects.map((project) => {
          const { projectName, projectUrl, projectDescription, backgroundImage } = project;
          return (
            <div className="project" key={projectName}>
              <img src={backgroundImage} />
              <div className="layer">
                <h3>{projectName}</h3>
                <p>{projectDescription}</p>
                <a href={projectUrl}>
                  <i className="fa-solid fa-link"></i>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
