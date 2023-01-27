import React, { Component } from "react";
import { Image } from "primereact/image";
import logo from "../../Assests/RebelSkoolLogo.jpg";
import "./header.css";
import { Button } from "primereact/button";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    annualReportType: state.annualReportType.annualReportType,
    companyInformation: state.companyInformation.companyInformation,
    financialYear: state.financialYear.financialYear,
    incomeStatement: state.incomeStatement.incomeStatement,
  };
};

class headers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  test() {
    // console.log("*******");

    let {
      annualReportType,
      companyInformation,
      financialYear,
      incomeStatement,
    } = this.props;

    annualReportType.values = undefined;
    companyInformation.values = undefined;
    incomeStatement.values = undefined;
    financialYear.values = undefined;

    // console.log("!! AFTER ANNAUL REPORT : ", annualReportType);
    // console.log("!! AFTER COMPANY INFO : ", companyInformation);
    // console.log("!! AFTER INCOME STATEMENT : ", incomeStatement);
  }
  render() {
    return (
      <div className="header">
        <div>
          <Route
            render={({ history }) => (
              <button
                type="button"
                onClick={() => {
                  this.test(), history.push("/");
                }}
                class="headerButton"
              >
                
                <Image
                  src={logo}
                  alt="Image"
                  width="200"
                  className="rebelSkoolLogo"
                />
              </button>              
              )}
            />
        </div>        
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(headers);
