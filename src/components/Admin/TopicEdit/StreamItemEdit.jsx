import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, ButtonGroup, Collapse, Form } from 'react-bootstrap';

// import LikeButtonStream from './LikeButtons/LikeButtonStream.jsx'

import Linkify from 'linkifyjs/react';

class StreamItemEdit extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: true,
            // streamContributor: '',
            // streamComment: '',
            // streamEvidence: '',
            // streamDbId: '',
        };
    }


    packageStreamChange = (event) => {
        console.log('stream id: ', this.props.streamId);
        console.log('claim id: ', this.props.claimId);
        let claimId = this.props.claimId;
        let streamId = this.props.streamId;
        let streamDbId = '';
        this.props.handleStreamChange(event, claimId, streamId, streamDbId)
    }

    // handleCommentStream = (streamItemInput) => {
    //     console.log('clicked!');
    //     this.props.dispatch({
    //         type: 'SET_STREAM_COMMENT',
    //         payload: streamItemInput,
    //     })
    //     this.props.dispatch({
    //         type: 'CLEAR_PROPOSAL_COMMENT'
    //     });
    //     this.props.dispatch({
    //         type: 'CLEAR_KEY_CLAIM_COMMENT'
    //     });
    // }

    handleOpen = () => {
        console.log('hey');

        this.setState({
            open: !this.state.open
        })
    }

    // handleStreamChange = (event, claimId, streamId) => {
    //     if (debug) { console.log('in topicEdit handle stream change, claim id:', claimId, 'streamId:', streamId); }
    //     if (debug) { console.log('event.target: ', event.target); }
    //     let payloadPackage = {
    //         claimId: claimId,
    //         streamId: streamId,
    //         eventTarget: event.target
    //     }
    //     this.props.dispatch({
    //         type: 'CHANGE_STREAM_ITEM_INFO',
    //         payload: payloadPackage
    //     })
    // }


    render() {

        let streamItemClass = "streamItemCard"
        if (this.props.streamItem.streamContributor === 'contributor1') {
            streamItemClass += " contrib1Stream"
        }
        if (this.props.streamItem.streamContributor === 'contributor2') {
            streamItemClass += " contrib2Stream"
        }

        return (
            <div onClick={this.handleOpen} aria-controls="evidence-collapse-text">
                <Card className={streamItemClass} expanded={this.state.open}>
                    <Card.Body className="p-3">
                        <Linkify tagName="div">{this.props.streamItem.streamComment}</Linkify>

                        <div className="evidenceTag">
                            Evidence {(this.state.open === true) ? <i className="fa fa-caret-up" aria-hidden="true"></i> : <i className="fa fa-caret-down" aria-hidden="true"></i>}
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
                        <Card className="wireStreamInput">
                            <Card.Body>
                                {/* <h5>Stream Order: {Number(this.props.streamId) + 1}</h5>
                                <br />
 */}

                                {/* <Form.Label>Select Contributor</Form.Label>
                                <Form.Control as="select"
                                    onChange={this.packageStreamChange}
                                    placeholder="select"
                                    id={this.props.streamId}
                                    name="streamContributor"
                                    value={this.props.streamItem.streamContributor}
                                >
                                    <option value="">-- Select Contributor --</option>
                                    <option value="contributor1">Contributor 1</option>
                                    <option value="contributor2">Contributor 2</option>
                                </Form.Control> */}

                                <Form.Label>Stream Comment</Form.Label>
                                <Form.Control onChange={this.packageStreamChange}
                                    id={this.props.claimId}
                                    name="streamComment"
                                    as="textarea"
                                    rows="3"
                                    value={this.props.streamItem.streamComment}
                                />

                                <Form.Label>Stream Comment Evidence</Form.Label>
                                <Form.Control onChange={this.packageStreamChange}
                                    id={this.props.claimId}
                                    name="streamEvidence"
                                    as="textarea"
                                    rows="3"
                                    value={this.props.streamItem.streamEvidence}
                                />


                            </Card.Body>
                        </Card>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state,
    user: state.user,
})

export default connect(mapStateToProps)(StreamItemEdit);
