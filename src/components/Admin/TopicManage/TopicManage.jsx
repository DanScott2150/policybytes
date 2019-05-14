import React, { Component } from 'react'
import { connect } from 'react-redux'

import Footer from '../../Footer/Footer.jsx'
import TopicManagePanel from './TopicManagePanel.jsx'
import RegisterModal from '../RegisterModal/RegisterModal.js'
import TopicManageAddPanel from './TopicManageAddPanel.jsx'

import SiteInformationPanel from '../SiteInformation/SiteInformation';

import './TopicManage.css'; 

// import { Panel, Button, ButtonGroup, ButtonToolbar, Glyphicon, Modal, Grid, Row, Col } from 'react-bootstrap'; 

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class TopicManage extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      showModal: false,  
    }
  }

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
    console.log('in FETCH_ALL_TOPICS');
    this.props.dispatch({
      type: 'FETCH_ALL_TOPICS'
    })
  }


  handleDismiss = () => {
    this.setState({ showModal: false });
  }

  handleShowDelete = () => {
    this.setState({ showModal: true });
  }




  render() {
    
    console.log("topic manage render");
    let topicsArray = this.props.state.topics.allTopics;
    let topicPanels = topicsArray.map((topic) => {
      return <TopicManagePanel key={topic.id}
                              topic={topic}
                              handleShowDelete={this.handleShowDelete}/>
    })


    return (
      <div>
        <div className="wrapper">

        <h2>
          Topic Manage Page
          <RegisterModal/>
        </h2>   


        <Container>
          <Row>

          <TopicManageAddPanel />
            {topicPanels}
          </Row>
        </Container>          


        </div>
        {/* <Footer /> */}

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  state,
  user: state.user
})


export default connect(mapStateToProps)(TopicManage);
