import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from '../Footer/Footer.jsx'
import { USER_ACTIONS } from '../../redux/actions/userActions';

import { Panel, Tab, Tabs, Button, ButtonGroup, Glyphicon, Image, Grid, Col, Row } from 'react-bootstrap';

import KeyClaimPanel from './KeyClaimPanel.jsx'
import StreamItem from './StreamItem.jsx'
import TopicTitleContent from './TopicTitleContent.jsx'
import StreamItemFactory from './StreamItemFactory.jsx'
import TopicContributors from './TopicContributors.jsx'
import CommentSection from './CommentSection/CommentSection.jsx'
import LoveModal from './LoveModal/LoveModal.jsx'
import LikeButtonProposal from './LikeButtons/LikeButtonProposal.jsx'



import dummyTopicCache from './DummyData.js'

import './TopicPage.css'

//TO-DO replace hard-coded topic_id in CommentSection component

export class TopicPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showStreamForClaim: undefined,
      keyClaimLocked: false,
      contributorSelect: 'contributor1',
      topicId: 0
    }
  }

  componentWillUnmount(){
    this.props.dispatch({
      type: 'CLEAR_PROPOSAL_COMMENT',  
    })
    this.props.dispatch({
      type: 'CLEAR_KEY_CLAIM_COMMENT'
    });
    this.props.dispatch({
      type: 'CLEAR_STREAM_COMMENT'
    });
   }

  componentDidMount() {
    // this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({
      type: 'FETCH_NEW_TOPIC_LANDING_PAGE'
  })
  }

//allows reducer to be populated before it looks for data
  componentWillReceiveProps(nextProps){
    
    this.setState({
      ...this.state, topicId: nextProps.state.landing.featuredLandingPage[0].id
    })
    // this.fetchTopicPageContent(this.state.topicId);
  }

  componentDidUpdate(prevProps) {
    if(this.props.state.landing.featuredLandingPage[0].id !== prevProps.state.landing.featuredLandingPage[0].id){
      this.fetchTopicPageContent(this.state.topicId);
    }
  }

