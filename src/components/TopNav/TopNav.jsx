//Header NAV bar

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Nav, Navbar, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class TopNav extends Component {

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  renderLoginItems() {
    if (this.props.user.userInfo) {
      return (
        <div className="footer" id="footerButtons">
          <Button bsSize="small" onClick={this.logout}>Log Out</Button>
        </div>
      )
    }
  }


  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">PolicyBytes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Current Conversation</Nav.Link>
            <NavDropdown title="Topic Archive" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Topic 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Topic 2</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Topic 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">View All Topics</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#link">Contact Us</Nav.Link>    
          </Nav>
          <Nav inline>
            <Button variant="outline-success">Login</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

  }
}

export default connect(mapStateToProps)(TopNav);