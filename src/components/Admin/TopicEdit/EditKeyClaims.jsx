// Subcomponent to generate Key Claim Edit Panel

// Contains Key Claim & Stream Items subcomponents
//    <EditKeyClaims> [this file]
//      --> <KeyClaimPanel> [display output]
//      --> <KeyClaimForm>  [edit input form for KeyClaims]
//      --> <EditStreamFactory> [Populates arena with stream for a selected KeyClaim]
//          --> <StreamItem>  [display output]
//          --> <StreamItemEdit> [edit input form for Stream Items]

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col, Button } from 'react-bootstrap';

import KeyClaimForm from './KeyClaimForm.jsx';
import KeyClaimPanel from '../../TopicPage/KeyClaimPanel';
import EditStreamFactory from './EditStreamFactory.jsx';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

class EditKeyClaims extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showStreamForClaim: undefined,
      keyClaimLocked: false,
      contributorSelect: this.props.contributorSelect,
    }
  }

//Handle Mouse Hover & Click on Key Claims
  handleHoverShowStream = (id) => {
    if (this.state.keyClaimLocked === false) {
      this.setState({
        showStreamForClaim: id
      })
    }
  }

  handleHoverHideStream = (id) => {
    if (this.state.keyClaimLocked === false) {
      this.setState({
        showStreamForClaim: undefined
      })
    }
  }

  toggleClickShowStream = (id) => {
    this.setState({
      showStreamForClaim: id,
      keyClaimLocked: !this.state.keyClaimLocked
    })
  }
// End of Key Claim Mouse event handlers

  // Add Key Claim => atticusReducer
  addKeyClaim = () => {
    const claimAddId = Object.keys(this.props.allKeyClaims).length;
    const addPayload = {
      id: claimAddId,
      contributor: this.props.contributorSelect
    }
  
    this.props.dispatch({
      type: 'ADD_KEY_CLAIM',
      payload: addPayload
    });
  }

  // Delete Key Claim
  // DELETE_KEY_CLAIM => atticusReducer.jsx
  // Uses ES6 destructuring to remove Key Claim object from state
  // Changes the state of the topicEditCache, but does not hit the backend API 
  deleteKeyClaim = (id) => {
    let payloadPackage = {
      claimDbId: this.props.allKeyClaims[id].claimDbId,
      keyClaimDbId: id
    }
    console.log("Delete Key Claim: ", this.props.allKeyClaims[id]);
    this.props.dispatch({
      type: 'DELETE_KEY_CLAIM',
      payload: payloadPackage
    })
  }

  // CHANGE_KEY_CLAIM_INFO => [atticusReducer] topicEditCache => updates Key Claim for given ID
  // ID = claimID
  handleKeyClaimChange = (event) => {
    this.props.dispatch({
      type: 'CHANGE_KEY_CLAIM_INFO',
      payload: event.target
    })
  }

  render() {

    let keyClaimsArray = [];
    for (const keyClaimId in this.props.allKeyClaims) {

    // Select claims for only for given contributor
      if (this.props.contributorSelect === this.props.allKeyClaims[keyClaimId].claimContributor) {
        keyClaimsArray.push(
          <KeyClaimPanel
            key={"claim"+ keyClaimId}
            keyClaimId={keyClaimId}
            keyClaim={this.props.allKeyClaims[keyClaimId]}
            showStreamForClaim={this.state.showStreamForClaim}
            keyClaimLocked={this.state.keyClaimLocked}
            handleHoverShowStream={this.handleHoverShowStream}
            handleHoverHideStream={this.handleHoverHideStream}
            toggleClickShowStream={this.toggleClickShowStream}
          />,<KeyClaimForm
            edit={this.state.edit}
            key={"edit"+ keyClaimId}
            claimId={keyClaimId}
            handleKeyClaimChange={this.handleKeyClaimChange}
            deleteKeyClaim={this.deleteKeyClaim.bind(this, keyClaimId)} />
        );
      }
    }

    return (
      <Container>
        <Row>

          <Col xs={4} style={{}}>
            <h4 className="text-center">{this.props.selectedContributor}'s Key Claims</h4>
            <div className="keyClaimsContainer">
              <SimpleBar style={{ height: '100%' }}>

                {keyClaimsArray}
                <Button variant="primary" onClick={this.addKeyClaim}>Add Key Claim</Button>

              </SimpleBar>
            </div>
          </Col>

          <EditStreamFactory
            streamContainerClass={this.props.streamContainerClass}
            keyClaims={this.props.state.cacheEdit.topicEditCache.keyClaims}
            showStreamForClaim={this.state.showStreamForClaim} 
            />

        </Row>
      </Container>

    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  keyClaims: state.cacheEdit.topicEditCache.keyClaims,
  // contributorSelect: state.contributorSelect,
  state,

})

export default connect(mapStateToProps)(EditKeyClaims);