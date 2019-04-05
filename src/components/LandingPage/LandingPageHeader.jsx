import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
  state
});

class LandingPageHeader extends Component {

  componentDidMount(){
    this.props.dispatch({
      type: 'FETCH_LANDING_HEADER'
    });
  }

  render() {
    let headerText = this.props.state.landing.landingPageHeader;
    // console.log("Header Text: ", headerText);

    return (
      <div>
        <h1><strong>The Policy Bytes Format</strong></h1>
            <p>
                {headerText[0].header}
            </p>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(LandingPageHeader));
