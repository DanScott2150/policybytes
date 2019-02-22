import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Panel, Grid, Col, Row, Jumbotron, Image } from 'react-bootstrap';

import dummyTopicCache from '../TopicPage/DummyData.js'

import './LandingPage.css'

const mapStateToProps = state => ({
    user: state.user,
    login: state.login,
    state
  });

class LandingPageFeaturedTopic extends Component {

    componentDidMount(){
        this.props.dispatch({
            type: 'FETCH_NEW_TOPIC_LANDING_PAGE'
        })
    }

  render() {

    let featuredTopic = this.props.state.landing.featuredLandingPage;

    return (
      <div>
        
        <Jumbotron className="featuredTopicJumbotron" >
            <Grid>
                  {/* <div className="featuredTopicJumbotronInner"> */}
                    <Row>
                          <Col xs={12} md={12}>
                              <h3><strong>- Current Conversation -</strong></h3>
                              {/* Conditional rendering, only show the title after props have loaded. */}
                          </Col>
                    </Row>
                    <Row>
                          <Col xs={12} md={12}>
                              <h2><strong>{featuredTopic[0] && featuredTopic[0].topic_title}</strong></h2>
                          </Col>
                    </Row>


        {/* CONTRIBUTORS */}
                    <Row>
                          <div >
                                  <Col xs={12} md={12} lg={2}>
                                      <img className="featuredTopicPhotoLeft contrib1" src="/assets/headshot1.jpeg"/>
                                  </Col>
                                  <Col xs={12} md={12} lg={4}>
                                      <div className="contributorText">
                                          <h3>
                                              <strong>
                                                  {dummyTopicCache.contributor1FirstName} {dummyTopicCache.contributor1LastName}
                                              </strong>
                                          </h3>
                                          <p>
                                          {dummyTopicCache.bio1}
                                          </p>
                                      </div>
                                  </Col>
                          </div>

                          <div >
                                  <Col xs={12} md={12} lg={4}>
                                      <div className="contributorText">
                                              <h3>
                                                  <strong>
                                                      {dummyTopicCache.contributor2FirstName} {dummyTopicCache.contributor2LastName}
                                                  </strong>
                                              </h3>
                                              <p>
                                                  {dummyTopicCache.bio2}
                                              </p>
                                      </div>
                                  </Col>
                                  <Col  xs={12} md={12} lg={2}>
                                      <img className="featuredTopicPhotoRight contrib2" src="/assets/headshot2.jpeg"/>
                                  </Col>
                          </div>
                  </Row>

                <Row>
                        <Col xs={12} md={12}>
                            <h3>Published: April 16, 2018</h3>
                        </Col>
                </Row>
                  {/* </div> */}
            </Grid>
          </Jumbotron>
      </div>
    )
  }
}
  
  export default connect(mapStateToProps)(LandingPageFeaturedTopic);
