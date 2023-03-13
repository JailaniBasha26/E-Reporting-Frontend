import React, { useState, useEffect } from "react";
import { Image } from "primereact/image";
import { Link } from "react-router-dom";
import logo from "../../Assests/RebelSkoolLogo.jpg";
import Login from "../Login/Login";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import "./Dropnav.css";


const mapStateToProps = (state) => {
  console.log(state, " ^^ STATE");
  return {
    annualReportType: state.annualReportType.annualReportType.values,
    companyInformation: state.companyInformation.companyInformation.values,
    financialYear: state.financialYear.financialYear,
    incomeStatement: state.incomeStatement.incomeStatement,
    sessionDetails: state.sessionDetails,
  };
};

function Dropnav() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const closeMobileMenu = () => {
    axios
      .get("/generateUUID")
      .then((response) => {
      })
      .catch((error) => {});
    setClick(false);
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" onClick={closeMobileMenu}>
            <div className="navbar-logo">
              <Image
                src={logo}
                alt="Image"
                width="200"
                className="navbar-logo"
              />
            </div>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? <MdClose className="nav-close" /> : <FaBars />}
          </div> 
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li class="nav-link" style={{ height: "46px" }}>
              <a href="#">Services</a>
              <div class="dropdown">
                <ul>
                  <li class="dropdown-link">
                    <a href="#">Annual Report</a>
                  </li>
                  <li class="dropdown-link">
                    <a href="#">Income Declaration</a>
                  </li>
                  <div class="arrow"></div>
                </ul>
              </div>
            </li>

            <li class="nav-link" style={{ height: "46px", width: "100%" }}>
              <a href="#">About Us</a>
            </li>

            <li class="nav-link" style={{ height: "46px", width: "100%" }}>
              <a href="#">Prices</a>
            </li>

            <li class="nav-link" style={{ height: "46px", width: "100%" }}>
              <a href="#">FAQ</a>
            </li>

          </ul>
          <Login />
        </div>
      </nav>
    </div>
  );
}

export default connect(mapStateToProps, null)(Dropnav);
