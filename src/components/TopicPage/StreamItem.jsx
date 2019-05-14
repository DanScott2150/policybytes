import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, ButtonGroup } from 'react-bootstrap';

import LikeButtonStream from './LikeButtons/LikeButtonStream.jsx'

import Linkify from 'linkifyjs/react';

class StreamItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }

  handleCommentStream = (streamItemInput) => {
    console.log('clicked!');
    this.props.dispatch({
      type: 'SET_STREAM_COMMENT',
      payload: streamItemInput,
    })
    this.props.dispatch({
      type: 'CLEAR_PROPOSAL_COMMENT'
    });
    this.props.dispatch({
      type: 'CLEAR_KEY_CLAIM_COMMENT'
    });
  }

  handleOpen = () => {
    console.log('hey');
    
    this.setState({
      open: !this.state.open
    })
  }


  render() {

    let streamItemClass = "streamItemCard"
    if (this.props.streamItem.streamContributor === 'contributor1') {
      streamItemClass += " contrib1Stream"
    }
    if (this.props.streamItem.streamContributor === 'contributor2') {
      streamItemClass += " contrib2Stream"
    }

    let linkifyText = (
      <Linkify tagName="p"> { this.props.streamItem.streamEvidence }</Linkify>
    );

    // console.log(this.props.streamItem);

    return (
      <div onClick={this.handleOpen}>

        <Card className={streamItemClass} expanded={this.state.open}>
          <Card.Body>
            {/* <div dangerouslySetInnerHTML={{ __html: this.props.streamItem.streamComment }} /> */}
            <Linkify tagName="div">{this.props.streamItem.streamComment }</Linkify>
            <br/>
            <div className="evidenceTag">
              <span>
              Evidence {(this.state.open === true) ? <i class="fa fa-caret-up" aria-hidden="true"></i> : <i class="fa fa-caret-down" aria-hidden="true"></i>}
              </span>    
            </div>
            <Card.Collapse>
              <br />
                  {/* <p dangerouslySetInnerHTML={{ __html: this.props.streamItem.streamEvidence }} /> */}
                <Linkify tagName="p">{this.props.streamItem.streamEvidence}</Linkify>
              <br />

              <Card.Footer className="keyClaimFooter">

                <ButtonGroup className="keyClaimFooterButtons">
                   <LikeButtonStream id={this.props.streamItem.streamDbId} />
                  <Button a href="/topicPage#commentCardMaster" onClick={() => this.handleCommentStream(this.props.streamItem)} className="keyClaimFooterItem">
                    {/* <Glyphicon glyph="comment" /> */}
                  </Button>
                </ButtonGroup>
              </Card.Footer>
            </Card.Collapse>
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

export default connect(mapStateToProps)(StreamItem);
