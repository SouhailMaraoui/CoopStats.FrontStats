import React, {Component} from 'react';
import axios from 'axios';
import {sha256} from 'js-sha256';
import {
  Button,
  ButtonGroup,
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

class Register extends Component {
  constructor(props) {
    super(props);

    this.tabPane=this.tabPane.bind(this);
    this.newMember=this.newMember.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);

    this.state = {

      API_LINK:'https://coopstats-106e3.uc.r.appspot.com/',

      activeTab: new Array(1).fill('1'),
      activeIndex:1,
      membersNumber:1,
      accordion: [],

      colors:[["info","light","light","light","light"]],

      Sectors:[],
      selectedSector:0,
      Regions:[],
      selectedRegion:0,
      Cities:[],
      selectedCity:0,

      Profiles:[],

      newAddress:{
        idCity: '',
        postalCode:'',
        addressString:''
      },

      newAdmin: {
        fullName: '',
        idCooperative: '',
        idProfile: 1,
        sex: 'Male',
        cin: '',
        email:'',
        telephone:''
      },

      newUser:{
        email:'',
        password: '',
        role:'user'
      },

      newCooperative:{
        cooperativeName: '',
        idSector:'',
        idAddress:'',
        idRegion:''
      },

      newMembers:[],
    };
    axios.get(this.state.API_LINK+'sector/all')
        .then((response) =>{
          this.setState({
            Sectors: response.data,
          })
        });
    axios.get(this.state.API_LINK+'region/all')
        .then((response) =>{
          this.setState({
            Regions: response.data,
            selectedRegionId : response.data[0].id
          });

          axios.get(this.state.API_LINK+'region/'+response.data[0].id+'/cities')
              .then((response) =>{
                this.setState({
                  Cities: response.data,
                })
              });
        });

    axios.get(this.state.API_LINK+'profile/all')
        .then((response) =>{
          this.setState({
            Profiles: response.data,
          })
        });

  }

  componentDidMount() {
    let user=JSON.parse(localStorage.getItem("user"));
    if(user===null){}
    else if(user.role==="admin"){
      this.props.history.push("/dashboard");
    }
    else if(user.role==="user"){
      this.props.history.push("/account");
    }
  }

  handleSectorChange = (event) => {
    let newCooperative=this.state.newCooperative;
    if(event!==undefined) {
      newCooperative.idSector = this.state.Sectors[event.target.value].id;
      this.setState({
        selectedSector: event.target.value,
        newCooperative: newCooperative
      });
    }
  };
  handleRegionChange = (event) => {
    let newCooperative=this.state.newCooperative;
    this.setState({selectedRegion: event.target.value });
    const regionId=parseInt(event.target.value)+1;
    newCooperative.idRegion=regionId;

    axios.get(this.state.API_LINK+'region/'+regionId+'/cities')
      .then((response) =>{
        this.setState({
          Cities: response.data,
        })
      });
  };
  handleCityChange = (event) => {
    let newAddress=this.state.newAddress;
    if(event!==undefined)
    {
      newAddress.idCity=this.state.Cities[event.target.value].id;
      this.setState({
        selectedCity: event.target.value,
        newAddress: newAddress
      });
    }
  };

  setAdminProfileId(id){
    let colors=this.state.colors;
    colors[0]=["light","light","light","light","light"];
    colors[0][id]='info';
    let newAdmin=this.state.newAdmin;
    newAdmin.idProfile=this.state.Profiles[id].id;

    this.setState({newAdmin:newAdmin,colors:colors})
  }
  setMemberProfileId(idMember,idProfile) {
    let colors=this.state.colors;
    colors[parseInt(idMember)+1]=["light","light","light","light","light"];
    colors[parseInt(idMember)+1][idProfile]="info";
    let newMember=this.state.newMembers[idMember];
    newMember.idProfile=this.state.Profiles[idProfile].id;

    let temp=this.state.newMembers;
    temp[idMember]=newMember;

    this.setState({newMembers:temp,colors:colors})
  }

  switchTab(i) {
    if(this.state.activeIndex>-i && this.state.activeIndex<5-i)
    {
      const newArray = this.state.activeTab.slice();
      const index=this.state.activeIndex+i;
      newArray[0] = index.toString();
      this.setState({
        activeIndex: index,
        activeTab: newArray,
      })
    }

  }
  toggleAccordion(tab) {
    const prevState = this.state.accordion;

    for(let i=0;i<prevState.length;i++) {
      prevState[i]=false;
    }
    prevState[tab]=true;

    this.setState({
      accordion: prevState,
    });
  }

  addMemberContent(n) {
    return (
        <Form>
          <Row className="mb-3 justify-content-center">
            <h5 className="ml-3 mr-2 mt-2">The new Member is a </h5>
            <ButtonGroup>
              <Button color={this.state.colors[parseInt(n)+1][0]} onClick={() => { this.setMemberProfileId(n,0); }} className="btn-outline-primary">Founder</Button>
              <Button color={this.state.colors[parseInt(n)+1][1]} onClick={() => { this.setMemberProfileId(n,1); }} className="btn-outline-primary">President</Button>
              <Button color={this.state.colors[parseInt(n)+1][2]} onClick={() => { this.setMemberProfileId(n,2); }} className="btn-outline-primary">Manager</Button>
              <Button color={this.state.colors[parseInt(n)+1][3]} onClick={() => { this.setMemberProfileId(n,3); }} className="btn-outline-primary">Attorney</Button>
              <Button color={this.state.colors[parseInt(n)+1][4]} onClick={() => { this.setMemberProfileId(n,4); }} className="btn-outline-primary">Adherent</Button>
            </ButtonGroup>
          </Row>

          <Row className="mb-3">
            <Col xs="8">
              <h6 className="font-lg">Full Name</h6>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><i className="icon-user"/></InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="Type the full name..." onChange={(e) => {
                  let temp= this.state.newMembers;
                  temp[n].fullName=e.target.value;
                  this.setState({newMembers:temp});}}/>
              </InputGroup>
            </Col>
            <Col>
              <h6 className="font-lg">Sex</h6>
              <Input type="select" onChange={(e) => {
                let temp=this.state.newMembers;
                temp[n].sex=e.target.value;
                this.setState({newMembers:temp});}}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Input>
            </Col>
          </Row>
          <hr/>
          <Row className="mb-3">
            <Col>
              <h6 className="font-lg">Id (<em>optional</em>)</h6>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><i className="icon-credit-card"/></InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="Type the CIN..." onChange={(e) => {
                  let temp=this.state.newMembers;
                  temp[n].cin=e.target.value;
                  this.setState({newMembers:temp});}}/>
              </InputGroup>
            </Col>
            <Col>
              <h6 className="font-lg">Email Address (<em>optional</em>)</h6>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="Type the email address..." onChange={(e) => {
                  let temp= this.state.newMembers;
                  temp[n].email=e.target.value;
                  this.setState({newMembers:temp});}}/>
              </InputGroup>
            </Col>
            <Col>
              <h6 className="font-lg">Telephone Number (<em>optional</em>)</h6>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><i className="icon-phone"/></InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="Type the phone number..." onChange={(e) => {
                  let temp= this.state.newMembers;
                  temp[n].telephone=e.target.value;
                  this.setState({newMembers:temp});}}/>
              </InputGroup>
            </Col>
          </Row>
          <br/>
        </Form>
    )
  }
  newMember(n) {
    return(
        <Card className="mb-0">
          <CardHeader id="headingOne">
            <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(n)}>
              <h5 className="m-0 p-0">Member {(n+1).toString()}</h5>
            </Button>
          </CardHeader>
          <Collapse isOpen={this.state.accordion[n]}>
            <CardBody>
              {this.addMemberContent(n)}
            </CardBody>
          </Collapse>
        </Card>
    )
  }
  createMembers(n) {
    let newMembers=this.state.newMembers;
    let colors=this.state.colors;
    let members=[];
    let newAccordion=this.state.accordion;
    for(let i=0;i<n;i++)
    {
      if(newMembers.length<n)
      {
        newMembers.push({
          fullName: '',
          idCooperative: '',
          idProfile: 4,
          sex: 'Male',
          cin: '',
          email:'',
          telephone:''});
        colors.push(["light","light","light","light","info"]);
        newAccordion.push(false);
        newAccordion[0]=true;
      }


      members.push(this.newMember(i));
    }

    if(this.state.newMembers!==newMembers)
      this.setState({accordion:newAccordion,newMembers: newMembers});

    return members;
  }

  submitAll(){
    const link=this.state.API_LINK;

    let newAddress=this.state.newAddress;
    let newCooperative=this.state.newCooperative;
    let newAdmin=this.state.newAdmin;
    let newMembers=this.state.newMembers;
    let newUser=this.state.newUser;

    newUser.password=(sha256(newUser.password));

    newAddress.idCity=this.state.Cities[this.state.selectedCity].id;
    newCooperative.idSector=this.state.Sectors[this.state.selectedSector].id;
    newCooperative.idRegion=this.state.Regions[this.state.selectedRegion].id;
    axios.post(link+'address/create/',newAddress).then((response)=>{
      newCooperative.idAddress=response.data.id;
      axios.post(link+'cooperative/create/',newCooperative).then((response)=>{
        const idCooperative=response.data.id;
        newMembers.push(newAdmin);
        newMembers.forEach(element=> {
          element.idCooperative=idCooperative;
          axios.post(link+'member/create/',element).then(()=>{})
        })
      })
    });
    axios.post(link+'user/create/',newUser).then(()=>{})
  }


  tabPane() {
    return (
        <>
          <TabPane tabId="1">
              <Form>
                <h1>Sign up Application</h1>
                <hr/>
                <Row className="mb-3">
                  <Col>
                    <h6 className="font-lg">Cooperative</h6>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="icon-user"/></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Type the cooperative name..." onChange={(e) => {
                        let temp=this.state.newCooperative;
                        temp.cooperativeName=e.target.value;
                        this.setState({newCooperative:temp});}}/>
                    </InputGroup>
                  </Col>
                </Row>

                <hr/>

                <Row className="mb-3">
                  <Col>
                    <h6 className="font-lg">Address</h6>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="icon-location-pin"/></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Type the cooperative address..." onChange={(e) => {
                        let temp=this.state.newAddress;
                        temp.addressString=e.target.value;
                        this.setState({newAddress:temp});}}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <h6 className="font-lg">Code postal</h6>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="icon-envelope"/></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Type the postal code..." onChange={(e) => {
                        let temp=this.state.newAddress;
                        temp.postalCode=e.target.value;
                        this.setState({newAddress:temp});}}/>
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <h6 className="font-lg">Region</h6>
                    <Input type="select" onChange={this.handleRegionChange}>
                      {this.state.Regions.map((region, index)=>
                      {
                        return <option key={index} value={index}>{region.regionName}</option>
                      })}
                    </Input>
                  </Col>
                  <Col>
                    <h6 className="font-lg">City</h6>
                    <Input type="select" onChange={this.handleCityChange}>
                      {this.state.Cities.map((city, index)=>
                      {return <option key={index} value={index}>{city.cityName}</option>})}
                    </Input>
                  </Col>
                </Row>

                <hr/>

                <Row>
                  <Col>
                    <h6 className="font-lg">Sector</h6>
                    <Input type="select" onChange={this.handleSectorChange}>
                      {this.state.Sectors.map((sector, index)=>
                      {
                        return <option value={index}>{sector.sectorName}</option>
                      })}
                    </Input>
                  </Col>
                  <Col>
                    <h6 className="font-lg">Number of members</h6>
                    <Input type="text" placeholder="Total number if members in the cooperative..." onChange={(e)=>{
                      let i=e.target.value;
                      this.setState({membersNumber:i,})
                    }}/>
                  </Col>

                </Row>
                <br/>
              </Form>
          </TabPane>

          <TabPane tabId="2">
            <Form>
              <h1>Sign up Application</h1>
              <hr/>

              <Row className="mb-3 justify-content-center">
                <h5 className="ml-3 mr-2 mt-2">I am the </h5>
                <ButtonGroup>
                  <Button color={this.state.colors[0][0]} onClick={() => { this.setAdminProfileId(0); }} className="btn-outline-primary">Fonder</Button>
                  <Button color={this.state.colors[0][1]} onClick={() => { this.setAdminProfileId(1); }} className="btn-outline-primary">President</Button>
                  <Button color={this.state.colors[0][2]} onClick={() => { this.setAdminProfileId(2); }} className="btn-outline-primary">Manager</Button>
                  <Button color={this.state.colors[0][3]} onClick={() => { this.setAdminProfileId(3); }} className="btn-outline-primary">Attorney</Button>
                </ButtonGroup>
              </Row>

              <Row className="mb-3">
                <Col>
                  <h6 className="font-lg">Full name</h6>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="icon-user"/></InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Type your full name..." onChange={(e) => {
                      let temp=this.state.newAdmin;
                      temp.fullName=e.target.value;
                      this.setState({newAdmin:temp});}} />
                  </InputGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <h6 className="font-lg">Id</h6>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="icon-credit-card"/></InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Type your CIN..." onChange={(e) => {
                      let temp=this.state.newAdmin;
                      temp.cin=e.target.value;
                      this.setState({newAdmin:temp});}}  />
                  </InputGroup>
                </Col>
                <Col>
                  <h6 className="font-lg">Sex</h6>
                  <Input type="select" onChange={(e) => {
                    let temp=this.state.newAdmin;
                    temp.sex=e.target.value;
                    this.setState({newAdmin:temp});}} >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Input>
                </Col>
              </Row>

              <hr/>
              <Row>
                <Col>
                  <h6 className="font-lg">Email Address</h6>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Type your email address..." onChange={(e) => {
                      let temp=this.state.newAdmin;
                      let temp2=this.state.newUser;
                      temp.email=e.target.value;
                      temp2.email=e.target.value;
                      this.setState({newAdmin:temp, newUser:temp2});
                    }}/>
                  </InputGroup>
                </Col>
                <Col>
                  <h6 className="font-lg">Telephone number</h6>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="icon-phone"/></InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Type your phone number..." onChange={(e) => {
                      let temp=this.state.newAdmin;
                      temp.telephone=e.target.value;
                      this.setState({newAdmin:temp});
                    }} />
                  </InputGroup>
                </Col>
              </Row>
              <hr/>
              <Row className="mt-3">
                <Col>
                  <h6 className="font-lg">Password</h6>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="icon-user"/></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Type your password..." onChange={(e) => {
                      let temp=this.state.newUser;
                      temp.password=e.target.value;
                      this.setState({newUser:temp});
                    }}/>
                  </InputGroup>
                </Col>
              </Row>

              <br/>
            </Form>
          </TabPane>

          <TabPane tabId="3">
            <h1>Sign up Application</h1>
            <hr/>
            <CardBody>
              <div>
                {this.createMembers(this.state.membersNumber-1)}
              </div>
            </CardBody>
          </TabPane>

          <TabPane tabId="4">
            <h1>Sign up Application</h1>
            <hr/>
            <CardBody>
              <div className="text-center">
                <h3>Thanks for submitting a sign up application to our platform, please confirm everything you submitted.</h3>
                <br/>
                <Button color="white" href="#/home" className="px-4 mx-5 btn btn-outline-danger">Cancel</Button>
                <Button color="white" href="#/login" onClick={() => { this.submitAll(); }}  className="px-3 mx-5 btn btn-outline-success">Confirm</Button>
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
              <Card className="mx-4" >
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

export default Register;
