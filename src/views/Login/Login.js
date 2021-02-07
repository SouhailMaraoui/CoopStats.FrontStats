import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { sha256 } from 'js-sha256';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state= {
      API_LINK:'https://coopstats-106e3.uc.r.appspot.com/',

      user:{
        id:'',
        email:'',
        password: '',
        role:''
      },
    }

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

  LogIn(){
    const link=this.state.API_LINK;
    const user=this.state.user;

    user.password=sha256(user.password);

    console.log(sha256(user.password));
    axios.post(link+'user/login/',user).then((response)=>{
      if(response.data!==""){
        this.props.handleLogin(response.data);
        if(response.data.role==="admin")
        this.props.history.push("/dashboard");
        if(response.data.role==="user")
        this.props.history.push("/account");
      }
    })
  }

  render() {
    return (
      <div className="flex-row align-items-center" Style="margin-top: 18vh;" >
        <Container >
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Login to your Account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email" autoComplete="Email" onChange={(e) => {
                          let temp =this.state.user;
                          temp.email=e.target.value;
                          this.setState({
                            user:temp
                          });
                        }}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Mot de passe" autoComplete="current-password" onChange={(e) => {
                          let temp =this.state.user;
                          temp.password=e.target.value;
                          this.setState({
                            user:temp
                          });
                        }}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="white" onClick={() => { this.LogIn(); }} className="px-4 btn btn-outline-primary">Connect</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign Up</h2>
                      <p>Are you a new Cooperative and you want to sign up with our platform?
                      </p>
                      <Link to="/register">
                        <Button href="#/Register" color="primary" className="btn btn-outline-dark mt-3">Submit an application here!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
