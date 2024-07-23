"use client";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";
import IMG from "../Img";

const data = [
  {
    id: 1,
    image: "/assets/whatsapp.png",
  },
  {
    id: 2,
    image: "/assets/instagram.png",
  },
  {
    id: 3,
    image: "/assets/facebook.png",
  },
  {
    id: 4,
    image: "/assets/youtube.png",
  },
  {
    id: 5,
    image: "/assets/meesho.png",
  },
];

function SocialIcon() {
  return (
    <div className={styles.social_link}>
      
      {data.map((item, index) => (
        <Link key={index} href="#" className={styles.social_link_item}>
          <IMG src={item.image} useRawImgTag  />
        </Link>
      ))}
    </div>
  );
}

export default SocialIcon;
