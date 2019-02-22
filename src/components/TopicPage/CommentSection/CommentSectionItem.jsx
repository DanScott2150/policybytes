import React, { Component } from 'react'
import { connect } from 'react-redux'
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import CommentAdd from './CommentAdd.jsx';
import FacebookLogin from '../../FacebookLogin/FacebookLogin.jsx';

import { Panel, Button, ButtonGroup, Glyphicon, Image, Well, Badge } from 'react-bootstrap';

import './CommentSection.css'


class CommentSectionItem extends Component {

    constructor() {
        super();

        this.state = {
            addCommentShown: false,
            likedComment: false
        }
    }



    deleteComment = (commentInput) => {
        this.props.dispatch({
            type: 'DELETE_GENERAL_COMMENT',
            payload: commentInput
        });
    }

    likeComment = (commentInput) => {
        this.setState({
            likedComment: !this.state.likedComment
        }, () => {
            this.props.dispatch({
                type: 'LIKE_GENERAL_COMMENT',
                payload: commentInput
            });
        })
    }

    unlikeComment = (commentInput) => {
        this.setState({
            likedComment: !this.state.likedComment
        }, () => {
            this.props.dispatch({
                type: 'UNLIKE_GENERAL_COMMENT',
                payload: commentInput
            });
        })
    }

    showAddCommentShown = () => {
        this.setState({
            addCommentShown: !this.state.addCommentShown
        }, () => {

        })
    }

    render() {

        let status = this.props.user.userInfo && this.props.user.userInfo.status;
        let likesCounter = this.props.comment.likes
        if (this.props.comment.likes < 1) {
            likesCounter = ' ';
        }

        //sets css class indent of comments based on number of '.' in //comment.order
        let orderCharacterCounter = 0;
        let commentIndentClass = "commentPanel1";
        for (let character of this.props.comment.order) {
            if (character === "-") {
                orderCharacterCounter++;
            }
        }

        // console.log('orderCharacterCounter', orderCharacterCounter);

        if (orderCharacterCounter === 0) {
            commentIndentClass = "commentPanel1";

        } else if (orderCharacterCounter === 1) {
            commentIndentClass = "commentPanel2";

        } else if (orderCharacterCounter === 2) {
            commentIndentClass = "commentPanel3";

        } else commentIndentClass = "commentPanel3";

        // console.log('commentIndentClass', commentIndentClass);

        //set background of reply based on contributor number
        let referenceTextCommentClass = ''; 
        let contributorDeclaration = ''; 
        if (this.props.comment.keyclaim_contributor_id %2 !== 0 || this.props.comment.proposal_contributor_id %2 !== 0 || this.props.comment.stream_contributor_id %2 !== 0) {
            referenceTextCommentClass = 'referenceTextCommentContainerContrib1'
        } else {
            referenceTextCommentClass = 'referenceTextCommentContainerContrib2'
        } 
    


        return (
            <div className={commentIndentClass}>

                <div className="commentPic">
                    <span ><Image style={{ 'height': '56px', 'width': '56px', 'padding': '10px' }} circle src={this.props.comment.fb_picture} /></span>
                </div>

                <Well className={"commentComment"}>
                    <div className="userName">{this.props.comment.fb_display_name}:</div>

                    <div className="commentTextWrapper">
                        {(this.props.comment.claim || this.props.comment.stream_comment || this.props.comment.proposal) 
                            ?
                            //set container to contributor color
                            <div className={referenceTextCommentClass}>  
                                <span className='referenceTextCommentList'>
                                <span dangerouslySetInnerHTML={{ __html: this.props.comment.claim}} />  
                                <span dangerouslySetInnerHTML={{ __html: this.props.comment.stream_comment}} /> 
                                <span dangerouslySetInnerHTML={{ __html: this.props.comment.proposal}} />    
                                </span> 
                            </div>
                            : null}
                            

                        <span className="commentText">{this.props.comment.comment}</span>
                    </div>


                    {(this.props.user.userInfo) ? <ButtonGroup className="commentButtons">
                        {!this.state.likedComment ? <Button className="commentButton" onClick={() => this.likeComment(this.props.comment)} bsSize="small"><Glyphicon glyph="thumbs-up" /> {likesCounter}</Button> : <Button bsStyle="success" className="commentButton" onClick={() => this.unlikeComment(this.props.comment)} bsSize="small"><Glyphicon glyph="thumbs-up" /> {likesCounter}</Button>}
                        {(this.props.comment.order.length <= 16) ? <Button className="commentButton" onClick={this.showAddCommentShown} bsSize="small">Reply</Button> : <Button disabled className="commentButton" onClick={this.showAddCommentShown} bsSize="small">Reply</Button>}
                        {(status === 2) ? <Button onClick={() => this.deleteComment(this.props.comment)} className="commentButton" bsSize="small"><Glyphicon glyph="trash" /></Button> : null}
                    </ButtonGroup> : null}
                </Well>

                {(this.state.addCommentShown === true) 
                ? <CommentAdd topic_id={this.props.topic_id} 
                            isReply={true} 
                            showAddCommentShown={this.showAddCommentShown} 
                            lastOrder={this.props.comment.order} 
                            owner={this.props.comment.owner} 
                           /> 
                : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    login: state.login,
    comments: state.comments
});

export default connect(mapStateToProps)(CommentSectionItem);
