import React, { useState } from "react";
import { getStorage, ref, deleteObject, uploadBytes, getMetadata } from "firebase/storage";

export const CvUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [cvFile, SetCvFile] = useState(null);
  const storage = getStorage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cvFile) {
      setLoading(true);
      const storageRef = ref(storage, "uploadedCvFile");
      await getMetadata(storageRef)
        .then(async (res) => {
          await deleteObject(storageRef).then(() => {});
        })
        .catch(() => {});
      await uploadBytes(storageRef, cvFile)
        .then((snapshot) => {
          SetCvFile(null);
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

  return (
    <section id="cVUpdateSection" data-aos="fade-right">
      <h3>Cv Update</h3>

      <form action="" onSubmit={(e) => handleSubmit(e)}>
        {loading && <div className="loader"></div>}
        <label htmlFor="cvFile">
          <i className="fa-solid fa-file"></i>
          {cvFile && cvFile.name}
        </label>
        <input type="file" id="cvFile" style={{ display: "none" }} onChange={(e) => SetCvFile(e.target.files[0])} />
        <button type="submit" className="smallButton">
          Submit
        </button>
      </form>
    </section>
  );
};
