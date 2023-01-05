import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Header from "../Header/header";
import Steps from "../Steps/steps";
import axios from "axios";
import "./Info.css";

let isAllFieldsFilled = false;
class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationNo: "",
      isWrongOrganizationNo: false,
      companyName: "",
      checkCompanyName: false,
      zipcodeNo: "",
      isWrongZipcodeFormat: false,
      postalAddress: "",
      checkpostalAddress: false,
      isExistingOrganization: false,
    };
    this.organizationNoOnChange = this.organizationNoOnChange.bind(this);
    this.companyNameAndPostalAddressOnChange =
      this.companyNameAndPostalAddressOnChange.bind(this);
    this.zipcodeOnChange = this.zipcodeOnChange.bind(this);
    this.moveOnClick = this.moveOnClick.bind(this);
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
              zipcodeNo: response.data.zipcode,
              postalAddress: response.data.postaladdress,
            });
          } else {
            this.setState({
              isExistingOrganization: false,
              companyName: "",
              zipcodeNo: "",
              postalAddress: "",
            });
          }
        })
        .catch((error) => {});
      this.setState({
        organizationNo: e.value,
      });
      let orginizationNoLength = e.value.toString().length;
      if (orginizationNoLength != 10 && orginizationNoLength != 12) {
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
    const {
      isExistingOrganization,
      organizationNo,
      companyName,
      zipcodeNo,
      postalAddress,
    } = this.state;

    let addNewOrganization = {
      organizationname: "",
      organizationno: "",
      zipcode: "",
      postaladdress: "",
    };

    if (!isExistingOrganization) {
      addNewOrganization = {
        organizationname: companyName,
        organizationno: organizationNo,
        zipcode: zipcodeNo,
        postaladdress: postalAddress,
      };
      axios
        .post("/postOrganizationDetails", addNewOrganization)
        .then((data) => {
          this.props.history.push("/year");
        })
        .catch((err) => {});
    } else this.props.history.push("/year");
  }

  companyNameAndPostalAddressOnChange(e, field) {
    if (field == "companyName") {
      this.setState({
        companyName: e.target.value,
        checkCompanyName: true,
      });
    } else {
      this.setState({
        postalAddress: e.target.value,
        checkpostalAddress: true,
      });
    }
  }

  zipcodeOnChange(e) {
    if (e.value != null) {
      this.setState({
        zipcodeNo: e.value,
      });

      let zipcodeLength = e.value.toString().length;
      if (zipcodeLength != 5) {
        this.setState({
          isWrongZipcodeFormat: true,
        });
      } else
        this.setState({
          isWrongZipcodeFormat: false,
        });
    } else {
      this.setState({
        zipcodeNo: "",
      });
    }
  }

  moveOnClick() {
    const { organizationNo, companyName, zipcodeNo, postalAddress } =
      this.state;
    let orginizationNoLength = organizationNo.toString().length;
    let zipcodeLength = zipcodeNo.toString().length;
  }

  errorMessage() {
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
      zipcodeNo,
      postalAddress,
    } = this.state;

    if (
      organizationNo == "" ||
      companyName == "" ||
      zipcodeNo == "" ||
      postalAddress == ""
    )
      isAllFieldsFilled = false;
    else isAllFieldsFilled = true;

    console.log(isAllFieldsFilled, "+++");

    return (
      <div>
        <Header />
        {/* <Steps pageName="companyInformation" isInvalid={!isAllFieldsFilled} /> */}
        <Toast
          ref={(el) => {
            this.toast = el;
          }}
        ></Toast>
        <center>
          <div className="info-container">
            <div>
              <p className="info2">
                Which Company does the annual report apply to ?
              </p>
              <p className="info3">Fill in the company details below</p>
            </div>

            <div className="Text-label">
              <span className="Text-label-1">Organization Number</span>
              <div className="fieldsStyle">
                <InputNumber
                  id="Organization_no"
                  placeholder="Please fill in your Organization Number"
                  inputId="withoutgrouping"
                  value={this.state.organizationNo}
                  onValueChange={(e) => this.organizationNoOnChange(e)}
                  mode="decimal"
                  useGrouping={false}
                />

                <div className="warningDiv">
                  {isWrongOrganizationNo && (
                    <label className="warningLabel">
                      Invalid organization number
                    </label>
                  )}
                </div>
              </div>
              <span className="Text-label-2">Company Name</span>
              <div className="fieldsStyle">
                <InputText
                  id="Company_Name"
                  placeholder="mandatory field"
                  value={this.state.companyName}
                  onChange={(e) =>
                    this.companyNameAndPostalAddressOnChange(e, "companyName")
                  }
                />
                <div className="warningDiv">
                  {this.state.checkCompanyName &&
                    this.state.companyName == "" && (
                      <label className="warningLabel">
                        Company name is mandatory
                      </label>
                    )}
                </div>
              </div>
              <span className="Text-label-3">ZIP Code</span>
              <div className="fieldsStyle">
                <InputNumber
                  id="zipCode"
                  placeholder="The zip code must consist of 5 digits"
                  inputId="withoutgrouping"
                  value={this.state.zipcodeNo}
                  onValueChange={(e) => this.zipcodeOnChange(e)}
                  mode="decimal"
                  useGrouping={false}
                />

                <div className="warningDiv">
                  {this.state.isWrongZipcodeFormat && (
                    <label className="warningLabel">Invalid zipcode</label>
                  )}
                </div>
              </div>
              <span className="Text-label-4">Postal Address</span>
              <div className="fieldsStyle">
                <InputText
                  id="Postal_Address"
                  placeholder="mandatory field"
                  value={this.state.postalAddress}
                  onChange={(e) =>
                    this.companyNameAndPostalAddressOnChange(e, "postalAddress")
                  }
                />

                <div className="warningDiv">
                  {this.state.checkpostalAddress &&
                    this.state.postalAddress == "" && (
                      <label className="warningLabel">
                        Postal address is mandatory
                      </label>
                    )}
                </div>
              </div>
            </div>

            <div className="btn_div">
              {this.state.isWrongOrganizationNo ||
              this.state.isWrongZipcodeFormat ||
              this.state.companyName == "" ||
              this.state.postalAddress == "" ? (
                <Button
                  label="Move On"
                  aria-label="Annual Report"
                  id="annualReportBtn"
                  className="btn_Annual"
                  //disabled
                  onClick={() => this.errorMessage()}
                  style={{
                    width: "157px",
                    height: "44px",
                    fontSize: "1.2rem",
                  }}
                />
              ) : (
                <Button
                  label="Move On"
                  aria-label="Annual Report"
                  onClick={() => this.navigateToYearPage()}
                  id="annualReportBtn"
                  className="btn_Annual"
                  style={{
                    width: "157px",
                    height: "44px",
                    fontSize: "1.2rem",
                  }}
                />
              )}
            </div>
          </div>
        </center>
      </div>
    );
  }
}

export default Info;
