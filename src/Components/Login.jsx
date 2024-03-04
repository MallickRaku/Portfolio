import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/FirebaseConfig";

import { useNavigate } from "react-router-dom";
import ReactDom from "react-dom";
export const Login = ({ setModule }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setError(false);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email || password) {
      setLoading(true);
      setError(false);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setModule();
          setLoading(false);
          navigate("/adminpanel", { replace: true });
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
        });
    } else {
      alert("plz fill all field");
    }
  };

  const handleClick = () => {
    setModule(false);
    navigate("/");
  };
  return ReactDom.createPortal(
    <div className="loginModule">
      <div className="overlay"></div>
      <div className="loginBox">
        <i className="fa-regular fa-circle-xmark fa-xl" onClick={() => handleClick()}></i>
        <h3>Login</h3>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          {loading && <div className="loader"></div>}
          <div className="fieldDiv">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="fieldDiv">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button className="largeButton">Submit</button>
        </form>

        {error && <p>Wrong Password</p>}
      </div>
    </div>,
    document.getElementById("portal")
  );
};
