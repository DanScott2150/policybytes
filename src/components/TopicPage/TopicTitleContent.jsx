import React, { Component } from 'react'

import {Jumbotron, Grid, Row, Col } from 'react-bootstrap';

import dummyTopicCache from './DummyData.js'


export default class TopicTitleContent extends Component {
  render() {
    return (
      <div>

            {/* INTRO */}
            <Jumbotron className="titleJumbotron" >
            <Grid>
                <Row>
                    <Col xs={12} md={12}>
                        {/* <hr/> */}
                        <h1><strong>{this.props.topicPageContent.topicTitle}</strong></h1>
                    </Col>
                    <Col xs={12} md={12}>

                    <p><div dangerouslySetInnerHTML={{ __html: this.props.topicPageContent.topicPremise} } /></p>
                    {/* <hr/> */}
                    </Col>
                </Row>
            </Grid>
            </Jumbotron>

            <Jumbotron className="commonGroundJumbotron">
                <h1>Common Ground</h1>
                <p>

            <div dangerouslySetInnerHTML={{ __html: this.props.topicPageContent.topicCommonGround} } />
                
                </p>
            </Jumbotron>

        
      </div>
    )
  }
}
