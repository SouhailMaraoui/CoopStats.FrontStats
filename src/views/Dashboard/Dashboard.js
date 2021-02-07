import React, { Component} from 'react';
import { Bar, Line, Doughnut} from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Progress,
  Row,
  Input,
  Table,
  ButtonGroup,
  Collapse, Button,
} from 'reactstrap';
import axios from "axios";

const cardChartData3 = {
  labels: ['1','2','3', '4', '5', '6', '7', '8', '9'],
  datasets: [
    {
      backgroundColor: 'rgba(255,255,255,.4)',
      borderColor: 'rgba(255,255,255,.8)',
      data: [15, 34, 30, 40, 50, 34, 40, 65, 80],
      barPercentage: 0.6,
    },
  ],
};
const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData3.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData3.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};
const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 4,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};
const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};
const doughnutOpts = {
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      API_LINK:'https://coopstats-106e3.uc.r.appspot.com/',

      acc12:true,
      accordion12: [true, false],
      displayStyle12:["display:block;","display:none;"],
      colors1:["warning","light"],
      colors2:["danger","light"],

      acc3:true,
      accordion3: [true, false,false],
      displayStyle3:["display:block;","display:none;","display:none;"],
      colors3:["primary","light","light"],

      acc4:true,
      accordion4: [true, false],
      displayStyle4:["display:block;","display:none;"],
      colors4:["dark","light"],

      acc567:true,

      Cooperatives:[],
      Losses:[],
      Gains:[],
      Members:[],

      Communications:[],
      Sells:[],
      Formations:[],
      Events:[],

      Sector:[],
      Regions:[],
      CommChannel:[],

      searchCoop:'',
      searchSector:'',
      searchRegion:'',
    };
  }

  componentDidMount() {
    let user=JSON.parse(localStorage.getItem("user"));
    if(user===null){
      this.props.history.push("/login");
    }
    else if(user.role==="user"){
      this.props.history.push("/account");
    }
    else{
      axios.get(this.state.API_LINK+'sector/all')
          .then((response) =>{
            axios.get(this.state.API_LINK+'region/all')
                .then((response) =>{
                  axios.get(this.state.API_LINK+'cooperative/all')
                      .then((response) =>{
                        this.setState({
                          Cooperatives: response.data,
                        })
                      });
                  this.setState({
                    Regions: response.data,
                  })
                });
            this.setState({
              Sector: response.data,
            })
          });
      axios.get(this.state.API_LINK+'loss/all')
          .then((response) =>{
            axios.get(this.state.API_LINK+'gain/all')
                .then((response) =>{
                  axios.get(this.state.API_LINK+'member/all')
                      .then((response) =>{
                        this.setState({
                          Members: response.data,
                        })
                      });
                  this.setState({
                    Gains: response.data,
                  })
                });
            this.setState({
              Losses: response.data,
            })
          });


      axios.get(this.state.API_LINK+'communication/all')
          .then((response) =>{
            axios.get(this.state.API_LINK+'product/all')
              .then((response) =>{
                axios.get(this.state.API_LINK+'training/all')
                    .then((response) =>{
                      axios.get(this.state.API_LINK+'event/all')
                          .then((response) =>{
                            this.setState({
                              Events: response.data,
                            })
                          });
                      this.setState({
                        Formations: response.data,
                      })
                    });
                this.setState({
                  Sells: response.data,
                })
              });
            this.setState({
              Communications: response.data,
            })
          });

    }
  }

  toggleAccordion12() {
    this.setState({
      acc12:!this.state.acc12,
      acc3:!this.state.acc3,
    })
  }
  toggleSubAccordionMain12(tab) {
    let prevState = this.state.accordion12;
    const state = prevState.map((x, index) => tab === index ? !x : false);
    let prevDisp=["display:none;","display:none;"];
    let prevColor1=["light","light"];
    let prevColor2=["light","light"];
    prevDisp[tab]="display:block;";
    prevColor1[tab]=["warning"];
    prevColor2[tab]=["danger"];

    this.setState({
      accordion12: state,
      displayStyle12:prevDisp,
      colors1:prevColor1,
      colors2:prevColor2,
    });
  }
  toggleSubAccordion12(tab) {
    this.toggleSubAccordion3(tab);
    let prevState = this.state.accordion12;
    if (prevState[tab] === true){
      this.setState({
        acc12: !this.state.acc12,
        acc3:!this.state.acc3,
      });
    }
  }
  toggleAccordion3() {
    this.setState({
      acc12:!this.state.acc12,
      acc3:!this.state.acc3,
    })
  }
  toggleSubAccordion3(tab) {
    if(tab<2 && this.state.accordion12[tab]===false)
    {
      this.toggleSubAccordionMain12(tab);
    }
    let prevState = this.state.accordion3;
    if (prevState[tab] === false){
      const state = prevState.map((x, index) => tab === index ? !x : false);
      let prevDisp=["display:none;","display:none;","display:none;"];
      let prevColor3=["light","light","light"];

      prevColor3[tab]=["primary"];
      prevDisp[tab]="display:block;";

      this.setState({
        accordion3: state,
        displayStyle3:prevDisp,
        colors3:prevColor3,
      });
    }
    else
    {
      this.setState({
        acc3: !this.state.acc3,
        acc12:!this.state.acc12,
      });
    }
  }
  toggleAccordion4() {
    this.setState({
      acc4:!this.state.acc4,
      acc567:!this.state.acc567,
    })
  }
  toggleSubAccordion4(tab) {
    let prevState = this.state.accordion4;
    if (prevState[tab] === false){
      const state = prevState.map((x, index) => tab === index ? !x : false);
      let prevDisp=["display:none;","display:none;"];
      let prevColor4=["light","light"];

      prevColor4[tab]=["dark"];
      prevDisp[tab]="display:block;";

      this.setState({
        accordion4: state,
        displayStyle4:prevDisp,
        colors4:prevColor4,
      });
    }
    else
    {
      this.setState({
        acc567:!this.state.acc567,
        acc4: !this.state.acc4,
      });
    }
  }
  toggleAccordion567() {
    this.setState({
      acc567:!this.state.acc567,
      acc4:!this.state.acc4,
    })
  }

  NumberCoopPerSector(index){
    let ret=0;
    let id=parseInt(index)+1;
    this.state.Cooperatives.forEach(element=>{
      if(element.idSector===id.toString())
      {
        ret++;
      }
    });
    return ret;
  }
  CoopPerSector(){
    return(
        <ul>
          {this.state.Sector.map((element, index)=>
          {return(
              <div className="progress-group ml-n5">
                <div className="progress-group-header">
                  <span className="title">{element.sectorName}</span>
                  <span className="ml-auto font-weight-bold">{this.NumberCoopPerSector(index)}<span className="text-muted small">
                    ({Math.floor(100*this.NumberCoopPerSector(index)/this.state.Cooperatives.length)}%)</span></span>
                </div>
                <div className="progress-group-bars">
                  <Progress className="progress-xs" color="warning" value={100*this.NumberCoopPerSector(index)/this.state.Cooperatives.length} />
                  <Progress className="progress-xs" color="white" value="100" />
                </div>
              </div>)}
          )}
        </ul>
    )
  }

  NumberCoopPerRegion(index){
    let ret=0;
    let id=parseInt(index)+1;
    this.state.Cooperatives.forEach(element=>{
      if(element.idRegion===id.toString())
      {
        ret++;
      }
    });
    return ret;
  }
  CoopPerRegion(){
    return(
        <ul>
          {this.state.Regions.map((element, index)=>
              {return(
                  <div className="progress-group ml-n5">
                    <div className="progress-group-header">
                      <span className="title">{element.regionName}</span>
                      <span className="ml-auto font-weight-bold">{this.NumberCoopPerRegion(index)}<span className="text-muted small">
                    ({Math.floor(100*this.NumberCoopPerRegion(index)/this.state.Cooperatives.length)}%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="warning" value={100*this.NumberCoopPerRegion(index)/this.state.Cooperatives.length} />
                      <Progress className="progress-xs" color="white" value="100" />
                    </div>
                  </div>)}
          )}
        </ul>
    )
  }

  NumberProfit(type,index){
    let ret=0;
    let id=parseInt(index)+1;
    this.state.Cooperatives.forEach(element=>{
      let idType;
      if(type===0) idType=element.idSector;
      else idType=element.idRegion;
      if(idType===id.toString()){
        this.state.Gains.forEach(gain=>{

          console.log(gain.idCooperative,element.id.toString(),gain.idCooperative===element.id.toString());

          if(gain.idCooperative===element.id.toString())
            ret+=gain.amount;
        })
      }
    });
    return ret;
  }
  SumProfit(){
    let ret=0;
    this.state.Gains.forEach(element=>{
      ret+=element.amount;
    });
    return ret;
  }
  ProfitPerSector(){
    return(
      <ul>
        {this.state.Sector.map((element, index)=>
          {return(
            <div className="progress-group ml-n5">
              <div className="progress-group-header">
                <span className="title">{element.sectorName}</span>
                <span className="ml-auto font-weight-bold">{this.NumberProfit(0,index)}<span className="text-muted small">
              ({Math.floor(100*this.NumberProfit(0,index)/this.SumProfit())}%)</span></span>
              </div>
              <div className="progress-group-bars">
                <Progress className="progress-xs" color="danger" value={100*this.NumberProfit(0,index)/this.SumProfit()} />
                <Progress className="progress-xs" color="white" value="100" />
              </div>
            </div>)}
        )}
      </ul>
    )
  }
  ProfitPerRegion(){
    return(
        <ul>
          {this.state.Regions.map((element, index)=>
              {return(
                  <div className="progress-group ml-n5">
                    <div className="progress-group-header">
                      <span className="title">{element.regionName}</span>
                      <span className="ml-auto font-weight-bold">{this.NumberProfit(1,index)}<span className="text-muted small">
              ({Math.floor(100*this.NumberProfit(1,index)/this.SumProfit())}%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="danger" value={100*this.NumberProfit(1,index)/this.SumProfit()} />
                      <Progress className="progress-xs" color="white" value="100" />
                    </div>
                  </div>)}
          )}
        </ul>
    )
  }

  NumberAdherentBySex(type, index){
    let ret=[0,0];
    let sum=0;
    let id=parseInt(index)+1;
    this.state.Cooperatives.forEach(element=>{
      let idType;
      if(type===0) idType=element.idSector;
      else idType=element.idRegion;

      if(idType===id.toString()){
        this.state.Members.forEach(member=>{
          if(member.idCooperative===element.id.toString()) {
            if (member.sex === "Male") {
              ret[0]++
            }
            sum++;
          }
        })
      }
    });
    ret[1]=sum-ret[0];
    return ret;
  }
  NumberAdherent(type, index){
    let ret=0;
    let id=parseInt(index)+1;
    this.state.Cooperatives.forEach(element=>{
      let idType;
      if(type===0) idType=element.idSector;
      else idType=element.idRegion;
      if(idType===id.toString()){
        this.state.Members.forEach(member=>{
          if(member.idCooperative===element.id.toString())
            ret++;
        })
      }
    });
    return ret;
  }
  AdherentPerSector(){
    return(
        <ul>
          {this.state.Sector.map((element, index)=>
              {return(
                  <div className="progress-group ml-n5">
                    <div className="progress-group-header">
                      <span className="title">{element.sectorName}</span>
                      <span className="ml-auto font-weight-bold">{this.NumberAdherent(0,index)}<span className="text-muted small">
                      ({Math.floor(100*this.NumberAdherent(0,index)/this.state.Members.length)}%)
                      [{this.NumberAdherentBySex(0,index)[0]}|{this.NumberAdherentBySex(0,index)[1]}]</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="info" value={100*this.NumberAdherentBySex(0,index)[0]/this.state.Members.length} />
                      <Progress className="progress-xs" color="danger" value={100*this.NumberAdherentBySex(0,index)[1]/this.state.Members.length} />
                    </div>
                  </div>)}
          )}
        </ul>
    )
  }
  AdherentPerRegion(){
    return(
        <ul>
          {this.state.Regions.map((element, index)=>
              {return(
                  <div className="progress-group ml-n5">
                    <div className="progress-group-header">
                      <span className="title">{element.regionName}</span>
                      <span className="ml-auto font-weight-bold">{this.NumberAdherent(1,index)}<span className="text-muted small">
                      ({Math.floor(100*this.NumberAdherent(1,index)/this.state.Members.length)}%)
                      [{this.NumberAdherentBySex(1,index)[0]}|{this.NumberAdherentBySex(1,index)[1]}]
                      </span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="info" value={100*this.NumberAdherentBySex(1,index)[0]/this.state.Members.length} />
                      <Progress className="progress-xs" color="danger" value={100*this.NumberAdherentBySex(1,index)[1]/this.state.Members.length} />
                    </div>
                  </div>)}
          )}
        </ul>
    )
  }
  NumberAdherentSex(){
    let ret=[0,0];
    this.state.Members.forEach(element=>{
      if(element.sex==="Male"){ret[0]++}
    });
    ret[1]=this.state.Members.length-ret[0];
    return ret;
  }
  doughnutSex(){
    return({
      labels: [
        'Female',
        'Male',
      ],
      datasets: [
        {
          data: [this.NumberAdherentSex()[1], this.NumberAdherentSex()[0]],
          backgroundColor: [
            '#F86C6B',
            '#20A8D8',
          ],
          hoverBackgroundColor: [
            '#F86C6B',
            '#20A8D8',
          ],
        }],
    })
  };
  AdherentPerSex(){
    return(
        <div>
          <Row>
            <Col xs="6"><Card className="text-center pt-2 mx-n2 btn-outline-primary"><h6>Male: {Math.floor(100*this.NumberAdherentSex()[0]/this.state.Members.length)}%</h6></Card></Col>
            <Col xs="6"><Card className="text-center pt-2 mx-n2 btn-outline-danger"><h6>Female: {Math.floor(100*this.NumberAdherentSex()[1]/this.state.Members.length)}%</h6></Card></Col>

              <Doughnut data={this.doughnutSex()} options={doughnutOpts} height={100}/>
          </Row>
        </div>
    )
  }

  CoopSales(index){
    let ret=0;
    let id=index;
    this.state.Sells.forEach(element=>{
      if(element.idCooperative===id)
      {
        ret+=element.productQuantity;
      }
    });
    return ret;
  }
  SumSales(){
    let ret=0;
    this.state.Sells.forEach(element=>{
      ret+=element.productQuantity;
    });
    return ret;
  }
  Sales(){
    return(
      <ul>
        {this.state.Cooperatives.map((element)=>
          {return(
            <div className="progress-group ml-n5">
              <div className="progress-group-header">
                <span className="title">{element.cooperativeName}</span>
                <span className="ml-auto font-weight-bold">{this.CoopSales(element.id)}<span className="text-muted small">
              ({Math.floor(100*this.CoopSales(element.id)/this.SumSales())}%)</span></span>
              </div>
              <div className="progress-group-bars">
                <Progress className="progress-xs" color="dark" value={100*this.CoopSales(element.id)/this.SumSales()} />
              </div>
            </div>)}
        )}
      </ul>
    )
  }

  CoopComm(coopId){
    let ret=0;
    let id=coopId;
    this.state.Communications.forEach(element=>{
      if(element.idCooperative===id)
      {
        ret++;
      }
    });
    return ret;
  }
  Communication(){
    return(
      <ul>
        {this.state.Cooperatives.map((element)=>
          {return(
            <div className="progress-group ml-n5">
              <div className="progress-group-header">
                <span className="title">{element.cooperativeName}</span>
                <span className="ml-auto font-weight-bold">{this.CoopComm(element.id)}<span className="text-muted small">
                  ({Math.floor(100*this.CoopComm(element.id)/this.state.Communications.length)}%)</span></span>
              </div>
              <div className="progress-group-bars">
                <Progress className="progress-xs" color="dark" value={100*this.CoopComm(element.id)/this.state.Communications.length} />
              </div>
            </div>)}
        )}
      </ul>
    )
  }

  NumberChannel(){
    let ret=[0,0,0,0];
    this.state.Communications.forEach(comm=>{
      ret[comm.idCommChannel-1]=comm.usage;
    });

    return ret;
  }
  doughnutChannel(){
    return({
      labels: [
        'Social Networks',
        'TV Advertisements',
        'Advertisement Boards',
        'Other...',
      ],
      datasets: [
        {
          data: this.NumberChannel(),
          backgroundColor: [
            '#F86C6B',
            '#F0A8D8',
            '#20F828',
            '#20A8D8',
          ],
          hoverBackgroundColor: [
            '#F86C6B',
            '#F0A8D8',
            '#20F828',
            '#20A8D8',
          ],
        }],
    })
  };
  Channel(){
    return(
        <Doughnut data={this.doughnutChannel()} options={doughnutOpts} height={120}/>
    )
  }

  CoopTraining(index){
    let ret=0;
    let id=index;
    this.state.Formations.forEach(element=>{
      if(element.idCooperative===id)
      {
        ret++;
      }
    });
    return ret;
  }
  Training(){
    return(
      <ul>
        {this.state.Cooperatives.map((element)=>
          {return(
            <div className="progress-group ml-n5">
              <div className="progress-group-header">
                <span className="title">{element.cooperativeName}</span>
                <span className="ml-auto font-weight-bold">{this.CoopTraining(element.id)}<span className="text-muted small">
          ({Math.floor(100*this.CoopTraining(element.id)/this.state.Formations.length)}%)</span></span>
            </div>
            <div className="progress-group-bars">
              <Progress className="progress-xs" color="dark" value={100*this.CoopTraining(element.id)/this.state.Formations.length} />
            </div>
          </div>)}
        )}
      </ul>
    )
  }

  CoopEvent(index){
    let ret=0;
    let id=index;
    this.state.Events.forEach(element=>{
      if(element.idCooperative===id.toString())
      {
        ret++;
      }
    });
    return ret;
  }
  Event(){
    return(
        <ul>
          {this.state.Cooperatives.map((element)=>
              {return(
                  <div className="progress-group ml-n5">
                    <div className="progress-group-header">
                      <span className="title">{element.cooperativeName}</span>
                      <span className="ml-auto font-weight-bold">{this.CoopEvent(element.id)}<span className="text-muted small">
          ({Math.floor(100*this.CoopEvent(element.id)/this.state.Events.length)}%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="dark" value={100*this.CoopEvent(element.id)/this.state.Events.length} />
                    </div>
                  </div>)}
          )}
        </ul>
    )
  }

  showCoops(){
    return(
      <tbody>
        {this.state.Cooperatives.map((element)=>
          {
            const Coop=element.cooperativeName;
            const Sect=(this.state.Sector[element.idSector-1]).sectorName;
            const Reg=(this.state.Regions[element.idRegion-1]).regionName;
            if(Coop.includes(this.state.searchCoop) && Sect.includes(this.state.searchSector) && Reg.includes(this.state.searchRegion))
            return(
              <tr>
                <td>{Coop}</td>
                <td>{Sect}</td>
                <td>{Reg}</td>
              </tr>);
            else return(<hr/>)
          }
        )}
      </tbody>
    )
  }
  CoopsTable() {
    return(
      <div className="text-center">
        <Table responsive striped>
          <thead>
          <tr>
            <th>Cooperative</th>
            <th>Sector</th>
            <th>Region</th>
          </tr>
          <tr>
            <th><Input type="text" className="text-center" placeholder="Search by Cooperative..." onChange={(e) => {
              this.setState({searchCoop : e.target.value})}}/></th>
            <th><Input type="text" className="text-center" placeholder="Search by Sector..." onChange={(e) => {
              this.setState({searchSector : e.target.value})}}/></th>
            <th><Input type="text" className="text-center" placeholder="Search by Region..." onChange={(e) => {
              this.setState({searchRegion : e.target.value})}}/></th>
          </tr>
          </thead>
          {this.showCoops()}
        </Table>
      </div>
    )
  }

  render() {
    return (
      <div className="mx-4">
        <Row>
          <Col xs="4">
            <Card>
              <CardHeader onClick={() => this.toggleAccordion12()} className="text-white bg-warning hoverPointer border-warning">
                <Row>
                  <Col><h2 >Cooperative</h2></Col>
                  <Col><h1 className="mx-2 text-right"><i className=" icon-people"/></h1></Col>
                </Row>
                <h1 className="mt-n3 mb-3" ><strong>{this.state.Cooperatives.length}</strong></h1>
                <div className="mt-n5 mb-n2 mx-n3" style={{ height: '100px' }}>
                  <Line data={cardChartData3} options={cardChartOpts3} />
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.acc12}>
                <ButtonGroup className="m-0 app-body">
                  <Button onClick={() => this.toggleSubAccordion12(0)}
                          className="btn-square" color={this.state.colors1[0]}>Per Sector</Button>
                  <Button onClick={() => this.toggleSubAccordion12(1)}
                          className="btn-square" color={this.state.colors1[1]}>Per Region</Button>
                </ButtonGroup>
                <Row>
                  <Col Style={this.state.displayStyle12[0]}>
                    <Collapse isOpen={this.state.accordion12[0]}>
                      <CardBody>
                        {this.CoopPerSector()}
                      </CardBody>
                    </Collapse>
                  </Col>

                  <Col Style={this.state.displayStyle12[1]}>
                    <Collapse isOpen={this.state.accordion12[1]}>
                      <CardBody>
                        {this.CoopPerRegion()}
                      </CardBody>
                    </Collapse>
                  </Col>
                </Row>
              </Collapse>
            </Card>
          </Col>

          <Col xs="4">
            <Card>
              <CardHeader onClick={() => this.toggleAccordion12()} className="text-white bg-danger hoverPointer border-danger">
                <Row>
                  <Col><h2>Profit</h2></Col>
                  <Col><h1 className="mx-2 text-right"><i className="icon-graph"/></h1></Col>
                </Row>
                <h1 className="mt-n3 mb-3" ><strong>{this.SumProfit()}</strong></h1>
                <div className="mt-n5 mb-n3 mx-n3" style={{ height: '108px' }}>
                  <Line data={cardChartData3} options={cardChartOpts1} />
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.acc12}>
                <ButtonGroup className="m-0 app-body">
                  <Button onClick={() => this.toggleSubAccordion12(0)}
                          className="btn-square" color={this.state.colors2[0]}>Per Sector</Button>
                  <Button onClick={() => this.toggleSubAccordion12(1)}
                          className="btn-square" color={this.state.colors2[1]}>Per Region</Button>
                </ButtonGroup>
                <Row>
                  <Col Style={this.state.displayStyle12[0]}>
                    <Collapse isOpen={this.state.accordion12[0]}>
                      <CardBody>
                        {this.ProfitPerSector()}
                      </CardBody>
                    </Collapse>
                  </Col>

                  <Col Style={this.state.displayStyle12[1]}>
                    <Collapse isOpen={this.state.accordion12[1]}>
                      <CardBody>
                        {this.ProfitPerRegion()}
                      </CardBody>
                    </Collapse>
                  </Col>
                </Row>
              </Collapse>
            </Card>
          </Col>
          
          <Col  xs="4">
            <Card>
              <CardHeader onClick={() => this.toggleAccordion3()} className="text-white bg-primary hoverPointer border-primary">
                <Row>
                  <Col><h2>Adherent</h2></Col>
                  <Col><h1 className="mx-2 text-right"><i className="icon-user"/></h1></Col>
                </Row>
                <h1 className="mt-n3 mb-3"><strong>{this.state.Members.length}</strong></h1>
                <div className="mt-n5 mb-n2 mx-n3" style={{ height: '100px' }}>
                  <Bar data={cardChartData3} options={cardChartOpts4} />
                </div>
              </CardHeader>

              <Collapse isOpen={this.state.acc3}>
                <ButtonGroup className="m-0 app-body">
                  <Button onClick={() => this.toggleSubAccordion3(0)}
                          className="btn-square" color={this.state.colors3[0]}>Per Sector</Button>
                  <Button onClick={() => this.toggleSubAccordion3(1)}
                          className="btn-square" color={this.state.colors3[1]}>Per Region</Button>
                  <Button onClick={() => this.toggleSubAccordion3(2)}
                          className="btn-square" color={this.state.colors3[2]}>Per Sex</Button>
                </ButtonGroup>
                <Row>
                  <Col Style={this.state.displayStyle3[0]}>
                    <Collapse isOpen={this.state.accordion3[0]}>
                      <CardBody>
                        {this.AdherentPerSector()}
                      </CardBody>
                    </Collapse>
                  </Col>

                  <Col Style={this.state.displayStyle3[1]}>
                    <Collapse isOpen={this.state.accordion3[1]}>
                      <CardBody>
                        {this.AdherentPerRegion()}
                      </CardBody>
                    </Collapse>
                  </Col>

                  <Col Style={this.state.displayStyle3[2]}>
                    <Collapse isOpen={this.state.accordion3[2]}>
                      <CardBody>
                        {this.AdherentPerSex()}
                      </CardBody>
                    </Collapse>
                  </Col>
                </Row>
              </Collapse>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="3">
            <Card>
              <CardHeader onClick={() => this.toggleAccordion4()} className="text-white bg-gray-700 hoverPointer border-dark">
                <Row>
                  <Col><h4 className="ml-n2">Communication</h4></Col>
                  <Col><h3 className="mr-n3 text-right"><i className=" icon-people"/></h3></Col>
                </Row>
                <h3 className="mb-3" ><strong>{this.state.Communications.length}</strong></h3>
                <div className="mt-n5 mb-n2 mx-n3" style={{ height: '50px' }}>
                  <Line data={cardChartData3} options={cardChartOpts3} />
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.acc4}>
                <ButtonGroup className="m-0 app-body">
                  <Button onClick={() => this.toggleSubAccordion4(0)}
                          className="btn-square" color={this.state.colors4[0]}>Per cooperatives</Button>
                  <Button onClick={() => this.toggleSubAccordion4(1)}
                          className="btn-square" color={this.state.colors4[1]}>Per Channel </Button>
                </ButtonGroup>
                <Row>
                  <Col Style={this.state.displayStyle4[0]}>
                    <Collapse isOpen={this.state.accordion4[0]}>
                      <CardBody>
                        {this.Communication()}
                      </CardBody>
                    </Collapse>
                  </Col>
                  <Col Style={this.state.displayStyle4[1]}>
                    <Collapse isOpen={this.state.accordion4[1]}>
                      <CardBody>
                        {this.Channel()}
                      </CardBody>
                    </Collapse>
                  </Col>
                </Row>
              </Collapse>
            </Card>
          </Col>

          <Col xs="3">
            <Card>
              <CardHeader onClick={() => this.toggleAccordion567()} className="text-white bg-gray-700 hoverPointer border-dark">
                <Row>
                  <Col><h4 >Sells</h4></Col>
                  <Col><h3 className="mx-2 text-right"><i className=" icon-people"/></h3></Col>
                </Row>
                <h3 className="mb-3" ><strong>{this.SumSales()}</strong></h3>
                <div className="mt-n5 mb-n2 mx-n3" style={{ height: '50px' }}>
                  <Line data={cardChartData3} options={cardChartOpts3} />
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.acc567}>
                <ButtonGroup className="m-0 app-body">
                  <Button className="btn-square" color="dark">Per cooperatives</Button>
                </ButtonGroup>
                <Row>
                  <Col>
                    <Collapse isOpen={true}>
                      <CardBody>
                        {this.Sales()}
                      </CardBody>
                    </Collapse>
                  </Col>
                </Row>
              </Collapse>
            </Card>
          </Col>

          <Col xs="3">
          <Card>
            <CardHeader onClick={() => this.toggleAccordion567()} className="text-white bg-gray-700 hoverPointer border-dark">
              <Row>
                <Col><h4 >Trainings</h4></Col>
                <Col><h3 className="mx-2 text-right"><i className=" icon-people"/></h3></Col>
              </Row>
              <h3 className="mb-3" ><strong>{this.state.Formations.length}</strong></h3>
              <div className="mt-n5 mb-n2 mx-n3" style={{ height: '50px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} />
              </div>
            </CardHeader>
            <Collapse isOpen={this.state.acc567}>
              <ButtonGroup className="m-0 app-body">
                <Button className="btn-square" color="dark">Per cooperatives</Button>
              </ButtonGroup>
              <Row>
                <Col>
                  <Collapse isOpen={true}>
                    <CardBody>
                      {this.Training()}
                    </CardBody>
                  </Collapse>
                </Col>
              </Row>
            </Collapse>
          </Card>
        </Col>

          <Col xs="3">
          <Card>
            <CardHeader onClick={() => this.toggleAccordion567()} className="text-white bg-gray-700 hoverPointer border-dark">
              <Row>
                <Col><h4 >Events</h4></Col>
                <Col><h3 className="mx-2 text-right"><i className=" icon-people"/></h3></Col>
              </Row>
              <h3 className="mb-3" ><strong>{this.state.Events.length}</strong></h3>
              <div className="mt-n5 mb-n2 mx-n3" style={{ height: '50px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} />
              </div>
            </CardHeader>
            <Collapse isOpen={this.state.acc567}>
              <ButtonGroup className="m-0 app-body">
                <Button className="btn-square" color="dark">Per cooperatives</Button>
              </ButtonGroup>
              <Row>
                <Col>
                  <Collapse isOpen={true}>
                    <CardBody>
                      {this.Event()}
                    </CardBody>
                  </Collapse>
                </Col>
                </Row>
            </Collapse>
          </Card>
        </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader className="bg-dark">
                <h1 className="display-4">Cooperatives List</h1>
              </CardHeader>
              {this.CoopsTable()}
          </Card>
          </Col>
        </Row>
        <hr/>
      </div>
    );
  }
}

export default Dashboard;
