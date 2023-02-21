import React, { Component } from "react";
import { InputNumber } from "primereact/inputnumber";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NavBar from "../00-Corporate Page/Navbar";
import ScrolltoTop from "../ScrollTop/ScrollTop";
import Sidebar from "../Sidebar/Sidebar";
import Steps from "../Steps/steps";
import { connect } from "react-redux";
import moment from "moment";
import "./IncomeStatement02.css";

let mockResponse = {};
let financialYears = "";
let selectedFY = [];
let formattedYearHeader = [];

const mapStateToProps = (state) => {
  return {
    annualReportType: state.annualReportType.annualReportType.values,
    companyInformation: state.companyInformation.companyInformation.values,
    financialYear: state.financialYear.financialYear,
  };
};

class IncomeStatement02 extends Component {
  constructor(props) {
    super(props);
    this.state = { test: "" };
  }

  componentDidMount() {
    const { financialYear } = this.props;

    let financialYearValues = financialYear.values;
    let selectedFinancialYears = [];
    formattedYearHeader = [];
    Object.keys(financialYearValues).map(function (key) {
      selectedFinancialYears.push(
        moment(financialYearValues[key].from).format("YYYY")
      );

      formattedYearHeader.push(
        moment(financialYearValues[key].from).format("YYYY-MM-DD") +
          " - " +
          moment(financialYearValues[key].to).format("YYYY-MM-DD")
      );
    });
    const uniqueFinancialYears = Array.from(new Set(selectedFinancialYears));

    let financialYears = uniqueFinancialYears.toString();
    selectedFY = financialYears.split(",");

    axios
      .get("/getIncomeStatementFieldsByFinancialYears/" + financialYears)
      .then((response) => {
        mockResponse = response.data;
        this.setState({
          test: "response",
        });
      });
  }

  render() {
    return (
      <div>
        <NavBar />
        <Sidebar />
        <div className="parentDivIncomeStatement">
          <Row>
            <div className="parentX">
              <Col xl={5}></Col>
              {formattedYearHeader.map((i, idx) => {
                return (
                  <div className="child">
                    <Col
                      // md={{ span: 4, offset: 4 }}
                      xs={8}
                      sm={8}
                      md={8}
                      lg={8}
                      xl={7}
                    >
                      <label className="financialYears">{i}</label>
                    </Col>
                  </div>
                );
              })}
            </div>
          </Row>

          {Object.keys(mockResponse).map(function (heading) {
            let responseArray = mockResponse[heading];
            let header = heading.split("@#%#@")[1];
            return (
              <div>
                <br />
                <br />
                <div className="incomeStatementHeaderStyle">{header}</div>
                {responseArray.map((i, idx) => {
                  let yearsInResponse = i.year.split(",");
                  return (
                    <div>
                      <Row className="incomeStatementFields">
                        <Col xs={8} sm={8} md={8} lg={8} xl={5}>
                          <label className="incomeStatementFieldsStyle">
                            {i.name}
                          </label>
                        </Col>
                        <Col
                          xs={8}
                          sm={8}
                          md={8}
                          lg={8}
                          xl={7}
                          className="incomeStatementAmountBoxCol"
                        >
                          {selectedFY.map((selectedYear, fyIdx) => {
                            return (
                              <div className="parent">
                                {yearsInResponse.includes(selectedYear) ? (
                                  <div>
                                    <InputNumber
                                      mode="decimal"
                                      inputId="integeronly"
                                      className="incomeStatementAmountBox"
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    {" "}
                                    <InputNumber
                                      mode="decimal"
                                      inputId="integeronly"
                                      className="incomeStatementAmountBoxDisabled"
                                      disabled={true}
                                      tooltip="This field is not applicable for the selected financial year"
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </Col>
                      </Row>

                      <br />
                    </div>
                  );
                })}
              </div>
            );
          })}

          <center className="incomeStatementSaveBtnCenter">
            <Button
              label="Previous"
              aria-label="Annual Report"
              // onClick={() => this.props.history.push('/year')}
              id="annualReportBtn"
              className="incomeStatementSaveBtn"
            />
            <Button
              label="Save & Continue"
              aria-label="Annual Report"
              // onClick={() => this.navigateToBalanceSheet()}
              id="annualReportBtn"
              className="incomeStatementSaveBtn"
            />
          </center>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(IncomeStatement02);
