import React, { Component} from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import thumbnail from "../../assets/img/Home/Thumbnail.png";

class Home extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="pt-5 mt-5">
          <Col>
            <Row>
              <Col xs="1"/>
              <Col><h1 className="text-center font-weight-bold">Know everything about your Cooperative!</h1></Col>
              <Col xs="1"/>
            </Row>
            <Row>
              <h3 className="text-center font-weight-light">Our new platform will help you better manage your cooperative
                by offering you very detail reports on your activities, earning, and so much more...</h3><br/>
            </Row>
            <Row>
              <img src={thumbnail} className="img-fluid" alt="Thumbnail"/>
            </Row>
          </Col>

          <Col>
            <Card className="mt-5">
              <CardBody>
                <Row>
                  <Col xs="1"/>
                  <Col><h5 className="text-center">Are you a new Cooperative and you want to sign up with our platform?<br/>
                  <br/><a href="#/register" role="button" className="btn btn-outline-primary">Submit an application here!</a></h5></Col>
                  <Col xs="1"/>
                </Row>
                <hr/>

                <Row>
                  <Col xs="1"/>
                  <Col><h5 className="text-center">You already have an account with us?<br/>
                  <br/><a href="#/login" role="button" className  ="btn btn-outline-dark">Connect here</a></h5></Col>
                  <Col xs="1"/>
                </Row>

              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>
    );
  }
}

export default Home;
