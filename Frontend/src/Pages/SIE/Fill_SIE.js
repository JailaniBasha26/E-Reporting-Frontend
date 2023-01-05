import React, { Component } from "react";
import { Carousel } from "primereact/carousel";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "primereact/button";
import Header from "../Header/header";
import "./Fill_SIE.css";

class Fill_SIE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: "Hey!",
      introCommand: "Choose how you want to start your anuual report.",
      fillButton: "Fill in by hand",
      SIEButton: "Import SIE File",
    };
  }

  navigateToInformationPage() {
    this.props.history.push("/info");
  }
  render() {
    return (
      <div>
        <Header />
        <center>
          <div className="fill-sub">
            <div>
              <p className="fill-sub2">Hey!</p>
              <p className="fill-sub3">
                Choose how you want to start your annual report.
              </p>
            </div>
            <div className="fill-btn-div">
              <Button
                label="Fill in by hand"
                aria-label="Annual Report"
                onClick={() => this.navigateToInformationPage()}
                id="annualReportBtn"
                className="btn_Annual"
              />

              <Button
                label="Import SIE File"
                aria-label="Annual Report"
                id="annualReportBtn"
                className="btn_Annual"
              />
            </div>
          </div>
        </center>
      </div>
    );
  }
}

export default Fill_SIE;
