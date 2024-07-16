"use client";

import React from "react";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import Link from "next/link";
import styles from "./style.module.scss";
const data = [
  {
    id: 1,
    title: "Example@sample.com",
    icon: <AttachEmailOutlinedIcon />,
  },
  {
    id: 21,
    title: "+91 6452013456",
    icon: <PhoneInTalkOutlinedIcon />,
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet_consectetur adipisicing elit.",
    icon: <FmdGoodOutlinedIcon />,
  },
];

const FooterInfo = () => {
  return (
    <div className={styles.footer_wrapper_col_2_content}>
      {data.map((item, index) => (
        <div key={index} className={styles.footer_wrapper_col_2_content_icon}>
          <Link href="#" className={styles.icon}>
            {item?.icon}
          </Link>

          <span>
            {item?.title.split("_").map((word, wordIndex) => (
              <span key={wordIndex}>
                {word}
                {wordIndex < item?.title.split("_").length - 1 ? <br /> : null}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FooterInfo;
