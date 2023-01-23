// import React, { Component } from "react";
// import { Calendar } from "primereact/calendar";
// import { Dropdown } from "primereact/dropdown";
// import { Button } from "primereact/button";
// import Header from "../Header/header";
// import Steps from "../Steps/steps";
// import { connect } from "react-redux";
// import moment from "moment";
// import { Toast } from "primereact/toast";
// import "./Year.css";

// let userSelectedYearCount = 0;
//   // let     yearCount = [];
// let test = [],
//   yearCount = [],
//   financialYearDetails = {},
//   financialYearDetailsObj = {
//     from: "",
//     to: "",
//   },
//   from = "",
//   to = "",
//   redirectStatus = true;
// const mapStateToProps = (state) => {
//   return {
//     annualReportType: state.annualReportType.annualReportType.values,
//     companyInformation: state.companyInformation.companyInformation.values,
//     financialYear: state.financialYear.financialYear,
//   };
// };
// class yearDemo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       date1: "",
//       date2: "",
//       selected_year: { id: 0, name: "0" },
//       dummy: "",
//     };

//     this.fisical_year = [
//       { id: 0, name: "0" },
//       { id: 1, name: "1" },
//       { id: 2, name: "2" },
//       { id: 3, name: "3" },
//     ];

//     this.dateOnChange = this.dateOnChange.bind(this);
//     this.yearCountOnChange = this.yearCountOnChange.bind(this);
//   }

  

//   dateOnChange(dateValue, Idx, postion) {
//     let tempFinancialYearDetails = {};
//     console.log(Idx);
//     financialYearDetailsObj = {
//       from: "",
//       to: "",
//     };
//     if (financialYearDetails[Idx] != undefined) {
//       financialYearDetailsObj.from = financialYearDetails[Idx].from;
//       financialYearDetailsObj.to = financialYearDetails[Idx].to;
//     }

//     if (postion == "from") {
//       financialYearDetailsObj.from = dateValue.value;
//     } else {
//       financialYearDetailsObj.to = dateValue.value;
//     }

//     financialYearDetails[Idx] = financialYearDetailsObj;

//     //
//     let autoDate = {};
//     autoDate.from = moment(financialYearDetails[Idx].from).subtract(12,'month')._d;
//     autoDate.to = moment(financialYearDetails[Idx].from).subtract(1,'day')._d;
//     financialYearDetails[Idx+1] = autoDate;
//    // financialYearDetails = tempFinancialYearDetails

//     //

//     this.setState({
//       dummy: "",
//     });
//   }

//   yearCountOnChange(e) {
//     if (Object.keys(financialYearDetails).length === 0) {
//       this.toast.show({
//         severity: "error",
//         summary: "Incomplete",
//         detail: "Please fill the starting date and ending date",
//         life: 2000,
//       });
//     } else {
//       console.log('first if else');
//       Object.entries(financialYearDetails).map((entry) => {
//         let key = entry[0];
//         let value = entry[1];

//         if (value.from == "" || value.to == "") {
//           //console.log('comin not to else');
//           //alert('ERROR')
//           this.toast.show({
//             severity: "error",
//             summary: "Incomplete",
//             detail: "Please dill all the fields",
//             life: 2000,
//           });
//         } else {
//           //console.log('comin to else');
//           let userSelectedYearCount = 0;
//           yearCount = [];
//           userSelectedYearCount = e.target.value.id;
//           let tempFinancialYearDetails = {};
//           Object.keys(financialYearDetails).map((i, idx) => {
//             if (idx <= e.value.id) {
//               tempFinancialYearDetails[idx] = financialYearDetails[i];
//             }
//           });
//           if (userSelectedYearCount == 1) {
//             yearCount.push("ONE");

