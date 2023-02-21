// import React, { Component } from "react";
// import { InputNumber } from "primereact/inputnumber";
// import { TabView, TabPanel } from "primereact/tabview";
// import { Button } from "primereact/button";
// import { SelectButton } from "primereact/selectbutton";
// import axios from "axios";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import NavBar from "../Navbar/Navbar";
// import ScrolltoTop from "../ScrollTop/ScrollTop";
// import Sidebar from "../Sidebar/Sidebar";
// import Steps from "../Steps/steps";
// import { connect } from "react-redux";
// import moment from "moment";
// import "./PlayGround.css";

// let mockResponse = {};
// // const mockResponse = {
// //   "1@#%#@Operating costs": [
// //     {
// //       name: "Raw materials and consumables",
// //       range: "4000-4799,4910-4930",
// //       year: "2022,2023",
// //       acceptonlynegativevalues: true,
// //       issumfield: false,
// //     },
// //     {
// //       name: "Merchandise",
// //       range: "4000-4799,4960,4980",
// //       year: "2022",
// //       acceptonlynegativevalues: false,
// //       issumfield: false,
// //     },
// //     {
// //       name: "Other external expenses",
// //       range: "4000-4799,4960,4980",
// //       year: "2022,2023",
// //       acceptonlynegativevalues: true,
// //       issumfield: false,
// //     },
// //     {
// //       name: "Operating results",
// //       range: "",
// //       year: "2022,2023",
// //       acceptonlynegativevalues: false,
// //       issumfield: true,
// //     },
// //   ],
// //   "2@#%#@Taxes": [
// //     {
// //       name: "Tax on the year's profit",
// //       range: "8910-8930",
// //       year: "2023",
// //       acceptonlynegativevalues: true,
// //       issumfield: false,
// //     },
// //     {
// //       name: "Change of accrual funds",
// //       range: "8110-8160",
// //       year: "2023",
// //       acceptonlynegativevalues: false,
// //       issumfield: false,
// //     },
// //     {
// //       name: "Other taxes",
// //       range: "8980",
// //       year: "2022,2023",
// //       acceptonlynegativevalues: true,
// //       issumfield: false,
// //     },
// //     {
// //       name: "This year's results",
// //       range: "",
// //       year: "2022,2023",
// //       acceptonlynegativevalues: false,
// //       issumfield: true,
// //     },
// //   ],
// // };

// const financialYears = "2021,2022,2023";
// const selectedFY = financialYears.split(",");

// class PlayGround extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { test: "" };
//   }

//   componentDidMount() {
//     axios
//       .get("/getIncomeStatementFieldsByFinancialYears/" + financialYears)
//       .then((response) => {
//         mockResponse = {};
//         mockResponse = response.data;

//         this.setState({
//           test: "response",
//         });
//       });
//   }

//   render() {
//     return (
//       <div className="parentDivIncomeStatement">
//         {/* <Row>
//           <Col xl={5}>md=4</Col>
//           <Col md={{ span: 4, offset: 4 }}>{`md={{ span: 4, offset: 4 }}`}</Col>
//         </Row> */}
//         <Row>
//           <div className="parentX">
//             <Col xl={5}></Col>
//             {selectedFY.map((i, idx) => {
//               return (
//                 <div className="child">
//                   {/* <Col
//                   xs={8}
//                   sm={8}
//                   md={8}
//                   lg={8}
//                   xl={1}
//                   className="incomeStatementAmountBoxCol"
//                 >
//                   {i}
//                 </Col> */}

//                   <Col
//                     // md={{ span: 4, offset: 4 }}
//                     xs={8}
//                     sm={8}
//                     md={8}
//                     lg={8}
//                     xl={7}
//                   >
//                     <label className="financialYears">{i}</label>
//                   </Col>
//                 </div>
//               );
//             })}
//           </div>
//         </Row>
//         {/* <Row className="parentX">
//           <Col
//             xs={8}
//             sm={8}
//             md={8}
//             lg={8}
//             xl={6}
//             className="incomeStatementAmountBoxCol"
//           >
//             TEST 1
//           </Col>
//           <Col
//             xs={8}
//             sm={8}
//             md={8}
//             lg={8}
//             xl={6}
//             className="incomeStatementAmountBoxCol"
//           >
//             TEST 2
//           </Col>
//         </Row>

//         <div class="parentX">
//           <div class="child">child 1</div>
//           <div class="child">child 2</div>
//         </div> */}

