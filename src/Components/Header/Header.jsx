import React from "react";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig";
import { Link, useNavigate } from "react-router-dom";

export const Header = ({ setModule }) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("signout successfully");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };
  return (
    <header>
      <nav>
        <h3>
          <Link to={"/"}>PortFolio</Link>{" "}
        </h3>
        <ul>
          <li>
            <a href="#homePage">Home</a>
          </li>
          <li>
            <a href="#aboutSection">About</a>
          </li>
          <li>
            <a href="#skillsSection">Skills</a>
          </li>
          <li>
            <a href="#projectsSection">Project</a>
          </li>
          <li>
            <a href="#footerSection">Contact</a>
          </li>
          <li>
            {Object.keys(user).length === 0 ? (
              <a href="#" onClick={() => setModule(true)}>
                <i className="fa-solid fa-user-tie"></i>
              </a>
            ) : (
              <a href="#" onClick={() => handleSignout()}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </a>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
