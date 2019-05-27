// Subcomponent for editing Key Claims

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col, Image, Button } from 'react-bootstrap';

import StreamItem from '../../TopicPage/StreamItem.jsx';
import StreamItemEdit from './StreamItemEdit';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

class EditStream extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {

  //   }
  // }
  

  addStreamItem = (contributor) => {
    console.log("Add Stream for: ", contributor);
    let streamItemId = Object.keys(this.props.keyClaims[this.props.showStreamForClaim].streamData).length;
    let claimId = this.props.showStreamForClaim; //<-- local ID of the key claim that this lives in
    // let contributorId = this.props.state.cacheEdit.topicEditCache.contributor1DbId
        //packaging up the object to send to the reducer
        let payloadObject = {
            streamItemId: streamItemId,
            claimId: claimId,
            contributorId: contributor
        }

        this.props.dispatch({
            type: 'ADD_STREAM_ITEM',
            payload: payloadObject
        })
    }

  render() {
    console.log("props ", this.props);
    let streamItemArray = [];
    let keyClaimIdArray = Object.keys(this.props.keyClaims); //How many Key Claims there are

    // Loop through all Key Claims. 
    for (let i = 0; i < keyClaimIdArray.length; i++) {
      let keyClaimId = i;

      // 'showStreamForClaim' holds the ID for the selected Key Claim
      // The state is set in <EditKeyClaims>, and updates based on mouse hover or click on a given Key Claim

      // Check if Key Claim ID matches the ID that we want to show the stream for
      if (Number(this.props.showStreamForClaim) === keyClaimId) {
        let streamItemObject = this.props.keyClaims[i].streamData;

        // Now, loop through the stream and display for each item within it
        for (const streamItemId in streamItemObject) {
          streamItemArray.push(
            // Output Display Panel
            <StreamItem key={"streamDisplay" + streamItemId}
              keyClaimId={keyClaimId}
              streamItemId={streamItemId}
              streamItem={streamItemObject[streamItemId]}
              showStreamForClaim={this.props.showStreamForClaim} />,
            // Input Edit Form
            <StreamItemEdit key={"streamEdit" + streamItemId}
              keyClaimId={keyClaimId}
              claimId={keyClaimId}
              streamItemId={streamItemId}
              streamId={streamItemId}
              streamItem={streamItemObject[streamItemId]}
              showStreamForClaim={this.props.showStreamForClaim}
              />
          );
        }
      }
    }

    let addStreamItemButtons = [];
    if(this.props.showStreamForClaim){  //only show 'Add Stream Item' buttons if a Key Claim is selected
      addStreamItemButtons.push(
        <Button 
          key="contributor1button"
          variant="primary" 
          onClick={this.addStreamItem.bind(this, "contributor1")}>
            Add Stream Item for {this.props.state.cacheEdit.topicEditCache.contributor1FirstName}
        </Button>,
        <Button 
          key="contributor2button"
          variant="primary" 
          onClick={this.addStreamItem.bind(this, "contributor2")}>
            Add Stream Item for {this.props.state.cacheEdit.topicEditCache.contributor2FirstName}
        </Button>
      );
    }

    return (
      <Col xs={8} className="pl-0">
        <h4 className="text-center">Discussion Thread</h4>
        <div className={this.props.streamContainerClass}>
          <SimpleBar style={{ height: '100%' }}>
            <Image className="arenaMini1" src={this.props.state.cacheEdit.topicEditCache.photo1} thumbnail roundedCircle />
            <Image className="arenaMini2" src={this.props.state.cacheEdit.topicEditCache.photo2} thumbnail roundedCircle />

            <div>
              {streamItemArray}
            </div>

            { addStreamItemButtons }
            
          </SimpleBar>
        </div>
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
    user: state.user,
    // keyClaims: state.cacheEdit.topicEditCache.keyClaims,
    state,
})

export default connect(mapStateToProps)(EditStream);