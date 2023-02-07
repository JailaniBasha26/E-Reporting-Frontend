
import React, { Component } from "react";
// import { Calendar } from "primereact/calendar";
// import { Dropdown } from "primereact/dropdown";
// import { Button } from "primereact/button";
// import Header from "../Header/header";
import NavBar from "../Zeenath Demo/Navbar"
import Steps from "../Steps/steps";
import { TabView, TabPanel } from 'primereact/tabview';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { connect } from "react-redux";
// import moment from "moment";
// import { Toast } from "primereact/toast";
import "./IncomeStatementDemo.css";

let getIncomeStatementFieldsArray = [
  {
    header: 'Operating income, inventory changes, etc',
    fields: ['Net sales'
            ,'Change of stock of work in progress, finished goods and work in progress on behalf of another'
            ,'Activated work for own account'
            ,'Other operating income' ] 
  },
  {
    header: 'Operating costs',
    fields: ['Raw materials and consumables'
            ,'Merchandise'
            ,'Other external expenses'
            ,'Personnel costs'
            ,'Depreciation and write-downs of tangible and intangible fixed assets'
            ,'Write-downs of current assets in addition to normal write-downs'
            ,'Other operating expenses'
            ,'' ] 
  },
  {
    header: 'Operating costs',
    fields: ['Net sales'
            ,'Raw materials and consumables'
            ,'Merchandise'
            ,'Other external expenses' ] 
  },
]
class IncomeStatementDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {
    localStorage.setItem('Keys',JSON.stringify(getIncomeStatementFieldsArray))
    console.log('Its done');
  }
  render() {
    
    return (
      <div>
        <NavBar/><br></br>
        <Steps/>

        <TabView>
    <TabPanel header="Income Statement">
        <p className="m-0">
        </p>
        <Row className="fields">
                                <Col
                                  xs={8}
                                  sm={8}
                                  md={8}
                                  lg={8}
                                  xl={8}
                                  id="headingStyle"
                                >
                                </Col>

                                <Col
                                  xs={4}
                                  sm={4}
                                  md={4}
                                  lg={4}
                                  xl={4}
                                  id="headingStyle"
                                >
                                  
                                </Col>
                              </Row>
    </TabPanel>
    <TabPanel header="Balance Sheet">
        <p className="m-0">
            Work in progress
        </p>
    </TabPanel>
</TabView>


        </div>
    );
  }
}

export default IncomeStatementDemo;
