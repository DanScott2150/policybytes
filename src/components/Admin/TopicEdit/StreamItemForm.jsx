import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Tab, Tabs, Button, ButtonGroup, FormGroup, FormLabel, FormControl } from 'react-bootstrap'; 


class StreamItemForm extends Component {
  constructor (props) {
    super(props) 

    this.state = {
      streamContributor: '',
      streamComment: '',
      streamEvidence: '',
      streamDbId: '',
    }
  }


  packageStreamChange = (event) => {
    console.log('stream id: ',this.props.streamId);
    console.log('claim id: ',this.props.claimId);
    let claimId = this.props.claimId; 
    let streamId = this.props.streamId;
    let streamDbId = '';
    this.props.handleStreamChange(event, claimId, streamId, streamDbId)
  }

    
  render() {
    return (
      <div>

        {/* STREAM INPUTS */}
        <Card className="wireStreamInput">
          <Card.Body>
          <h5>Stream Order: {Number(this.props.streamId) + 1}</h5>
          <br/>

            
            <FormLabel>Select Contributor</FormLabel>
              <FormControl componentClass="select" 
                            onChange={this.packageStreamChange}
                            placeholder="select" 
                            id={this.props.streamId} 
                            name="streamContributor"
                            value={this.props.keyClaims[this.props.claimId].streamData[this.props.streamId].streamContributor}
                            >
                  <option value="">-- Select Contributor --</option>
                  <option value="contributor1">Contributor 1</option>
                  <option value="contributor2">Contributor 2</option>
              </FormControl>                  

            <FormLabel>Stream Comment</FormLabel>
              <FormControl onChange={this.packageStreamChange} 
                            id={this.props.claimId} 
                            name="streamComment" 
                            componentClass="textarea" 
                            value={this.props.keyClaims[this.props.claimId].streamData[this.props.streamId].streamComment}
                            />

            <FormLabel>Stream Comment Evidence</FormLabel>
              <FormControl onChange={this.packageStreamChange} 
                          id={this.props.claimId} 
                          name="streamEvidence" 
                          componentClass="textarea" 
                          value={this.props.keyClaims[this.props.claimId].streamData[this.props.streamId].streamEvidence}
                          />


          </Card.Body>
        </Card>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  keyClaims: state.cacheEdit.topicEditCache.keyClaims,
  state
})


export default connect(mapStateToProps)(StreamItemForm)
