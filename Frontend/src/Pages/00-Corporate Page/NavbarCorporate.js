import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { Image } from "primereact/image";
import logo from "./RebelSkool_Logo.jpg";
import { CgClose } from "react-icons/cg";
import { GoThreeBars } from "react-icons/go";
import ButtonCorporate from "./ButtonCorporate";
import "./NavbarStyle.css";

function NavbarCorporate() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <div>
      <nav className="co-navbar">
        <div className="co-navbar-container">
          <Link to="/" className="co-navbar-logo" onClick={closeMobileMenu}>
            <Image
              src={logo}
              alt="Image"
              width="200"
              className="co-navbar-logo"
            />
          </Link>

          <div className="co-menu-icon" onClick={handleClick}>
            {click == true ? <CgClose className="co-close" /> : <GoThreeBars className="co-bars" />}
          </div>

          {/* <ul className={click ? "co-nav-menu-active" : "co-nav-menu"}>
            <li className="co-nav-item">
              <Link to="/" className="co-nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="co-nav-item">
              <Link
                to="/fileSIE"
                className="co-nav-links"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className="co-nav-item">
              <Link
                to="/info"
                className="co-nav-links"
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>

            <li className="co-nav-item">
              <Link
                to="/info"
                className="co-nav-links"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul> */}
          {/* {button && <ButtonCorporate buttonStyle='btn--outline'>SIGN UP</ButtonCorporate>} */}
        </div>
      </nav>
    </div>
  );
}

export default NavbarCorporate;
