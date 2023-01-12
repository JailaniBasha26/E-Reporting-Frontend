import React, { Component } from "react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import Header from "../Header/header";
import Steps from "../Steps/steps";
import { connect } from "react-redux";
import moment from "moment";
import "./Year.css";

let test = [],
  yearCount = [],
  financialYearDetails = {},
  financialYearDetailsObj = {
    from: "",
    to: "",
  },
  from = "",
  to = "";
const mapStateToProps = (state) => {
  return {
    annualReportType: state.annualReportType.annualReportType.values,
    companyInformation: state.companyInformation.companyInformation.values,
    financialYear: state.financialYear.financialYear,
  };
};
class Year extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date1: "",
      date2: "",
      selected_year: null,
      dummy: "",
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
    financialYearDetailsObj = {
      from: "",
      to: "",
    };

    if (financialYearDetails[Idx] != undefined) {
      financialYearDetailsObj.from = financialYearDetails[Idx].from;
      financialYearDetailsObj.to = financialYearDetails[Idx].to;
    }

    // if (postion == "from") {
    //   // moment(dateValue.value).format("YYYY MM dd");
    //   financialYearDetailsObj.from = moment(dateValue.value).format(
    //     "YYYY-MM-DD"
    //   );
    // } else {
    //   financialYearDetailsObj.to = moment(dateValue.value).format("YYYY-MM-DD");
    // }

    if (postion == "from") {
      // moment(dateValue.value).format("YYYY MM dd");
      financialYearDetailsObj.from = dateValue.value;
    } else {
      financialYearDetailsObj.to = dateValue.value;
    }

    financialYearDetails[Idx] = financialYearDetailsObj;

    this.setState({
      dummy: "",
    });
  }

  yearCountOnChange(e) {
    let userSelectedYearCount = 0;
    yearCount = [];
    userSelectedYearCount = e.target.value.id;

    if (userSelectedYearCount == 1) {
      yearCount.push("ONE");
    }

    if (userSelectedYearCount == 2) {
      yearCount.push("ONE");
      yearCount.push("TWO");
    }

    if (userSelectedYearCount == 3) {
      yearCount.push("ONE");
      yearCount.push("TWO");
      yearCount.push("THREE");
    }

    this.setState({
      selected_year: e.value,
    });
  }

  componentDidMount() {
    const { financialYear } = this.props;
    if (financialYear.values != undefined) {
      // yearCount =
      console.log(financialYear.values, "**");
    }
    // from = "";
    // to = "";

    // if (financialYear.values != undefined) {
    //   let arr = Object.values(financialYear.values);
    //   arr &&
    //     arr.length &&
    //     arr.map((i, idx) => {
    //       if (idx == 0) {
    //         from = i.from;
    //         to = i.to;
    //       }
    //     });
    // }
  }

  navigateToIncomeStatementPage() {
    const { financialYear } = this.props;
    console.log(yearCount, " >> YEAR COUNT");
    financialYear.values = financialYearDetails;
    this.setState({
      dummy: "",
    });
    this.props.history.push("/IncomeStatement");
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
      <div>
        <Header />
        <Steps pageName="financialYear" />
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

            <div className="year-cal-label">
              <span className="year-cal-label-1">
                Beginning of the financial year
              </span>
              <span className="year-cal-label-2">
                End of the financial year
              </span>
            </div>

            <div className="year-cal-box">
              <Calendar
                id="icon"
                value={from}
                onChange={(e) => {
                  this.dateOnChange(e, 0, "from");
                }}
                showIcon
                dateFormat="yy-mm-dd"
                placeholder="YYYY-MM-DD"
              />
              <Calendar
                id="icon"
                value={to}
                onChange={(e) => {
                  this.dateOnChange(e, 0, "to");
                }}
                showIcon
                dateFormat="yy-mm-dd"
                placeholder="YYYY-MM-DD"
              />
            </div>

            <div className="year-drop-label-main">
              <span className="year-drop-label">
                Number of previous financial years
              </span>
            </div>
            <div>
              <Dropdown
                value={this.state.selected_year}
                options={this.fisical_year}
                //onChange={(e) => this.setState({ selected_year: e.value })}
                onChange={(e) => this.yearCountOnChange(e)}
                optionLabel="name"
                placeholder="Choose"
                className="year-drop-option"
              />
            </div>
            <br></br>
            {/* {elements} */}

            {yearCount.map((i, idx) => {
              if (financialYear.values != undefined) {
                let arr = Object.values(financialYear.values);
                console.log(arr, ">> ARR");
                arr &&
                  arr.length &&
                  arr.map((arrI, arrIdx) => {
                    // if (arrIdx == 0) {
                    let cc = {
                      from: arrI.from,
                      to: arrI.to,
                    };
                    from = arrI.from;
                    to = arrI.to;

                    mnm[arrIdx + 1] = cc;
                    // }
                  });
              }
              console.log(mnm, ">> mnm", idx, "YEAR : ", yearCount);
              return (
                <div key={idx}>
                  <div className="year-cal-label">
                    <span className="year-cal-label-1">
                      Beginning of the financial year
                    </span>
                    <span className="year-cal-label-2">
                      End of the financial year
                    </span>
                  </div>
                  <div className="year-cal-box">
                    <Calendar
                      id="icon"
                      value={
                        Object.keys(mnm).length === 0 ? "" : mnm[idx + 2].from
                      }
                      // onChange={(e) => this.setState({ date1: e.value })}
                      onChange={(e) => {
                        this.dateOnChange(e, idx + 1, "from");
                      }}
                      showIcon
                      dateFormat="yy-mm-dd"
                      placeholder="YYYY-MM-DD"
                    />
                    <Calendar
                      id="icon"
                      value={
                        Object.keys(mnm).length === 0 ? "" : mnm[idx + 2].to
                      }
                      // onChange={(e) => this.setState({ date2: e.value })}
                      onChange={(e) => {
                        this.dateOnChange(e, idx + 1, "to");
                      }}
                      showIcon
                      dateFormat="yy-mm-dd"
                      placeholder="YYYY-MM-DD"
                    />
                  </div>
                </div>
              );
            })}
            <br></br>
            <div className="year-btn-div">
              <Button
                label="Move On"
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
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Year);
