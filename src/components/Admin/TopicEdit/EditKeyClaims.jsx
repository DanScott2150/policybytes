// Subcomponent for editing Key Claims

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col, Button, Card, Image, FormLabel, FormControl } from 'react-bootstrap';

import KeyClaimForm from './KeyClaimForm.jsx';
import KeyClaimPanel from '../../TopicPage/KeyClaimPanel';
import EditStream from './EditStream.jsx';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

class EditKeyClaims extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // submitAlert: false,
      // photo1: '',
      // photo2: '',
      // topicReadMore: '',
      // fireRedirect: false,
      // edit: false,
      showStreamForClaim: undefined,
      keyClaimLocked: false,
      contributorSelect: this.props.contributorSelect,
      // editTitle: false  // is this used?
    }

  }
  
  componentWillUpdate() {
    // keyClaimsArray = [];
  }

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
    console.log("[EditKeyClaims.jsx] showStreamForClaim: ", this.state.showStreamForClaim);
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

    console.log("AAAAA: ", this.props.allKeyClaims);
    let keyClaimsArray = [];
    console.log("Contributor: ", this.props.contributorSelect);
    console.log("array: ", keyClaimsArray);

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
            deleteKeyClaim={this.deleteKeyClaim} />
        );
    }
    }

    return (
      <Container>
        <Row>

          {/* Key Claim Panel */}
          <Col xs={4} style={{}}>
            <h4 className="text-center">{this.props.selectedContributor}'s Key Claims</h4>
            <div className="keyClaimsContainer">
              <SimpleBar style={{ height: '100%' }}>
                {keyClaimsArray}
                {/* {keyClaimForms} */}
                <Button bsStyle="primary" onClick={this.addKeyClaim}>Add Key Claim</Button>
              </SimpleBar>
            </div>
          </Col>
          <EditStream
            streamContainerClass={this.props.streamContainerClass}
            keyClaims={this.props.state.cacheEdit.topicEditCache.keyClaims}
            showStreamForClaim={this.state.showStreamForClaim}
            handleStreamChange={this.props.handleStreamChange} />
          {/* <Col xs={8} className="pl-0">
            <h4 className="text-center">Discussion Thread</h4>
            <div className={this.props.streamContainerClass}>
              <SimpleBar style={{ height: '100%' }}>

                <Image 
                  className="arenaMini1" 
                  src={this.props.state.cacheEdit.topicEditCache.photo1} 
                  thumbnail 
                  roundedCircle />
                <Image 
                  className="arenaMini2" 
                  src={this.props.state.cacheEdit.topicEditCache.photo2} 
                  thumbnail 
                  roundedCircle />

                <StreamItemFactory
                  keyClaims={this.props.state.cacheEdit.topicEditCache.keyClaims}
                  showStreamForClaim={this.state.showStreamForClaim} />
                <StreamItemEditFactory
                  keyClaims={this.props.state.cacheEdit.topicEditCache.keyClaims}
                  showStreamForClaim={this.state.showStreamForClaim}
                  handleStreamChange={this.handleStreamChange} />


              </SimpleBar>
            </div>
          </Col> */}
        </Row>
      </Container>

    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  // keyClaims: state.cacheEdit.topicEditCache.keyClaims,
  // contributorSelect: state.contributorSelect,
  state,

})

export default connect(mapStateToProps)(EditKeyClaims);