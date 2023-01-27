import React, { Component } from "react";
import { Carousel } from "primereact/carousel";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "primereact/button";
import Header from "../Header/header";
import Steps from "../Steps/steps";
import { connect } from "react-redux";
import "./Fill_SIE.css";
import NavBar from "../Zeenath Demo/Navbar"

const mapStateToProps = (state) => {
  return {
    annualReportType: state.annualReportType.annualReportType,
  };
};

class Fill_SIE extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateToInformationPage(e) {
    let { annualReportType } = this.props;
    const reportType = {
      type: e,
    };
    annualReportType.values = reportType;
    annualReportType.values.status = true;
    this.props.history.push("/info");
  }

  render() {
    return (
      <div>
        <NavBar />

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
                onClick={(e) =>
                  this.navigateToInformationPage("Fill in by hand")
                }
                id="annualReportBtn"
                className="btn_Annual"
              />

              <Button
                label="Import SIE File"
                aria-label="Annual Report"
                onClick={(e) =>
                  this.navigateToInformationPage("Import SIE File")
                }
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

export default connect(mapStateToProps, null)(Fill_SIE);
