import React, { Component } from 'react'
import { connect } from 'react-redux'

import StreamItemForm from './StreamItemForm.jsx'
// import SelectForm from './SelectForm.jsx'


import { Card, Form, Button, ButtonGroup, FormGroup, FormLabel, FormControl } from 'react-bootstrap'; 
import { Stream } from 'stream';


class KeyClaimForm extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }


    handleChange = (event) => {
        this.props.handleKeyClaimChange(event); 
    }

//adding a new value to this.state.streamData object that will be the ID of the new key claim 
    addStreamItem = () => {
        let streamItemId = Object.keys(this.props.keyClaims[this.props.claimId].streamData).length;
        let claimId = this.props.claimId; //<-- local ID of the key claim that this lives in
        //packaging up the object to send to the reducer
        let payloadObject = {
            streamItemId: streamItemId,
            claimId: claimId
        }
        this.props.dispatch({
            type: 'ADD_STREAM_ITEM',
            payload: payloadObject
        })
    }


  render() {
    //ID of the keyClaim
    let claimId = this.props.claimId; 

    let match = this.props.edit && this.props.edit;

    console.log(match);


    //Object containg all keyClaim information passed down on props
    //individual keyClaim ID used to pick out the streamData object on each keyClaim
    //looping over this unique streamData object to create the correct number of streamInputForms
   
    // let streamDataObject = this.props.keyClaimIdObject[claimId].streamData;
    // let streamItemForms = []
    // for (const streamItem in streamDataObject) {      
    //     streamItemForms.push(
    //     <StreamItemForm key={streamItem}
    //                     claimId ={this.props.claimId}
    //                     streamId={streamItem}
    //                     keyClaims={this.props.keyClaims}
    //                     handleKeyClaimChange={this.handleKeyClaimChange}
    //                     handleStreamChange={this.props.handleStreamChange}/>
    //   )
    // }    

    return (
      <div>

          <Card className="p-2">

            {/* <Card.Header> */}

          {/* <pre>claim Id: {JSON.stringify(this.props.keyClaims, null, 2)}</pre> */}

      {/* <Form>
                <Form.Group controlId="keyClaimFormSelect">
                  <Form.Label>Key Claims</Form.Label>
                    <Form.Control 
                                  as="select"
                                    name="claimContributor" 
                                    onChange={this.handleChange}
                                    id={this.props.claimId}  
                                    value={this.props.keyClaims[this.props.claimId].claimContributor} 
                                    >
                        <option key="0" value="a">-- Select Contributor --</option>
                        <option key="1" value="contributor1">Contributor 1</option>
                        <option key="2" value="contributor2">Contributor 2</option>
                    </Form.Control>
                </Form.Group>
            </Form> */}

            {/* </Card.Header> */}


              <Card.Body className="p-0">
              {/* <h4>Claim Order: {(Number(this.props.claimId) + 1)}</h4>
              <br/> */}
              <Form>
              <Form.Group controlId="keyClaimData">
                {/* <Form.Label>Key Claim</Form.Label> */}
                <Form.Control onChange={this.handleChange} 
                            id={this.props.claimId}
                            name="keyClaim" 
                            value={this.props.keyClaims[this.props.claimId].keyClaim} 
                            as="textarea"
                            rows="5" />

{/* Variable holding .map of <StreamItemForm>  */}
            {/* {streamItemForms} */}

              <ButtonGroup className="wireCommentButtons">
                <Button bsStyle="danger" onClick={this.props.deleteKeyClaim}>Delete Key Claim</Button>
                {/* {!match ? <Button onClick={this.addStreamItem}>Add Stream Item</Button> : <Button disabled>Add Stream Item</Button>} */}
              </ButtonGroup>
              </Form.Group>
            </Form>
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


export default connect(mapStateToProps)(KeyClaimForm); 
