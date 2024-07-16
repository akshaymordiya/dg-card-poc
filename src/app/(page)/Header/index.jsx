import IMG from "@/app/component/Img";
import React from "react";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_Container}>
        <IMG
          src="/assets/bg-header.png"
          alt="header-img"
          imageClasses={styles.header_image}
          useRawImgTag
        />
        <IMG
          src="/assets/bg-back.png"
          alt="header-img"
          imageClasses={styles.header_back}
          useRawImgTag
        />
        <div className={styles.logo_wrapper}>
          <IMG
            src="/assets/Logo.png"
            alt="header-img"
            imageClasses={styles.header_logo}
            useRawImgTag
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
