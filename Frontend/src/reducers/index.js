import { combineReducers } from "redux";
import annualReportType from "./reducer-annualReportType";
import companyInformation from "./reducer-companyInformation";
import financialYear from "./reducer-financialYear";
import incomeStatement from "./reducer-incomeStatement";
import sessionDetails from "./reducer-sessionDetails";

const rootReducer = combineReducers({
  annualReportType: annualReportType,
  companyInformation: companyInformation,
  financialYear: financialYear,
  incomeStatement: incomeStatement,
  sessionDetails: sessionDetails,
});

export default rootReducer;
