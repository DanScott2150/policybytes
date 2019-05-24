// Component for Editing a selected key claim

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Form, Button, ButtonGroup } from 'react-bootstrap'; 

class KeyClaimForm extends Component {
  // constructor(props) {
  //   super(props);
  // }

  handleChange = (event) => {
    this.props.handleKeyClaimChange(event); 
  }

//adding a new value to this.state.streamData object that will be the ID of the new key claim 
    // addStreamItem = () => {
    //     let streamItemId = Object.keys(this.props.keyClaims[this.props.claimId].streamData).length;
    //     let claimId = this.props.claimId; //<-- local ID of the key claim that this lives in
    //     //packaging up the object to send to the reducer
    //     let payloadObject = {
    //         streamItemId: streamItemId,
    //         claimId: claimId
    //     }
    //     this.props.dispatch({
    //         type: 'ADD_STREAM_ITEM',
    //         payload: payloadObject
    //     })
    // }


  render() {
    //ID of the keyClaim
    // let claimId = this.props.claimId; 
    // let match = this.props.edit && this.props.edit;
    // console.log(match);

    return (
      <Card className="p-2">
        <Card.Body className="p-0">

          <Form>
            <Form.Group controlId="keyClaimData">
              <Form.Control 
                onChange={this.handleChange} 
                id={this.props.claimId}
                name="keyClaim" 
                value={this.props.keyClaims[this.props.claimId].keyClaim} 
                as="textarea"
                rows="5" />

              <ButtonGroup>
                <Button bsStyle="danger" onClick={this.props.deleteKeyClaim}>Delete Key Claim</Button>
              </ButtonGroup>

            </Form.Group>
          </Form>
        
        </Card.Body>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  keyClaims: state.cacheEdit.topicEditCache.keyClaims,
  state
})

export default connect(mapStateToProps)(KeyClaimForm); 
