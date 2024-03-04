import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";

export const Skills = () => {
  const [listOfSkills, setListOfSkills] = useState([]);

  const handleClick = (e) => {
    const descElement = e.target.parentElement.querySelector(".desc");
    descElement.style.display == "block" ? (descElement.style.display = "none") : (descElement.style.display = "block");
  };

  useEffect(() => {
    const getSkillList = async () => {
      let temArray = [];
      const querySnapshot = await getDocs(collection(db, "Skills"));
      querySnapshot.forEach((doc) => {
        temArray.push(doc.data());
        setListOfSkills(temArray);
      });
    };
    getSkillList();
  }, []);

  return (
    <section id="skillsSection" data-aos="fade-left">
      <h2>Skills</h2>
      <div className={`skillsContainer`}>
        {listOfSkills.map((skill) => {
          const { skillName, skillPercentage, skillDescription } = skill;
          return (
            <div className="skill" key={skillName}>
              <i className="fa-solid fa-arrow-right" onClick={(e) => handleClick(e)}></i>
              <h3>{skillName}</h3>
              <div className="progressBar">
                <div className="progress" style={{ width: `${skillPercentage}%` }}></div>
              </div>
              <div className="desc">{skillDescription}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
