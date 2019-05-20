// Admin Panel
// Shows all Topics, along with ability to: Edit, Publish/Unpublish, Set as Featured, Delete
// Page only accessible if user logged in with admin privlidges

import React, { Component } from 'react'
import { connect } from 'react-redux'

import TopicManageAddPanel from './TopicManageAddPanel.jsx'
import TopicManagePanel from './TopicManagePanel.jsx'

// import RegisterModal from '../RegisterModal/RegisterModal.js'
// import SiteInformationPanel from '../SiteInformation/SiteInformation';

import { Container, Row, Jumbotron, Table } from 'react-bootstrap';
import './TopicManage.css'; 

class TopicManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,  
    }
  }

// Fetch all topics (published & unpublished) from database
  componentDidMount () {
    this.fetchAllTopics(); 
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading) {
      if(!this.props.user.userInfo) {
        // userInfo is null, that means the user isn't logged in
        this.props.history.push('/login');
      } else if(this.props.user.userInfo.status !== 2) {
        // user is not an admin
        this.props.history.push('/login');
      } else {
        // user is an admin, do nothing
      }
    }
  }

  fetchAllTopics = () => {
    // console.log('[TopicManage.jsx] FETCH_ALL_TOPICS()');
    // FETCH_ALL_TOPICS => topicSaga.js => fetchAllTopics() => SET_ALL_TOPICS
    // SET_ALL_TOPICS => topicEditReducer.js
    this.props.dispatch({
      type: 'FETCH_ALL_TOPICS'
    });
  }

  handleDismiss = () => {
    this.setState({ showModal: false });
  }

  handleShowDelete = () => {
    this.setState({ showModal: true });
  }

  render() {

    // Populate table that shows all Topics
    // Each <TopicManagePanel> consists of a <tr> table row
    let topicsArray = this.props.state.topics.allTopics;
    let topicPanels = topicsArray.map((topic) => {
      return <TopicManagePanel key={topic.id}
                              topic={topic}
                              handleShowDelete={this.handleShowDelete}/>
    });

    return (
      <div>
        <Jumbotron className="pt-2 pb-2 text-center">
          <h2>Manage Topics</h2>
          Logged in as [Matt]
            {/* <RegisterModal/> */}
        </Jumbotron>

        <Container>
          <Row>
            {/* Create New Topic */}
            <TopicManageAddPanel />
          </Row>

          <hr/>
          
          <Row>
            <h3>Edit Topics</h3>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>Title</td>
                  <td>Premise</td>
                  <td>Edit</td>
                  <td>Published</td>
                  <td>Featured</td>
                  <td>Delete</td>
                </tr>

                {topicPanels}
                
              </tbody>
            </Table>
          </Row>
        </Container>          
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
  user: state.user
});

export default connect(mapStateToProps)(TopicManage);