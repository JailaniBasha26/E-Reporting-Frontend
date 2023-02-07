import React, { Component } from "react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import Header from "../Header/header";
import NavBar from "../Zeenath Demo/Navbar"
import Sidebar from "../SideBar/Sidebar";
import Steps from "../Steps/steps";
import { connect } from "react-redux";
import moment from "moment";
import { Toast } from "primereact/toast";
import Sidebar from "../Sidebar/Sidebar";
import "./Year.css";

let 
  yearCount = [],
  financialYearDetails = {},
  financialYearDetailsObj = {
    from: "",
    to: "",
  },
  from = "",
  to = "",
  redirectStatus = true;
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
      selected_year: { id: 0, name: "0" },
      dummy: "",
      isEndingDateEarlier:false,
      isAllFieldsEmpty:false,
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

    if (postion == "from") {
      financialYearDetailsObj.from = dateValue.value;
    } else {
      financialYearDetailsObj.to = dateValue.value;
    }


    financialYearDetails[Idx] = financialYearDetailsObj;

    let autoDate = {};
    if (Idx>0){
    autoDate.from = moment(financialYearDetails[Idx].from).subtract(12,'month')._d;
    autoDate.to = moment(financialYearDetails[Idx].from).subtract(1,'day')._d;
    financialYearDetails[Idx+1] = autoDate;
    }
///////////////////////
    if(financialYearDetails[Idx].to !== '' ) {
      if(financialYearDetails[Idx].to <= financialYearDetails[Idx].from) {
        //console.log(financialYearDetails[Idx].to,'Hi');
        this.setState({
          isEndingDateEarlier:true,
        });
      } else {
        this.setState({
          isEndingDateEarlier:false,
        });
      }
    }
    
////////////////////
    this.setState({
      dummy: "",
    });
  }

  yearCountOnChange(e) {
    if (Object.keys(financialYearDetails).length === 0) {
      this.toast.show({
        severity: "error",
        summary: "Incomplete",
        detail: "Please fill the starting date and ending date",
        life: 5000,
      });
    } 
        if (financialYearDetails[0].from !== "" && financialYearDetails[0].to !== "") {
          let userSelectedYearCount = 0;
          yearCount = [];
          userSelectedYearCount = e.target.value.id;
          let tempFinancialYearDetails = {};
          Object.keys(financialYearDetails).map((i, idx) => {
            if (idx <= e.value.id) {
              tempFinancialYearDetails[idx] = financialYearDetails[i];
            }
          });
          if (userSelectedYearCount == 1) {
            yearCount.push("ONE");

            for (let i = 0; i < userSelectedYearCount; i++) {
              let autoDate = {};
              autoDate.from = moment(financialYearDetails[i].from).subtract(12,"month")._d;
              autoDate.to = moment(financialYearDetails[i].from).subtract(1,"day")._d;
              tempFinancialYearDetails[i+1] = autoDate;
              financialYearDetails = tempFinancialYearDetails;
            } 
          }

          if (userSelectedYearCount == 2) {
            yearCount.push("ONE");
            yearCount.push("TWO");

            for (let i = 0; i < userSelectedYearCount; i++) {
              let autoDate = {};
              autoDate.from = moment(financialYearDetails[i].from).subtract(12,"month")._d;
              autoDate.to = moment(financialYearDetails[i].from).subtract(1,"day")._d;
              tempFinancialYearDetails[i+1] = autoDate;
              financialYearDetails = tempFinancialYearDetails;
            }
          }

          if (userSelectedYearCount == 3) {
            yearCount.push("ONE");
            yearCount.push("TWO");
            yearCount.push("THREE");

            for (let i = 0; i < userSelectedYearCount; i++) {
              let autoDate = {};
              autoDate.from = moment(financialYearDetails[i].from).subtract(12,"month")._d;
              autoDate.to = moment(financialYearDetails[i].from).subtract(1,"day")._d;
              tempFinancialYearDetails[i+1] = autoDate;
              financialYearDetails = tempFinancialYearDetails;
            }
          }

          this.setState({
            selected_year: e.value,
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

  componentDidMount() {
    const { financialYear } = this.props;
  }

  navigateToIncomeStatementPage() {

    //console.log(financialYearDetails);

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
    } else if(financialYearDetails[0].from == "" || financialYearDetails[0].to == "" ) {
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

    if (financialYearDetails[0] != undefined) {
    }


    return (
      <div>
        <NavBar /><br></br>
        {/* <Steps pageName="financialYear" /> */}
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
              
                  {/* <span className="fields-WarningDiv2">
                      {this.state.isAllFieldsEmpty && (
                       <label className="warningLabel">Please fill all the fields</label>
                       )} 
                    </span> */}

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
                // minDate={
                //   financialYearDetails[0] && financialYearDetails[0].from
                // }
              />
              {/* <center>
            <div className="fields-WarningDiv">
              
                  {this.state.isAllFieldsEmpty && (
                   <label className="warningLabel">Please fill all the fields</label>
                   )} 
                </div>
                </center> */}
              
            </div>
            <center>
            <div className="warningDiv">
              
                  {this.state.isEndingDateEarlier && (
                   <label className="warningLabel">The Ending Date shouldn't be earlier than the Starting Date</label>
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
              <Dropdown
                value={this.state.selected_year}
                options={this.fisical_year}
                onChange={(e) => this.yearCountOnChange(e)}
                optionLabel="name"
                placeholder="Choose"
                className="year-drop-option"
              />
            </div>
            {/* <center>
            <div className="fieldsWarningDiv">
              
                  {this.state.isAllFieldsEmpty && (
                   <label className="warningLabel">Please fill all the fields</label>
                   )} 
                </div> */}
                {/* </center> */}
            <br></br>

            {yearCount.map((i, idx) => {
              if (financialYear.values != undefined) {
                let arr = Object.values(financialYear.values);
                arr &&
                  arr.length &&
                  arr.map((arrI, arrIdx) => {
                    let cc = {
                      from: arrI.from,
                      to: arrI.to,
                    };
                    from = arrI.from;
                    to = arrI.to;

                    mnm[arrIdx + 1] = cc;
                  });
              }

              return (
                <div key={idx}>
                  <div className="year-cal-label">
                    <span className="year-cal-label-1">Starting Date</span>
                    <span className="year-cal-label-2">Ending Date</span>
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
                onClick={() => this.props.history.push('/Info')}
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
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Year);
