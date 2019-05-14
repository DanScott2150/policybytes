import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';

import { Panel, Container, Col, Row, Jumbotron, Image } from 'react-bootstrap';

import './LandingPage.css'

const mapStateToProps = state => ({
    user: state.user,
    login: state.login,
    state
  });

class LandingPageFeaturedTopic extends Component {

    // Find the topic that is currently featured
    // Dispatches an action that hits the /api/topic/featuredlanding endpoint
    // --> sagas/landingPageSaga.js --> reducers/landingPageReducer.js
    componentDidMount(){
        this.props.dispatch({
            type: 'FETCH_NEW_TOPIC_LANDING_PAGE'
        });
    }

    // If user clicks on the featured topic, take them to the topic page
    fetchTopicPageContent = (id) => {
        this.props.dispatch({
          type: 'FETCH_TOPIC_PAGE_CONTENT',
          payload: id
        })
        this.props.history.push('/topicPage');
      }


  render() {

    //featuredLandinPage object from reducer
    let featuredTopic = this.props.state.landing.featuredLandingPage;

    return (
        <div onClick={()=>this.fetchTopicPageContent(featuredTopic[0].id)}>
        
        <Jumbotron className="featuredTopicJumbotron" >
            <Container>
                <Row>
                    <Col xs={12} md={12}>
                        <h3><strong>- Current Conversation -</strong></h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12}>
                        <h2><strong>{featuredTopic[0] && featuredTopic[0].topic_title}</strong></h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12} lg={2}>
                        <img className="featuredTopicPhotoLeft" src={featuredTopic[0] && featuredTopic[0].photo_url}/>
                    </Col>
                    <Col xs={12} md={12} lg={4}>
                        <div className="contributorText">
                            <h3>
                                <strong>
                                    {featuredTopic[0] && featuredTopic[0].first_name} {featuredTopic[0] && featuredTopic[0].last_name}
                                </strong>
                            </h3>
                            <p>
                                {featuredTopic[0] && featuredTopic[0].bio}
                            </p>
                        </div>
                    </Col>     
                    <Col xs={12} md={12} lg={4}>
                        <div className="contributorText">
                            <h3>
                                <strong>
                                    {featuredTopic[1] && featuredTopic[1].first_name} {featuredTopic[1] && featuredTopic[1].last_name}
                                </strong>
                            </h3>
                            <p>
                                {featuredTopic[1] && featuredTopic[1].bio}
                            </p>
                        </div>
                    </Col>
                    <Col  xs={12} md={12} lg={2}>
                        <img className="featuredTopicPhotoRight" src={featuredTopic[1] && featuredTopic[1].photo_url}/>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={12}>
                        <h3>{moment(featuredTopic[1] && featuredTopic[1].published_date).format('MMMM Do YYYY')}</h3>
                    </Col>
                </Row>
            
            </Container>
        </Jumbotron>
      </div>
    )
  }
}
  
export default withRouter(connect(mapStateToProps)(LandingPageFeaturedTopic))