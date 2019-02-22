import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom';
import { Panel, Button, Col } from 'react-bootstrap'; 

class TopicManagePanel extends Component {

  render() {

    return (
      <div>

            <Col xs={12} sm={6} md={4} lg={4}>
            
              <Panel className="topicManagePanel">
                <Panel.Heading className="topicManagePanelHeading">
                  Create a New Topic
                </Panel.Heading>
                <Panel.Body>
                <Col xs={12} sm={12} md={12} lg={12}>
                        <Link to='/topicEdit'>
                            <i id="addTopicButton" class="fa fa-plus-square-o" aria-hidden="true"></i>
                        </Link>
                </Col>
                </Panel.Body>
              </Panel>
            </Col>

            
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})


export default connect(mapStateToProps)(TopicManagePanel);
