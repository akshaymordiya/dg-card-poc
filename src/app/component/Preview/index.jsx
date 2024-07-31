"use client";
import React, { useState } from "react";
import { TemplateProvider } from "@/app/context/TemplateContext";
import PersonalVideoOutlinedIcon from "@mui/icons-material/PersonalVideoOutlined";
import StayCurrentPortraitOutlinedIcon from "@mui/icons-material/StayCurrentPortraitOutlined";
import TabletAndroidIcon from "@mui/icons-material/TabletAndroid";
import styles from "./styles.module.scss";

const Preview = ({ data, children  }) => {
  const [deviceSize, setDeviceSize] = useState("desktop");

  const handleDeviceSizeChange = (size) => {
    setDeviceSize(size);
  };

  return (
    <TemplateProvider data={data}>
      <div className={`${styles.device_wrapper} ${styles[deviceSize]}`}>
        <div className={styles.device_wrapper_frame}>
          {deviceSize === "desktop" && <div>{children}</div>}
          {deviceSize === "small_tablet" && <div>{children}</div>}
          {deviceSize === "phone" && <div>{children}</div>}
        </div>
        <div className={styles.device_wrapper_nav_btns}>
          <button onClick={() => handleDeviceSizeChange("desktop")}>
            <PersonalVideoOutlinedIcon />
          </button>
          <button onClick={() => handleDeviceSizeChange("small_tablet")}>
            <TabletAndroidIcon />
          </button>
          <button onClick={() => handleDeviceSizeChange("phone")}>
            <StayCurrentPortraitOutlinedIcon />
          </button>
        </div>
      </div>
    </TemplateProvider>
  );
};

export default Preview;
