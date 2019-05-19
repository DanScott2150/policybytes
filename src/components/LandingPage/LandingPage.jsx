// Landing Page for App
// -- Jumbotron Header with general site intro
// -- "Current Conversation" card
// -- Archived Topics section

// TODO: Do we need mapStateToProps?

import React, { Component } from 'react';
import { connect } from 'react-redux';

// Styling
import { Container, Jumbotron } from 'react-bootstrap';
import './LandingPage.css';

// Subcomponents
import LandingPageFeaturedTopic from './LandingPageFeaturedTopic.jsx'
import LandingPageArchive from './LandingPageArchive.jsx'

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="text-center">
          <h1><strong>PolicyBytes</strong></h1>
          <p>This site is designed to facilitate better debate. 
            You can scan arguments and cut to the chase examining evidence in these curated conversations. 
            Creating intentional dialogue that focuses on individual argumentation.</p>
        </Jumbotron>

        <Container className="text-center">
          <LandingPageFeaturedTopic />
        </Container>

        <LandingPageArchive /> 

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps)(LandingPage);