import React, {Component} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Collapse,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    TabContent,
    TabPane
} from 'reactstrap';
import axios from "axios";

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

            newTraining:[],
            CityOfFormation:[],
            newProduct:[],
            newEvent:[],
            EventCity:[],
            newComm:[],
            CommCanals:[],
            newAssembly:[],

            activeTab: new Array(1).fill('1'),
            activeIndex:1,
            accordion: [
                [false],
                [false],
                [false],
                [false],
                [false]],
            numbers:new Array(5).fill(0),

            Cities:[],
            CommChannel:[]
        };
    }

    componentWillMount() {
        axios.get(this.state.API_LINK+'city/all')
            .then((response) => {
                this.setState({
                    Cities: response.data,
                })
            });
        axios.get(this.state.API_LINK+'commChannel/all')
            .then((response) => {
                this.setState({
                    CommChannel: response.data,
                })
            });
    }
    componentDidMount() {
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
        if(this.state.activeIndex>-i && this.state.activeIndex<8-i) {
            const newArray = this.state.activeTab.slice();
            const index=this.state.activeIndex+i;
            newArray[0] = index.toString();
            this.setState({
                activeIndex: index,
                activeTab: newArray,
            })
        }
    }

    toggleAccordion(tab,index) {
        const prevState = this.state.accordion;

        for(let i=0;i<prevState[0].length;i++) {
            prevState[tab][i]=false;
        }
        prevState[tab][index]=true;

        this.setState({
            accordion: prevState,
        });
    }

    handleCityOfTrainingChange = (event, n) => {
        let temp=this.state.CityOfFormation;
        temp[n]=parseInt(event.target.value) + 1;
        this.setState({
            CityOfFormation:temp
        });
    };
    handleEventCityChange = (event, n) => {
        let temp=this.state.EventCity;
        temp[n]=parseInt(event.target.value) + 1;
        this.setState({
            EventCity:temp
        });
    };
    handleChannelChange = (event, n) => {
        let temp=this.state.CommCanals;
        temp[n]=parseInt(event.target.value) + 1;
        this.setState({
            CommCanals:temp
        });
    };

    newFormation(n) {
        return(
            <Card className="mb-0">
                <CardHeader id="headingOne">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0,n)}>
                        <h5 className="m-0 p-0">Training {(n+1).toString()}</h5>
                    </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[0][n]}>
                    <CardBody>
                        <Form>
                            <Row className="mb-3">
                                <Col xs="8">
                                    <h6 className="font-lg">Training subject</h6>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="icon-user"/></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="Please enter the subject of the training..." onChange={(e) => {
                                            let temp=this.state.newTraining;
                                            temp[n].subject=e.target.value;
                                            this.setState({
                                                newTraining:temp
                                            });
                                        }}/>
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <h6 className="font-lg">City</h6>
                                    <Input type="select" onChange={e=>this.handleCityOfTrainingChange(e,n)}>
                                        {this.state.Cities.map((City, index)=>
                                        {return <option key={index} value={index}>{City.cityName}</option>})}
                                    </Input>
                                </Col>
                            </Row>
                            <hr/>
                            <Row className="mb-3">
                                <Col>
                                    <h6 className="font-lg">Start Date</h6>
                                    <Input type="date" placeholder="date" onChange={(e) => {
                                        let temp=this.state.newTraining;
                                        temp[n].startDate=e.target.value;
                                        this.setState({
                                            newTraining:temp
                                        });
                                    }}/>
                                </Col>
                                <Col>
                                    <h6 className="font-lg">End Date</h6>
                                    <Input type="date" placeholder="date" onChange={(e) => {
                                        let temp=this.state.newTraining;
                                        temp[n].endDate=e.target.value;
                                        this.setState({
                                            newTraining:temp
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
    createFormations(n) {
        let newCreate=this.state.newTraining;
        let formation=[];
        let newAccordion=[];
        for(let i=0;i<n;i++)
        {
            if(newCreate.length<n)
            {
                newCreate.push({
                    idCooperative:this.state.idCooperative,
                    year:this.state.year,
                    idCity:'',
                    subject:'',
                    startDate:'',
                    endDate:'',
                });
                this.state.CityOfFormation.push(1);
            }
            formation.push(this.newFormation(i));
            newAccordion.push(false);
        }
        newAccordion[0]=true;

        let temp=this.state.accordion;
        temp[0]=newAccordion;
        this.setState({
            accordion:temp,
            newTraining:newCreate
        });
        return formation;
    }

    newProduction(n) {
        return(
            <Card className="mb-0">
                <CardHeader id="headingOne">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1,n)}>
                        <h5 className="m-0 p-0">Product/Service {(n+1).toString()}</h5>
                    </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[1][n]}>
                    <CardBody>
                        <Form>
                            <Row className="mb-3">
                                <Col xs="6">
                                    <h6 className="font-lg">Product/Service name</h6>
                                    <Input type="text" placeholder="Please enter the name of the Product/Service..." onChange={(e) => {
                                        let temp=this.state.newProduct;
                                        temp[n].productName=e.target.value;
                                        this.setState({
                                            newProduct:temp
                                        });
                                    }}/>
                                </Col>
                                <Col xs="6">
                                    <h6 className="font-lg">Quantity Sold/Served</h6>
                                    <Input type="text" placeholder="Please enter the Quantity Sold/Served..." onChange={(e) => {
                                        let temp=this.state.newProduct;
                                        temp[n].productQuantity=e.target.value;
                                        this.setState({
                                            newProduct:temp
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
    createProduction(n) {
        let newCreate=this.state.newProduct;
        let production=[];
        let newAccordion=[];
        for(let i=0;i<n;i++)
        {
            if(newCreate.length<n)
            {
                newCreate.push({
                    idCooperative:this.state.idCooperative,
                    year:this.state.year,
                    productName:'',
                    productQuantity:'',
                })
            }
            production.push(this.newProduction(i));
            newAccordion.push(false);
        }
        newAccordion[0]=true;

        let temp=this.state.accordion;
        temp[1]=newAccordion;
        this.setState({
            accordion:temp,
            newProduct:newCreate
        });
        return production;
    }

    newEvent(n){
        return(
            <Card className="mb-0">
                <CardHeader id="headingOne">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(2,n)}>
                        <h5 className="m-0 p-0">Event {(n+1).toString()}</h5>
                    </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[2][n]}>
                    <CardBody>
                        <Form>
                            <Row className="mb-3">
                                <Col xs="8">
                                    <h6 className="font-lg">Event Subject</h6>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="icon-user"/></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="Please enter the subject of the event..." onChange={(e) => {
                                            let temp=this.state.newEvent;
                                            temp[n].subject=e.target.value;
                                            this.setState({
                                                newEvent:temp
                                            });
                                        }}/>
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <h6 className="font-lg">City</h6>
                                    <Input type="select" onChange={e=>this.handleEventCityChange(e,n)}>
                                        {this.state.Cities.map((city, index)=>
                                        {return <option key={index} value={index}>{city.cityName}</option>})}
                                    </Input>
                                </Col>
                            </Row>
                            <hr/>
                            <Row className="mb-3">
                                <Col>
                                    <h6 className="font-lg">Start Date</h6>
                                    <Input type="date" placeholder="date" onChange={(e) => {
                                        let temp=this.state.newEvent;
                                        temp[n].startDate=e.target.value;
                                        this.setState({
                                            newEvent:temp
                                        });
                                    }}/>
                                </Col>
                                <Col>
                                    <h6 className="font-lg">End Date</h6>
                                    <Input type="date" placeholder="date" onChange={(e) => {
                                        let temp=this.state.newEvent;
                                        temp[n].endDate=e.target.value;
                                        this.setState({
                                            newEvent:temp
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
    createEvent(n){
        let newCreate=this.state.newEvent;
        let event=[];
        let newAccordion=[];
        for(let i=0;i<n;i++)
        {
            if(newCreate.length<n)
            {
                newCreate.push({
                    idCooperative:this.state.idCooperative,
                    year:this.state.year,
                    idCity:'',
                    subject:'',
                    startDate:'',
                    endDate:'',
                });
                this.state.EventCity.push(1);
            }
            event.push(this.newEvent(i));
            newAccordion.push(false);
        }
        newAccordion[0]=true;

        let temp=this.state.accordion;
        temp[2]=newAccordion;
        this.setState({
            accordion:temp,
            newEvent:newCreate
        });
        return event;
    }

    newCommunication(n){
        return(
            <Card className="mb-0">
                <CardHeader id="headingOne">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(3,n)}>
                        <h5 className="m-0 p-0">Communication channel {(n+1).toString()}</h5>
                    </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[3][n]}>
                    <CardBody>
                        <Form>
                            <Row>
                                <Col xs="6">
                                    <h6 className="font-lg">Number of annual uses</h6>
                                    <Input type="text" placeholder="How many times you have used this channel..." onChange={(e) => {
                                        let temp=this.state.newComm;
                                        temp[n].usage=e.target.value;
                                        this.setState({
                                            newComm:temp
                                        });
                                    }}/>
                                </Col>
                                <Col sx="6">
                                    <h6 className="font-lg">Communication channel</h6>
                                    <Input type="select" onChange={e=>this.handleChannelChange(e,n)}>
                                        {this.state.CommChannel.map((canal, index)=>
                                        {return <option key={index} value={index}>{canal.commChannelName}</option>})}
                                    </Input>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Collapse>
            </Card>
        )
    }
    createCommunication(n) {
        let newCreate=this.state.newComm;
        let communication=[];
        let newAccordion=[];
        for(let i=0;i<n;i++)
        {
            if(newCreate.length<n)
            {
                newCreate.push({
                    idCooperative:this.state.idCooperative,
                    year:this.state.year,
                    idCommChannel:'',
                    usage:'',
                });
                this.state.CommCanals.push(1);
            }
            communication.push(this.newCommunication(i));
            newAccordion.push(false);
        }
        newAccordion[0]=true;

        let temp=this.state.accordion;
        temp[3]=newAccordion;
        this.setState({
            accordion:temp,
            newComm:newCreate
        });
        return communication;
    }

    newAssemble(n){
        return(
            <Card className="mb-0">
                <CardHeader id="headingOne">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(4,n)}>
                        <h5 className="m-0 p-0">Assembly {(n+1).toString()}</h5>
                    </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[4][n]}>
                    <CardBody>
                        <Form>
                            <Row className="mb-3">
                                <Col xs="8">
                                    <h6 className="font-lg">Reason for assembly</h6>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="icon-user"/></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="Please enter the reason for the assembly..." onChange={(e) => {
                                            let temp=this.state.newAssembly;
                                            temp[n].assemblyReason=e.target.value;
                                            this.setState({
                                                newAssembly:temp
                                            });
                                        }}/>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <hr/>
                            <Row className="mb-3">
                                <Col>
                                    <h6 className="font-lg">Start Date</h6>
                                    <Input type="date" placeholder="date" onChange={(e) => {
                                        let temp=this.state.newAssembly;
                                        temp[n].startDate=e.target.value;
                                        this.setState({
                                            newAssembly:temp
                                        });
                                    }}/>
                                </Col>
                                <Col>
                                    <h6 className="font-lg">End Date</h6>
                                    <Input type="date" placeholder="date" onChange={(e) => {
                                        let temp=this.state.newAssembly;
                                        temp[n].endDate=e.target.value;
                                        this.setState({
                                            newAssembly:temp
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
    createAssemble(n){
        let newCreate=this.state.newAssembly;
        let assemble=[];
        let newAccordion=[];
        for(let i=0;i<n;i++)
        {
            if(newCreate.length<n)
            {
                newCreate.push({
                    idCooperative:this.state.idCooperative,
                    year:this.state.year,
                    assemblyReason:'',
                    startDate:'',
                    endDate:'',
                })
            }
            assemble.push(this.newAssemble(i));
            newAccordion.push(false);
        }
        newAccordion[0]=true;

        let temp=this.state.accordion;
        temp[4]=newAccordion;
        this.setState({
            accordion:temp,
            newAssembly:newCreate
        });
        return assemble;
    }

    submitAll(){
        let newTraining=this.state.newTraining;
        let newProduct=this.state.newProduct;
        let newEvent=this.state.newEvent;
        let newComm=this.state.newComm;
        let newAssembly=this.state.newAssembly;

        let indexFormation=0;
        newTraining.forEach(element=>{
            element.idCity=this.state.CityOfFormation[indexFormation];
            indexFormation++;
            axios.post(this.state.API_LINK+'training/create/',element).then(()=>{})});

        newProduct.forEach(element=>{axios.post(this.state.API_LINK+'product/create/',element).then(()=>{})});

        let indexEvent=0;
        newEvent.forEach(element=>{
            element.idCity=this.state.EventCity[indexEvent];
            indexEvent++;
            axios.post(this.state.API_LINK+'event/create/',element).then(()=>{})});

        let indexComm=0;
        newComm.forEach(element=>{
            element.idCommChannel=this.state.CommCanals[indexComm];
            indexComm++;
            axios.post(this.state.API_LINK+'communication/create/',element).then(()=>{})});

        newAssembly.forEach(element=>{axios.post(this.state.API_LINK+'assembly/create/',element).then(()=>{})});

        const report={
            year:this.state.year,
            idUser:JSON.parse(localStorage.getItem("user")).id,
            type:'act'
        };
        console.log(report);
        axios.post(this.state.API_LINK+'report/create/',report).then(()=>{})

    }

    tabPane() {
        return (
            <>
                <TabPane tabId="1">
                    <Form >
                        <h1>Activity Report</h1>
                        <hr/>
                        <Row className="text-center">
                            <Col xs="3"/>
                            <Col>
                                <h6 className="font-lg">Number of trainings</h6>
                                <Input className="text-center" type="text" placeholder="0" onChange={(e)=>{
                                    let newNumbers=this.state.numbers;
                                    newNumbers[0]=e.target.value;
                                    this.setState({numbers:newNumbers,})}}/>
                                <hr/>
                                <h6 className="font-lg">Number of product or service</h6>
                                <Input className="text-center" type="text" placeholder="0" onChange={(e)=>{
                                    let newNumbers=this.state.numbers;
                                    newNumbers[1]=e.target.value;
                                    this.setState({numbers:newNumbers,})}}/>
                                <hr/>
                                <h6 className="font-lg">Number of events</h6>
                                <Input className="text-center" type="text" placeholder="0" onChange={(e)=>{
                                    let newNumbers=this.state.numbers;
                                    newNumbers[2]=e.target.value;
                                    this.setState({numbers:newNumbers,})}}/>
                                <hr/>
                                <h6 className="font-lg">Number of communication channel</h6>
                                <Input className="text-center" type="text" placeholder="0" onChange={(e)=>{
                                    let newNumbers=this.state.numbers;
                                    newNumbers[3]=e.target.value;
                                    this.setState({numbers:newNumbers,})}}/>
                                <hr/>
                                <h6 className="font-lg">Number of assembly</h6>
                                <Input className="text-center" type="text" placeholder="0" onChange={(e)=>{
                                    let newNumbers=this.state.numbers;
                                    newNumbers[4]=e.target.value;
                                    this.setState({numbers:newNumbers,})}}/>
                            </Col>
                            <Col xs="3"/>
                        </Row>
                    </Form>
                </TabPane>

                <TabPane tabId="2">
                    <Form>
                        <h1>Activity Report</h1>
                        <hr/>
                        <CardBody>
                            <div>
                                {this.createFormations(this.state.numbers[0])}
                            </div>
                        </CardBody>
                    </Form>
                </TabPane>

                <TabPane tabId="3">
                    <Form>
                        <h1>Activity Report</h1>
                        <hr/>
                        <CardBody>
                            <div>
                                {this.createProduction(this.state.numbers[1])}
                            </div>
                        </CardBody>
                    </Form>
                </TabPane>

                <TabPane tabId="4">
                    <Form>
                        <h1>Activity Report</h1>
                        <hr/>
                        <CardBody>
                            <div>
                                {this.createEvent(this.state.numbers[2])}
                            </div>
                        </CardBody>
                    </Form>
                </TabPane>

                <TabPane tabId="5">
                    <Form>
                        <h1>Activity Report</h1>
                        <hr/>
                        <CardBody>
                            <div>
                                {this.createCommunication(this.state.numbers[3])}
                            </div>
                        </CardBody>
                    </Form>
                </TabPane>

                <TabPane tabId="6">
                    <Form>
                        <h1>Activity Report</h1>
                        <hr/>
                        <CardBody>
                            <div>
                                {this.createAssemble(this.state.numbers[4])}
                            </div>
                        </CardBody>
                    </Form>
                </TabPane>

                <TabPane tabId="7">
                    <h1>Activity Report</h1>
                    <hr/>
                    <CardBody>
                        <div className="text-center">
                            <h3>Thank you for completing your activity report for this year, can you please confirm the data you entered?</h3>
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
                                <Button className="px-4 btn btn-primary">{this.state.activeIndex}/7</Button>
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
