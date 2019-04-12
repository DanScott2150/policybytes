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
    // console.log(this.props.state.LandingPageHeader)
    let headerText = this.props.state.landing.landingPageHeader.header;
    // console.log(headerText);
    return (
      <div>
        {/* <pre>state: {JSON.stringify(this.state, null, 3)}</pre>
         <pre>state: {JSON.stringify(this.props.state, null, 3)}</pre> */}
        <h1><strong>The Policy Bytes Format</strong></h1>
            <p>
                {headerText}
            </p>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(LandingPageHeader));