//             for (let i = 0; i < userSelectedYearCount; i++) {
//              // console.log(financialYearDetails,'starting the loop');
//               let autoDate = {};
//               autoDate.from = moment(financialYearDetails[i].from).subtract(12,"month")._d;
//               autoDate.to = moment(financialYearDetails[i].from).subtract(1,"day")._d;
//               tempFinancialYearDetails[i+1] = autoDate;
//               financialYearDetails = tempFinancialYearDetails;
//              // console.log(financialYearDetails,'ending the loop');
//             } 
//           }

//           if (userSelectedYearCount == 2) {
//             yearCount.push("ONE");
//             yearCount.push("TWO");

//             for (let i = 0; i < userSelectedYearCount; i++) {
//               //console.log(financialYearDetails,'starting the loop');
//               let autoDate = {};
//               autoDate.from = moment(financialYearDetails[i].from).subtract(12,"month")._d;
//               autoDate.to = moment(financialYearDetails[i].from).subtract(1,"day")._d;
//               tempFinancialYearDetails[i+1] = autoDate;
//               financialYearDetails = tempFinancialYearDetails;
//               //console.log(financialYearDetails,'ending the loop');
//             }
//           }

//           if (userSelectedYearCount == 3) {
//             yearCount.push("ONE");
//             yearCount.push("TWO");
//             yearCount.push("THREE");

//             for (let i = 0; i < userSelectedYearCount; i++) {
//               //console.log(financialYearDetails,'starting the loop');
//               let autoDate = {};
//               autoDate.from = moment(financialYearDetails[i].from).subtract(12,"month")._d;
//               autoDate.to = moment(financialYearDetails[i].from).subtract(1,"day")._d;
//               tempFinancialYearDetails[i+1] = autoDate;
//               financialYearDetails = tempFinancialYearDetails;
//               //console.log(financialYearDetails,'ending the loop');
//             }
//           }

//           this.setState({
//             selected_year: e.value,
//           });
//         }
//       });
//     }
//   }

//   componentDidMount() {
//     const { financialYear } = this.props;
//   }

//   navigateToIncomeStatementPage() {
//     const { financialYear } = this.props;
//     financialYear.values = financialYearDetails;
//     this.setState({
//       dummy: "",
//     });

//     if (Object.keys(financialYearDetails).length === 0) {
//       this.toast.show({
//         severity: "error",
//         summary: "Incomplete",
//         detail: "Please fill all the fields",
//         life: 2000,
//       });
//     } else {
//       Object.entries(financialYearDetails).map((entry) => {
//         let key = entry[0];
//         let value = entry[1];

//         if (value.from == "" || value.to == "") {
//           this.toast.show({
//             severity: "error",
//             summary: "Incomplete",
//             detail: "Please fill all the fields",
//             life: 2000,
//           });
//         } else {
//           this.props.history.push("/IncomeStatement");
//         }
//       });
//     }
//   }

//   render() {
//     const { financialYear } = this.props;
//     let mnm = {};
//     from = "";
//     to = "";

//     if (financialYear.values != undefined) {
//       let arr = Object.values(financialYear.values);
//       arr &&
//         arr.length &&
//         arr.map((i, idx) => {
//           if (idx == 0) {
//             from = i.from;
//             to = i.to;
//           }
//         });
//     }

//     if (financialYearDetails[0] != undefined) {
//     }


//     return (
//       <div>
//         <Header />
//         <Steps pageName="financialYear" />
//         <Toast
//           ref={(el) => {
//             this.toast = el;
//           }}
//         ></Toast>
//         <center>
//           <div className="year-main-container">
//             <div>
//               <p className="year-sub2">
//                 Which financial year does the annual report cover?
//               </p>
//               <p className="year-sub3">
//                 If the company has several years, you can include up to 3
//                 previous years.
//               </p>
//             </div>

//             <div className="year-cal-label">
//               <span className="year-cal-label-1">Starting Date</span>
//               <span className="year-cal-label-2">Ending Date</span>
//             </div>

