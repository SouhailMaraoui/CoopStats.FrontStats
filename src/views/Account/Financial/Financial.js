import React, { Component } from 'react';
import axios from 'axios';
import {Button, Card, CardBody, Col, Container, Form, Input, TabPane,CardHeader,Collapse, TabContent, Row } from 'reactstrap';

class Activity extends Component {
    constructor(props) {
        super(props);

        this.tabPane=this.tabPane.bind(this);
        this.switchTab = this.switchTab.bind(this);
        this.toggleAccordion = this.toggleAccordion.bind(this);

        this.state = {

            API_LINK:'https://coopstats-106e3.uc.r.appspot.com/',

            idCooperative:0,
            year:0,

            activeTab: new Array(1).fill('1'),
            activeIndex:1,
            accordion: [
                [false],
                [false]
            ],

            newGains:[],
            newLosses:[],

            numbers:new Array(2).fill(0),
        };
    }

    componentDidMount(){
        let user=JSON.parse(localStorage.getItem("user"));
        if(user===null){
            this.props.history.push("/login");
        }
        else if(user.role==="admin"){
            this.props.history.push("/dashboard");
        }
        else{
            if(new URLSearchParams(this.props.location.search).get("year")===null)
            {
                this.props.history.push("/account");
            }
            axios.get(this.state.API_LINK+"user/"+user.id+"/cooperative")
                .then((response)=>{
                    this.setState({
                        idCooperative: response.data,
                        year:new URLSearchParams(this.props.location.search).get("year"),
                    })
                })
        }
    }

    switchTab(i) {
        if(this.state.activeIndex>-i && this.state.activeIndex<5-i) {
            const newArray = this.state.activeTab.slice();
            const index = this.state.activeIndex + i;
            newArray[0] = index.toString();
            this.setState({
                activeIndex: index,
                activeTab: newArray,
            });
            console.log(this.state.numbers);
        }
    }

    toggleAccordion(tab,index) {
        const prevState = this.state.accordion;

        for(let i=0;i<prevState[0].length;i++) {
            prevState[tab][i]=false;
        }
        console.log(prevState);
        prevState[tab][index]=true;

        this.setState({
            accordion: prevState,
        });
    }

