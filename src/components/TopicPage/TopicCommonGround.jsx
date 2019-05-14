import React, { Component } from 'react'
// import Jumbotron from 'react-bootstrap/Jumbotron';

export default class TopicCommonGround extends Component {
    render() {
        return (
            <div className="text-center">
                    <h2>Common Ground</h2>
                    Both particpants agree that:
          <p>{this.props.topicPageContent.topicCommonGround}</p>
               
            </div>
        )
    }
}
