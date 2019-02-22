import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from '../Footer/Footer.jsx'

import { Panel, Grid, Col, Row, Jumbotron, Image } from 'react-bootstrap';

import dummyTopicCache from '../TopicPage/DummyData.js'
import LandingPageFeaturedTopic from './LandingPageFeaturedTopic.jsx'
import LandingPageArchive from './LandingPageArchive.jsx'

import './LandingPage.css'


export class LandingPage extends Component {



  render() {
    return (
      <div>
          {/* <div className="wrapper"> */}

          <Jumbotron className="landingJumbotron" >
            <Grid>
                  <div className="landingJumbotronInner">
                    <Row>
                          <Col xs={12} s={12} md={12} lg={12}>
                              <h1><strong>The Policy Bytes Format</strong></h1>
                          </Col>
                    </Row>
                    <Row>
                          <Col xs={12} s={12} md={12} lg={12}>
                          <p>
                              This site is designed to facilitate better debate. 
                              You can scan arguments and cut to the chase examining evidence in 
                              these curated conversations. 
                              Creating intentional dialogue that focuses on individual argumentation.
                          </p>
                          </Col>
                    </Row>
                  </div>
            </Grid>
          </Jumbotron>

            <div className="dottedLine"></div>

            <LandingPageFeaturedTopic />

            <div className="dottedLine"></div>

            <LandingPageArchive /> 



          {/* </div> */}

          <Footer/>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})


export default connect(mapStateToProps)(LandingPage);
