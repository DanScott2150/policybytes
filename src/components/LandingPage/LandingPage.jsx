import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from '../Footer/Footer.jsx'

import { Container, Jumbotron, Image } from 'react-bootstrap';

import LandingPageFeaturedTopic from './LandingPageFeaturedTopic.jsx'
import LandingPageArchive from './LandingPageArchive.jsx'
// import LandingPageHeader from './LandingPageHeader.jsx';

import './LandingPage.css'


export class LandingPage extends Component {

  render() {
    return (
      <div>
        {/* <LandingPageHeader /> */}
          <Jumbotron className="text-center">
            <h1><strong>PolicyBytes</strong></h1>
            <p>This site is designed to facilitate better debate. 
              You can scan arguments and cut to the chase examining evidence in these curated conversations. 
              Creating intentional dialogue that focuses on individual argumentation.</p>
          </Jumbotron>
        {/* <div className="dottedLine"></div> */}

        <Container className="text-center">
        <LandingPageFeaturedTopic />

        {/* <div className="dottedLine"></div> */}

        </Container>
        <LandingPageArchive /> 
          <Footer/>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})


export default connect(mapStateToProps)(LandingPage);
