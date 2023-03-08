import React, { Component } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { InputNumber } from "primereact/inputnumber";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
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
import Switch from "react-switch";
import "./IncomeStatement.css";

let mockResponse = {};
let formattedYearHeader = [];
let yearHeadingFieldWiseAmount = {};
let yearHeadingWiseSum = {};
let wrongFields = [];
let isSumFieldNames = [
  "Operating income, inventory changes, etc",
  "Operating costs",
  "Financial posts",
  "Closing dispositions",
  "Taxes",
];
let headersList = [];

const mapStateToProps = (state) => {
  return {
    annualReportType: state.annualReportType.annualReportType.values,
    companyInformation: state.companyInformation.companyInformation.values,
    financialYear: state.financialYear.financialYear,
    sessionDetails: state.sessionDetails,
  };
};
class IncomeStatement extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      activeIndex: [0],
      test: "",
      checked: true,
    };
    this.amountOnChange = this.amountOnChange.bind(this);
  }

  handleChange(checkStatus) {
    this.setState({ checked: checkStatus });

    if (!checkStatus) {
      let exp = [];
      this.setState({ activeIndex: exp });
    } else {
      this.openAll();
    }
  }

  amountOnChange(
    financialYearValue,
    headingValue,
    fieldNameValue,
    isAcceptNegativeValue,
    e
  ) {
    if (
      yearHeadingFieldWiseAmount[financialYearValue][headingValue] == undefined
    ) {
      yearHeadingFieldWiseAmount[financialYearValue][headingValue] = {};
    }

    yearHeadingFieldWiseAmount[financialYearValue][headingValue][
      fieldNameValue
    ] = e.value;

    let kkr = yearHeadingFieldWiseAmount[financialYearValue][headingValue];
    let sum = 0;

    Object.keys(kkr).map((yearWiseData, idx) => {
      sum += kkr[yearWiseData];

      if (yearHeadingWiseSum[financialYearValue] == undefined) {
        yearHeadingWiseSum[financialYearValue] = {};
      }

      if (yearHeadingWiseSum[financialYearValue][headingValue] == undefined) {
        yearHeadingWiseSum[financialYearValue][headingValue] = {};
      }

      yearHeadingWiseSum[financialYearValue][headingValue] = sum;
    });

    let fieldNameWithYear = fieldNameValue + "**" + financialYearValue;
    if (e.value > 0 && isAcceptNegativeValue) {
      wrongFields.push(fieldNameWithYear);
    } else if (wrongFields.includes(fieldNameWithYear)) {
      //REMOVE CORRECTED FIELDS
      wrongFields = wrongFields.filter((name) => {
        return name !== fieldNameWithYear;
      });
    }
    //REMOVE DUPLICATE FIELDS
    wrongFields = wrongFields.filter(function (elem, pos) {
      return wrongFields.indexOf(elem) == pos;
    });

    this.setState({
      test: "",
    });
  }

  componentWillMount() {
    yearHeadingWiseSum = {};
  }
  componentDidMount() {
    const { financialYear } = this.props;
    let financialYearValues = financialYear.values;
    //TODO: REMOVE IT
    financialYearValues = {
      0: {
        from: "2022-12-31T18:30:00.000Z",
        to: "2023-02-22T18:30:00.000Z",
      },
      1: {
        from: "2021-12-31T18:30:00.000Z",
        to: "2022-12-30T18:30:00.000Z",
      },
    };

    let selectedFinancialYears = [];
    formattedYearHeader = [];
    Object.keys(financialYearValues).map(function (key) {
      selectedFinancialYears.push(
        moment(financialYearValues[key].from).format("YYYY")
      );

      let formattedDate =
        moment(financialYearValues[key].from).format("YYYY-MM-DD") +
        " - " +
        moment(financialYearValues[key].to).format("YYYY-MM-DD");

      formattedYearHeader.push(formattedDate);

      yearHeadingFieldWiseAmount[formattedDate] = {};
    });
    const uniqueFinancialYears = Array.from(new Set(selectedFinancialYears));

    let financialYears = uniqueFinancialYears.toString();
    axios
      .get("/getIncomeStatementFieldsByFinancialYears/" + financialYears)
      .then((response) => {
        mockResponse = response.data;

        this.openAll();
        {
          Object.keys(mockResponse).map((heading, idx) => {
            let responseArray = mockResponse[heading];
            headersList.push(heading.split("@#%#@")[1]);
          });
        }

        headersList = headersList.filter(function (elem, pos) {
          return headersList.indexOf(elem) == pos;
        });

        this.setState({
          test: "response",
        });
      });
  }

  test(header) {
    return (
      <Row>
        <Col
          xs={5}
          sm={5}
          md={5}
          lg={5}
          xl={5}
          style={{ width: "41%", marginTop: "7px" }}
        >
          <label className="ISFieldsStyle">{header}</label>
        </Col>

        <Col xs={7} sm={7} md={7} lg={7} xl={7} className="ISAmountBoxCol">
          {formattedYearHeader.map((i, idx) => {
            let sum = "SEK " + 0;

            if (yearHeadingWiseSum[i] != undefined) {
              if (yearHeadingWiseSum[i][header] != undefined) {
                sum = "SEK " + yearHeadingWiseSum[i][header];
              }
            }

            return (
              <div className="ISTotalInHeading">
                <InputText
                  className="incomeStatementHeadingSum"
                  value={sum}
                  disabled={true}
                />
              </div>
            );
          })}
        </Col>
      </Row>
    );
  }

  openAll() {
    let lengthArray = [];
    {
      Object.keys(mockResponse).map((heading, idx) => {
        lengthArray.push(idx);
      });
    }
    let open = lengthArray;
    this.setState({ activeIndex: open });
  }

  render() {
    const { checked, activeIndex } = this.state;
    return (
      <div ref={this.myRef}>
        <NavBar />

        <label className="ISExapndCollapsToggleLbl">
          <div>
            <span className="ISExpandCollapseLbl">Collapse All </span>
            <Switch
              checked={checked}
              onChange={this.handleChange.bind(this, !checked)}
              // onColor="#86d3ff"
              // onHandleColor="#2693e6"
              handleDiameter={18}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={25}
              width={48}
              className="react-switch"
              id="material-switch"
            />
            <span className="ISExpandCollapseLbl">Expand All </span>
          </div>
        </label>

        <Row style={{ width: "100%" }}>
          <Col
            xs={1}
            sm={1}
            md={1}
            lg={1}
            xl={1}
            style={{ width: "64px", zIndex: 1 }}
          >
            <Sidebar />
          </Col>

          <Col xs={11} sm={11} md={11} lg={11} xl={11}>
            <Row className="ISFYStyle">
              <div className="parentIS">
                <Col xs={5} sm={5} md={5} lg={5} xl={5}></Col>
                <Col
                  xs={7}
                  sm={7}
                  md={7}
                  lg={7}
                  xl={7}
                  className="ISAmountBoxCol"
                >
                  {formattedYearHeader.map((selectedYear, fyIdx) => {
                    return (
                      <InputNumber
                        mode="decimal"
                        inputId="integeronly"
                        className="ISFY"
                        placeholder={selectedYear}
                      />
                    );
                  })}
                </Col>
              </div>
            </Row>

            <Accordion
              multiple
              activeIndex={activeIndex}
              onTabChange={(e) => this.setState({ activeIndex: e.index })}
              ref={this.myRef}
            >
              {Object.keys(mockResponse).map((heading, idx) => {
                let responseArray = mockResponse[heading];
                let header = heading.split("@#%#@")[1];

                return (
                  // <div className="ISAccordion">
                  <AccordionTab
                    // id="ISAccordionTab"
                    header={this.test(header)}
                    ref={this.myRef}
                    // className="ISAccordion"
                  >
                    {responseArray.map((i, idx) => {
                      let yearsInResponse = i.year.split(",");
                      {
                        return (
                          <div>
                            <Row className="ISFields">
                              <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                                {i.issumfield ? (
                                  <label className="ISTotalFieldsStyle">
                                    {i.name}
                                  </label>
                                ) : (
                                  <label className="ISFieldsStyle">
                                    {i.name}
                                  </label>
                                )}
                              </Col>
                              <Col
                                xs={7}
                                sm={7}
                                md={7}
                                lg={7}
                                xl={7}
                                className="ISAmountBoxCol"
                              >
                                {formattedYearHeader.map(
                                  (selectedYear, fyIdx) => {
                                    let year = selectedYear.split("-")[0];
                                    let bb = i.name + "**" + selectedYear;

                                    let fieldTotalValue;
                                    let yearHeadingWiseSumForSelectedYear =
                                      yearHeadingWiseSum[selectedYear];

                                    if (
                                      yearHeadingWiseSumForSelectedYear !=
                                      undefined
                                    ) {
                                      if (i.name == "Operating results") {
                                        if (
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[0]
                                          ] != undefined &&
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[1]
                                          ] != undefined
                                        ) {
                                          fieldTotalValue =
                                            yearHeadingWiseSumForSelectedYear[
                                              isSumFieldNames[0]
                                            ] +
                                            yearHeadingWiseSumForSelectedYear[
                                              isSumFieldNames[1]
                                            ];
                                        }
                                      }

                                      if (
                                        i.name == "Profit after financial items"
                                      ) {
                                        if (
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[0]
                                          ] != undefined &&
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[1]
                                          ] != undefined &&
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[2]
                                          ] != undefined
                                        ) {
                                          fieldTotalValue =
                                            yearHeadingWiseSumForSelectedYear[
                                              isSumFieldNames[0]
                                            ] +
                                            yearHeadingWiseSumForSelectedYear[
                                              isSumFieldNames[1]
                                            ] +
                                            yearHeadingWiseSumForSelectedYear[
                                              isSumFieldNames[2]
                                            ];
                                        }
                                      }

                                      if (i.name == "Profit before tax") {
                                        if (
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[0]
                                          ] != undefined &&
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[1]
                                          ] != undefined &&
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[2]
                                          ] != undefined &&
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[3]
                                          ] != undefined
                                        ) {
                                          fieldTotalValue =
                                            yearHeadingWiseSumForSelectedYear[
                                              isSumFieldNames[0]
                                            ] +
                                            yearHeadingWiseSumForSelectedYear[
                                              isSumFieldNames[1]
                                            ] +
                                            yearHeadingWiseSumForSelectedYear[
                                              isSumFieldNames[2]
                                            ] +
                                            yearHeadingWiseSumForSelectedYear[
                                              isSumFieldNames[3]
                                            ];
                                        }
                                      }
                                      if (i.name == "This year's results") {
                                        if (
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[0]
                                          ] != undefined &&
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[1]
                                          ] != undefined &&
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[2]
                                          ] != undefined &&
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[3]
                                          ] != undefined &&
                                          yearHeadingWiseSumForSelectedYear[
                                            isSumFieldNames[4]
                                          ] != undefined
                                        ) {
                                          fieldTotalValue =
                                            yearHeadingWiseSumForSelectedYear[
                                              isSumFieldNames[0]
                                            ] +
                                            yearHeadingWiseSumForSelectedYear[
                                              isSumFieldNames[1]
                                            ] +
                                            yearHeadingWiseSumForSelectedYear[
                                              isSumFieldNames[2]
                                            ] +
                                            yearHeadingWiseSumForSelectedYear[
                                              isSumFieldNames[3]
                                            ] +
                                            yearHeadingWiseSumForSelectedYear[
                                              isSumFieldNames[4]
                                            ];
                                        }
                                      }
                                    }

                                    return (
                                      <div className="ISAmountBoxRowDiv">
                                        {yearsInResponse.includes(year) ? (
                                          <div>
                                            {i.issumfield ? (
                                              <InputNumber
                                                mode="decimal"
                                                inputId="integeronly"
                                                className="ISAmountBoxDisabled"
                                                disabled={true}
                                                placeholder={fieldTotalValue}
                                              />
                                            ) : (
                                              <div>
                                                <InputNumber
                                                  mode="decimal"
                                                  inputId="integeronly"
                                                  value={
                                                    yearHeadingFieldWiseAmount[
                                                      selectedYear
                                                    ][header] &&
                                                    yearHeadingFieldWiseAmount[
                                                      selectedYear
                                                    ][header][i.name] !=
                                                      undefined
                                                      ? yearHeadingFieldWiseAmount[
                                                          selectedYear
                                                        ][header][i.name]
                                                      : ""
                                                  }
                                                  onValueChange={(e) => {
                                                    this.amountOnChange(
                                                      selectedYear,
                                                      header,
                                                      i.name,
                                                      i.acceptonlynegativevalues,
                                                      e
                                                    );
                                                  }}
                                                  className={
                                                    wrongFields.includes(bb)
                                                      ? "ISNegativeAmountBox"
                                                      : "ISAmountBox"
                                                  }
                                                />
                                                {wrongFields.includes(bb) && (
                                                  <i
                                                    className="fa fa-exclamation-circle"
                                                    id="negativeNumberWarningIcon"
                                                    title="Negative Value is Recommended"
                                                  ></i>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        ) : (
                                          <div>
                                            <InputNumber
                                              mode="decimal"
                                              inputId="integeronly"
                                              className="ISAmountBoxDisabled"
                                              disabled={true}
                                              tooltip="This field is not applicable for the selected financial year"
                                            />
                                          </div>
                                        )}
                                      </div>
                                    );
                                  }
                                )}
                              </Col>
                            </Row>
                          </div>
                        );
                      }
                    })}
                  </AccordionTab>
                );
              })}
            </Accordion>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(IncomeStatement);