    newLoss(n) {
        return(
            <Card className="mb-0">
                <CardHeader id="headingOne">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1,n)}>
                        <h5 className="m-0 p-0">Loss {(n+1).toString()}</h5>
                    </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[1][n]}>
                    <CardBody>
                        <Form>
                            <Row className="mb-3">
                                <Col xs="8">
                                    <h6 className="font-lg">Reason for loss</h6>
                                    <Input type="text" placeholder="Please enter the reason for the loss..." onChange={(e) => {
                                        let temp=this.state.newLosses;
                                        temp[n].reason=e.target.value;
                                        this.setState({
                                            newLosses:temp
                                        });
                                    }}/>
                                </Col>
                                <Col xs="4">
                                    <h6 className="font-lg">Amount lost (<i>DH</i>)</h6>
                                    <Input type="text" placeholder="Please enter the lost amount..." onChange={(e) => {
                                        let temp=this.state.newLosses;
                                        temp[n].amount=e.target.value;
                                        this.setState({
                                            newLosses:temp
                                        });
                                    }}/>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Collapse>
            </Card>
        )
    }
    createLosses(n) {
        let newLosses=this.state.newLosses;
        let losses=[];
        let newAccordion=[];
        for(let i=0;i<n;i++)
        {
            if(newLosses.length<n)
            {
                newLosses.push({
                    idCooperative:this.state.idCooperative,
                    year:this.state.year,
                    reason:'',
                    amount:'',
                })
            }

            losses.push(this.newLoss(i));
            newAccordion.push(false);
        }
        newAccordion[0]=true;
        // eslint-disable-next-line react/no-direct-mutation-state
        let temp=this.state.accordion;
        temp[1]=newAccordion;
        this.setState({
            accordion:temp,
            newLosses:newLosses
        });
        return losses;
    }

    newGain(n) {
        return(
            <Card className="mb-0">
                <CardHeader id="headingOne">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0,n)}>
                        <h5 className="m-0 p-0">Gain {(n+1).toString()}</h5>
                    </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[0][n]}>
                    <CardBody>
                        <Form>
                            <Row className="mb-3">
                                <Col xs="8">
                                    <h6 className="font-lg">Source of gain</h6>
                                    <Input type="text" placeholder="Please enter the source of gain..." onChange={(e) => {
                                        let temp=this.state.newGains;
                                        temp[n].source=e.target.value;
                                        this.setState({
                                            newGains:temp
                                        });
                                    }}/>
                                </Col>
                                <Col xs="4">
                                    <h6 className="font-lg">Amount gained(<i>DH</i>)</h6>
                                    <Input type="text" placeholder="Please enter the amount gained..." onChange={(e) => {
                                        let temp = this.state.newGains;
                                        temp[n].amount = e.target.value;
                                        this.setState({
                                            newGains: temp
                                        });
                                    }}/>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Collapse>
            </Card>
        )
    }
    createGains(n) {
        let newGains=this.state.newGains;
        let gains=[];
        let newAccordion=[];
        for(let i=0;i<n;i++)
        {
            if(newGains.length<n)
            {
                newGains.push({
                    idCooperative:this.state.idCooperative,
                    year:this.state.year,
                    source:'',
                    amount:'',
                })
            }
            gains.push(this.newGain(i));
            newAccordion.push(false);
        }
        newAccordion[0]=true;

        let temp=this.state.accordion;
        temp[0]=newAccordion;
        this.setState({
            accordion:temp,
            newGains:newGains
        });
        return gains;
    }

    submitAll() {
        let newGains=this.state.newGains;
        let newLosses=this.state.newLosses;
        newGains.forEach(element=>{axios.post(this.state.API_LINK+'gain/create/',element).then((response)=>{})});
        newLosses.forEach(element=>{axios.post(this.state.API_LINK+'loss/create/',element).then((response)=>{})});
        const rapport={
            year:this.state.year,
            idUser:JSON.parse(localStorage.getItem("user")).id,
            type:'fin',
        };
        axios.post(this.state.API_LINK+'report/create/',rapport).then((response)=>{})

    }

    tabPane() {
        return (
            <>
                <TabPane tabId="1">
                    <Form >
                        <h1>Rapport financier</h1>
                        <hr/>
                        <Row className="text-center">
                            <Col xs="3"/>
                            <Col>
                                <h6 className="font-lg">Number of revenue sources</h6>
                                <Input className="text-center" type="text" placeholder="0" onChange={(e)=>{
                                    let newNumbers=this.state.numbers;
                                    newNumbers[0]=e.target.value;
                                    this.setState({numbers:newNumbers,})}}/>
                                <hr/>
                                <h6 className="font-lg">Number of losses reasons</h6>
                                <Input className="text-center" type="text" placeholder="0" onChange={(e)=>{
                                    let newNumbers=this.state.numbers;
                                    newNumbers[1]=e.target.value;
                                    this.setState({numbers:newNumbers,})}}/>
                            </Col>
                            <Col xs="3"/>
                        </Row>
                    </Form>
                </TabPane>

                <TabPane tabId="2">
                    <Form>
                        <h1>Financial report</h1>
                        <hr/>
                        <CardBody>
                            <div>
                                {this.createGains(this.state.numbers[0])}
                            </div>
                        </CardBody>
                    </Form>
                </TabPane>

                <TabPane tabId="3">
                    <Form>
                        <h1>Financial report</h1>
                        <hr/>
                        <CardBody>
                            <div>
                                {this.createLosses(this.state.numbers[1])}
                            </div>
                        </CardBody>
                    </Form>
                </TabPane>

                <TabPane tabId="4">
                    <h1>Financial report</h1>
                    <hr/>
                    <CardBody>
                        <div className="text-center">
                            <h3>Thank you for completing your financial report for this year, can you please confirm the data you entered?</h3>
                            <br/>
                            <Button color="white" href="#/account" className="px-4 mx-5 btn btn-outline-danger">Cancel</Button>
                            <Button color="white" href="#/account" onClick={() => { this.submitAll(); }} className="px-3 mx-5 btn btn-outline-success">Confirm</Button>
                        </div>
                    </CardBody>
                </TabPane>
            </>
        );
    }

    render() {
        return (
            <div className="flex-row align-items-center">
                <Container>

                    <Row className="mt-n2 mb-2 justify-content-center">
                        <Col>
                            <div className="text-center">
                                <Button className="px-4 btn btn-primary" onClick={() => { this.switchTab(-1); }}>Prev</Button>
                                <Button className="px-4 btn btn-primary">{this.state.activeIndex}/4</Button>
                                <Button className="px-4 btn btn-primary" onClick={() => { this.switchTab(+1); }}>Next</Button>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col>
                            <Card className="mx-5" >
                                <TabContent activeTab={this.state.activeTab[0]}>
                                    {this.tabPane()}
                                </TabContent>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Activity;
