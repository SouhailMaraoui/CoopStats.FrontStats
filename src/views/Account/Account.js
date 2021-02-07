import React, { Component, } from 'react';
import {
    Table,
    Row,Col,
} from 'reactstrap';
import {Button} from "reactstrap";
import axios from "axios";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state={
      API_LINK:'https://coopstats-106e3.uc.r.appspot.com/',

      disabled:[[true,true],
        [true,true],
        [true,true],
        [true,true],
        [true,true],
        [true,true]],

      idCooperative:0,
      Reports:[],
    };
    let user=JSON.parse(localStorage.getItem("user"));
    if(user===null){
      this.props.history.push("/login");
    }
    else if(user.role==="admin"){
      this.props.history.push("/dashboard");
    }
    else{
      let reports=[];
      axios.get(this.state.API_LINK+'report/all')
          .then((response) => {
            response.data.forEach(report=>{
                  if(report.idUser===user.id)
                  {reports.push(report);}
                }
            );
            this.setState({Reports:reports});
            let disabled=this.state.disabled;
            for(let i=0;i<6;i++){
              disabled[i][0]=this.isFilled(2020-i,"act");
              disabled[i][1]=this.isFilled(2020-i,"fin");
            }
            this.setState({disabled: disabled})
          })
    }
  }

  isFilled(year, type){
    let ret=false;
    for(let i=0;i<this.state.Reports.length;i++)
    {
      if(this.state.Reports[i].type===type && parseInt(this.state.Reports[i].year)===year) {
        ret=true;
      }
    }
    return ret;
  }


  render() {
    return (
        <div>
          <div className="animated fadeIn">
            <h1>Dashboard</h1>
            <hr/>
            <div className="mt-3 text-center">
              <h4>Please submit your activity and financial reports.</h4>
              <h4><i className="text-danger">Please note, </i> you will not be able to modify your reports once submitted
              </h4>
              <br/>
              <Row>
                <Col xs="2"/>
                <Col xs="8">
                  <Table responsive>
                    <thead>
                    <tr>
                      <th>Year</th>
                      <th>Activity Report</th>
                      <th>Finance Report</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td><h4 className="mt-1">2020</h4></td>
                      <td>
                        <Button type="button" disabled={this.state.disabled[0][0]} href="#/account/activity?year=2020" className="btn btn-outline-dark">Submit your activity report</Button>
                      </td>
                      <td>
                        <Button type="button" disabled={this.state.disabled[0][1]} href="#/account/financial?year=2020" className="btn btn-outline-dark">Submit your finance report</Button>
                      </td>
                    </tr>
                    <tr>
                      <td><h4 className="mt-1">2019</h4></td>
                      <td>
                        <Button type="button" disabled={this.state.disabled[1][0]}  href="#/account/activity?year=2019" className="btn btn-outline-dark">Submit your activity report</Button>
                      </td>
                      <td>
                        <Button type="button" disabled={this.state.disabled[1][1]} href="#/account/financial?year=2019" className="btn btn-outline-dark">Submit your finance report</Button>
                      </td>
                    </tr>
                    <tr>
                      <td><h4 className="mt-1">2018</h4></td>
                      <td>
                        <Button type="button" disabled={this.state.disabled[2][0]} href="#/account/activity?year=2018" className="btn btn-outline-dark">Submit your activity report</Button>
                      </td>
                      <td>
                        <Button type="button" disabled={this.state.disabled[2][1]} href="#/account/financial?year=2018" className="btn btn-outline-dark">Submit your finance report</Button>
                      </td>
                    </tr>
                    <tr>
                      <td><h4 className="mt-1">2017</h4></td>
                      <td>
                        <Button type="button" disabled={this.state.disabled[3][0]} href="#/account/activity?year=2017" className="btn btn-outline-dark">Submit your activity report</Button>
                      </td>
                      <td>
                        <Button type="button" disabled={this.state.disabled[3][1]} href="#/account/financial?year=2017" className="btn btn-outline-dark">Submit your finance report</Button>
                      </td>
                    </tr>
                    <tr>
                      <td><h4 className="mt-1">2016</h4></td>
                      <td>
                        <Button type="button" disabled={this.state.disabled[4][0]} href="#/account/activity?year=2016" className="btn btn-outline-dark">Submit your activity report</Button>
                      </td>
                      <td>
                        <Button type="button" disabled={this.state.disabled[4][1]} href="#/account/financial?year=2016" className="btn btn-outline-dark">Submit your finance report</Button>
                      </td>
                    </tr>
                    <tr>
                      <td><h4 className="mt-1">2015</h4></td>
                      <td>
                        <Button type="button" disabled={this.state.disabled[5][0]} href="#/account/activity?year=2015" className="btn btn-outline-dark">Submit your activity report</Button>
                      </td>
                      <td>
                        <Button type="button" disabled={this.state.disabled[5][1]} href="#/account/financial?year=2015" className="btn btn-outline-dark">Submit your finance report</Button>
                      </td>
                    </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col xs="2"/>
              </Row>
            </div>
          </div>
        </div>
    );
  }
}

export default Account;
