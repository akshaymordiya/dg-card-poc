import React from "react";
import styles from "./styles.module.scss";

const SectionTitle = ({ title = "", itemclass = "" }) => {
  return (
    <div className={` ${styles.section_wrapper} ${itemclass}`}>
      <h2
        id="title_name"
        className={`${styles.section_wrapper_title} special-title `}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
