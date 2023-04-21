import React from "react";
import style from "./Footer.module.scss";

function Footer() {
  return (
    <div className={` ${style.footer} d-flex space-between p-10  `}>
      <p>© Wild Code School</p>
      <p>COMPAR`IMMO</p>
    </div>
  );
}

export default Footer;
