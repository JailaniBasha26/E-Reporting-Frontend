import React, { Component } from "react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import Header from "../Header/header";
import Steps from "../Steps/steps";
import "./Year.css";

let test=[],yearCount=[],financialYearDetails={}
class Year extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date1: "",
      date2: "",
      selected_year: null,
      dummy:''
    };

    this.fisical_year = [
      { id:0,name: "0" },
      { id:1,name: "1" },
      { id:2,name: "2" },
      { id:3,name: "3" },
    ];

    this.dateOnChange = this.dateOnChange.bind(this);
    this.yearCountOnChange = this.yearCountOnChange.bind(this);
  }

  dateOnChange(dateValue,Idx,postion){
    console.log('DATE : ',dateValue.value)
    console.log('INDEX : ',Idx)
    console.log('POSITION : ',postion)
    if(postion == 'from' && Idx == 0) 
    this.setState({
      date1:dateValue.value
    })
    if(postion == 'to' && Idx == 0) 
    this.setState({
      date2:dateValue.value
    })

   // financialYearDetails[Idx]

  }

  yearCountOnChange(e){
    console.log('COUNT : ',e.value)
    let userSelectedYearCount = 0;
    yearCount=[]
    userSelectedYearCount = e.target.value.id

    if (userSelectedYearCount == 1){
      yearCount.push('ONE')
    }

    if (userSelectedYearCount == 2){
      yearCount.push('ONE')
      yearCount.push('TWO')
    }

    if (userSelectedYearCount == 3){
      yearCount.push('ONE')
      yearCount.push('TWO')
      yearCount.push('THREE')
    }

    this.setState({
      selected_year:e.value
    })
  }

  navigateToIncomeStatementPage() {
    this.props.history.push("/IncomeStatement");
  }

  render() {
    let elements = [];
    let financialYearCount = test.length
    //console.log(yearCount,'????',this.state.dummy,yearCount.length)

    if(this.state.selected_year != null)
    {
      console.log(this.state.selected_year.name,'--------')
      for(var i=0;i<this.state.selected_year.id; i++) {
        elements.push(
        <div>
          <div className="year-cal-label">
              <span className="year-cal-label-1">
                Beginning of the financial year
              </span>
              <span className="year-cal-label-2">
                End of the financial year
              </span>
            </div>
            <div className="year-cal-box">
              <Calendar
                id="icon"
                value={this.state.date1}
               // onChange={(e) => this.setState({ date1: e.value })}
                onChange={(e)=> {this.dateOnChange(e,this.state.selected_year.id[i],'from')}}
                showIcon
                dateFormat="yy-mm-dd"
                placeholder="YYYY-MM-DD"
              />
              <Calendar
                id="icon"
                value={this.state.date2}
               // onChange={(e) => this.setState({ date2: e.value })}
                onChange={(e)=> {this.dateOnChange(e,this.state.selected_year.id[i],'to')}}
                showIcon
                dateFormat="yy-mm-dd"
                placeholder="YYYY-MM-DD"
              />
            </div>
        </div>
        )
      }
    }
    return (
      <div>
        <Header />
        {/* <Steps pageName="financialYear" /> */}
        <center>
          <div className="year-main-container">
            <div>
              <p className="year-sub2">
                Which financial year does the annual report cover?
              </p>
              <p className="year-sub3">
                If the company has several years, you can include up to 3
                previous years.
              </p>
            </div>

            <div className="year-cal-label">
              <span className="year-cal-label-1">
                Beginning of the financial year
              </span>
              <span className="year-cal-label-2">
                End of the financial year
              </span>
            </div>

            <div className="year-cal-box">
              {/* <button type="button" tabindex="-1" class="p-button p-component p-datepicker-trigger p-button-icon-only"><span class="p-button-icon p-c pi pi-calendar"></span><span class="p-button-label p-c">&nbsp;</span></button> */}
              <Calendar
                id="icon"
                value={this.state.date1}
                //onChange={(e) => this.setState({ date1: e.value })}
                onChange={(e)=> {this.dateOnChange(e,0,'from')}}
                showIcon
                dateFormat="yy-mm-dd"
                placeholder="YYYY-MM-DD"
              />
              <Calendar
                id="icon"
                value={this.state.date2}
                onChange={(e) => this.setState({ date2: e.value })}
                //onChange={(e)=> {this.dateOnChange(e,0,'to')}}
                showIcon
                dateFormat="yy-mm-dd"
                placeholder="YYYY-MM-DD"
              />
            </div>

            <div className="year-drop-label-main">
              <span className="year-drop-label">
                Number of previous financial years
              </span>
            </div>
            <div>
              <Dropdown
                value={this.state.selected_year}
                options={this.fisical_year}
                //onChange={(e) => this.setState({ selected_year: e.value })}
               onChange={(e) => this.yearCountOnChange(e)}
                optionLabel="name"
                placeholder="Choose"
                className="year-drop-option"
              />
            </div>
            <br></br>
            {/* {elements} */}
          

            {
               yearCount.map((i,idx)=>{
                console.log(i,'------',idx)
                return(
                  <div>
                  <div className="year-cal-label">
                      <span className="year-cal-label-1">
                        Beginning of the financial year
                      </span>
                      <span className="year-cal-label-2">
                        End of the financial year
                      </span>
                    </div>
                    <div className="year-cal-box">
                      <Calendar
                        id="icon"
                        value={this.state.date1}
                       // onChange={(e) => this.setState({ date1: e.value })}
                        onChange={(e)=> {this.dateOnChange(e,idx+1,'from')}}
                        showIcon
                        dateFormat="yy-mm-dd"
                        placeholder="YYYY-MM-DD"
                      />
                      <Calendar
                        id="icon"
                        value={this.state.date2}
                       // onChange={(e) => this.setState({ date2: e.value })}
                        onChange={(e)=> {this.dateOnChange(e,idx+1,'to')}}
                        showIcon
                        dateFormat="yy-mm-dd"
                        placeholder="YYYY-MM-DD"
                      />
                    </div>
                </div>
                )
              })
            }
            <br></br>
            <div className="year-btn-div">
              <Button
                label="Move On"
                aria-label="Annual Report"
                onClick={() => this.navigateToIncomeStatementPage()}
                id="annualReportBtn"
                className="btn_Annual"
                style={{
                  width: "157px",
                  height: "44px",
                  fontSize: "1.2rem",
                }}
              />
            </div>
          </div>
        </center>
      </div>
    );
  }
}

export default Year;
