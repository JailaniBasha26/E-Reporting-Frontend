import React, { Component } from "react";
// import { Spinner } from 'react-bootstrap'
import ReactLoading from "react-loading";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import Chart from "react-apexcharts";
// import './ButtonDemo.css';
import axios from "axios";
import "./YYY.css";

let barGraphOptions = {};
let barGraphSeries = [];
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationNo: "",
      APIResponse: {},
      submit: false,
      APICallFailed: false,
      loading: false,
    };
    this.getOrganization = this.getOrganization.bind(this);
    this.organizationNoOnChange = this.organizationNoOnChange.bind(this);
    this.addOrganization = this.addOrganization.bind(this);
  }

  getOrganization() {
    const { organizationNo } = this.state;
    let resultRevenue = {};
    this.setState({
      submit: true,
      loading: true,
    });
    if (organizationNo != "") {
      axios
        .get("/getOrganizationDetails/" + organizationNo)
        .then((res) => {
          if (res && res.data && res.data.length > 0) {
            console.log(res, " -- RESPONSE");
            this.setState({
              APICallFailed: false,
            });
            res.data[0].revenue = res.data[0].revenue.replace(/'/g, '"');
            resultRevenue = JSON.parse(res.data[0].revenue);
            console.log(resultRevenue, " -- resultRevenue");
            barGraphOptions = {
              chart: {
                id: "basic-bar",
              },
              xaxis: {
                categories: Object.keys(resultRevenue),
              },
              tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                  let graphHoverValue = series[seriesIndex][dataPointIndex]
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  return (
                    '<div class="arrow_box">' +
                    "<span>" +
                    graphHoverValue +
                    " SEK" +
                    "</span>" +
                    "</div>"
                  );
                },
              },
              dataLabels: {
                enabled: true,
                // textAnchor: 'start',
                style: {
                  colors: ["#fff"],
                },
                formatter: function (val, opt) {
                  return (
                    val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "SEK"
                  );
                },
                offsetX: 0,
                dropShadow: {
                  enabled: true,
                },
              },
            };

            barGraphSeries = [
              {
                name: "Revenue",
                data: Object.values(resultRevenue),
              },
            ];
            this.setState({
              APIResponse: res.data[0],
              loading: false,
            });
          } else {
            this.setState({
              APIResponse: "",
              loading: false,
            });
          }
        })
        .catch((err) =>
          this.setState({
            APICallFailed: true,
          })
        );
    } else {
      this.setState({
        APIResponse: "",
        loading: false,
      });
    }
  }

  addOrganization() {
    this.props.history.push("/addOrganization");
  }

  organizationNoOnChange(e) {
    const { submit } = this.state;
    this.setState({
      organizationNo: e.target.value,
      submit: false,
      loading: true,
    });

    if (submit)
      this.setState({
        submit: false,
      });
  }

  render() {
    const { APIResponse, submit, APICallFailed, organizationNo, loading } =
      this.state;
    console.log(APIResponse, ">>", loading);
    //console.log("submit: ", submit, APICallFailed, organizationNo);
    return (
      <div>
        <div className="addOrganization">
          <Button
            label="Add Org"
            aria-label="Add Ord"
            onClick={() => this.addOrganization()}
            id="submit"
          />
        </div>
        <br />
        <div>
          <center>
            <h5 className="enterYourOrganizationNo">
              Enter your organization number
            </h5>
            <InputText
              id="organizationNoTextBox"
              value={this.state.organizationNo}
              onChange={(e) => this.organizationNoOnChange(e)}
            />
            <br />
            <Button
              label="Submit"
              aria-label="Submit"
              onClick={() => this.getOrganization()}
              id="submit"
            />
          </center>
        </div>
        {submit &&
          (organizationNo == "" ? (
            alert("Organization No. should not be empty!")
          ) : APIResponse && APIResponse.organizationno ? (
            <div>
              <div className="organizationDetails">
                <Card
                  title="Organization Number"
                  id="organizationNo"
                  className="organizationNo"
                  style={{ width: "21rem", marginBottom: "5em" }}
                >
                  <center>
                    <p
                      id="organizationNo"
                      className="m-0"
                      style={{ lineHeight: "2.5", fontSize: "17px" }}
                    >
                      {APIResponse.organizationno}
                    </p>
                  </center>
                </Card>

                <Card
                  title="Organization Name"
                  id="organizationNo"
                  className="organizationNo"
                  style={{
                    width: "21rem",
                    marginBottom: "5em",
                    marginLeft: "14px",
                  }}
                >
                  <center>
                    <p
                      id="organizationNo"
                      className="m-0"
                      style={{ lineHeight: "2.5", fontSize: "17px" }}
                    >
                      {APIResponse.organizationname}
                    </p>
                  </center>
                </Card>

                <Card
                  title="CEO"
                  id="organizationNo"
                  className="organizationNo"
                  style={{
                    width: "21rem",
                    marginBottom: "5em",
                    marginLeft: "14px",
                  }}
                >
                  <center>
                    <p
                      id="organizationNo"
                      className="m-0"
                      style={{ lineHeight: "2.5", fontSize: "17px" }}
                    >
                      {APIResponse.ceo}
                    </p>
                  </center>
                </Card>

                <Card
                  title="Phone"
                  id="organizationNo"
                  className="organizationNo"
                  style={{
                    width: "21rem",
                    marginBottom: "5em",
                    marginLeft: "14px",
                  }}
                >
                  <center>
                    <p
                      id="organizationNo"
                      className="m-0"
                      style={{ lineHeight: "2.5", fontSize: "17px" }}
                    >
                      {APIResponse.phone}
                    </p>
                  </center>
                </Card>

                <Card
                  title="Address"
                  id="organizationNo"
                  className="organizationNo"
                  style={{
                    width: "21rem",
                    marginBottom: "5em",
                    marginLeft: "14px",
                  }}
                >
                  <center>
                    <p
                      id="organizationNo"
                      className="m-0"
                      style={{ lineHeight: "2.5", fontSize: "17px" }}
                    >
                      {APIResponse.address}
                    </p>
                  </center>
                </Card>
              </div>
              <center>
                <label className="revenueGraphTitle">Revenue</label>
                <div className="app">
                  <div className="row">
                    <div className="mixed-chart">
                      <Chart
                        options={barGraphOptions}
                        series={barGraphSeries}
                        type="bar"
                        width="80%"
                        height="200%"
                      />
                    </div>
                  </div>
                </div>
              </center>
            </div>
          ) : APICallFailed ? (
            <div className="noDataFound">
              <h3>Something went wrong!</h3>
            </div>
          ) : loading ? (
            <div className="noDataFound">
              <ReactLoading type="balls" color="red" />
            </div>
          ) : (
            <div className="noDataFound">
              <h3>No Data Found!</h3>
            </div>
          ))}
      </div>
    );
  }
}

export default Home;
