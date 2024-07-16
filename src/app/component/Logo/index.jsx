import React from "react";
import styles from "./styles.module.scss";

const Logo = ({ className = "" }) => {
  return (
    <div className={`${styles.logo_wrapper} ${className}`}>
      <img src="/assets/Logo.png" alt="logo" />
    </div>
  );
};

export default Logo;
