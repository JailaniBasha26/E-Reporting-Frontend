import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./steps.css";

let selectedStepIndex = 0;
let selectedOption = "",
  optionValues = [
    { name: "+ New Annual Report", id: "N1" },
    { name: "Profile", id: "list1" },
    { name: "settings", id: "list2" },
  ];
class steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Newrecord: null,
      activeIndex: 0,
    };

    this.errorMessage = this.errorMessage.bind(this);

    this.items = [
      {
        label: "Company Information",
        label: "Company Information",
        command: (event) => {},
      },
      {
        label: "Financial Year",
        label: "Financial Year",
        command: (event) => {},
      },
      {
        label: "Financial Details",
        label: "Financial Details",
        command: (event) => {},
      },
      {
        label: "Notes",
        label: "Notes",
        command: (event) => {},
      },
      {
        label: "Reports",
        label: "Reports",
        command: (event) => {},
      },
      {
        label: "Representative",
        label: "Representative",
        command: (event) => {},
      },
      {
        label: "Complete",
        label: "Complete",
        command: (event) => {},
      },
    ];

    this.list = [
      { name: "+ New Annual Report", id: "N1" },
      { name: "Profile", id: "list1" },
      { name: "settings", id: "list2" },
      { name: "", id: "" },
    ];
  }
  Newtablist(e) {
    console.log("Hi");
    if (e.value.name === "Profile") {
      console.log("Inside If");
      this.props.history.push("/IncomeStatement");
    }
  }

  errorMessage() {
    this.toast.show({
      severity: "error",
      summary: "Incomplete",
      detail: "Please complete the current step",
      life: 2000,
    });
  }

  componentDidMount() {
    let ls = JSON.parse(localStorage.getItem("localData"));
    console.log(ls, "****");

    ls.length &&
      ls.map((i, idx) => {
        const bb = { name: "", id: "" };
        (bb.name = i.companyName), (bb.id = i.organizationNumber);
        optionValues.push(bb);
      });
  }

  componentWillMount() {
    const {
      pageName,
      isInvalid,
      annualReportType,
      companyInformation,
      incomeStatement,
    } = this.props;

    if (annualReportType != undefined)
      if (annualReportType.status == undefined) {
        console.log("UNDEFINED");
      }

    if (pageName == "companyInformation") {
      selectedStepIndex = 0;
    }
    if (pageName == "financialYear") {
      selectedStepIndex = 1;
    }
    if (pageName == "incomeStatement") {
      selectedStepIndex = 2;
    }
    if (pageName == "") {
      selectedStepIndex = 3;
    }
  }
  render() {
    const {
      pageName,
      isInvalid,
      annualReportType,
      companyInformation,
      financialYear,
      incomeStatement,
    } = this.props;

    return (
      <div className="steps-demo">
        <Toast
          ref={(el) => {
            this.toast = el;
          }}
        ></Toast>

        <div className="TabLS">
          <Route
            render={({ history }) => (
              <span>
                <Dropdown
                  //value={this.state.Newrecord}
                  options={optionValues}
                  onChange={(e) => {
                    selectedOption = e.value.name;
                    if (selectedOption == "+ New Annual Report") {
                      history.push("/fileSIE");
                    }
                  }}
                  optionLabel="name"
                  placeholder="New +"
                  id="dropdown-id"
                />
              </span>
            )}
          />
          <Route
            render={({ history }) => (
              <span>
                <Steps
                  className="steps"
                  model={this.items}
                  activeIndex={selectedStepIndex}
                  onSelect={(e) => {
                    console.log("... CONT MOVE INSIDE", annualReportType);
                    selectedStepIndex = e.index;

                    if (selectedStepIndex == 0) {
                      if (annualReportType != undefined) {
                        history.push("/info");
                      } else {
                        this.errorMessage();
                      }
                    }
                    if (selectedStepIndex == 1) {
                      if (companyInformation != undefined) {
                        history.push("/year");
                      } else {
                        this.errorMessage();
                      }
                    }
                    if (selectedStepIndex == 2) {
                      if (financialYear != undefined) {
                        history.push("/IncomeStatement");
                      } else {
                        this.errorMessage();
                      }
                    }
                  }}
                  readOnly={false}
                />
              </span>
            )}
          />



        </div>
      </div>
    );
  }
}

export default steps;
