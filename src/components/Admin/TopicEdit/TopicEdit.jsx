// Topic Edit Page
// Fetches Topic Info for a given Topic ID, creates a 
// copy of it in a cache

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';

import EditTitleContent from './EditTitleContent.jsx';
import EditContributors from './EditContributors.jsx';
import EditCommonGround from './EditCommonGround.jsx';
import EditProposals from './EditProposals.jsx';
import EditKeyClaims from './EditKeyClaims.jsx';
import ImageUpload from './ImageUpload.jsx';
import SubmitAlert from './SubmitAlert.jsx'

import { Card, Button, Container, FormLabel, FormControl, Tabs, Tab, Alert } from 'react-bootstrap';
import './TopicEdit.css'

class TopicEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      submitAlert: false,
      photo1: '',
      photo2: '',
      topicReadMore: '',
      fireRedirect: false,
      edit: false,
      // new additions:
      showStreamForClaim: undefined,
      keyClaimLocked: false,
      contributorSelect: 'contributor1',
      editTitle: false  // is this used?
    }
  }

  componentDidMount() {
    // Initialize page: fetch data for given topic and store in a separate editing cache
    this.populateEditCache();
    this.fetchEditCache();
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

  populateEditCache = () => {
    // Topic ID is passed in via URL parameter
    let editTopicId = this.props.match.params.id; 

    if (editTopicId) {

      //FETCH_EDIT_TOPIC_INFO => topicSaga.js fetchEditTopicInfoSaga()
      // ==> CACHE_TOPIC_TO_EDIT => atticusTopicEditReducer (cacheEdit) => const topicEditCache
      // ==> this.props.state.cacheEdit.topicEditCache
      this.props.dispatch({
        type: 'FETCH_EDIT_TOPIC_INFO',
        payload: editTopicId
      })
      this.setState({
        edit: true,
      })
    } else {
      this.props.dispatch({
        type: 'RESET_EDIT_CACHE',
        payload: editTopicId
      })
      this.setState({
        edit: false,
      })
    }
  }

  fetchEditCache = () => {
    // FETCH_EDIT_CACHE => atticusTopicEditReducer => return state
    this.props.dispatch({
      type: 'FETCH_EDIT_CACHE'
    })
  }

  //Send local state object to Redux
  handleSubmit = (event) => {
    event.preventDefault();
    
    let editTopicId = this.props.match.params.id;

    if (editTopicId) {
      //UPDATE_TOPIC => [topicSaga] updateTopic() => API call to /api/topic/updatetopic route
      //  => [topic.router] Update PSQL tables
      
      this.props.dispatch({
        type: 'UPDATE_TOPIC',
        payload: this.props.state.cacheEdit.topicEditCache,
      })
      this.setState({
        submitAlert: true,
      })
    } else {
      this.props.dispatch({
        type: 'SET_NEW_TOPIC',
        payload: this.props.state.cacheEdit.topicEditCache,
      })
      this.setState({
        submitAlert: true,
        fireRedirect: true
      })
    }
  }

  // Update display when a form is edited
  // Used by all "top-level" edit-related subcomponents (i.e. everything except key claims & stream items)
  handleTextChange = (event) => {    
    // CHANGE_TOPIC_INFO => [atticusTopicReducer.js] topicEditCache => return ...state, action.payload name & value
    this.props.dispatch({
      type: 'CHANGE_TOPIC_INFO',
      payload: event.target
    })
  }

  // Update which contributor is shown in the Arena when user clicks a given tab
  handleTabSelect = (key) => {
    this.setState({
      contributorSelect: key
    })
  }

  handleDismiss = () => {
    this.setState({
      submitAlert: false,
      fireRedirect: true  
    })
  }

  render() {

    // For redirect when user submits changes
    const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state
    
    // Setup Discussion Arena based on which contributor is selected
    // [There's probably a cleaner way to do all of this]
    // let arenaContainer = 'arenaContainer';
    let streamContainerClass = "streamItemsContainer";
    // let arenaSummaryClass = 'arenaSummary';
    let arenaPhotoClass = 'arenaPhotoContrib1'
    let arenaPicture = this.props.state.cacheEdit.topicEditCache.photo1;
    // let arenaProposalId = this.props.state.cacheEdit.topicEditCache.proposal1DbId;
    let arenaProposal = this.props.state.cacheEdit.topicEditCache.proposal1;
    let selectedContributor = this.props.state.cacheEdit.topicEditCache.contributor1FirstName;
    let tabNumber = 1;
    if (this.state.contributorSelect === 'contributor1') {
      // arenaContainer = "arenaContainerContrib1"
      streamContainerClass += " contrib1"
      // arenaSummaryClass += " contrib1"
      arenaPhotoClass = 'arenaPhotoContrib1'
      arenaPicture = this.props.state.cacheEdit.topicEditCache.photo1
      arenaProposal = this.props.state.cacheEdit.topicEditCache.proposal1;
      // arenaProposalId = this.props.state.cacheEdit.topicEditCache.proposal1DbId;
      selectedContributor = this.props.state.cacheEdit.topicEditCache.contributor1FirstName;
      tabNumber = 1;
    }
    if (this.state.contributorSelect === 'contributor2') {
      // arenaContainer += " contrib2"
      streamContainerClass += " contrib2"
      // arenaSummaryClass += " contrib2"
      arenaPhotoClass = 'arenaPhotoContrib2'
      arenaPicture = this.props.state.cacheEdit.topicEditCache.photo2
      arenaProposal = this.props.state.cacheEdit.topicEditCache.proposal2;
      // arenaProposalId = this.props.state.cacheEdit.topicEditCache.proposal2DbId;
      selectedContributor = this.props.state.cacheEdit.topicEditCache.contributor2FirstName
      tabNumber = 2;
    }

    const firstPersonTab = this.props.state.cacheEdit.topicEditCache.contributor1FirstName + "'s Viewpoint";
    const secondPersonTab = this.props.state.cacheEdit.topicEditCache.contributor2FirstName + "'s Viewpoint";

    return (
      <div id="topicEditMaster">
        <Alert variant="warning">Edit topic</Alert>

        {/* TOPIC TITLE & PREMISE */}
        <EditTitleContent 
          editTitle={this.props.state.cacheEdit.topicEditCache.topicTitle}
          editPremise={this.props.state.cacheEdit.topicEditCache.topicPremise}
          handleTextChange={this.handleTextChange}
          />
        
        {/* CONTRIBUTORS SECTION */}
        <EditContributors
          editPhoto1={this.props.state.cacheEdit.topicEditCache.photo1}
          editContributor1FirstName={this.props.state.cacheEdit.topicEditCache.contributor1FirstName}
          editContributor1LastName={this.props.state.cacheEdit.topicEditCache.contributor1LastName}
          editContributor1Bio={this.props.state.cacheEdit.topicEditCache.bio1}
          editPhoto2={this.props.state.cacheEdit.topicEditCache.photo2}
          editContributor2FirstName={this.props.state.cacheEdit.topicEditCache.contributor2FirstName}
          editContributor2LastName={this.props.state.cacheEdit.topicEditCache.contributor2LastName}
          editContributor2Bio={this.props.state.cacheEdit.topicEditCache.bio2}
          handleTextChange={this.handleTextChange}
          />

        {/* COMMON GROUND */}
        <EditCommonGround 
          editCommonGround={this.props.state.cacheEdit.topicEditCache.topicCommonGround}
          handleTextChange={this.handleTextChange}
          />

        {/* DISCUSSION ARENA */}
        <Container>

          {/* Tabs to Select Contributor */}
          <Tabs
            defaultActiveKey='contributor1'
            id="contributorSelectTabs"
            onSelect={this.handleTabSelect}
            animation={false}
            style={{ paddingLeft: '1em' }}
            >

            <Tab
              eventKey='contributor1'
              title={firstPersonTab}></Tab>
            <Tab
              eventKey='contributor2'
              title={secondPersonTab}></Tab>
          </Tabs>

          <Card className="border-top-0" style={{ backgroundColor: 'lightyellow', borderTopLeftRadius: '0' }}>

            {/* Proposals */}
            <EditProposals 
              tabNumber={tabNumber}
              arenaPhotoClass={arenaPhotoClass}
              arenaPicture={arenaPicture}
              selectedContributor={selectedContributor}
              arenaProposal={arenaProposal}
              handleTextChange={this.handleTextChange}
              editProposal1={this.props.state.cacheEdit.topicEditCache.proposal1}
              editProposal2={this.props.state.cacheEdit.topicEditCache.proposal2}
            />

          <hr className="arenaDivider" />

        {/* <EditKeyClaims> contains <EditStream> subcomponent */}
            <EditKeyClaims
                allKeyClaims={this.props.state.cacheEdit.topicEditCache.keyClaims}
                contributorSelect={this.state.contributorSelect}
                selectedContributor={selectedContributor}
                streamContainerClass={streamContainerClass} />

          </Card>
 

        <div className="wrapper">

          <h1>Topic Edit</h1>
          <form action="" onSubmit={this.handleSubmit}>
          <Button type="submit" bsStyle="primary">Submit!</Button>
          <div>
              {this.state.submitAlert &&
                <SubmitAlert handleDismiss={this.handleDismiss} />
              }
            </div>

            <Card>
              <Card.Body>
                <p>Upload Archive Icon</p>
                <br/>
                <ImageUpload 
                  contributor='topicReadMore'  //<-- why this name?
                  />
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <FormLabel>Topic Summary (for archive)</FormLabel>
                <FormControl onChange={this.handleTextChange}
                  name="topicSummary"
                  value={this.props.state.cacheEdit.topicEditCache.topicSummary}  //<-- VALUE COMES FROM REDUX STATE 
                  as="textarea"
                  rows="3" />
              </Card.Body>
            </Card>
            
          </form>

          {fireRedirect && (
          <Redirect to={from || '/admin'}/>)}
        </div>


        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  state,
})

export default connect(mapStateToProps)(TopicEdit);