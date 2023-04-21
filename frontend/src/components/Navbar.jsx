import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import logomobile from "@assets/img/Logo-mobile.png";
// eslint-disable-next-line import/no-unresolved
import logodesktop from "@assets/img/Logo-Desktop.png";
import "./Navbar.scss";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <section className="navbar">
      <img className="logo-mobile" src={logomobile} alt="logo-mobile" />
      <img className="logo-desktop" src={logodesktop} alt="logo-desktop" />
      <div>
        <span
          id="burger_icon"
          className={showMenu ? "animationOpen" : "no_animation"}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          onKeyDown={() => {}}
          role="button"
          tabIndex="0"
        >
          <span />
          <span />
          <span />
          <span />
          <span />
        </span>
        <div
          id="nav_links"
          className={showMenu ? "burger_open" : "burger_close"}
        >
          <ul>
            <NavLink exact to="/" activeClassName="active">
              <li>
                <p>Home</p>
              </li>
            </NavLink>
            <NavLink to="/about" activeClassName="active">
              <li>
                <p>About Us</p>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
