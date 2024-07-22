"use client";
import IMG from "@/app/component/Img";
import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { TemplateContext } from "@/app/context/TemplateContext";

const Header = () => {

  const data = useContext(TemplateContext);
  const { header } = data
  return (
    <div className={styles.header}>
      <div className={styles.header_Container}>
        <IMG
          src={header.img.value}
          alt="header-img"
          imageClasses={styles.header_image}
          useRawImgTag
        />
        <IMG
          src={header.bgImg.value}
          alt="header-img"
          imageClasses={styles.headerimage}
          useRawImgTag
        />
        <IMG
          src={header.Backbg.value}
          alt="header-img"
          imageClasses={styles.headerback}
          useRawImgTag
        />
        <IMG
          src={header.bgBack.value}
          alt="header-img"
          imageClasses={styles.header_back}
          useRawImgTag
        />
        <div className={styles.logo_wrapper}>
          <IMG
            src={header.logo.value}
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
