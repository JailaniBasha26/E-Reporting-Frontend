import React, { Component } from "react";
import { Fieldset } from "primereact/fieldset";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Navbar from "../00-Corporate Page/Navbar";
import axios from "axios";
import { connect } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import ScrolltoTop from "../ScrollTop/ScrollTop";
import "./Merge.css";

const mapStateToProps = (state) => {
  return {
    annualReportType: state.annualReportType.annualReportType.values,
    companyInformation: state.companyInformation.companyInformation,
  };
};

let isAllFieldsFilled = false;
class Merge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationNo: "",
      companyName: "",
      zipcode: "",
      postaladdress: "",
      isWrongOrganizationNo: false,
      checkCompanyName: false,
      isWrongPostalcodeFormat: false,
      checkCity: false,
      isExistingOrganization: false,
      fetchOrgNoApiCallStatus: false,
    };
    this.organizationNoOnChange = this.organizationNoOnChange.bind(this);
    this.companyNameAndCityOnChange =
      this.companyNameAndCityOnChange.bind(this);
    this.PostalcodeOnChange = this.PostalcodeOnChange.bind(this);
    this.NEXTClick = this.NEXTClick.bind(this);
  }

  componentDidMount() {
    const { annualReportType, companyInformation } = this.props;

    if (
      companyInformation != undefined &&
      companyInformation.values != undefined
    ) {
      this.setState({
        organizationNo: companyInformation.values.organizationno,
        companyName: companyInformation.values.organizationname,
        zipcode: companyInformation.values.zipcode,
        postaladdress: companyInformation.values.postaladdress,
        isExistingOrganization:
          companyInformation.values.isExistingOrganization,
      });
    }
  }

  organizationNoOnChange(e) {
    if (e.value != null) {
      axios
        .get("/getOrganizationDetails/" + e.value)
        .then((response) => {
          if (response.data != "") {
            this.setState({
              isExistingOrganization: true,
              organizationNo: response.data.organizationno,
              companyName: response.data.organizationname,
              zipcode: response.data.zipcode,
              postaladdress: response.data.postaladdress,
            });
          } else {
            this.setState({
              isExistingOrganization: false,
              companyName: "",
              zipcode: "",
              postaladdress: "",
            });
          }
        })
        .catch((error) => {});
      this.setState({
        organizationNo: e.value,
      });

      let orginizationNoLength = e.value.toString().length;
      if (orginizationNoLength != 11) {
        this.setState({
          isWrongOrganizationNo: true,
        });
      } else {
        this.setState({
          isWrongOrganizationNo: false,
        });
      }
    }
  }

  navigateToYearPage() {
    ////////////////////////////////////////
    ////////////////////////////////////////
    let localData = localStorage.getItem("localData");
    let localArray = JSON.parse(localData);

    if (localData) {
      const obj = {
        id: localArray.length + 1,
        organizationNumber: this.state.organizationNo,
        companyName: this.state.companyName,
        zipCode: this.state.zipcode,
        postalAddress: this.state.postaladdress,
      };

      localArray.push(obj);
      localStorage.setItem("localData", JSON.stringify(localArray));
    } else {
      const arryObj = [];
      const obj = {
        id: 1,
        organizationNumber: this.state.organizationNo,
        companyName: this.state.companyName,
        zipCode: this.state.zipcode,
        postalAddress: this.state.postaladdress,
      };
      arryObj.push(obj);
      localStorage.setItem("localData", JSON.stringify(arryObj));
    }
    console.log(localArray);
    ////////////////////////////////////////
    ////////////////////////////////////////
    const {
      isExistingOrganization,
      organizationNo,
      companyName,
      zipcode,
      postaladdress,
    } = this.state;

    let { companyInformation } = this.props;

    let organizationDetails = {
      organizationname: companyName,
      organizationno: organizationNo,
      zipcode: zipcode,
      postaladdress: postaladdress,
    };

    companyInformation.values = organizationDetails;
    companyInformation.values.isExistingOrganization = isExistingOrganization;

    if (!isExistingOrganization) {
      axios
        .post("/postOrganizationDetails", organizationDetails)
        .then((data) => {
          this.props.history.push("/year");
          // IncomeStatement
          // this.props.history.push("/IncomeStatement");
        })
        .catch((err) => {});
    } else {
      this.props.history.push("/year");
      //IncomeStatement
      // this.props.history.push("/IncomeStatement");
    }
  }

  companyNameAndCityOnChange(e, field) {
    console.log(field);
    if (field == "companyName") {
      this.setState({
        companyName: e.target.value,
        checkCompanyName: true,
      });
    } else {
      this.setState({
        postaladdress: e.target.value,
        checkCity: true,
      });
    }
  }

  PostalcodeOnChange(e) {
    if (e.value != null) {
      this.setState({
        zipcode: e.value,
      });

      let PostalcodeLength = e.value.toString().length;
      if (PostalcodeLength != 5) {
        this.setState({
          isWrongPostalcodeFormat: true,
        });
      } else
        this.setState({
          isWrongPostalcodeFormat: false,
        });
    } else {
      this.setState({
        zipcode: "",
      });
    }
  }

  NEXTClick() {
    const { organizationNo, companyName, zipcode, postaladdress } = this.state;
    let orginizationNoLength = organizationNo.toString().length;
    let PostalcodeLength = zipcode.toString().length;
  }

  errorMessage() {
    this.setState({
      isWrongOrganizationNo: true,
    });

    this.setState({
      checkCompanyName: true,
      CompanyName: "",
    });

    this.setState({
      isWrongPostalcodeFormat: true,
    });

    this.setState({
      checkCity: true,
    });

    this.setState({
      isWrongOrganizationNo: true,
    });

    this.setState({
      checkCompanyName: true,
      companyName: "",
    });

    this.setState({
      isWrongPostalcodeFormat: true,
    });

    this.setState({
      checkCity: true,
      postaladdress: "",
    });

    this.toast.show({
      severity: "error",
      summary: "Incomplete",
      detail: "Please fill all the fields",
      life: 2000,
    });
  }
  render() {
    const {
      isWrongOrganizationNo,
      organizationNo,
      companyName,
      zipcode,
      postaladdress,
    } = this.state;

    if (
      organizationNo == "" ||
      companyName == "" ||
      zipcode == "" ||
      postaladdress == ""
    )
      isAllFieldsFilled = false;
    else isAllFieldsFilled = true;

    let postalAddressLength = postaladdress.trim().length;
    return (
      <div>
        <center>
          <div className="info-year-container">
            <div className="card">
              <Fieldset legend="Fill in the company details below">
                <div>
                  <div className="info-number-name">
                    <Row className="info-row">
                      <Col className="info-col">
                        {/* {isWrongOrganizationNo ? (
                          <div>
                            <InputText
                              mask="999999-9999"
                              value={this.state.organizationNo}
                              onChange={(e) => this.organizationNoOnChange(e)}
                              mode="decimal"
                              useGrouping={false}
                            />
                            <br></br>
                            <p className="info-warningLabel">
                              Invalid Organization Number
                            </p>
                          </div>
                        ) : ( */}
                          <span className="p-float-label">
                            <InputMask
                              className="info-org-no"
                              mask="999999-9999"
                              //placeholder="xxxxxx-xxxx"
                              value={this.state.organizationNo}
                              onChange={(e) => this.organizationNoOnChange(e)}
                              mode="decimal"
                              useGrouping={false}
                            />
                            <label htmlFor="OrganizationNumber">
                              Organization Number
                            </label>
                          </span>
                        {/* )} */}
                      </Col>
                      <Col className="info-col">
                        <span className="p-float-label">
                          <InputText
                            className="info-org-name"
                            value={this.state.companyName}
                            onChange={(e) =>
                              this.companyNameAndCityOnChange(e, "companyName")
                            }
                          />
                          <label htmlFor="CompanyName">Company Name</label>
                        </span>
                      </Col>
                    </Row>
                    <Row className="info-row">
                      <Col className="info-col">
                        <span className="p-float-label">
                          <InputNumber
                            className="info-org-postal"
                            inputId="withoutgrouping"
                            value={this.state.zipcode}
                            onValueChange={(e) => this.PostalcodeOnChange(e)}
                            mode="decimal"
                            useGrouping={false}
                          />
                          <label htmlFor="PostalCode">Postal Code</label>
                        </span>
                      </Col>
                      <Col className="info-col">
                        <span className="p-float-label">
                          <InputText
                            className="info-org-city"
                            value={this.state.postaladdress}
                            onChange={(e) =>
                              this.companyNameAndCityOnChange(
                                e,
                                "postaladdress"
                              )
                            }
                          />
                          <label htmlFor="City">City</label>
                        </span>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Fieldset>
            </div>
          </div>
        </center>
             {
                !(this.state.isWrongOrganizationNo) &&
                !(this.state.isWrongPostalcodeFormat) &&
                this.state.companyName !== "" &&
                this.state.postaladdress !== "" &&
                (
                    <div>
                        Fill in the Financial Details
                    </div>
                )
            } 
      </div>
    );
  }
}

export default Merge;
