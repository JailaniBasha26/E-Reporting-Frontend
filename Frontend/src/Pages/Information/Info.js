import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from 'primereact/inputmask';
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
      companyName: "",
      zipcode: "",
      postaladdress: "",
      isWrongOrganizationNo: false,
      checkCompanyName: false,
      isWrongPostalcodeFormat: false,
      checkCity: false,
      isExistingOrganization: false,
    };
    this.organizationNoOnChange = this.organizationNoOnChange.bind(this);
    this.companyNameAndCityOnChange =
      this.companyNameAndCityOnChange.bind(this);
    this.PostalcodeOnChange = this.PostalcodeOnChange.bind(this);
    this.NEXTClick = this.NEXTClick.bind(this);
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
    const {
      isExistingOrganization,
      organizationNo,
      companyName,
      zipcode,
      postaladdress,
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
        zipcode: zipcode,
        postaladdress: postaladdress,
      };
      axios
        .post("/postOrganizationDetails", addNewOrganization)
        .then((data) => {
          this.props.history.push("/year");
        })
        .catch((err) => {});
    } else this.props.history.push("/year");
  }

  companyNameAndCityOnChange(e, field) {
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
    const { organizationNo, companyName, zipcode, postaladdress } =
      this.state;
    let orginizationNoLength = organizationNo.toString().length;
    let PostalcodeLength = zipcode.toString().length;
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

    console.log(isAllFieldsFilled, "+++");

    return (
      <div>
        <Header />
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


                <InputMask
                  id="Organization_no"
                  mask="999999-9999"
                  placeholder="xxxxxx-xxxx"
                  value={this.state.organizationNo}
                  onChange={(e) => this.organizationNoOnChange(e)}
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
                    this.companyNameAndCityOnChange(e, "companyName")
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
              <span className="Text-label-3">Postal Code</span>
              <div className="fieldsStyle">
                <InputNumber
                  id="Postalcode"
                  placeholder="The zip code must consist of 5 digits"
                  inputId="withoutgrouping"
                  value={this.state.zipcode}
                  onValueChange={(e) => this.PostalcodeOnChange(e)}
                  mode="decimal"
                  useGrouping={false}
                />

                <div className="warningDiv">
                  {this.state.isWrongPostalcodeFormat && (
                    <label className="warningLabel">Invalid Postalcode</label>
                  )}
                </div>
              </div>
              <span className="Text-label-4">City</span>
              <div className="fieldsStyle">
                <InputText
                  id="City"
                  placeholder="mandatory field"
                  value={this.state.postaladdress}
                  onChange={(e) =>
                    this.companyNameAndCityOnChange(e, "postaladdress")
                  }
                />

                <div className="warningDiv">
                  {this.state.checkCity &&
                      (this.state.postaladdress.trim().length<=1) && (
                      <label className="warningLabel">
                        City is mandatory
                      </label>
                    )}
                </div>
              </div>
            </div>

            <div className="btn_div">
              {this.state.isWrongOrganizationNo ||
              this.state.isWrongPostalcodeFormat ||
              this.state.companyName == "" ||
              this.state.postaladdress == "" ? (
                <Button
                  label="NEXT"
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
                  label="NEXT"
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
