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


  navigateToInformationPage(){
    this.props.history.push("/info")
  }
  render() {
    return (
      <center>
      <div className="fill-sub">
          <div>
            <p className="fill-sub2">Hey!</p>
            <p className="fill-sub3">
              Choose how you want to start your annual report.
            </p>
          </div>
          <div className="fill-btn-div">
            <button className="fill-btn-1" onClick={() => this.navigateToInformationPage()}>Fill in by hand</button>
            <button className="fill-btn-1">Import SIE File</button>
          </div>
    
      </div>
      </center>
      
    );
  }
}

export default Fill_SIE;
