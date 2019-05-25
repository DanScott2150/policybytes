// Displays Archived Topics on Landing Page
// Each topic displayed as a Card

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import moment from 'moment';

import { Container, Col, Row, Card, Jumbotron } from 'react-bootstrap';
import './LandingPage.css';

const mapStateToProps = state => ({
    // user: state.user,
    // login: state.login,
    state
});

class LandingPageArchive extends Component {
// FETCH_ARCHIVED_TOPICS => 
// [landingPageSaga.js] fetchArchivedTopics() => API Call => SET_ARCHIVED_TOPICS =>
// [landingPageReducer.js] const archivedTopics
  componentDidMount(){
    this.props.dispatch({
        type: 'FETCH_ARCHIVED_TOPICS'
    })
  }

// If user clicks on an archived topic, fetch the data for that topic and populate the topic page
  fetchTopicPageContent = (id) => {
    this.props.dispatch({
      type: 'FETCH_TOPIC_PAGE_CONTENT',
      payload: id
    })
    this.props.history.push('/topicPage');
  }

  render() {
    let date = moment(this.props.state.landing.archivedTopics.published_date).format('MMMM Do YYYY');

    // Populate array of all Archived Topics
    let archiveArray = this.props.state.landing.archivedTopics.map((archivedTopic) => {
      return (
        <Col xs={12} sm={6} md={4} lg={4} key={archivedTopic.id}>
          <div onClick={() => this.fetchTopicPageContent(archivedTopic.id)}>
            <Card className="archivePanel">
              <Card.Header>{archivedTopic.topic_title}</Card.Header>
              <Card.Body>
                <img src={archivedTopic.icon_url} alt="" height="200" />
                <p>{date}</p>
                <p className="archiveTopicSummary">{archivedTopic.archive_summary}</p>
              </Card.Body>
            </Card>
          </div>
        </Col>
      );
    });

    return (
      <Jumbotron className="text-center pt-4">
        <h3 className="mb-4">Archived Conversations</h3>
          <Container>
            <Row>
              {archiveArray}
            </Row>
          </Container>
      </Jumbotron>
    );
  }
}

export default withRouter(connect(mapStateToProps)(LandingPageArchive))