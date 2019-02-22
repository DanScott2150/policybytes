import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom';
import { Panel, Button, ButtonGroup, ButtonToolbar, Glyphicon, Alert, Grid, Row, Col } from 'react-bootstrap'; 

class TopicManagePanel extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      show: false,  
    }
  }

  deleteTopic = () => {
    console.log('in deleteTopic, id:', this.props.topic.id);
    this.handleShow();
    this.props.dispatch({
      type: 'DELETE_TOPIC', 
      payload: this.props.topic.id
    })
  }

  handleEditTopic = () => {
    console.log('handleEditTopic Clicked:', this.props.topic);
  }

//toggle published status in db and reset all topics
  togglePublished = () => {
    console.log('in Panel togglePublished');
    this.props.dispatch({
      type: 'TOGGLE_PUBLISHED',
      payload: this.props.topic
    })
  }

//toggle featured status in db and reset all topics
  toggleFeatured = () => {
    console.log('in Panel toggleFeatured');
    this.props.dispatch({
      type: 'TOGGLE_FEATURED',
      payload: this.props.topic
    })
  }

  handleDismiss = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }


  render() {

//color/text of publish button based on topic.published status
    let publishStyle = 'default';
    if (this.props.topic.published) {
      publishStyle = 'success'
    }
    let publishText = 'Unpublished';
    if (this.props.topic.published) {
      publishText = 'Published'
    }
//color/text of publish button based on topic.featured status
    let featuredStyle = 'default';
    if (this.props.topic.featured) {
      featuredStyle = 'primary'
    }
    let featuredText = 'Set Featured';
    if (this.props.topic.featured) {
      featuredText = 'Featured'
    }

    let alertContent;
    if (this.state.show) {
      alertContent = (
        <Alert bsStyle="danger" onDismiss={this.handleDismiss} className="alertContent">
          <h4>Are you sure you want to delete this topic?</h4>

            <ButtonGroup className="alertButtons">
              <Button onClick={this.deleteTopic} bsStyle="danger">Delete Topic</Button>
              <Button onClick={this.handleDismiss}>Nevermind</Button>
            </ButtonGroup>

        </Alert>
      )
    }


 
//EACH EDIT BUTTON SENDS ADMIN TO TOPIC EDIT PAGE WITH UNIQUE URL BASED ON SELECTED TOPIC'S ID  
  let linkWithId = `/topicEdit/${this.props.topic.id}`

    return (
      <div>

            <Col xs={12} sm={6} md={4} lg={4}>
            
              <Panel className="topicManagePanel">
                <Panel.Heading className="topicManagePanelHeading">
                  {this.props.topic.topic_title}
                  <br/>

                </Panel.Heading>
                <Panel.Body>
                  {/* {alertContent} */}
                  <div className="topicManagePanelText">
                    
                    {(this.state.show) ? alertContent 
                                      :<p>{this.props.topic.archive_summary}
                                      <br/><br/>
                                      <img src={this.props.topic.icon_url} alt="" width="170"/></p>}

        
                  </div>

                  <div className="topicManageButtongroup">
                    <ButtonGroup>
                      <Button bsStyle={publishStyle} onClick={this.togglePublished}>{publishText}</Button>
                      <Button bsStyle={featuredStyle} onClick={this.toggleFeatured}>{featuredText}</Button>
                      <Button onClick={this.handleEditTopic}>
                        <Link to={linkWithId}>
                          {/* <i class="fa fa-pencil" aria-hidden="true"></i> */}
                          Edit
                        </Link>
                      </Button>
                      <Button onClick={this.handleShow}>
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </Button>
                    </ButtonGroup>
                  </div>
     
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
