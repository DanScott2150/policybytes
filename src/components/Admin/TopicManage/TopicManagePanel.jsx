import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Alert } from 'react-bootstrap'; 

class TopicManageCard extends Component {
  constructor(props) {
    super(props) 

    // 'show' for if "are you sure you want to delete" modal should be visible
    // should probably name this something more descriptive
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
    console.log('in Card togglePublished');
    this.props.dispatch({
      type: 'TOGGLE_PUBLISHED',
      payload: this.props.topic
    })
  }

//toggle featured status in db and reset all topics
  toggleFeatured = () => {
    console.log('in Card toggleFeatured');
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
      publishText = (
        <Button variant="warning" onClick={this.togglePublished}>
          <i class="fas fa-eye"></i><br/>
          Published
        </Button>);
    } else {
      publishText = (
        <Button variant="outline-warning" onClick={this.togglePublished}>
          <i class="fas fa-eye-slash"></i><br/>
          Draft
        </Button>);
    }
//color/text of publish button based on topic.featured status
    let featuredStyle = 'default';
    if (this.props.topic.featured) {
      featuredStyle = 'primary'
    }
    let featuredText = 'Set Featured';
    if (this.props.topic.featured) {
      featuredText = (
        <Button variant="success" onClick={this.toggleFeatured}>
          Featured Topic
        </Button>
      )
    } else {
      featuredText = (
        <Button variant="outline-success" onClick={this.toggleFeatured}>
          Set Featured
        </Button>
      )
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
      <tr>
      { alertContent }
        <td>{this.props.topic.id}</td>
        <td>{this.props.topic.topic_title}</td>
        <td>{this.props.topic.archive_summary}</td>
        <td>
          <Button variant="outline-secondary" onClick={this.handleEditTopic}>
            <Link to={linkWithId}>
              <i class="fas fa-edit"></i>
              Edit
            </Link>
          </Button>
        </td>

        <td>{publishText}</td>
        <td>{featuredText}</td>
        <td><Button variant="outline-danger" onClick={this.handleShow}>
          <i class="fa fa-trash" aria-hidden="true"></i>
          Delete
        </Button></td>
      </tr >
    )
  }
}

const mapStateToProps = (state) => ({
  
})


export default connect(mapStateToProps)(TopicManageCard);
