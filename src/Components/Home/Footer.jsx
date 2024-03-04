import React, { useState } from "react";
import linkedin from "../Img/linkedin.png";
import twitter from "../Img/twitter.png";
import instagram from "../Img/instagram.png";
import { doc, setDoc } from "firebase/firestore";

import { db } from "../../Firebase/FirebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, getStorage } from "firebase/storage";

export const Footer = () => {
  const [loading, setLoading] = useState(false);
  const uuid = uuidv4();
  const storage = getStorage();

  const initialFormData = {
    name: "",
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const { name, email, message } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name || email || message) {
      setLoading(true);
      await setDoc(doc(db, "userMessages", uuid), {
        name,
        email,
        message,
      })
        .then((res) => {
          setLoading(false);
          setFormData(initialFormData);
          alert("Successfully Sent");
        })
        .catch(() => alert("Cannot Send Now"));
    } else {
      alert("plz fill all  the Field");
    }
  };

  const downLoadCvHandler = async () => {
    try {
      const fileRef = ref(storage, "uploadedCvFile");
      const url = await getDownloadURL(fileRef);
      const link = document.createElement("a");
      link.href = url;
      link.target = "blank";
      link.download = "uploadedCvFile";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <section id="footerSection" data-aos="fade-left">
      <div className="row">
        <div className="col1">
          <h4>Contact Us</h4>
          <a href="">rakeshmallick034@gmail.com</a>
          <a href="">8772985408</a>
          <div className="socialMediaAccounts">
            <img src={linkedin} alt="" />
            <img src={twitter} alt="" />
            <img src={instagram} alt="" />
          </div>
          <button onClick={() => downLoadCvHandler()} className="largeButton">
            Download CV
          </button>
        </div>
        <div className="col2">
          <form action="" type="post" onSubmit={(e) => handleSubmit(e)}>
            {loading && <div className="loader"></div>}
            <input type="text" placeholder="Your Name" value={name} name="name" onChange={(e) => handleChange(e)} />
            <input type="email" placeholder="Your Email" value={email} name="email" onChange={(e) => handleChange(e)} />
            <textarea
              name="message"
              cols="30"
              rows="10"
              placeholder="Your Message"
              value={message}
              onChange={(e) => handleChange(e)}
            ></textarea>
            <button type="submit" className="largeButton">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
