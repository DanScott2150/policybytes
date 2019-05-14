import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron';

export default class TopicTitleContent extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="text-center pt-4 pb-4">
          <h1><strong>{this.props.topicPageContent.topicTitle}</strong></h1>
          <p>{this.props.topicPageContent.topicPremise}</p>
        <hr />
          <h2>Common Ground</h2>
          Both particpants agree that:
          <p>{this.props.topicPageContent.topicCommonGround}</p>
        </Jumbotron>
      </div>
    )
  }
}
