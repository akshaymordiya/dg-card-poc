"use client";
import React from "react";
import { TemplateProvider } from "@/app/context/TemplateContext";
import PersonalVideoOutlinedIcon from "@mui/icons-material/PersonalVideoOutlined";
import StayCurrentPortraitOutlinedIcon from "@mui/icons-material/StayCurrentPortraitOutlined";
import TabletAndroidIcon from "@mui/icons-material/TabletAndroid";
import styles from './styles.module.scss';

const Preview = ({ data, children }) => {
  return (
    <TemplateProvider data={data}>
      <div className={styles.device_wrapper}>
        <div className={styles.device_wrapper_frame}>{children}</div>
        <div className={styles.device_wrapper_nav_btns}>
          <button>
            <PersonalVideoOutlinedIcon />
          </button>
          <button>
            <TabletAndroidIcon />
          </button>
          <button>
            <StayCurrentPortraitOutlinedIcon />
          </button>
        </div>
      </div>
    </TemplateProvider>
  );
};

export default Preview;
