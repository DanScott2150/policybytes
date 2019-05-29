// Subcomponent for editing Stream Items: Content & Evidence

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Collapse, Form, Button } from 'react-bootstrap';

// import LikeButtonStream from './LikeButtons/LikeButtonStream.jsx'

import Linkify from 'linkifyjs/react';

class StreamItemEdit extends Component {
  constructor(props/*, context*/) {
    super(props/*, context*/);

    this.state = {
      // Handles visibility for evidence section for given stream item
      // For the EDITABLE stream component (i.e. this file), the click-to-toggle functionality is disabled
      // Otherwise clicking into the form, or between form fields would cause it to toggle
      open: true,
    };
  }

  handleStreamChange = (event) => {
    let payloadPackage = {
      claimId: this.props.claimId,
      streamId: this.props.streamId,
      eventTarget: event.target
   }

   // CHANGE_STREAM_ITEM_INFO => atticusReducer (updates const topicEditCache)
    this.props.dispatch({
      type: 'CHANGE_STREAM_ITEM_INFO',
      payload: payloadPackage
    });
  }

  deleteStreamItem = (event) => {
    // console.log("delete stream props: ", this.props );
    let payloadPackage = {
      claimId: this.props.claimId,
      streamId: this.props.streamId,
      eventTarget: event.target
    }

    this.props.dispatch({
      type: 'DELETE_STREAM_ITEM',
      payload: payloadPackage
    });
  }

  render() {

    // Set conditional formatting based on which contributor is currently selected in the arena
    let streamItemClass = "streamItemCard"

    if (this.props.streamItem.streamContributor === 'contributor1') {
      streamItemClass += " contrib1Stream"
    }

    if (this.props.streamItem.streamContributor === 'contributor2') {
      streamItemClass += " contrib2Stream"
    }

    return (
      <div aria-controls="evidence-collapse-text">
        <Card className={streamItemClass} expanded={this.state.open.toString()}>
          <Card.Body className="p-3">

          {/* TOP SECTION: Stream Text Output */}
            <Linkify tagName="div">{this.props.streamItem.streamComment}</Linkify>

            <div className="evidenceTag">
              Evidence {
                (this.state.open === true) ? 
                  <i className="fa fa-caret-up" aria-hidden="true"></i> : 
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
              }
            </div>

            <Collapse in={this.state.open}>
              <div id="evidence-collapse-text">
                  <Linkify tagName="p">{this.props.streamItem.streamEvidence}</Linkify>

                  <Card.Footer className="keyClaimFooter">
                      {/* <ButtonGroup className="keyClaimFooterButtons">
                          <LikeButtonStream id={this.props.streamItem.streamDbId} />
                          <Button
                              a href="/topicPage#commentCardMaster"
                              variant="light"
                              onClick={() => this.handleCommentStream(this.props.streamItem)}
                              className="keyClaimFooterItem">
                              <i class="far fa-comment"></i>
                          </Button>
                      </ButtonGroup> */}
                  </Card.Footer>
              </div>
            </Collapse>

          {/* BOTTOM SECTION: Input fields */}
            <Card>
              <Card.Body>
                  <Form.Label>Stream Comment</Form.Label>
                  <Form.Control onChange={this.handleStreamChange}
                      id={this.props.claimId}
                      name="streamComment"
                      as="textarea"
                      rows="3"
                      value={this.props.streamItem.streamComment}
                  />

                  <Form.Label>Stream Comment Evidence</Form.Label>
                  <Form.Control onChange={this.handleStreamChange}
                      id={this.props.claimId}
                      name="streamEvidence"
                      as="textarea"
                      rows="3"
                      value={this.props.streamItem.streamEvidence}
                  />
              </Card.Body>

                <Button variant="danger" onClick={this.deleteStreamItem}>Delete Stream Item</Button>

            </Card>

          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    state,
    user: state.user,
})

export default connect(mapStateToProps)(StreamItemEdit);
