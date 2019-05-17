import React, { Component } from 'react'
import { connect } from 'react-redux'
import ImageUpload from '../../Images/Images.jsx'
import Footer from '../../Footer/Footer.jsx'
import KeyClaimForm from './KeyClaimForm.jsx'
import KeyClaimPanel from '../../TopicPage/KeyClaimPanel'
import StreamItemFactory from '../../TopicPage/StreamItemFactory'
import SubmitAlert from './SubmitAlert.jsx'
import StreamItemForm from './StreamItemForm.jsx'

import TopicPage from '../../TopicPage/TopicPage';

import ReactFilestack, { client } from 'filestack-react';
import filestack from 'filestack-js';
import { Card, Jumbotron, Button, Container, Row, Col, FormLabel, FormControl, Image, Tabs, Tab, Alert } from 'react-bootstrap';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import { Redirect } from 'react-router';

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
      editTitle: false
    }
  }

  componentDidMount() {
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
    let editTopicId = this.props.match.params.id;    
    if (editTopicId) {
      this.props.dispatch({
        type: 'FETCH_EDIT_TOPIC_INFO',
        payload: editTopicId
      })
      this.setState({
        edit: true,
      })
      this.fetchEditCache();
    } else {
      this.props.dispatch({
        type: 'RESET_EDIT_CACHE',
        payload: editTopicId
      })
      this.setState({
        edit: false,
      })
      this.fetchEditCache();
    }
  }


  fetchEditCache = () => {
    this.props.dispatch({
      type: 'FETCH_EDIT_CACHE'
    })
  }

  handleKeyClaimChange = (event) => {
    this.props.dispatch({
      type: 'CHANGE_KEY_CLAIM_INFO',
      payload: event.target
    })
  }

  handleStreamChange = (event, claimId, streamId) => {
    if (debug) { console.log('in topicEdit handle stream change, claim id:', claimId, 'streamId:', streamId); }
    if (debug) { console.log('event.target: ', event.target); }
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
    ///SOME INDICATOR HERE

  }

  //currying function TO CHANGE REDUX STATE
  handleTextChange = (event) => {
    if (debug) { console.log('in handleTextChange, event.target: ', event.target.value); }
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
  handleHoverShowStream = (id) => {
    if (this.state.keyClaimLocked === false) {
      this.setState({
        showStreamForClaim: id
      })
    }
  }

  //When mouse hover ends, hide associated stream in chatbox
  handleHoverHideStream = (id) => {
    if (this.state.keyClaimLocked === false) {
      this.setState({
        showStreamForClaim: undefined
      })
    }
  }

  //When a key claim is clicked, "lock" it as active and populate the chatbox with the stream
  toggleClickShowStream = (id) => {
    this.setState({
      showStreamForClaim: id,
      keyClaimLocked: !this.state.keyClaimLocked
    })
  }

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
  handleUploadContent = (fileUploded, contributor) => {
    let fileUrl = fileUploded.url;
    console.log('file uploaded url:', fileUrl, "contributor", contributor);
    let pictureUploadPackage = {
      value: fileUrl, //<-- action.payload.value
      name: contributor //<-- action.payload.name is contributor1 or contributor2 
    }
    this.props.dispatch({
      type: 'CHANGE_TOPIC_INFO',
      payload: pictureUploadPackage
    })
  }

  // demoButton = () => {
  //   this.props.dispatch({
  //     type: 'DEMO_BUTTON',
  //   })
  // }



  render() {
    
    let keyClaimIdObject = this.props.state.cacheEdit.topicEditCache.keyClaims; //REDUX, everything in keyclaims
    let keyClaimForms = []
    for (const keyClaim in keyClaimIdObject) {
      // console.log("IIII", keyClaim);
      if (keyClaimIdObject[keyClaim].claimContributor === this.state.contributorSelect){
        keyClaimForms.push(
          <KeyClaimForm 
            edit={this.state.edit}
            key={keyClaim}
            claimId={keyClaim}  //LOCAL, count to populate the view 
            keyClaimIdObject={this.props.state.cacheEdit.topicEditCache.keyClaims} ////REDUX, everything in keyclaims
            handleKeyClaimChange={this.handleKeyClaimChange}
            handleStreamChange={this.handleStreamChange}
            deleteKeyClaim={this.deleteKeyClaim} />
            );
        }
    }

    let keyClaimsArray = [];
    for (const keyClaimId in this.props.state.cacheEdit.topicEditCache.keyClaims) {
      // Select claims for only for given contributor
      if (this.state.contributorSelect === this.props.state.cacheEdit.topicEditCache.keyClaims[keyClaimId].claimContributor) {
        keyClaimsArray.push(
          <KeyClaimPanel
            key={keyClaimId}
            keyClaimId={keyClaimId}
            keyClaim={this.props.state.cacheEdit.topicEditCache.keyClaims[keyClaimId]}
            showStreamForClaim={this.state.showStreamForClaim}
            keyClaimLocked={this.state.keyClaimLocked}
            handleHoverShowStream={this.handleHoverShowStream}
            handleHoverHideStream={this.handleHoverHideStream}
            toggleClickShowStream={this.toggleClickShowStream}
          />
        );
      }
    }
    let claimId = this.props.claimId; 

    let streamDataObject = this.props.keyClaimIdObject[claimId].streamData;
    let streamItemForms = []
    for (const streamItem in streamDataObject) {
      streamItemForms.push(
        <StreamItemForm key={streamItem}
          claimId={this.props.claimId}
          streamId={streamItem}
          keyClaims={this.props.keyClaims}
          handleKeyClaimChange={this.handleKeyClaimChange}
          handleStreamChange={this.props.handleStreamChange} />
      )
    }    

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
        <Jumbotron className="text-center">
          <h1><strong>{this.props.state.cacheEdit.topicEditCache.topicTitle}</strong></h1>
          <p>{this.props.state.cacheEdit.topicEditCache.topicPremise}</p>

          <FormLabel>Topic Title</FormLabel>
          <FormControl onChange={this.handleTextChange}
            name="topicTitle"
            value={this.props.state.cacheEdit.topicEditCache.topicTitle}  //<-- VALUE COMES FROM REDUX STATE 
            componentClass="textarea"
            size="lg"
            className="w-50"
            style={{margin: '0 auto'}} />

          {/* <img src={this.props.state.cacheEdit.topicEditCache.topicReadMore} width="100" /> */}
          <FormLabel>Topic Premise</FormLabel>
          <FormControl onChange={this.handleTextChange}
            name="topicPremise"
            value={this.props.state.cacheEdit.topicEditCache.topicPremise}  //<-- VALUE COMES FROM REDUX STATE 
            as="textarea"
            rows="3"
            className="w-50"
            style={{ margin: '0 auto' }} />

        </Jumbotron>

        {/* CONTRIBUTORS SECTION */}
        <Container>
          <Row>
            <Col>
              <Card className="contributorCardLeft">
                <Card.Body>
                  <Image
                    className="contributorPhotoLeft"
                    src={this.props.state.cacheEdit.topicEditCache.photo1}
                    thumbnail
                    roundedCircle />
                  <div className="contributorText">
                    <h3 className="contributorName">
                      {this.props.state.cacheEdit.topicEditCache.contributor1FirstName} {this.props.state.cacheEdit.topicEditCache.contributor1LastName}
                    </h3>
                    <p className="text-justify">
                      {this.props.state.cacheEdit.topicEditCache.bio1}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
             

            <Col>
              <Card className="contributorCardRight">
                <Card.Body>
                  <Image
                    className="contributorPhotoRight"
                    src={this.props.state.cacheEdit.topicEditCache.photo2}
                    thumbnail
                    roundedCircle />
                  <div className="contributorText">
                    <h3 className="contributorName">
                      {this.props.state.cacheEdit.topicEditCache.contributor2FirstName} {this.props.state.cacheEdit.topicEditCache.contributor2LastName}
                    </h3>
                    <p className="text-justify">
                      {this.props.state.cacheEdit.topicEditCache.bio2}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>

          </Row>
          <Row>
            <Col>
            <Card>
              <Card.Body>
                <FormLabel>Contributor 1 First Name</FormLabel>
                <FormControl onChange={this.handleTextChange}
                  componentClass="textarea"
                  name="contributor1FirstName"
                  value={this.props.state.cacheEdit.topicEditCache.contributor1FirstName}  //<-- VALUE COMES FROM REDUX STATE 
                />
                <FormLabel>Contributor 1 Last Name</FormLabel>
                <FormControl onChange={this.handleTextChange}
                  componentClass="textarea"
                  name="contributor1LastName"
                  value={this.props.state.cacheEdit.topicEditCache.contributor1LastName}  //<-- VALUE COMES FROM REDUX STATE 
                />
                <FormLabel>Contributor 1 Bio</FormLabel>
                <FormControl onChange={this.handleTextChange}
                  name="bio1"
                  value={this.props.state.cacheEdit.topicEditCache.bio1}  //<-- VALUE COMES FROM REDUX STATE 
                  componentClass="textarea"
                    as="textarea"
                    rows="3" />
                  <img src={this.props.state.cacheEdit.topicEditCache.photo1} width="100" />

                  <p>Upload Contributor 1 Photo</p>
                  <br />
                  <ImageUpload handleUploadContent={this.handleUploadContent}
                    contributor='photo1' />
              </Card.Body>
            </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <FormLabel>Contributor 2 First Name</FormLabel>
                  <FormControl onChange={this.handleTextChange}
                    componentClass="textarea"
                    name="contributor2FirstName"
                    value={this.props.state.cacheEdit.topicEditCache.contributor2FirstName}  //<-- VALUE COMES FROM REDUX STATE 
                  />
                  <FormLabel>Contributor 2 Last Name</FormLabel>
                  <FormControl onChange={this.handleTextChange}
                    componentClass="textarea"
                    name="contributor2LastName"
                    value={this.props.state.cacheEdit.topicEditCache.contributor2LastName}  //<-- VALUE COMES FROM REDUX STATE 
                  />
                  <FormLabel>Contributor 2 Bio</FormLabel>
                  <FormControl onChange={this.handleTextChange}
                    name="bio2"
                    value={this.props.state.cacheEdit.topicEditCache.bio2}  //<-- VALUE COMES FROM REDUX STATE 
                    componentClass="textarea"
                    as="textarea"
                    rows="3" />
                 

                  <img src={this.props.state.cacheEdit.topicEditCache.photo2} width="100" />

                  <p>Upload Contributor 2 Photo</p>
                  <br />
                  <ImageUpload handleUploadContent={this.handleUploadContent}
                    contributor='photo2' />


                </Card.Body>
              </Card>


            </Col>

          </Row>

        </Container>

        {/* COMMON GROUND */}
        <div className="text-center">
          <h2>Common Ground</h2>
          Both particpants agree that:
          <p>{this.props.state.cacheEdit.topicEditCache.topicCommonGround}</p>
          <Card>
            <Card.Body>
              <FormLabel>Common Ground</FormLabel>
              <FormControl onChange={this.handleTextChange}
                name="topicCommonGround"
                value={this.props.state.cacheEdit.topicEditCache.topicCommonGround}  //<-- VALUE COMES FROM REDUX STATE 
                componentClass="textarea"
                as="textarea"
                rows="3"
                className="w-50" />
            </Card.Body>
          </Card>
        </div>

        {/* DISCUSSION ARENA */}
        <Container>
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

          {/* ARENA */}
          <Card className="border-top-0" style={{ backgroundColor: 'lightyellow', borderTopLeftRadius: '0' }}>

          {/* Proposals */}
            <Container>
              <Row>
                <Card className="border-0" style={{ backgroundColor: 'inherit' }}>
                  <Card.Body>
                    <Image
                      className={arenaPhotoClass}
                      src={arenaPicture}
                      thumbnail
                      roundedCircle />
                    <div className="arenaProposal">
                      <h3>{selectedContributor}'s Proposal: </h3>
                      <p className="mb-0">{arenaProposal}</p>

                      <FormLabel>{selectedContributor}'s Proposal Summary</FormLabel>
                      <FormControl onChange={this.handleTextChange}
                        name={tabNumber === 1 ? "proposal1" : "proposal2"}
                        value={tabNumber === 1 ? this.props.state.cacheEdit.topicEditCache.proposal1 : this.props.state.cacheEdit.topicEditCache.proposal2 }  //<-- VALUE COMES FROM REDUX STATE 
                        as="textarea"
                        style={{backgroundColor: '#fff3cd'}}
                      rows="3" />

                      
                    </div>
                  </Card.Body>
                </Card>
              </Row>
            </Container>

            <hr className="arenaDivider" />

            <Container>
              <Row>

                {/* Key Claim Panel */}
                <Col xs={4} style={{}}>
                  <h4 className="text-center">{selectedContributor}'s Key Claims</h4>
                  <div className="keyClaimsContainer">
                    <SimpleBar style={{ height: '100%' }}>
                      {keyClaimsArray}
                      {keyClaimForms}
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


                    </SimpleBar>
                  </div>
                </Col>
              </Row>
            </Container>


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
              {streamItemForms}


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