import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import { triggerLogout } from '../../redux/actions/loginActions';

import { Button } from 'react-bootstrap';

import './Nav.css';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class Nav extends Component {

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  // renderAdminNav() {
  //   if (this.props.user.userInfo && this.props.user.userInfo.status === 2) {
  //     return (

  //     )
  //   } else {
  //     return (
  //       <div></div>
  //     )
  //   }
  // }

  renderGreetingAdmin() {
    if (this.props.user.userInfo.status === 2) {
      return (
        <li className="navItem">
          <Link to="/admin">Admin</Link>
        </li>
      )
    } else {
      return (
        <span className="helloUser">Welcome, {this.props.user.userInfo.firstName}!</span>
      )
    }
  }

  renderLoginItems() {
    if (this.props.user.userInfo) {
      return (
        <div className="footer" id="footerButtons">
          {this.renderGreetingAdmin()}
          <Button bsSize="small" onClick={this.logout}>Log Out</Button>
        </div>
      )
    }
  }


  render() {
    return (
      <div>
        <div className="navbar">
          <div className="container">
            <div className="navMenu">
              <ul style={{ display: 'inline-block'}}>
                <li>Join</li>
                <li>Events</li>
                <li>News & Media</li>
                <li>Publications</li>
                <li>Donate</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container">
            <img src="/assets/CL-logo-horizontal.jpg" />
            <div className="nav-1">
              <ul>
                <li>Home</li>
                <li>Current Conversation</li>
                <li>Topic Archive</li>
                <li>Contact Us</li>
              </ul>
            </div>
        </div>

      <div className="header-banner">
        <h2>Policy Bytes</h2>
        {/* <img src="/assets/header-banner.png" /> */}
      </div>
        {/* <div>
          <ul>
            <li>
              <Link to="/home">
                {/* <img src="/assets/policybytes_logo.png" alt="" height="100" />
              </Link>
            </li>

            {/* {this.renderAdminNav()} 

            <li className="loginButton">
              {this.renderLoginItems()}
            </li>

          </ul>
        </div> */}
        </div>
    );

  }
}

export default connect(mapStateToProps)(Nav);

