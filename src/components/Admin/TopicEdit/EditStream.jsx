// Subcomponent for editing Key Claims

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col, Button, Card, Image, FormLabel, FormControl } from 'react-bootstrap';

import KeyClaimForm from './KeyClaimForm.jsx';
import KeyClaimPanel from '../../TopicPage/KeyClaimPanel';
import StreamItemFactory from '../../TopicPage/StreamItemFactory';
import StreamItemEditFactory from './StreamItemEditFactory';

import StreamItem from '../../TopicPage/StreamItem.jsx';
import StreamItemEdit from './StreamItemEdit';


import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

class EditStream extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {

    let streamItemArray = []
    console.log("MMMMM", this.props.keyClaims);
    //the goal of these nested for loops is to create the correct number of streamItems for each keyClaim 
    //And show/hide based on this.props.showStreamForClaim
    let keyClaimIdArray = Object.keys(this.props.keyClaims) //<-- find out how many key claims there are

    for (let i = 0; i < keyClaimIdArray.length; i++) {
      let keyClaimId = i   //Each keyClaim gets an Id
      if (Number(this.props.showStreamForClaim) === keyClaimId) {
        let streamItemObject = this.props.keyClaims[i].streamData  //Pick out full streamItems object for each keyClaim
        // console.log('keyClaimId:', keyClaimId, 'streamItemObject', streamItemObject, 'this.props.showStreamForClaim:', this.props.showStreamForClaim);
        for (const streamItemId in streamItemObject) { //Loop through each streamItem object and create correct number of StreamItemPanels
          streamItemArray.push(
            <StreamItem key={"streamDisplay" + streamItemId}
              keyClaimId={keyClaimId}
              streamItemId={streamItemId}
              streamItem={streamItemObject[streamItemId]}
              showStreamForClaim={this.props.showStreamForClaim} />,
            <StreamItemEdit key={"streamEdit" + streamItemId}
              keyClaimId={keyClaimId}
              claimId={keyClaimId}
              streamItemId={streamItemId}
              streamId={streamItemId}
              streamItem={streamItemObject[streamItemId]}
              showStreamForClaim={this.props.showStreamForClaim}
              handleStreamChange={this.props.handleStreamChange} />

          )
        }
      }
    }

    return (
      <Container>
        <Row>
          <Col xs={8} className="pl-0">
            <h4 className="text-center">Discussion Thread</h4>
            <div className={this.props.streamContainerClass}>
              <SimpleBar style={{ height: '100%' }}>
                <Image className="arenaMini1" src={this.props.state.cacheEdit.topicEditCache.photo1} thumbnail roundedCircle />
                <Image className="arenaMini2" src={this.props.state.cacheEdit.topicEditCache.photo2} thumbnail roundedCircle />

                <div>

                  {streamItemArray}

                </div>


              </SimpleBar>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
    user: state.user,
    // keyClaims: state.cacheEdit.topicEditCache.keyClaims,
    state,
})

export default connect(mapStateToProps)(EditStream);