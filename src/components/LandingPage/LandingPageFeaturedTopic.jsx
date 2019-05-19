// Displays "Featured Topic" Card on Landing Page
// Topic that displays here can be changed via the Admin panel

// TODO: Topic premise is currently hardcoded to the Restaurant Tips topic premise. 
//    this.props.state.landing.featuredLandingPage as it is currently setup does not fetch the premise, 
//    for some reason.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Container, Col, Row, Card, Image, Button } from 'react-bootstrap';
import './LandingPage.css';

import moment from 'moment';

const mapStateToProps = state => ({
    // user: state.user,
    // login: state.login,
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

    let featuredTopic = this.props.state.landing.featuredLandingPage;
    // console.log(featuredTopic);

    return (
      <div>
        <Card 
          onClick={() => this.fetchTopicPageContent(featuredTopic[0].id)}
          className="featuredTopic">

          <Card.Header>
            <h3>Current Conversation</h3> 
          </Card.Header>

          <Card.Body>
            <Container>
              <Row>
                <Col>
                  <h2><strong>{featuredTopic[0] && featuredTopic[0].topic_title}</strong></h2>
            {/* Hardcoded placeholder for now, need to update the data that featuredTopic fetches */}
                  <p>Most servers and bartenders make a vast percentage of their income from tips. 
                      As the minimum wage continues to rise, in some states as high as $15 per hour, 
                      it is important to discuss the future of tipping in Minnesota's restaurants. 
                      Should businesses be able to pay tipped employees a lower minimum wage than non-tipped workers?</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card className="featuredContributorCardLeft">
                    <Card.Body>
                      <Image
                        className="featuredContributorPhotoLeft"
                        src={featuredTopic[0] && featuredTopic[0].photo_url}
                        thumbnail
                        roundedCircle />
                      <div className="featuredContributorText">
                        <h3 className="featuredContributorName">
                          {featuredTopic[0] && featuredTopic[0].first_name} {featuredTopic[0] && featuredTopic[0].last_name}
                        </h3>
                        <p className="text-justify">
                          {featuredTopic[0] && featuredTopic[0].bio}
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col>
                  <Card className="featuredContributorCardRight">
                    <Card.Body>
                      <Image
                        className="featuredContributorPhotoRight"
                        src={featuredTopic[1] && featuredTopic[1].photo_url}
                        thumbnail
                        roundedCircle />
                      <div className="featuredContributorText">
                        <h3 className="featuredContributorName">
                          {featuredTopic[1] && featuredTopic[1].first_name} {featuredTopic[1] && featuredTopic[1].last_name}
                        </h3>
                        <p className="text-justify">
                          {featuredTopic[1] && featuredTopic[1].bio}
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button 
                    variant="outline-info" 
                    size="lg" 
                    className="mt-3 mb-3 w-100">
                      Read More & Join the Conversation!
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className="float-right font-italic">Posted: {moment(featuredTopic[1] && featuredTopic[1].published_date).format('MMMM Do YYYY')}</span>
                </Col>
              </Row>
            </Container>
          </Card.Body>

        </Card>
      </div>
    );
  }
}
  
export default withRouter(connect(mapStateToProps)(LandingPageFeaturedTopic))