import React, { Component } from "react";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import "./steps.css";

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

    this.items = [
      {
        label: "Import SIE or Fill By Hand",
        command: (event) => {},
      },
      {
        label: "Company Information",
        command: (event) => {},
      },
      {
        label: "Financial Year",
        command: (event) => {},
      },
      {
        label: "Income Statement",
        command: (event) => {},
      },
    ];
  }

  componentWillMount() {
    const { pageName, isInvalid } = this.props;
    console.log(pageName, ">>", isInvalid);
    if (pageName == "SIE File") selectedStepIndex = 0;
    if (pageName == "companyInformation") selectedStepIndex = 1;
    if (pageName == "financialYear") selectedStepIndex = 2;
    if (pageName == "incomeStatement") selectedStepIndex = 3;
  }
  render() {
    const { pageName, isInvalid } = this.props;
    return (
      <div className="steps-demo">
        <Toast
          ref={(el) => {
            this.toast = el;
          }}
        ></Toast>

        <div className="card">
          <Route
            render={({ history }) => (
              <Steps
                model={this.items}
                activeIndex={selectedStepIndex}
                onSelect={(e) => {
                  selectedStepIndex = e.index;
                  if (selectedStepIndex == 0) {
                    history.push("/fileSIE");
                  }
                  if (selectedStepIndex == 1) {
                    history.push("/info");
                  }
                  if (selectedStepIndex == 2) {
                    if (isInvalid) {
                      alert("ERROR");
                    } else {
                      history.push("/year");
                    }
                  }
                  if (selectedStepIndex == 3) {
                    if (isInvalid) {
                      alert("ERROR");
                    } else {
                      history.push("/IncomeStatement");
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

export default StepsComponent;