fetchTopicPageContent = (id) => {
    console.log('in fetchTopicPageContent, id:', id);
    this.props.dispatch({
      type: 'FETCH_TOPIC_PAGE_CONTENT',
      payload: id
    })
  }


  //called on mouseEnter from keyClaimPanel IF keyClaimLocked === false
  handleHoverShowStream = (id) => {
    if (this.state.keyClaimLocked === false) {
      this.setState({
        showStreamForClaim: id
      })
    }
  }

  //called on mouseLeave from keyClaimPanel IF keyClaimLocked === false
  handleHoverHideStream = (id) => {
    if (this.state.keyClaimLocked === false) {
      this.setState({
        showStreamForClaim: undefined
      })
    }
  }

  //toggle this.state.keyClaimLocked
  toggleClickShowStream = (id) => {
    this.setState({
      showStreamForClaim: id,
      keyClaimLocked: !this.state.keyClaimLocked
    })
  }

  handleTabSelect = (key) => {
    this.setState({
      contributorSelect: key
    })
  }

  handleCommentProposal = (proposalInput, proposalIdInput) => {

    let proposalObject = { proposal: proposalInput, proposalContributor: this.state.contributorSelect,
      proposalDbId: proposalIdInput};
      console.log('in handleCommentProposal', proposalObject);
    this.props.dispatch({
      type: 'SET_PROPOSAL_COMMENT',
      payload: proposalObject,   
    })
    this.props.dispatch({
      type: 'CLEAR_KEY_CLAIM_COMMENT'
    });
    this.props.dispatch({
      type: 'CLEAR_STREAM_COMMENT'
    });
  }




  render() {

    //loop through keyclaim object to make keyClaimPanels 
    let keyClaimsArray = []
    for (const keyClaimId in this.props.topicPageContent.keyClaims) {
      //if statement to render only the selected contributor's claims
      if (this.state.contributorSelect === this.props.topicPageContent.keyClaims[keyClaimId].claimContributor) {
        keyClaimsArray.push(
          <KeyClaimPanel key={keyClaimId}
            keyClaimId={keyClaimId}
            keyClaim={this.props.topicPageContent.keyClaims[keyClaimId]}
            showStreamForClaim={this.state.showStreamForClaim}
            keyClaimLocked={this.state.keyClaimLocked}
            handleHoverShowStream={this.handleHoverShowStream}
            handleHoverHideStream={this.handleHoverHideStream}
            toggleClickShowStream={this.toggleClickShowStream}
          />
        )
      }
    }


    //CHANGING ARENA CONTENT BASED ON SELECTED CONTRIBUTOR
    let arenaContainer = 'arenaContainer';
    let streamContainerClass = "streamItemsContainer";
    let arenaSummaryClass = 'arenaSummary';
    let arenaPhotoClass = 'arenaPhotoContrib1'
    let arenaPicture = this.props.topicPageContent.photo1; 
    let arenaProposal = this.props.topicPageContent.proposal1;
    let arenaProposalId = this.props.topicPageContent.proposal1DbId;
    let selectedContributor = this.props.topicPageContent.contributor1FirstName;
    if (this.state.contributorSelect === 'contributor1') {
      arenaContainer = "arenaContainerContrib1"
      streamContainerClass += " contrib1"
      arenaSummaryClass += " contrib1"
      arenaPhotoClass = 'arenaPhotoContrib1'
      arenaPicture = this.props.topicPageContent.photo1  
      arenaProposal = this.props.topicPageContent.proposal1;
      arenaProposalId = this.props.topicPageContent.proposal1DbId;
      selectedContributor = this.props.topicPageContent.contributor1FirstName;
    }
    if (this.state.contributorSelect === 'contributor2') {
      arenaContainer += " contrib2"
      streamContainerClass += " contrib2"
      arenaSummaryClass += " contrib2"
      arenaPhotoClass = 'arenaPhotoContrib2'
      arenaPicture = this.props.topicPageContent.photo2  
      arenaProposal = this.props.topicPageContent.proposal2;
      arenaProposalId = this.props.topicPageContent.proposal2DbId;
      selectedContributor = this.props.topicPageContent.contributor2FirstName
    }

    return (
      <div>

        <TopicTitleContent topicPageContent={this.props.topicPageContent} />
        <TopicContributors topicPageContent={this.props.topicPageContent} />


        <div className="wrapper">
          <Tabs className="tabParent"
            bsStyle="pills"
            defaultActiveKey='contributor1'
            id="contributorSelectTabs"
            onSelect={this.handleTabSelect}
            animation={false}
          >
            <Tab tabClassName="tabChildren" eventKey='contributor1' title={this.props.topicPageContent.contributor1FirstName}></Tab>
            <Tab tabClassName="tabChildren" eventKey='contributor2' title={this.props.topicPageContent.contributor2FirstName}></Tab>
          </Tabs>

          {/* ARENA */}

          <Panel className="arenaContainer">
            <Panel.Body>
              <Grid>
                <Row id="arenaTop">
                  <Col xs={12} md={3}>
                    <Image className={arenaPhotoClass} src={arenaPicture} rounded/>
                  </Col>

            {/* ARENA SUMMARY PANEL */}
                  <Col xs={12} md={9}>
                    <Panel className={arenaSummaryClass}>
                      <Panel.Body>
                        <p><strong>{selectedContributor}'s Proposal: </strong></p>
                        <p>{arenaProposal}</p>
                    </Panel.Body>
                      <Panel.Footer className="keyClaimFooter">
                        <ButtonGroup className="keyClaimFooterButtons">
                        {this.props.user.userInfo ? 
                          <Button className="keyClaimFooterItem">
                          <LoveModal topicPageContent={this.props.topicPageContent} contributor={this.state.contributorSelect}/> 
                          </Button>: 
                          <Button disabled className="keyClaimFooterItem">
                            <Glyphicon glyph="heart" />
                            </Button>
                          }

                          

                          <LikeButtonProposal id={arenaProposalId}/>
                          <Button a href="/topicPage#commentPanelMaster" onClick={() => this.handleCommentProposal(arenaProposal, arenaProposalId)}
                            className="keyClaimFooterItem">
                            <Glyphicon glyph="comment" />
                          </Button>
                        </ButtonGroup>
                      </Panel.Footer>
                    </Panel>
                  </Col>
                </Row>
              </Grid>

              <div className="keyClaimsContainer">
                {keyClaimsArray}
              </div>

              <div className={streamContainerClass}>

              <Image className="arenaMini1" src={this.props.topicPageContent.photo1} width="55"/>
              <Image className="arenaMini2" src={this.props.topicPageContent.photo2} width="55"/>

                <StreamItemFactory keyClaims={this.props.topicPageContent.keyClaims}
                  showStreamForClaim={this.state.showStreamForClaim} />
              </div>
            </Panel.Body>
          </Panel>

      


          <CommentSection topic_id={this.props.topicPageContent.topicDbId} />
        </div>   {/* <---  WRAPPER DIV ENDS */}


        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
  topicPageContent: state.topicPageContent.topicPageReducer, //<-- All content for page
  comments: state.comments,
  state
});

export default connect(mapStateToProps)(TopicPage);
