import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from "../../assets/img/Logo/logo.png";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
      const signOut = ()=> {
        localStorage.removeItem("user");
    };
    const signOutBtn =() =>{
        let user=JSON.parse(localStorage.getItem("user"));
        if(user===null){
            return(<div/>)
        }
        else{
            return(
                <a role="button" href={"/Home"} className="btn btn-outline-danger" onClick={() => { signOut() }}>Disconnect</a>
            )
        }
    };
    const accountBtn =() =>{
          let user=JSON.parse(localStorage.getItem("user"));
          if(user===null){
              return(<div/>)
          }
          else{
              return(
                  <a role="button" href={"/account"} className="btn btn-outline-primary">My account</a>
              )
          }
      };

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand className="mx-5"
          full={{ src: logo, width: 220, height: 45, alt: 'Logo' }}/>

        <Nav className="ml-auto" navbar>
        <NavItem className="d-md-down-none px-3">
            <NavLink to="/Home" className="nav-link">Home</NavLink>
        </NavItem>
          <NavItem className="d-md-down-none px-3">
            <a target="_blank" rel="noopener noreferrer" href="http://www.odco.gov.ma/fr/content/espace-t%C3%A9l%C3%A9chargement" className="nav-link">Documents</a>
          </NavItem>
          <NavItem className="d-md-down-none px-3">
            <a target="_blank" rel="noopener noreferrer" href="http://www.odco.gov.ma/fr/content/conseils" className="nav-link">Help</a>
          </NavItem>
            <NavItem className="d-md-down-none pl-3">
                <NavLink to="/Account" className="nav-link">{accountBtn()}</NavLink>
            </NavItem>
          <NavItem className="d-md-down-none px-3">
              <NavLink to="/Home" className="nav-link">{signOutBtn()}</NavLink>
          </NavItem>
        </Nav>

      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
