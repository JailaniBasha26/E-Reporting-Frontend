import React, { Component } from "react";
import { Fieldset } from "primereact/fieldset";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import ScrolltoTop from "../ScrollTop/ScrollTop";
import { Slider } from "@material-ui/core";
//import '../04-Year/Year.css'
import "./Merge.css";

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

const mapStateToProps = (state) => {
  return {
    annualReportType: state.annualReportType.annualReportType.values,
    companyInformation: state.companyInformation.companyInformation.values,
    financialYear: state.financialYear.financialYear,
  };
};
class MergeYear extends Component {
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
    this.dateOnChange = this.dateOnChange.bind(this);
    this.yearCountOnChange = this.yearCountOnChange.bind(this);
  }
  dateOnChange(dateValue, Idx, postion) {
    let abc = dateValue.originalEvent.nativeEvent.data;
    console.log(abc);
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

  componentDidMount() {
    const { financialYear } = this.props;
  }

  navigateToIncomeStatementPage() {
    const { financialYear } = this.props;
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
      this.props.history.push("/IncomeStatement");
    }
  }

  render() {
    return (
      <div>
        <Toast
          ref={(el) => {
            this.toast = el;
          }}
        ></Toast>
        <center>
          <Fieldset legend="Fill in the Financial Year details below">
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
                valueLabelDisplay='auto'
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
                <center>
                <div key={idx} className="year-div">
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
                </center>
              );
            })}
            <br></br>
            
            <div className="year-btn-div">
              <Button
                label="Previous"
                aria-label="year-btn-save"
                // onClick={() => this.props.history.push("/Info")}
                // id="annualReportBtn"
                className="year-btn-save"
                style={{
                  width: "140px",
                  height: "44px",
                  fontSize: "1.2rem",
                }}
              />
              <Button
                label="Next"
                aria-label="year-btn-save"
                // onClick={() => this.navigateToIncomeStatementPage()}
                // id="annualReportBtn"
                className="year-btn-save"
                style={{
                  width: "100px",
                  height: "44px",
                  fontSize: "1.2rem",
                }}
              />
            </div>
          </Fieldset>
        </center>
      </div>
    );
  }
}

export default MergeYear;
