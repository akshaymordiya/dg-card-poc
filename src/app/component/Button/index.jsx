import Link from "next/link";
import React from "react";

const Button = ({
  itemclass = "",
  href = "",
  text = "",
  Icon = "",
  textclass = "",
  iconclass = "",
}) => {
  return (
    <Link href={href} className={itemclass}>
      <span className={textclass}>{text}</span>
      <span className={iconclass}>{Icon ? Icon : ""}</span>
    </Link>
  );
};

export default Button;
