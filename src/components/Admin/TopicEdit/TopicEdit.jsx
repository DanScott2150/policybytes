// Topic Edit Page
// Fetches Topic Info for a given Topic ID, creates a 
// copy of it in a cache

import React, { Component } from 'react'
import { connect } from 'react-redux'

import ImageUpload from '../../Images/Images.jsx'
import KeyClaimForm from './KeyClaimForm.jsx'
import KeyClaimPanel from '../../TopicPage/KeyClaimPanel'
import StreamItemFactory from '../../TopicPage/StreamItemFactory'
import StreamItemEditFactory from './StreamItemEditFactory'
import SubmitAlert from './SubmitAlert.jsx'
import StreamItemForm from './StreamItemForm.jsx'

import EditTitleContent from './EditTitleContent.jsx';
import EditContributors from './EditContributors.jsx';
import EditCommonGround from './EditCommonGround.jsx';
import EditProposals from './EditProposals.jsx';
import EditKeyClaims from './EditKeyClaims.jsx';

import { Redirect } from 'react-router';


import { Card, Jumbotron, Button, Container, Row, Col, FormLabel, FormControl, Image, Tabs, Tab, Alert } from 'react-bootstrap';
import './TopicEdit.css'

let debug = false;

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
      // this.fetchEditCache();
    } else {
      this.props.dispatch({
        type: 'RESET_EDIT_CACHE',
        payload: editTopicId
      })
      this.setState({
        edit: false,
      })
      // this.fetchEditCache();
    }
  }

  fetchEditCache = () => {
    // FETCH_EDIT_CACHE => atticusTopicEditReducer => return state
    this.props.dispatch({
      type: 'FETCH_EDIT_CACHE'
    })
  }

  // // CHANGE_KEY_CLAIM_INFO => [atticusReducer] topicEditCache => updates Key Claim for given ID
  // // ID = claimID
  // handleKeyClaimChange = (event) => {
  //   this.props.dispatch({
  //     type: 'CHANGE_KEY_CLAIM_INFO',
  //     payload: event.target
  //   })
  // }

  handleStreamChange = (event, claimId, streamId) => {
    let payloadPackage = {
      claimId: claimId,
      streamId: streamId,
      eventTarget: event.target
    }
    this.props.dispatch({
      type: 'CHANGE_STREAM_ITEM_INFO',
      payload: payloadPackage
    })
  }

  //Send local state object to Redux
  handleSubmit = (event) => {
    event.preventDefault();
    if (debug) { console.log('form submit clicked, contents:', this.state); }

    let editTopicId = this.props.match.params.id;

    if (editTopicId) {
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

  handleTextChange = (event) => {    
    // CHANGE_TOPIC_INFO => [atticusTopicReducer.js] topicEditCache => return ...state, action.payload name & value
    this.props.dispatch({
      type: 'CHANGE_TOPIC_INFO',
      payload: event.target
    })
  }

  handleTabSelect = (key) => {
    this.setState({
      contributorSelect: key
    })
  }

  //When mouse hovers over a key claim, show the associated stream in the chatbox
  // handleHoverShowStream = (id) => {
  //   if (this.state.keyClaimLocked === false) {
  //     this.setState({
  //       showStreamForClaim: id
  //     })
  //   }
  // }

  //When mouse hover ends, hide associated stream in chatbox
  // handleHoverHideStream = (id) => {
  //   if (this.state.keyClaimLocked === false) {
  //     this.setState({
  //       showStreamForClaim: undefined
  //     })
  //   }
  // }

  //When a key claim is clicked, "lock" it as active and populate the chatbox with the stream
  // toggleClickShowStream = (id) => {
  //   this.setState({
  //     showStreamForClaim: id,
  //     keyClaimLocked: !this.state.keyClaimLocked
  //   })
  // }

  //ADDING A NEW KEY CLAIM OBJECT TO THE EDITTOPICCACHE
  addKeyClaim = () => {
    const claimAddId = Object.keys(this.props.keyClaims).length; //REDUX, entire keyclaim object
    if (debug) { console.log(claimAddId); }
    this.props.dispatch({
      type: 'ADD_KEY_CLAIM',
      payload: claimAddId
    })
  }

  deleteKeyClaim = (id) => {
    this.props.dispatch({
      type: 'DELETE_KEY_CLAIM',
      payload: id
    })
  }

  handleDismiss = () => {
    if (debug) { console.log('in handledismiss'); }

    this.setState({
      submitAlert: false,
      fireRedirect: true  
    })
  }
  // handleUploadContent = (fileUploded, contributor) => {
  //   let fileUrl = fileUploded.url;
  //   console.log('file uploaded url:', fileUrl, "contributor", contributor);
  //   let pictureUploadPackage = {
  //     value: fileUrl, //<-- action.payload.value
  //     name: contributor //<-- action.payload.name is contributor1 or contributor2 
  //   }
  //   this.props.dispatch({
  //     type: 'CHANGE_TOPIC_INFO',
  //     payload: pictureUploadPackage
  //   })
  // }


  render() {
    
    let keyClaimIdObject = this.props.state.cacheEdit.topicEditCache.keyClaims;
    
    // <KeyClaimForm> components are input textareas for editing a given Key Claim
    // let keyClaimForms = []
    // for (const keyClaim in keyClaimIdObject) {
    //   if (keyClaimIdObject[keyClaim].claimContributor === this.state.contributorSelect){
    //     keyClaimForms.push(
    //       <KeyClaimForm 
    //         edit={this.state.edit}
    //         key={keyClaim}
    //         claimId={keyClaim}  //LOCAL, count to populate the view 
    //         keyClaimIdObject={this.props.state.cacheEdit.topicEditCache.keyClaims} ////REDUX, everything in keyclaims
    //         handleKeyClaimChange={this.handleKeyClaimChange}
    //         handleStreamChange={this.handleStreamChange}
    //         deleteKeyClaim={this.deleteKeyClaim} />
    //         );
    //     }
    // }

    // <KeyClaimPanel> components are the actual output panel for a given key claim
    // let keyClaimsArray = [];
    // for (const keyClaimId in this.props.state.cacheEdit.topicEditCache.keyClaims) {
    //   // Select claims for only for given contributor
    //   if (this.state.contributorSelect === this.props.state.cacheEdit.topicEditCache.keyClaims[keyClaimId].claimContributor) {
    //     keyClaimsArray.push(
    //       <KeyClaimPanel
    //         key={keyClaimId}
    //         keyClaimId={keyClaimId}
    //         keyClaim={this.props.state.cacheEdit.topicEditCache.keyClaims[keyClaimId]}
    //         showStreamForClaim={this.state.showStreamForClaim}
    //         keyClaimLocked={this.state.keyClaimLocked}
    //         handleHoverShowStream={this.handleHoverShowStream}
    //         handleHoverHideStream={this.handleHoverHideStream}
    //         toggleClickShowStream={this.toggleClickShowStream}
    //       />, <KeyClaimForm
    //         edit={this.state.edit}
    //         key={keyClaimId}
    //         claimId={keyClaimId}
    //         keyClaimIdObject={this.props.state.cacheEdit.topicEditCache.keyClaims}
    //         handleKeyClaimChange={this.handleKeyClaimChange}
    //         // handleStreamChange={this.handleStreamChange}
    //         deleteKeyClaim={this.deleteKeyClaim} />
    //     );
    //   }
    // }
    let claimId = this.props.claimId; 

    // let streamDataObject = this.props.keyClaimIdObject[claimId].streamData;
    // let streamItemForms = []
    // for (const streamItem in streamDataObject) {
    //   streamItemForms.push(
    //     <StreamItemForm key={streamItem}
    //       claimId={this.props.claimId}
    //       streamId={streamItem}
    //       keyClaims={this.props.keyClaims}
    //       handleKeyClaimChange={this.handleKeyClaimChange}
    //       handleStreamChange={this.props.handleStreamChange} />
    //   )
    // }    


    const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state
    
    //CHANGING ARENA CONTENT BASED ON SELECTED CONTRIBUTOR
    let arenaContainer = 'arenaContainer';
    let streamContainerClass = "streamItemsContainer";
    let arenaSummaryClass = 'arenaSummary';
    let arenaPhotoClass = 'arenaPhotoContrib1'
    let arenaPicture = this.props.state.cacheEdit.topicEditCache.photo1;
    let arenaProposal = this.props.state.cacheEdit.topicEditCache.proposal1;
    let arenaProposalId = this.props.state.cacheEdit.topicEditCache.proposal1DbId;
    let selectedContributor = this.props.state.cacheEdit.topicEditCache.contributor1FirstName;
    let tabNumber = 1;
    if (this.state.contributorSelect === 'contributor1') {
      arenaContainer = "arenaContainerContrib1"
      streamContainerClass += " contrib1"
      arenaSummaryClass += " contrib1"
      arenaPhotoClass = 'arenaPhotoContrib1'
      arenaPicture = this.props.state.cacheEdit.topicEditCache.photo1
      arenaProposal = this.props.state.cacheEdit.topicEditCache.proposal1;
      arenaProposalId = this.props.state.cacheEdit.topicEditCache.proposal1DbId;
      selectedContributor = this.props.state.cacheEdit.topicEditCache.contributor1FirstName;
      tabNumber = 1;
    }
    if (this.state.contributorSelect === 'contributor2') {
      arenaContainer += " contrib2"
      streamContainerClass += " contrib2"
      arenaSummaryClass += " contrib2"
      arenaPhotoClass = 'arenaPhotoContrib2'
      arenaPicture = this.props.state.cacheEdit.topicEditCache.photo2
      arenaProposal = this.props.state.cacheEdit.topicEditCache.proposal2;
      arenaProposalId = this.props.state.cacheEdit.topicEditCache.proposal2DbId;
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
              tabNumber={tabNumber}
              handleTextChange={this.handleTextChange}
              editProposal1={this.props.state.cacheEdit.topicEditCache.proposal1}
              editProposal2={this.props.state.cacheEdit.topicEditCache.proposal2}
            />

          <hr className="arenaDivider" />

          <EditKeyClaims
              allKeyClaims={this.props.state.cacheEdit.topicEditCache.keyClaims}
              contributorSelect={this.state.contributorSelect}
              selectedContributor={selectedContributor}
              streamContainerClass={streamContainerClass} />
            {/* <Container>
              <Row>
                <Col xs={4} style={{}}>
                  <h4 className="text-center">{selectedContributor}'s Key Claims</h4>
                  <div className="keyClaimsContainer">
                    <SimpleBar style={{ height: '100%' }}>
                      {keyClaimsArray}
                      <Button bsStyle="primary" onClick={this.addKeyClaim}>Add Key Claim</Button>
                    </SimpleBar>
                  </div>
                </Col>
                <Col xs={8} className="pl-0">
                  <h4 className="text-center">Discussion Thread</h4>
                  <div className={streamContainerClass}>
                    <SimpleBar style={{ height: '100%' }}>

                      <Image className="arenaMini1" src={this.props.state.cacheEdit.topicEditCache.photo1} thumbnail roundedCircle />
                      <Image className="arenaMini2" src={this.props.state.cacheEdit.topicEditCache.photo2} thumbnail roundedCircle />

                      <StreamItemFactory
                        keyClaims={this.props.state.cacheEdit.topicEditCache.keyClaims}
                        showStreamForClaim={this.state.showStreamForClaim} />
                      <StreamItemEditFactory
                        keyClaims={this.props.state.cacheEdit.topicEditCache.keyClaims}
                        showStreamForClaim={this.state.showStreamForClaim}
                        handleStreamChange={this.handleStreamChange}  />


                    </SimpleBar>
                  </div>
                </Col>
              </Row>
            </Container> */}


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
                <ImageUpload handleUploadContent={this.handleUploadContent}
                  contributor='topicReadMore'  //<-- topicReadMore is icon_url through full stack
                              />
              </Card.Body>
            </Card>


            <Card>
              <Card.Body>
                <FormLabel>Topic Summary (for archive)</FormLabel>
                <FormControl onChange={this.handleTextChange}
                  name="topicSummary"
                  value={this.props.state.cacheEdit.topicEditCache.topicSummary}  //<-- VALUE COMES FROM REDUX STATE 
                  componentClass="textarea" />
              </Card.Body>
            </Card>

           

            {/* Mapped array of number of key claims in this.props.state.keyClaims */}
              <h2>Stream</h2>
              {/* {streamItemForms} */}
              {/* <StreamItemFactory
                keyClaims={this.props.state.cacheEdit.topicEditCache.keyClaims}
                showStreamForClaim={this.state.showStreamForClaim} /> */}


            {/* Conditionally render a success/failure message based on result of submit */}
            <div>
              {this.state.submitAlert &&
                <SubmitAlert handleDismiss={this.handleDismiss} />
              }
            </div>
          
              <Button type="submit" bsStyle="primary">Submit!</Button>
            
          </form>
              {fireRedirect && (
              <Redirect to={from || '/admin'}/>)}
        </div>


      </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  keyClaims: state.cacheEdit.topicEditCache.keyClaims,
  state,
})

export default connect(mapStateToProps)(TopicEdit);