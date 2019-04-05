import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from '../Footer/Footer.jsx'

import { Panel, Grid, Col, Row, Jumbotron, Image } from 'react-bootstrap';

import LandingPageFeaturedTopic from './LandingPageFeaturedTopic.jsx'
import LandingPageArchive from './LandingPageArchive.jsx'
import LandingPageHeader from './LandingPageHeader.jsx';

import './LandingPage.css'


export class LandingPage extends Component {

  render() {
    return (
      <div>
        <LandingPageHeader />

        <div className="dottedLine"></div>

        <LandingPageFeaturedTopic />

        <div className="dottedLine"></div>

        <LandingPageArchive /> 

          <Footer/>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})


export default connect(mapStateToProps)(LandingPage);
