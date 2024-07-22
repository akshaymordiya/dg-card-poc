"use client";
import React from "react";
import Button from "../Button";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import styles from "./style.module.scss";

const data = [
  {
    id: 1,
    title: "Contact Us",
    icon: <PhoneInTalkOutlinedIcon />,
    href: "#",
  },
  {
    id: 2,
    title: "Mail Us",
    icon: <EmailOutlinedIcon />,
    href: "#",
  },
];

const ContactModule = () => {
  return (
    <>
      <div className={`${styles.headerview_content_col_2_content_wrapper}`}>
        {data.map((item, index) => (
          <Button
            key={index}
            href="#"
            textclass={styles.title_btn}
            text={item.title}
            Icon={item?.icon}
            itemclass={styles.contact_btn}
          />
        ))}
      </div>
    </>
  );
};

export default ContactModule;