//             <div className="year-cal-box">
//               <Calendar
//                 id="icon"
//                 value={
//                   financialYearDetails[0] != undefined
//                     ? financialYearDetails[0].from
//                     : ""
//                 }
//                 onChange={(e) => {
//                   this.dateOnChange(e, 0, "from");
//                 }}
//                 showIcon
//                 dateFormat="yy-mm-dd"
//                 placeholder="YYYY-MM-DD"
//                 maxDate={new Date()}
//               />
//               <Calendar
//                 id="icon"
//                 value={
//                   financialYearDetails[0] != undefined
//                     ? financialYearDetails[0].to
//                     : ""
//                 }
//                 onChange={(e) => {
//                   this.dateOnChange(e, 0, "to");
//                 }}
//                 showIcon
//                 dateFormat="yy-mm-dd"
//                 placeholder="YYYY-MM-DD"
//                 maxDate={new Date()}
//                 minDate={
//                   financialYearDetails[0] && financialYearDetails[0].from
//                 }
//               />
//             </div>

//             <div className="year-drop-label-main">
//               <span className="year-drop-label">
//                 Number of previous financial years
//               </span>
//             </div>
//             <div>
//               <Dropdown
//                 value={this.state.selected_year}
//                 options={this.fisical_year}
//                 onChange={(e) => this.yearCountOnChange(e)}
//                 optionLabel="name"
//                 placeholder="Choose"
//                 className="year-drop-option"
//               />
//             </div>
//             <br></br>

//             {yearCount.map((i, idx) => {
//               if (financialYear.values != undefined) {
//                 let arr = Object.values(financialYear.values);
//                 arr &&
//                   arr.length &&
//                   arr.map((arrI, arrIdx) => {
//                     let cc = {
//                       from: arrI.from,
//                       to: arrI.to,
//                     };
//                     from = arrI.from;
//                     to = arrI.to;

//                     mnm[arrIdx + 1] = cc;
//                   });
//               }
//               // console.log(
//               //   financialYearDetails[idx + 1] &&
//               //     financialYearDetails[idx + 1].to,
//               //   "**** // ****"
//               // );

//               return (
//                 <div key={idx}>
//                   <div className="year-cal-label">
//                     <span className="year-cal-label-1">Starting Date</span>
//                     <span className="year-cal-label-2">Ending Date</span>
//                   </div>
//                   <div className="year-cal-box">
//                     <Calendar
//                       id="icon"
//                       value={
//                         financialYearDetails[idx + 1] != undefined
//                           ? financialYearDetails[idx + 1].from
//                           : ""
//                       }
//                       onChange={(e) => {
//                         this.dateOnChange(e, idx + 1, "from");
//                       }}
//                       showIcon
//                       dateFormat="yy-mm-dd"
//                       placeholder="YYYY-MM-DD"
//                       maxDate={new Date()}
//                     />
//                     <Calendar
//                       id="icon"
//                       value={
//                         financialYearDetails[idx + 1] != undefined
//                           ? financialYearDetails[idx + 1].to
//                           : ""
//                       }
//                       onChange={(e) => {
//                         this.dateOnChange(e, idx + 1, "to");
//                       }}
//                       showIcon
//                       dateFormat="yy-mm-dd"
//                       placeholder="YYYY-MM-DD"
//                       maxDate={
//                         financialYearDetails[idx + 1] &&
//                         financialYearDetails[idx + 1].to
//                       }
//                       minDate={
//                         financialYearDetails[idx + 1] &&
//                         financialYearDetails[idx + 1].to
//                       }
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//             <br></br>
//             <div className="year-btn-div">
//               <Button
//                 label="Move On"
//                 aria-label="Annual Report"
//                 onClick={() => this.navigateToIncomeStatementPage()}
//                 id="annualReportBtn"
//                 className="btn_Annual"
//                 style={{
//                   width: "157px",
//                   height: "44px",
//                   fontSize: "1.2rem",
//                 }}
//               />
//             </div>
//           </div>
//         </center>
//       </div>
//     );
//   }
// }

// export default connect(mapStateToProps, null)(yearDemo);
