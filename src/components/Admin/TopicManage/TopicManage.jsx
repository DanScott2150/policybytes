import React, { Component } from 'react'
import { connect } from 'react-redux'

// import Footer from '../../Footer/Footer.jsx'
import TopicManagePanel from './TopicManagePanel.jsx'
import RegisterModal from '../RegisterModal/RegisterModal.js'
import TopicManageAddPanel from './TopicManageAddPanel.jsx'

// import SiteInformationPanel from '../SiteInformation/SiteInformation';

import { Container, Row, Jumbotron, Table } from 'react-bootstrap';
import './TopicManage.css'; 

class TopicManage extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      showModal: false,  
    }
  }

  componentDidMount () {
    // Fetch all topics (published & unpublished) from database
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
    // console.log('in FETCH_ALL_TOPICS');
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
    // console.log("topic manage render");
    let topicsArray = this.props.state.topics.allTopics;
    let topicPanels = topicsArray.map((topic) => {
      return <TopicManagePanel key={topic.id}
                              topic={topic}
                              handleShowDelete={this.handleShowDelete}/>
    });

console.log(this.props.user);
    return (
      <div>
          <Jumbotron className="pt-2 pb-2 text-center">
            <h2>Manage Topics</h2>
            Logged in as 
            <RegisterModal/>
           </Jumbotron>

        <Container>
          <Row>
            {/* <h3>Create New Topic</h3> */}
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
