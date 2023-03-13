import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import "./steps.css";

let selectedOption = "",
  optionValues = [
    { name: "+ New Annual Report", id: "N1" },
    { name: "Profile", id: "list1" },
  ];
class steps extends Component {
  constructor(props) {
    super(props);
    this.state = { refresh: "" };
  }
  Newtablist(e) {
    if (e.value.name === "Profile") {
      this.props.history.push("/IncomeStatement");
    }
  }

  componentDidMount() {
    let ls = JSON.parse(localStorage.getItem("localData"));

    ls &&
      ls.length &&
      ls.map((i, idx) => {
        const bb = { name: "", id: "" };
        (bb.name = i.companyName), (bb.id = i.organizationNumber);
        optionValues.push(bb);
      });

    optionValues = optionValues.filter(
      (ele, ind) =>
        ind ===
        optionValues.findIndex(
          (elem) => elem.jobid === ele.jobid && elem.id === ele.id
        )
    );

    this.setState({
      refresh: "",
    });
  }

  render() {
    return (
      <div>
        <div className="TabLS">
          <Route
            render={({ history }) => (
              <span>
                <Dropdown
                  options={optionValues}
                  onChange={(e) => {
                    selectedOption = e.value.name;
                    if (selectedOption == "+ New Annual Report") {
                      history.push("/fileSIE");
                    }
                  }}
                  optionLabel="name"
                  id="dropdown-id"
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