//         {Object.keys(mockResponse).map(function (heading) {
//           let responseArray = mockResponse[heading];
//           let header = heading.split("@#%#@")[1];
//           return (
//             <div>
//               <br />
//               <br />
//               <div className="incomeStatementHeaderStyle">{header}</div>
//               {responseArray.map((i, idx) => {
//                 let yearsInResponse = i.year.split(",");
//                 return (
//                   <div>
//                     <Row className="incomeStatementFields">
//                       <Col xs={8} sm={8} md={8} lg={8} xl={5}>
//                         <label className="incomeStatementFieldsStyle">
//                           {i.name}
//                         </label>
//                       </Col>
//                       <Col
//                         xs={8}
//                         sm={8}
//                         md={8}
//                         lg={8}
//                         xl={7}
//                         className="incomeStatementAmountBoxCol"
//                       >
//                         {selectedFY.map((selectedYear, fyIdx) => {
//                           return (
//                             <div className="parent">
//                               {yearsInResponse.includes(selectedYear) ? (
//                                 <div>
//                                   <InputNumber
//                                     mode="decimal"
//                                     inputId="integeronly"
//                                     className="incomeStatementAmountBox"
//                                   />
//                                 </div>
//                               ) : (
//                                 <div>
//                                   {" "}
//                                   <InputNumber
//                                     mode="decimal"
//                                     inputId="integeronly"
//                                     className="incomeStatementAmountBoxDisabled"
//                                     disabled={true}
//                                     tooltip="This field is not applicable for the selected financial year"
//                                   />
//                                 </div>
//                               )}
//                               {/* {yearsInResponse.map((responseYear, inputIdx) => {
//                                 if (selectedYear == responseYear) {
//                                   return (
//                                     <Col
//                                       xs={8}
//                                       sm={8}
//                                       md={8}
//                                       lg={8}
//                                       xl={6}
//                                       className="incomeStatementAmountBoxCol"
//                                     >
//                                       <InputNumber
//                                         mode="decimal"
//                                         inputId="integeronly"
//                                         className="incomeStatementAmountBox"
//                                       />
//                                     </Col>
//                                   );
//                                 } else {
//                                   return (
//                                     <Col
//                                       xs={8}
//                                       sm={8}
//                                       md={8}
//                                       lg={8}
//                                       xl={6}
//                                       className="incomeStatementAmountBoxCol"
//                                     >
//                                       <InputNumber
//                                         mode="decimal"
//                                         inputId="integeronly"
//                                         className="incomeStatementAmountBoxDisabled"
//                                         disabled={true}
//                                         tooltip="This field is not applicable for the selected financial year"
//                                         placeholder={selectedYear}
//                                       />
//                                     </Col>
//                                   );
//                                 }
//                               })} */}
//                             </div>
//                           );
//                         })}

//                         {/* {yearsInResponse.map((year, inputIdx) => {
//                           return (
//                             <div className="parent">
//                               {selectedFY.map((fy, fyIdx) => {
//                                 console.log(
//                                   yearsInResponse,
//                                   ">> YEAR IN RESPONSE",
//                                   fy
//                                 );

//                                 if (fy == year) {
//                                   return (
//                                     <Col
//                                       xs={8}
//                                       sm={8}
//                                       md={8}
//                                       lg={8}
//                                       xl={6}
//                                       className="incomeStatementAmountBoxCol"
//                                     >
//                                       <InputNumber
//                                         mode="decimal"
//                                         inputId="integeronly"
//                                         className="incomeStatementAmountBox"
//                                       />
//                                     </Col>
//                                   );
//                                 } else if (
//                                   yearsInResponse.length != selectedFY.length
//                                 ) {
//                                   return (
//                                     <Col
//                                       xs={8}
//                                       sm={8}
//                                       md={8}
//                                       lg={8}
//                                       xl={6}
//                                       className="incomeStatementAmountBoxCol"
//                                     >
//                                       <InputNumber
//                                         mode="decimal"
//                                         inputId="integeronly"
//                                         className="incomeStatementAmountBoxDisabled"
//                                         disabled={true}
//                                         tooltip="This field is not applicable for the selected financial year"
//                                         placeholder={fy}
//                                       />
//                                     </Col>
//                                   );
//                                 }
//                               })}
//                             </div>
//                           );
//                         })} */}
//                       </Col>
//                     </Row>

//                     <br />
//                   </div>
//                 );
//               })}
//             </div>
//           );
//         })}

//         <center className="incomeStatementSaveBtnCenter">
//           <Button
//             label="Previous"
//             aria-label="Annual Report"
//             // onClick={() => this.props.history.push('/year')}
//             id="annualReportBtn"
//             className="incomeStatementSaveBtn"
//           />
//           <Button
//             label="Save & Continue"
//             aria-label="Annual Report"
//             // onClick={() => this.navigateToBalanceSheet()}
//             id="annualReportBtn"
//             className="incomeStatementSaveBtn"
//           />
//         </center>
//       </div>
//     );
//   }
// }

// export default PlayGround;
