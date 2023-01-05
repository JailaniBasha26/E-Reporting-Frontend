import React, { Component } from "react";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Header from "../../Pages/Header/header";
import "./IncomeStatement.css";

let getIncomeStatementFieldsArray = [],
  wrongFields = [],
  headerWiseAmountArray = {},
  amountArray = [],
  total = 0;
class IncomeStatement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incomeStatementFieldsObj: {},
      netSales: 0,
      changeOfStock: 0,
      acivatedWork: 0,
      OtherOperatingIcome: 0,
      rawMaterilas: 0,
      Merchandise: 0,
    };
    this.amountOnChange = this.amountOnChange.bind(this);
  }
  componentDidMount() {
    getIncomeStatementFieldsArray = [];
    axios
      .get("/getIncomeStatementFields")
      .then((response) => {
        let getIncomeStatementFieldsResponse = response.data;

        Object.keys(getIncomeStatementFieldsResponse).map((i) => {
          let getIncomeStatementFieldsResponseObj = {
            header: "",
            fields: [],
          };

          getIncomeStatementFieldsResponseObj.header = i;
          getIncomeStatementFieldsResponse[i] &&
            getIncomeStatementFieldsResponse[i].length > 0 &&
            getIncomeStatementFieldsResponse[i].map((j) => {
              getIncomeStatementFieldsResponseObj.fields.push(
                j.name +
                  "@#%#@" +
                  j.issumfield +
                  "@#%#@" +
                  j.acceptonlynegativevalues
              );
            });
          getIncomeStatementFieldsArray.push(
            getIncomeStatementFieldsResponseObj
          );

          this.setState({
            incomeStatementFieldsObj: response.data,
          });
        });
      })
      .catch((error) => {});
  }

  amountOnChange(
    value,
    fieldName,
    acceptOnlyNegativeValues,
    headerIdx,
    fieldIdx
  ) {
    let amount = value.value;
    this.setState({
      Merchandise: 0,
    });

    total = total + amount;

    if (acceptOnlyNegativeValues == "true") {
      if (amount > 0) {
        wrongFields.push(fieldName);
      } else if (wrongFields.includes(fieldName)) {
        //REMOVE CORRECT FIELDS
        wrongFields = wrongFields.filter((Person) => {
          return Person !== fieldName;
        });
      }
      //REMOVE DUPLICATE FIELDS
      wrongFields = wrongFields.filter(function (elem, pos) {
        return wrongFields.indexOf(elem) == pos;
      });
    }

    if (headerWiseAmountArray[headerIdx] != undefined) {
      amountArray = headerWiseAmountArray[headerIdx];
    } else {
      amountArray = [];
    }
    amountArray[fieldIdx] = amount;
    headerWiseAmountArray[headerIdx] = amountArray;
  }

  render() {
    const { incomeStatementFieldsObj } = this.state;
    let operatingResults,
      profitAfterFinancialItems = 0,
      profitBeforeTax = 0,
      thisYearResults = 0,
      totalSumObj = {};
    return (
      <div className="carousel-demo">
        <Header />
        <div className="incomeStatement">
          <div className="incomeStatementPadding">
            {getIncomeStatementFieldsArray.map((result, idx) => {
              let headerIdx = result.header.split("@#%#@")[0];
              let sum = 0;
              if (headerWiseAmountArray[headerIdx] != undefined) {
                sum = headerWiseAmountArray[headerIdx].reduce(
                  (partialSum, a) => partialSum + a,
                  0
                );
              }

              totalSumObj[headerIdx] = sum;
              operatingResults = totalSumObj[1] + totalSumObj[2];
              profitAfterFinancialItems = operatingResults + totalSumObj[3];
              profitBeforeTax = profitAfterFinancialItems + totalSumObj[4];
              thisYearResults = profitBeforeTax + totalSumObj[5];
              let i = 0;
              return (
                <div>
                  <h5 className="incomeStatementHeader" key={idx}>
                    <Row className="fields">
                      <Col xs={8} sm={8} md={8} lg={8} xl={8} id="headingStyle">
                        {result.header.split("@#%#@")[1]}
                      </Col>

                      <Col xs={4} sm={4} md={4} lg={4} xl={4} id="headingStyle">
                        SEK {sum}
                      </Col>
                    </Row>
                  </h5>
                  {result.fields.map((fields, idx) => {
                    let splittedFieldsValue = [];
                    splittedFieldsValue = fields.split("@#%#@");
                    i++;
                    console.log(i, idx);
                    return (
                      <div>
                        <Row className="fields">
                          <Col
                            xs={8}
                            sm={8}
                            md={8}
                            lg={8}
                            xl={8}
                            id="fieldsCol"
                          >
                            {splittedFieldsValue[1] == "false" ? (
                              <label key={fields}>
                                {splittedFieldsValue[0]}
                              </label>
                            ) : (
                              <label className="isSumField" key={fields}>
                                {splittedFieldsValue[0]}
                              </label>
                            )}
                            <br />
                            <br />
                          </Col>
                          <Col
                            xs={4}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={4}
                            id="fieldsCol"
                          >
                            {splittedFieldsValue[1] == "false" ? (
                              <div className="inputFieldWithWarning">
                                <InputNumber
                                  mode="decimal"
                                  inputId="integeronly"
                                  style={{ height: "24px" }}
                                  onValueChange={(e) => {
                                    this.amountOnChange(
                                      e,
                                      splittedFieldsValue[0],
                                      splittedFieldsValue[2],
                                      headerIdx,
                                      idx
                                    );
                                  }}
                                />

                                {wrongFields.includes(
                                  splittedFieldsValue[0]
                                ) && (
                                  <div>
                                    &nbsp;&nbsp;
                                    <i
                                      className="fa fa-exclamation-triangle"
                                      id="negativeNumberWarningIcon"
                                    ></i>
                                    &nbsp;&nbsp;
                                    <label className="negativeNumber">
                                      Enter Negative Number
                                    </label>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <label style={{ height: "30px" }}>
                                SEK {""}
                                {splittedFieldsValue[0] == "Operating results"
                                  ? operatingResults
                                  : splittedFieldsValue[0] ==
                                    "Profit after financial items"
                                  ? profitAfterFinancialItems
                                  : splittedFieldsValue[0] ==
                                    "Profit before tax"
                                  ? profitBeforeTax
                                  : thisYearResults}
                              </label>
                            )}
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <center>
              <Button
                label="Save & Continue"
                aria-label="Annual Report"
                onClick={() => this.navigateToIncomeStatementPage()}
                id="annualReportBtn"
                className="btn_Annual"
                style={{
                  width: "227px",
                  height: "44px",
                  fontSize: "1.2rem",
                }}
              />
            </center>
          </div>
        </div>
      </div>
    );
  }
}
export default IncomeStatement;
