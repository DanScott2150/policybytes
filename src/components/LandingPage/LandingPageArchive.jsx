import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Grid, Col, Row, Jumbotron, Image } from 'react-bootstrap';
import dummyTopicCache from '../TopicPage/DummyData.js'
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';

import './LandingPage.css'

const mapStateToProps = state => ({
    user: state.user,
    login: state.login,
    state
})

class LandingPageArchive extends Component {
    componentDidMount(){
        this.props.dispatch({
            type: 'FETCH_ARCHIVED_TOPICS'
        })
    }

    fetchTopicPageContent = (id) => {
        console.log('in fetchTopicPageContent, id:', id);
        this.props.dispatch({
          type: 'FETCH_TOPIC_PAGE_CONTENT',
          payload: id
        })
        this.props.history.push('/topicPage');
      }

  render() {
    let date = moment(this.props.state.landing.archivedTopics.published_date).format('MMMM Do YYYY');
    let archiveArray = this.props.state.landing.archivedTopics.map((archivedTopic)=>{
        return(  
                <div onClick={()=>this.fetchTopicPageContent(archivedTopic.id)}>
                    <Col xs={12} sm={6} md={4} lg={4}>
                        <Panel className="archivePanel">
                        <Panel.Body>
                            <Panel.Heading>{archivedTopic.topic_title}</Panel.Heading>
                                <img src={archivedTopic.icon_url} alt="" height="200"/>
                                <br/><br/>
                                <p>{date}</p>
                                <br/>
                                <p className="archiveTopicSummary">{archivedTopic.archive_summary}</p>
                        </Panel.Body>
                        </Panel>
                    </Col>
                </div>
              )
        })

    return (
      <div>
          {/* <pre>{JSON.stringify(this.props.state.landing.archivedTopics, null, 2)}</pre> */}
          <Grid>
              <Row>
                  <Col xs={12} md={12}>
                    <h2 className="archiveTitle">- Archive -</h2>
                  </Col>
              </Row>
          </Grid>

          
        <div className="archiveWrapper">
          <Grid>
              <Row>
                    {archiveArray}
              </Row>
          </Grid>

        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(LandingPageArchive))