import React, { Component } from 'react'
import { connect } from 'react-redux'
import ImageUpload from '../../Images/Images.jsx'
import Footer from '../../Footer/Footer.jsx'
import KeyClaimForm from './KeyClaimForm.jsx'
import SubmitAlert from './SubmitAlert.jsx'

import ReactFilestack, { client } from 'filestack-react';
import filestack from 'filestack-js';
import { Panel, Tab, Tabs, Button, ButtonGroup, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

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
    console.log('ROUTE PARAMS', this.props.match.params.id);
    

    if (debug) { console.log('ROUTE PARAMS', this.props.match.params.id); }

    let keyClaimIdObject = this.props.state.cacheEdit.topicEditCache.keyClaims; //REDUX, everything in keyclaims
    let keyClaimForms = []
    for (const keyClaim in keyClaimIdObject) {
      keyClaimForms.push(
        <KeyClaimForm 
          edit={this.state.edit}
          key={keyClaim}
          claimId={keyClaim}  //LOCAL, count to populate the view 
          keyClaimIdObject={this.props.state.cacheEdit.topicEditCache.keyClaims} ////REDUX, everything in keyclaims
          handleKeyClaimChange={this.handleKeyClaimChange}
          handleStreamChange={this.handleStreamChange}
          deleteKeyClaim={this.deleteKeyClaim} />
      )
    }
    const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state
    

    return (
      <div id="topicEditMaster">
        <div className="wrapper">


          <h1>Topic Edit</h1>
          {/* <div id="demoButton" onClick={this.demoButton}></div> */}

          {/* SHOW STATE ON DOM */}
          {/* <pre>state: {JSON.stringify(this.state, null, 3)}</pre> */}
          {/* <pre>state: {JSON.stringify(this.props.state.cacheEdit.topicEditCache, null, 3)}</pre> */}
          {/* <pre>state: {JSON.stringify(this.props.state.cacheEdit.topicEditCache.topicReadMore, null, 3)}</pre> */}
          {/* <pre>{JSON.stringify(this.props.state.cacheEdit.topicEditCache.topicSummary, null, 3)}</pre> */} 
          {/* <pre>state: {JSON.stringify(this.props.keyClaims, null, 3)}</pre> */}
          {/* <pre>state: {JSON.stringify(this.props.uploadItem, null, 3)}</pre> */}

          <form action="" onSubmit={this.handleSubmit}>
          <Button type="submit" bsStyle="primary">Submit!</Button>
          <div>
              {this.state.submitAlert &&
                <SubmitAlert handleDismiss={this.handleDismiss} />
              }
            </div>

            <Panel>
              <Panel.Body>
                <ControlLabel>Topic Title</ControlLabel>
                <FormControl onChange={this.handleTextChange}
                  name="topicTitle"
                  value={this.props.state.cacheEdit.topicEditCache.topicTitle}  //<-- VALUE COMES FROM REDUX STATE 
                  componentClass="textarea"  />
                  <img src={this.props.state.cacheEdit.topicEditCache.topicReadMore} width="100" />
                
                <p>Upload Archive Icon</p>
                <br/>
                <ImageUpload handleUploadContent={this.handleUploadContent}
                  contributor='topicReadMore'  //<-- topicReadMore is icon_url through full stack
                              />
              </Panel.Body>
            </Panel>


            <Panel>
              <Panel.Body>
                <ControlLabel>Topic Summary (for archive)</ControlLabel>
                <FormControl onChange={this.handleTextChange}
                  name="topicSummary"
                  value={this.props.state.cacheEdit.topicEditCache.topicSummary}  //<-- VALUE COMES FROM REDUX STATE 
                  componentClass="textarea" />
              </Panel.Body>
            </Panel>

            <Panel>
              <Panel.Body>
                <ControlLabel>Topic Premise</ControlLabel>
                <FormControl onChange={this.handleTextChange}
                  name="topicPremise"
                  value={this.props.state.cacheEdit.topicEditCache.topicPremise}  //<-- VALUE COMES FROM REDUX STATE 
                  componentClass="textarea"  />
              </Panel.Body>
            </Panel>

            <Panel>
              <Panel.Body>
                <ControlLabel>Common Ground</ControlLabel>
                <FormControl onChange={this.handleTextChange}
                  name="topicCommonGround"
                  value={this.props.state.cacheEdit.topicEditCache.topicCommonGround}  //<-- VALUE COMES FROM REDUX STATE 
                  componentClass="textarea" />
              </Panel.Body>
            </Panel>

            <Panel>
              <Panel.Body>
                <ControlLabel>Contributor 1 First Name</ControlLabel>
                <FormControl onChange={this.handleTextChange}
                componentClass="textarea" 
                  name="contributor1FirstName"
                  value={this.props.state.cacheEdit.topicEditCache.contributor1FirstName}  //<-- VALUE COMES FROM REDUX STATE 
                />
                <ControlLabel>Contributor 1 Last Name</ControlLabel>
                <FormControl onChange={this.handleTextChange}
                componentClass="textarea" 
                  name="contributor1LastName"
                  value={this.props.state.cacheEdit.topicEditCache.contributor1LastName}  //<-- VALUE COMES FROM REDUX STATE 
                />
                <ControlLabel>Contributor 1 Bio</ControlLabel>
                <FormControl onChange={this.handleTextChange}
                  name="bio1"
                  value={this.props.state.cacheEdit.topicEditCache.bio1}  //<-- VALUE COMES FROM REDUX STATE 
                  componentClass="textarea"  />
                <ControlLabel>Contributor 1 Proposal Summary</ControlLabel>
                <FormControl onChange={this.handleTextChange}
                  name="proposal1"
                  value={this.props.state.cacheEdit.topicEditCache.proposal1}  //<-- VALUE COMES FROM REDUX STATE 
                  componentClass="textarea"  />

                <img src={this.props.state.cacheEdit.topicEditCache.photo1} width="300" />

                <p>Upload Contributor 1 Photo</p>
                <br/>
                <ImageUpload handleUploadContent={this.handleUploadContent}
                  contributor='photo1' />


              </Panel.Body>
            </Panel>

            <Panel>
              <Panel.Body>
                <ControlLabel>Contributor 2 First Name</ControlLabel>
                <FormControl onChange={this.handleTextChange}
                componentClass="textarea" 
                  name="contributor2FirstName"
                  value={this.props.state.cacheEdit.topicEditCache.contributor2FirstName}  //<-- VALUE COMES FROM REDUX STATE 
                />
                <ControlLabel>Contributor 2 Last Name</ControlLabel>
                <FormControl onChange={this.handleTextChange}
                componentClass="textarea" 
                  name="contributor2LastName"
                  value={this.props.state.cacheEdit.topicEditCache.contributor2LastName}  //<-- VALUE COMES FROM REDUX STATE 
                />
                <ControlLabel>Contributor 2 Bio</ControlLabel>
                <FormControl onChange={this.handleTextChange}
                  name="bio2"
                  value={this.props.state.cacheEdit.topicEditCache.bio2}  //<-- VALUE COMES FROM REDUX STATE 
                  componentClass="textarea"  />
                <ControlLabel>Contributor 2 Proposal Summary</ControlLabel>
                <FormControl onChange={this.handleTextChange}
                  name="proposal2"
                  value={this.props.state.cacheEdit.topicEditCache.proposal2}  //<-- VALUE COMES FROM REDUX STATE 
                  componentClass="textarea" 
                   />

                <img src={this.props.state.cacheEdit.topicEditCache.photo2} width="300" />

                <p>Upload Contributor 2 Photo</p>
                <br/>
                <ImageUpload handleUploadContent={this.handleUploadContent}
                  contributor='photo2' />


              </Panel.Body>
            </Panel>

            <Button bsStyle="primary" onClick={this.addKeyClaim}>Add Key Claim</Button>

            {/* Mapped array of number of key claims in this.props.state.keyClaims */}
            {keyClaimForms}


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
