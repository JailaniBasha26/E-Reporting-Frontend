import React, { Component } from "react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import  Dropnav from  "../00-Corporate Page/Dropnav"
import { connect } from "react-redux";
import moment from "moment";
import { Toast } from "primereact/toast";
import Sidebar from "../Sidebar/Sidebar";
import ScrolltoTop from "../ScrollTop/ScrollTop";
import {Slider} from '@material-ui/core';
import Footerpage from "../Footerpage/Footerpage";      
import "./Year.css";

const mark = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
];
let inc = [0, 1, 2];
let yearCount = [],
  financialYearDetails = {},
  financialYearDetailsObj = {
    from: "",
    to: "",
  },
  from = "",
  to = "",
  redirectStatus = true;

let dataKeyIn = "";
const annualReport = "/annualreport/";

const mapStateToProps = (state) => {
  return {
    annualReportType: state.annualReportType.annualReportType.values,
    companyInformation: state.companyInformation.companyInformation.values,
    financialYear: state.financialYear.financialYear,
    sessionDetails: state.sessionDetails,
  };
};
class Year extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date1: "",
      date2: "",
      selected_year: { id: 0, name: "0" },
      dummy: "",
      isEndingDateEarlier: false,
      isAllFieldsEmpty: false,
      sliderValue: 0,
    };

    this.fisical_year = [
      { id: 0, name: "0" },
      { id: 1, name: "1" },
      { id: 2, name: "2" },
      { id: 3, name: "3" },
    ];

    this.dateOnChange = this.dateOnChange.bind(this);
    this.yearCountOnChange = this.yearCountOnChange.bind(this);
  }

  dateOnChange(dateValue, Idx, postion) {
    let abc = dateValue.originalEvent.nativeEvent.data;
    this.setState({ isAllFieldsEmpty: false });
    financialYearDetailsObj = {
      from: "",
      to: "",
    };

    dataKeyIn = dataKeyIn + "" + dateValue.originalEvent.nativeEvent.data;

    if (dataKeyIn.length == 6) {
      var year = dataKeyIn.substr(0, 2);
      var month = dataKeyIn.substr(2, 2);
      var date = dataKeyIn.substr(4, 4);
      var newdate = "20" + year;
      newdate = newdate + "-" + month + "-" + date;
      dateValue.value = new Date(newdate);
    } else if (dataKeyIn.length == 8) {
      var year = dataKeyIn.substr(0, 4);
      var month = dataKeyIn.substr(4, 2);
      var date = dataKeyIn.substr(6, 5);
      var newdate = year;
      newdate = newdate + "-" + month + "-" + date;
      dateValue.value = new Date(newdate);
    } else if (dataKeyIn.length > 8) {
      dataKeyIn = "";
    }

    if (dataKeyIn == "null") {
      dataKeyIn = "";
    }

    if (financialYearDetails[Idx] != undefined) {
      financialYearDetailsObj.from = financialYearDetails[Idx].from;
      financialYearDetailsObj.to = financialYearDetails[Idx].to;
    }

    if (postion == "from") {
      financialYearDetailsObj.from = dateValue.value;
      let endDate = moment(financialYearDetailsObj.from)
        .add(12, "month")
        .subtract(1, "day")._d;
      let endDateFormat = moment(endDate).format("YYYY-MM-DD");
      if (endDate > new Date()) financialYearDetailsObj.to = new Date();
      else
        financialYearDetailsObj.to = moment(financialYearDetailsObj.from)
          .add(12, "month")
          .subtract(1, "day")._d;
    } else {
      financialYearDetailsObj.to = dateValue.value;
    }

    financialYearDetails[Idx] = financialYearDetailsObj;

    let autoDate = {};
    if (Idx > 0) {
      autoDate.from = moment(financialYearDetails[Idx].from).subtract(
        12,
        "month"
      )._d;
      autoDate.to = moment(financialYearDetails[Idx].from).subtract(
        1,
        "day"
      )._d;
      financialYearDetails[Idx + 1] = autoDate;
    }
    if (financialYearDetails[Idx].to !== "") {
      if (financialYearDetails[Idx].to <= financialYearDetails[Idx].from) {
        this.setState({
          isEndingDateEarlier: true,
        });
      } else {
        this.setState({
          isEndingDateEarlier: false,
        });
      }
    }

    this.setState({
      dummy: "",
    });
  }

  yearCountOnChange(e) {
    if (Object.keys(financialYearDetails).length === 0) {
      this.setState({
        sliderValue: 0,
      });

      this.toast.show({
        severity: "error",
        summary: "Incomplete",
        detail: "Please fill the starting date and ending date",
        life: 5000,
      });
    }
    if (
      financialYearDetails[0].from !== "" &&
      financialYearDetails[0].to !== ""
    ) {
      let userSelectedYearCount = 0;
      yearCount = [];
      userSelectedYearCount = e;
      let tempFinancialYearDetails = {};
      Object.keys(financialYearDetails).map((i, idx) => {
        if (idx <= e) {
          tempFinancialYearDetails[idx] = financialYearDetails[i];
        }
      });
      if (userSelectedYearCount == 1) {
        yearCount.push("ONE");

        for (let i = 0; i < userSelectedYearCount; i++) {
          let autoDate = {};
          autoDate.from = moment(financialYearDetails[i].from).subtract(
            12,
            "month"
          )._d;
          autoDate.to = moment(financialYearDetails[i].from).subtract(
            1,
            "day"
          )._d;
          tempFinancialYearDetails[i + 1] = autoDate;
          financialYearDetails = tempFinancialYearDetails;
        }
      }

      if (userSelectedYearCount == 2) {
        yearCount.push("ONE");
        yearCount.push("TWO");

        for (let i = 0; i < userSelectedYearCount; i++) {
          let autoDate = {};
          autoDate.from = moment(financialYearDetails[i].from).subtract(
            12,
            "month"
          )._d;
          autoDate.to = moment(financialYearDetails[i].from).subtract(
            1,
            "day"
          )._d;
          tempFinancialYearDetails[i + 1] = autoDate;
          financialYearDetails = tempFinancialYearDetails;
        }
      }

      if (userSelectedYearCount == 3) {
        yearCount.push("ONE");
        yearCount.push("TWO");
        yearCount.push("THREE");

        for (let i = 0; i < userSelectedYearCount; i++) {
          let autoDate = {};
          autoDate.from = moment(financialYearDetails[i].from).subtract(
            12,
            "month"
          )._d;
          autoDate.to = moment(financialYearDetails[i].from).subtract(
            1,
            "day"
          )._d;
          tempFinancialYearDetails[i + 1] = autoDate;
          financialYearDetails = tempFinancialYearDetails;
        }
      }

      this.setState({
        selected_year: e,
      });
    } else {
      this.toast.show({
        severity: "error",
        summary: "Incomplete",
        detail: "Please fill all the fields",
        life: 2000,
      });
    }
  }

  handleSliderChange = (event, newValue) => {
    this.setState({
      sliderValue: newValue,
    });

    this.yearCountOnChange(newValue);
  };

  componentWillMount() {
    const { financialYear } = this.props;
    financialYearDetails = {};
    yearCount = [];
  }

  navigateToYearPage() {
    const { sessionDetails } = this.props;

    sessionDetails["sessionDetails"].values.currentPage = "info";
    sessionDetails["sessionDetails"].values.IsAnnualReportSubmitted = false;
    this.props.history.push(
      annualReport + sessionDetails["sessionDetails"].values.uuid + "/Info"
    );
  }

  navigateToIncomeStatementPage() {
    const { financialYear, sessionDetails } = this.props;
    financialYear.values = financialYearDetails;
    this.setState({
      dummy: "",
    });

    if (Object.keys(financialYearDetails).length === 0) {
      this.toast.show({
        severity: "error",
        summary: "Incomplete",
        detail: "Please fill all the fields",
        life: 2000,
      });

      this.setState({
        isAllFieldsEmpty: true,
      });
    } else if (
      financialYearDetails[0].from == "" ||
      financialYearDetails[0].to == ""
    ) {
      this.toast.show({
        severity: "error",
        summary: "Incomplete",
        detail: "Please fill all the fields",
        life: 2000,
      });
    } else {
      sessionDetails["sessionDetails"].values.currentPage = "incomeStatement";
      sessionDetails["sessionDetails"].values.IsAnnualReportSubmitted = false;
      this.props.history.push(
        annualReport +
          sessionDetails["sessionDetails"].values.uuid +
          "/IncomeStatement"
      );
    }
  }

  render() {
    const { financialYear } = this.props;
    let mnm = {};
    from = "";
    to = "";

    if (financialYear.values != undefined) {
      let arr = Object.values(financialYear.values);
      arr &&
        arr.length &&
        arr.map((i, idx) => {
          if (idx == 0) {
            from = i.from;
            to = i.to;
          }
        });
    }

    return (
      <div className="year_divpage">
        <Dropnav />
        <Sidebar />
        <Toast
          ref={(el) => {
            this.toast = el;
          }}
        ></Toast>
        <center>
          <div className="year-main-container">
            <div>
              <p className="year-sub2">
                Which financial year does the annual report cover?
              </p>
              <p className="year-sub3">
                If the company has several years, you can include up to 3
                previous years.
              </p>
            </div>

            <div className="year-cal-label-container">
              <br></br>
              <div className="year-cal-label-head">DECLARATION YEAR</div>
              <div className="year-cal-label">
                <span className="year-cal-label-1">Starting Date</span>
                <span className="year-cal-label-2">Ending Date</span>
              </div>

              <div className="year-cal-box">
                <Calendar
                  id="icon"
                  value={
                    financialYearDetails[0] != undefined
                      ? financialYearDetails[0].from
                      : ""
                  }
                  onChange={(e) => {
                    this.dateOnChange(e, 0, "from");
                  }}
                  showIcon
                  dateFormat="yy-mm-dd"
                  placeholder="YYYY-MM-DD"
                  maxDate={new Date()}
                />
                <Calendar
                  id="icon"
                  value={
                    financialYearDetails[0] != undefined
                      ? financialYearDetails[0].to
                      : ""
                  }
                  onChange={(e) => {
                    this.dateOnChange(e, 0, "to");
                  }}
                  showIcon
                  dateFormat="yy-mm-dd"
                  placeholder="YYYY-MM-DD"
                  maxDate={new Date()}
                />
              </div>
            </div>
            <center>
              <div className="warningDiv">
                {this.state.isEndingDateEarlier && (
                  <label className="warningLabel">
                    The Ending Date shouldn't be earlier than the Starting Date
                  </label>
                )}
              </div>
            </center>

            <center>
              <div className="fields-WarningDiv">
                <span className="fields-WarningDiv1">
                  {this.state.isAllFieldsEmpty && (
                    <label>Please fill all the fields</label>
                  )}
                </span>

                <span className="fields-WarningDiv2">
                  {this.state.isAllFieldsEmpty && (
                    <label>Please fill all the fields</label>
                  )}
                </span>
              </div>
            </center>

            <div className="year-drop-label-main">
              <span className="year-drop-label">
                Number of previous financial years
              </span>
            </div>
            <div>
              <div className="slider-div">
                <Slider
                  // color="secondary"
                  defaultValue={0}
                  min={0}
                  max={3}
                  step={1}
                  marks={mark}
                  valueLabelDisplay="auto"
                  value={this.state.sliderValue}
                  onChange={this.handleSliderChange.bind()}
                  className="slider-main"
                />
              </div>
            </div>
            <br></br>
            {yearCount.map((i, idx) => {
              let cc = idx + 1;
              return (
                <div key={idx}>
                  <br></br>
                  <div className="year-cal-label-head">
                    PREVIOUS YEAR - {cc}
                  </div>
                  <div className="pre-year-cal-label">
                    <span className="pre-year-cal-label-1">Starting Date</span>
                    <span className="pre-year-cal-label-2">Ending Date</span>
                  </div>
                  <div className="year-cal-box">
                    <Calendar
                      id="icon"
                      value={
                        financialYearDetails[idx + 1] != undefined
                          ? financialYearDetails[idx + 1].from
                          : ""
                      }
                      onChange={(e) => {
                        this.dateOnChange(e, idx + 1, "from");
                      }}
                      showIcon
                      dateFormat="yy-mm-dd"
                      placeholder="YYYY-MM-DD"
                      maxDate={new Date()}
                    />
                    <Calendar
                      id="icon"
                      value={
                        financialYearDetails[idx + 1] != undefined
                          ? financialYearDetails[idx + 1].to
                          : ""
                      }
                      onChange={(e) => {
                        this.dateOnChange(e, idx + 1, "to");
                      }}
                      showIcon
                      dateFormat="yy-mm-dd"
                      placeholder="YYYY-MM-DD"
                      maxDate={
                        financialYearDetails[idx + 1] &&
                        financialYearDetails[idx + 1].to
                      }
                      minDate={
                        financialYearDetails[idx + 1] &&
                        financialYearDetails[idx + 1].to
                      }
                    />
                  </div>
                </div>
              );
            })}
            <br></br>
            <div className="year-btn-div">
              <Button
                label="Previous"
                aria-label="Annual Report"
                onClick={() => this.navigateToYearPage()}
                id="annualReportBtn"
                className="btn_Annual"
                style={{
                  width: "157px",
                  height: "44px",
                  fontSize: "1.2rem",
                }}
              />
              <Button
                label="Next"
                aria-label="Annual Report"
                onClick={() => this.navigateToIncomeStatementPage()}
                id="annualReportBtn"
                className="btn_Annual"
                style={{
                  width: "157px",
                  height: "44px",
                  fontSize: "1.2rem",
                }}
              />
            </div>
          </div>
        </center>
        <ScrolltoTop />
        <Footerpage/>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Year);
