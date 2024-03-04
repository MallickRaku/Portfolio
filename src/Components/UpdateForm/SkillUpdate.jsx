import { deleteDoc, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";

export const SkillUpdate = () => {
  const [listOfSkills, setListOfSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const addSkillElement = useRef();
  const deleteSkillElement = useRef();

  const initialFromData = {
    skillName: "",
    skillPercentage: "",
    skillDescription: "",
  };
  const [formData, setFormData] = useState(initialFromData);
  // destructing object
  const { skillName, skillPercentage, skillDescription } = formData;
  const [selDeteteSkill, setSelDeteteSkill] = useState(null);

  const handleAddSkillClick = () => {
    addSkillElement.current.style.display = "block";
    deleteSkillElement.current.style.display = "none";
  };
  const handleDeleteSkillClick = () => {
    addSkillElement.current.style.display = "none";
    deleteSkillElement.current.style.display = "flex";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (skillName || skillPercentage || skillDescription) {
      setLoading(true);
      await setDoc(doc(db, "Skills", skillName), {
        skillName,
        skillPercentage,
        skillDescription,
      })
        .then((res) => {
          setFormData(initialFromData);
          setLoading(false);
          alert("successfully Added");
        })
        .catch((error) => {
          setLoading(false);
          alert(`sorry cannot store  ${error}`);
        });
    } else {
      alert("plz fill all the fields");
    }
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

  const handleSubmit2 = async () => {
    if (selDeteteSkill) {
      await deleteDoc(doc(db, "Skills", selDeteteSkill))
        .then(() => alert("successfully Deleted"))
        .catch(() => alert("cannot Delete "));
    } else {
      alert("Plz select First");
    }
  };

  return (
    <section id="skillUpdateSection" data-aos="fade-right">
      <h3>Skills Update</h3>
      <div className="row">
        <div className="col1" onClick={(e) => handleAddSkillClick(e)}>
          ADD
        </div>
        <div className="col2" onClick={(e) => handleDeleteSkillClick(e)}>
          DELETE
        </div>
      </div>
      <div className="addSkill" ref={addSkillElement}>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          {loading && <div className="loader"></div>}

          <input placeholder="Skill Name" name="skillName" value={skillName} onChange={(e) => handleChange(e)} />
          <input
            type="number"
            max={99}
            placeholder="Skill in percentage"
            name="skillPercentage"
            value={skillPercentage}
            onChange={(e) => handleChange(e)}
          />
          <textarea
            placeholder="Skill Description"
            cols="30"
            rows="7"
            name="skillDescription"
            value={skillDescription}
            onChange={(e) => handleChange(e)}
          ></textarea>
          <button type="submit" className="smallButton">
            Submit
          </button>
        </form>
      </div>
      <div className="deleteSkill" ref={deleteSkillElement}>
        <select onChange={(e) => setSelDeteteSkill(e.target.value)}>
          {listOfSkills.map((skill) => (
            <option value={skill.skillName} key={skill.skillName}>
              {skill.skillName}
            </option>
          ))}
        </select>
        <button onClick={() => handleSubmit2()} className="smallButton">
          Delete{" "}
        </button>
      </div>
    </section>
  );
};
