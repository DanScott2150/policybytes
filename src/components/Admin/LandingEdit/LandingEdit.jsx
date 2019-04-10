import React, { Component } from 'react'
import { connect } from 'react-redux'

import Footer from '../../Footer/Footer.jsx'

import { Panel, Tab, Tabs, Button, ButtonGroup, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { Redirect } from 'react-router';

let debug = false;

class LandingEdit extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {

    }


    //currying function TO CHANGE REDUX STATE
    handleTextChange = (event) => {
        if (debug) { console.log('in handleTextChange, event.target: ', event.target.value); }
        this.props.dispatch({
            type: 'CHANGE_LANDING_INFO',
            payload: event.target
        })
    }


    render() {
    
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
                                    componentClass="textarea" />
                                <img src={this.props.state.cacheEdit.topicEditCache.topicReadMore} width="100" />

                                <p>Upload Archive Icon</p>
                                <br />
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
                                    componentClass="textarea" />
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
                                    componentClass="textarea" />
                                <ControlLabel>Contributor 1 Proposal Summary</ControlLabel>
                                <FormControl onChange={this.handleTextChange}
                                    name="proposal1"
                                    value={this.props.state.cacheEdit.topicEditCache.proposal1}  //<-- VALUE COMES FROM REDUX STATE 
                                    componentClass="textarea" />

                                <img src={this.props.state.cacheEdit.topicEditCache.photo1} width="300" />

                                <p>Upload Contributor 1 Photo</p>
                                <br />
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
                                    componentClass="textarea" />
                                <ControlLabel>Contributor 2 Proposal Summary</ControlLabel>
                                <FormControl onChange={this.handleTextChange}
                                    name="proposal2"
                                    value={this.props.state.cacheEdit.topicEditCache.proposal2}  //<-- VALUE COMES FROM REDUX STATE 
                                    componentClass="textarea"
                                />

                                <img src={this.props.state.cacheEdit.topicEditCache.photo2} width="300" />

                                <p>Upload Contributor 2 Photo</p>
                                <br />
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
                        <Redirect to={from || '/admin'} />)}
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


export default connect(mapStateToProps)(LandingEdit);
