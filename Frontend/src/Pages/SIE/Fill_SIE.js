import React, { Component } from "react";
import { Carousel } from "primereact/carousel";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "primereact/button";
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

  render() {
    return (
    <div className="main-container">
      <div className="sub">
        <center>
          <div>
            <p className="sub2">Hey!</p>
            <p className="sub3">
              Choose how you want to start your annual report.
            </p>
          </div>
          <div className="btn-div">
            <button className="btn-1">Fill in by hand</button>
            <button className="btn-1">Import SIE File</button>
          </div>
        </center>
      </div>
      </div>
    );
  }
}

export default Fill_SIE;
