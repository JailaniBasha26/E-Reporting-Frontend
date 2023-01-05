import React, { Component } from "react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import Header from "../Header/header";
import "./Year.css";

class Year extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date1: "",
      date2: "",
      selected_year: null,
    };

    this.fisical_year = [
      { name: "0" },
      { name: "1" },
      { name: "2" },
      { name: "3+" },
    ];
  }

  navigateToIncomeStatementPage() {
    this.props.history.push("/IncomeStatement");
  }

  render() {
    return (
      <div>
        <Header />
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
              {/* <button type="button" tabindex="-1" class="p-button p-component p-datepicker-trigger p-button-icon-only"><span class="p-button-icon p-c pi pi-calendar"></span><span class="p-button-label p-c">&nbsp;</span></button> */}
              <Calendar
                id="icon"
                value={this.state.date1}
                onChange={(e) => this.setState({ date1: e.value })}
                showIcon
              />
              <Calendar
                id="icon"
                value={this.state.date2}
                onChange={(e) => this.setState({ date2: e.value })}
                showIcon
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
                onChange={(e) => this.setState({ selected_year: e.value })}
                optionLabel="name"
                placeholder="Choose"
                className="drop-option"
              />
            </div>

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

export default Year;
