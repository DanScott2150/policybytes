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


  render() {

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
                <Button variant="danger" onClick={this.props.deleteKeyClaim}>Delete Key Claim</Button>
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
