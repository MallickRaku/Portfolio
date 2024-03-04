import React from "react";
import { SkillUpdate } from "./SkillUpdate";
import { ProjectUpdate } from "./ProjectUpdate";
import { UserMessages } from "./UserMessages";
import { CvUpdate } from "./CvUpdate";

const AdminPanel = () => {
  return (
    <section id="adimPanelSection">
      <h3> “ Hello Rakesh Mallick „ </h3>
      <CvUpdate />
      <SkillUpdate />
      <ProjectUpdate />
      <UserMessages />
    </section>
  );
};
export default AdminPanel;
