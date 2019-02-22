import React, { Component } from 'react'
import { connect } from 'react-redux'
import { USER_ACTIONS } from '../../../redux/actions/userActions';

import { Panel, Tab, Tabs, Button, ButtonGroup, Glyphicon, Form, FormGroup, ControlLabel, FormControl, Image, Well } from 'react-bootstrap';

import './CommentSection.css'


class CommentAdd extends Component {

    constructor() {
        super();
        //NOTE: approved is currently hard-coded. If backend validation of topics is implemented, can be responsive.
        //TO-DO typeRef would be a string or int coming from redux that would trigger a conditional in query on server to put in appropriate comment table. itemId would refer to redux to reference appropriate item.
        this.state = {
            referenceText: '',
            typeRef: '',
            itemId: '',
            placeholder: '',
            comment: '',
            personId: '',
            topic_id: '',
            stream_id: '',
            key_claim_id: '',
            proposal_id: '',
            owner: '',
            approved: true,
            lastOrder: '',
            commentPanelClass: 'addCommentPanel'
        }
    }

    componentWillMount = () => {
        if (this.props.isReply) {
            this.setState({
                placeholder: 'Write a reply...',
                commentPanelClass: 'addCommentPanelReply'
            })
        } else {
            this.setState({
                placeholder: 'Join the Conversation...',
                commentPanelClass: 'addCommentPanel'

            })
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.comments.commentsGeneral !== this.props.comments.commentsGeneral && !this.props.isReply) {
            this.setState({
                referenceText: '',
                typeRef: '',
                itemId: '',
                placeholder: 'Join the Conversation...',
                comment: '',
                personId: '',
                topic_id: '',
                stream_id: '',
                key_claim_id: '',
                proposal_id: '',
                owner: '',
                approved: true,
                lastOrder: ''
            })
        } else if (nextProps.comments.commentsGeneral !== this.props.comments.commentsGeneral && this.props.isReply) {
            this.setState({
                referenceText: '',
                typeRef: '',
                itemId: '',
                placeholder: 'Write a reply...',
                comment: '',
                personId: '',
                topic_id: '',
                stream_id: '',
                key_claim_id: '',
                proposal_id: '',
                owner: '',
                approved: true,
                lastOrder: ''
            })
        }
    }


    handleSubmit = (event) => {
        // event.preventDefault(); 
        console.log('this.props.comments.streamComment.streamDbId', this.props.comments.streamComment.streamDbId);
        console.log('this.props.comments.keyClaimComment.claimDbId', this.props.comments.keyClaimComment.claimDbId);
        if ((this.state.comment != '') && !this.props.isReply) {
            this.setState({
                personId: this.props.user.userInfo.id,
                topic_id: this.props.topic_id,
                approved: true,
                stream_id: this.props.comments.streamComment.streamDbId,
                key_claim_id: this.props.comments.keyClaimComment.claimDbId,
                proposal_id: this.props.comments.proposalComment.proposalDbId,
                owner: '',
                lastOrder: ''
            }, () => {
                this.handleSubmitDispatch();
                console.log('state stream_id', this.state.stream_id);
                console.log('state key_claim_Id', this.state.key_claim_id);

            });
        } else if ((this.state.comment != '') && this.props.isReply) {
            this.setState({
                personId: this.props.user.userInfo.id,
                topic_id: this.props.topic_id,
                approved: true,
                lastOrder: this.props.lastOrder,
                owner: this.props.owner,
                stream_id: '',
                proposal_id: '',
                key_claim_id: ''
            }, () => {
                this.handleSubmitDispatch();
                this.props.showAddCommentShown();
            });
        } else {
            this.setState({
                placeholder: `Did you want to write something?`
            });
        }
    }

    handleSubmitDispatch = () => {
        this.props.dispatch({
            type: 'SET_NEW_COMMENT',
            payload: this.state,
        });
        this.props.dispatch({
            type: 'CLEAR_STREAM_COMMENT'
        });
        this.props.dispatch({
            type: 'CLEAR_KEY_CLAIM_COMMENT'
        });

    }

    handleClose = () => {
        this.props.showAddCommentShown();
    }

    handleTextChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    render() {

        let fbPicture = this.props.user.userInfo && this.props.user.userInfo.fbPicture;
        let keyClaimText = this.props.comments.keyClaimComment && this.props.comments.keyClaimComment.keyClaim;
        let streamText = this.props.comments.streamComment && this.props.comments.streamComment.streamComment;
        let proposalText = this.props.comments.proposalComment && this.props.comments.proposalComment.proposal;

        let keyClaimContributor = this.props.comments.keyClaimComment && this.props.comments.keyClaimComment.claimContributor;
        let streamContributor = this.props.comments.streamComment && this.props.comments.streamComment.streamContributor;
        let proposalContributor = this.props.comments.proposalComment && this.props.comments.proposalComment.proposalContributor;


        let referenceTextClass = 'referenceTextContrib2';

        if (keyClaimContributor === 'contributor2' || streamContributor === 'contributor2' || proposalContributor === 'contributor2') {
            referenceTextClass = 'referenceTextContrib2';
        } else {
            referenceTextClass = 'referenceTextContrib1';
        }


        console.log('this is referenceTextClass', referenceTextClass);

        return (
            <Panel className={this.state.commentPanelClass}>
                {/* <Panel.Body> */}
                    <div   >
                        <Form>
                            <FormGroup className="addCommentPicAndResponse" controlId="formControlsTextarea">
                                    {(keyClaimText || streamText || proposalText) ?
                                        <Panel className={referenceTextClass}>
                                            responding to...   "
                                            <span dangerouslySetInnerHTML={{ __html: keyClaimText}} />
                                            <span dangerouslySetInnerHTML={{ __html: streamText}} />
                                            <span dangerouslySetInnerHTML={{ __html: proposalText}} />
                                                    
                                        </Panel> : null}
                                    <Image className='addCommentPic' circle src={fbPicture} />

                                <FormControl className='addCommentResponseField' 
                                            componentClass="textarea" 
                                            value={this.state.comment} 
                                            onChange={this.handleTextChange} 
                                            placeholder={this.state.placeholder} />
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="addCommentButton"><Button bsStyle="primary" onClick={this.handleSubmit}>Submit</Button>
                        {/* {this.props.isReply ? <Button style={{'display': 'inline-block'}} onClick={this.handleClose} >Cancel</Button> : null} */}
                    </div>
                {/* </Panel.Body> */}
            </Panel>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    login: state.login,
    comments: state.comments
});

export default connect(mapStateToProps)(CommentAdd);
