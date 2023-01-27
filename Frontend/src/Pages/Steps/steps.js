import React, { Component } from "react";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./steps.css";

const mapStateToProps = (state) => {
  return {
    annualReportType: state.annualReportType.annualReportType.values,
    companyInformation: state.companyInformation.companyInformation.values,
    financialYear: state.financialYear.financialYear.values,
    incomeStatement: state.incomeStatement.incomeStatement.values,
  };
};

let selectedStepIndex = 0;
class StepsComponent extends Component {
  static propTypes = {
    pageName: PropTypes.oneOfType([PropTypes.string]),
    isInvalid: PropTypes.oneOfType([PropTypes.bool]),
  };

  static defaultProps = {
    isInvalid: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
    this.errorMessage = this.errorMessage.bind(this);

    this.items = [
      {
        label: "Company Information",
        command: (event) => {},
      },
      {
        label: "Financial Year",
        command: (event) => {},
      },
      {
        label: "Financial Details",
        command: (event) => {},
      },
      {
        label: "Notes",
        command: (event) => {},
      },
    ];
  }

  errorMessage() {
    this.toast.show({
      severity: "error",
      summary: "Incomplete",
      detail: "Please complete the current step",
      life: 2000,
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

    // console.log(">> ANNAUL REPORT : ", annualReportType);
    // console.log(">> COMPANY INFO : ", companyInformation);
    // console.log(">> INCOME STATEMENT : ", incomeStatement);

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

        <div className="stepsCard">
          <Route
            render={({ history }) => (
              <Steps
              orientation = "vertical"
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
            )}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(StepsComponent);
