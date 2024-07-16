import Link from "next/link";
import React from "react";

const Button = ({ itemclass = "", href = "", text = "", Icon = "" }) => {
  return (
    <Link href={href}>
      <span className={itemclass}>
        {text}
        {Icon ? Icon : ""}
      </span>
    </Link>
  );
};

export default Button;
