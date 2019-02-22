import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Panel, Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

import LikeButtonKeyClaim from './LikeButtons/LikeButtonKeyClaim.jsx'
import './TopicPage.css'



export class KeyClaimPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }


  handleMouseEnter = (event) => {
    this.props.handleHoverShowStream(this.props.keyClaimId)
    this.setState({
      open: true
    })
  }

  handleMouseLeave = (event) => {
    this.props.handleHoverHideStream();
    this.setState({
      open: false
    })
  }

  toggleLockKeyClaim = (event) => {
    console.log('in KeyClaimPanel toggleLockKeyClaim');
    this.props.toggleClickShowStream(this.props.keyClaimId)
  }

  handleCommentKeyClaim = (keyClaimInput) => {
    console.log('clicked!');
    this.props.dispatch({
      type: 'SET_KEY_CLAIM_COMMENT',
      payload: keyClaimInput,
    })
    this.props.dispatch({
      type: 'CLEAR_PROPOSAL_COMMENT'
    });
    this.props.dispatch({
      type: 'CLEAR_STREAM_COMMENT'
    });
  }


  render() {


    //if a keyClaim is locked open, and the keyClaimId === the Id of the stream being shown, change class info
    let keyClaimClass = "keyClaimPanel"
    if (this.props.keyClaimLocked && this.props.keyClaimId === this.props.showStreamForClaim) {
      keyClaimClass += " locked"
    }
    if (this.props.keyClaim.claimContributor === 'contributor1') {
      keyClaimClass += " contrib1"
    }
    if (this.props.keyClaim.claimContributor === 'contributor2') {
      keyClaimClass += " contrib2"
    }


    return (
      <div>

        <Panel className={keyClaimClass}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          expanded={this.state.open}>
          <Panel.Body onClick={this.toggleLockKeyClaim}>
            <p dangerouslySetInnerHTML={{__html: this.props.keyClaim.keyClaim}}/>
          </Panel.Body>
          <Panel.Collapse>
            <Panel.Footer className="keyClaimFooter">
              <ButtonGroup className="keyClaimFooterButtons">
                <LikeButtonKeyClaim id={this.props.keyClaim.claimDbId}/>
                <Button a href="/topicPage#commentPanelMaster" onClick={() => this.handleCommentKeyClaim(this.props.keyClaim)}
                  className="keyClaimFooterItem">
                  <Glyphicon glyph="comment" />
                </Button>
              </ButtonGroup>

            </Panel.Footer>
          </Panel.Collapse>
        </Panel>




      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  state
})

export default connect(mapStateToProps)(KeyClaimPanel)
