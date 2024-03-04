import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";

export const ProjectUpdate = () => {
  const [listOfProjects, setListOfProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const storage = getStorage();
  const initialFromData = {
    projectName: "",
    projectUrl: "",
    projectDescription: "",
    backgroundImage: null,
  };
  const [formData, setFormData] = useState(initialFromData);
  // destructuring object
  const { projectName, projectUrl, projectDescription, backgroundImage } = formData;
  const [selDeteteProject, setSelDeteteProject] = useState(null);

  const addProjectElement = useRef();
  const deleteProjectElement = useRef();

  const handleAddProjectClick = () => {
    addProjectElement.current.style.display = "block";
    deleteProjectElement.current.style.display = "none";
  };

  const handleDeleteProjectClick = () => {
    addProjectElement.current.style.display = "none";
    deleteProjectElement.current.style.display = "flex";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name !== "backgroundImage" ? value : e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectName || projectUrl || projectDescription || backgroundImage) {
      setLoading(true);

      const storageRef = ref(storage, backgroundImage.name);
      const uploadTask = uploadBytesResumable(storageRef, backgroundImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await setDoc(doc(db, "Projects", projectName), {
              projectName,
              projectUrl,
              projectDescription,
              backgroundImage: downloadURL,
            })
              .then((res) => {
                setLoading(false);
                setFormData(initialFromData);
                alert("successfully Added");
              })
              .catch((error) => alert(`sorry cannot store  ${error}`));
          });
        }
      );
    } else {
      alert("plz fill all the fields");
    }
  };

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
  const handleSubmit2 = async () => {
    if (selDeteteProject) {
      await deleteDoc(doc(db, "Projects", selDeteteProject))
        .then(() => alert("successfully Deleted"))
        .catch(() => alert("cannot Delete "));
    } else {
      alert("Plz select First");
    }
  };

  return (
    <section id="projectUpdateSection" data-aos="fade-left">
      <h3>Projects Update</h3>
      <div className="row">
        <div className="col1" onClick={(e) => handleAddProjectClick(e)}>
          ADD
        </div>
        <div className="col2" onClick={(e) => handleDeleteProjectClick(e)}>
          DELETE
        </div>
      </div>

      <div className="addProject" ref={addProjectElement}>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          {loading && <div className="loader"></div>}
          <input placeholder="Project Name" value={projectName} name="projectName" onChange={(e) => handleChange(e)} />
          <input name="projectUrl" placeholder="Project URL" value={projectUrl} onChange={(e) => handleChange(e)} />
          <textarea
            name="projectDescription"
            placeholder="Project Desciption"
            cols="30"
            rows="7"
            value={projectDescription}
            onChange={(e) => handleChange(e)}
          ></textarea>

          <label htmlFor="bgImage">
            <i className="fa-solid fa-images"></i>
            {formData.backgroundImage && formData.backgroundImage.name}
          </label>
          <input
            type="file"
            id="bgImage"
            name="backgroundImage"
            style={{ display: "none" }}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" className="smallButton">
            Submit
          </button>
        </form>
      </div>
      <div className="deleteProject" ref={deleteProjectElement}>
        <select onChange={(e) => setSelDeteteProject(e.target.files[0])}>
          {listOfProjects.map((project) => (
            <option value={project.projectName} key={project.projectName}>
              {project.projectName}{" "}
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
