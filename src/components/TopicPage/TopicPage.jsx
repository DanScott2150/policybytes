// Topic Page
// Displays entire page for a given topic

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { USER_ACTIONS } from '../../redux/actions/userActions';

// Subcomponents
import TopicTitleContent from './TopicTitleContent.jsx'
import TopicContributors from './TopicContributors.jsx'
import TopicCommonGround from './TopicCommonGround.jsx'

import LikeButtonProposal from './LikeButtons/LikeButtonProposal.jsx';
import KeyClaimPanel from './KeyClaimPanel.jsx'
import StreamItemFactory from './StreamItemFactory.jsx'
import CommentSection from './CommentSection/CommentSection.jsx'
// import LoveModal from './LoveModal/LoveModal.jsx'

// Styling & Bootstrap
import { Card, Tab, Tabs, Image, Container, Col, Row, ButtonGroup, Button } from 'react-bootstrap';
import './TopicPage.css';

// Custom scrollbar for inside disucssion arena: Key Claims Panel (left side) and Stream (right side)
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

class TopicPage extends Component {
    constructor(props) {
    super(props);
    this.state = {
      showStreamForClaim: undefined,
      keyClaimLocked: false,
      contributorSelect: 'contributor1',
      topicId: 0  //initialize to 0, but updates as a part of componentWillReceiveProps()
    }
  }

  componentWillUnmount(){
    this.props.dispatch({type: 'CLEAR_PROPOSAL_COMMENT'});
    this.props.dispatch({type: 'CLEAR_KEY_CLAIM_COMMENT'});
    this.props.dispatch({type: 'CLEAR_STREAM_COMMENT'});
  }

// Set scroll position to top of page once it loads
// Otherwise, the scroll position will be unchanged from wherever it was
// on the prior page when the user clicked a given topic
  componentDidMount(){
    window.scrollTo(0, 0);
  }

//allows reducer to be populated before it looks for data
  componentWillReceiveProps(nextProps){
    this.setState({
      ...this.state, topicId: nextProps.state.landing.featuredLandingPage[0].id
    })
  }


//Fetch topic content
// This only fires when fetching the featured topic
// If user clicks an archived topic instead, fetchTopicPageContent() fires from LandingPageArchive.jsx component
// This seems like an odd way to do things, will look into refactoring later
  componentDidUpdate(prevProps) {
    if(this.props.state.landing.featuredLandingPage[0].id !== prevProps.state.landing.featuredLandingPage[0].id){
      this.fetchTopicPageContent(this.state.topicId);
    }
  }

  fetchTopicPageContent = (id) => {
// 1) FETCH_TOPIC_PAGE_CONTENT >> 
// 2) topicSaga.js hits API endpoint, then calls SET_TOPIC_PAGE_CONTENT >>
// 3> topicPageReducer.js returns data
    this.props.dispatch({
      type: 'FETCH_TOPIC_PAGE_CONTENT',
      payload: id
    })
  }

  //When mouse hovers over a key claim, show the associated stream in the chatbox
  handleHoverShowStream = (id) => {
    if (this.state.keyClaimLocked === false) {
      this.setState({
        showStreamForClaim: id
      })
    }
  }

  //When mouse hover ends, hide associated stream in chatbox
  handleHoverHideStream = (id) => {
    if (this.state.keyClaimLocked === false) {
      this.setState({
        showStreamForClaim: undefined
      })
    }
  }

  //When a key claim is clicked, "lock" it as active and populate the chatbox with the stream
  toggleClickShowStream = (id) => {
    this.setState({
      showStreamForClaim: id,
      keyClaimLocked: !this.state.keyClaimLocked
    })
  }

  //Toggle between different contributor tabs
  handleTabSelect = (key) => {
    this.setState({
      contributorSelect: key
    })
  }

  handleCommentProposal = (proposalInput, proposalIdInput) => {
    let proposalObject = { 
      proposal: proposalInput, 
      proposalContributor: this.state.contributorSelect,
      proposalDbId: proposalIdInput
    };

    console.log('handleCommentProposal(): ', proposalObject);
    
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

    // Populate Key Claims Panel
    let keyClaimsArray = [];

    for (const keyClaimId in this.props.topicPageContent.keyClaims) {
      // Select claims for only for given contributor
      if (this.state.contributorSelect === this.props.topicPageContent.keyClaims[keyClaimId].claimContributor) {
        keyClaimsArray.push(
          <KeyClaimPanel 
            key={keyClaimId}
            keyClaimId={keyClaimId}
            keyClaim={this.props.topicPageContent.keyClaims[keyClaimId]}
            showStreamForClaim={this.state.showStreamForClaim}
            keyClaimLocked={this.state.keyClaimLocked}
            handleHoverShowStream={this.handleHoverShowStream}
            handleHoverHideStream={this.handleHoverHideStream}
            toggleClickShowStream={this.toggleClickShowStream}
          />
        );
      }
    }


    //CHANGING ARENA CONTENT BASED ON SELECTED CONTRIBUTOR
    // (can probably be refactored to something cleaner)
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

    const firstPersonTab = this.props.topicPageContent.contributor1FirstName + "'s Viewpoint";
    const secondPersonTab = this.props.topicPageContent.contributor2FirstName + "'s Viewpoint";
    

    return (
      <div>
        
        {/* <TitleContent>: Jumbotron showing Topic Title and Premise */}
        <TopicTitleContent topicPageContent={this.props.topicPageContent} />

        {/* <TopicContributors>: Two side-by-side panels for each contributor- pic & bio */}
        <TopicContributors topicPageContent={this.props.topicPageContent} />

          <hr/>
        
        {/* <TopicCommonGround>: Shows common ground text */}
        <TopicCommonGround topicPageContent={this.props.topicPageContent} />
        
          <hr/>
        
        {/* DISCUSSION ARENA */}
        <Container>

          {/* CONTRIBUTOR TABS */}
          <Tabs 
            defaultActiveKey='contributor1'
            id="contributorSelectTabs"
            onSelect={this.handleTabSelect}
            animation={false}
            style={{paddingLeft: '1em'}}
            className='contributorTabs border-bottom-0'
            >

            <Tab 
              eventKey='contributor1' 
              title={firstPersonTab}
              ></Tab>
            <Tab 
              eventKey='contributor2' 
              title={secondPersonTab}
              ></Tab>
          </Tabs>

          {/* Contributor Proposals */}
          <Card style={{ backgroundColor: 'lightyellow', boxShadow: '2px 2px 2px rgba(0,0,0,0.25)'}}>
            <Container>
              <Row>
                <Card className="border-0" style={{ backgroundColor: 'inherit' }}>
                  <Card.Body>
                    <Image
                      className={arenaPhotoClass}
                      src={arenaPicture}
                      thumbnail
                      roundedCircle />
                    <div className="arenaProposal">
                      <h3>{selectedContributor}'s Proposal: </h3>
                      <p className="mb-0">{arenaProposal}</p>
                    </div>
                  
                  <Card.Footer className="keyClaimFooter">
                    <ButtonGroup className="keyClaimFooterButtons">
                      {/* {this.props.user.userInfo ?
                        <Button className="keyClaimFooterItem">
                          <LoveModal topicPageContent={this.props.topicPageContent} contributor={this.state.contributorSelect} />
                        </Button> :
                        <Button disabled className="keyClaimFooterItem">
                          <Glyphicon glyph="heart" />
                        </Button>
                      } */}

                      <LikeButtonProposal id={arenaProposalId} />
                        <Button
                          a href="/topicPage#commentPanelMaster"
                          variant="light"
                          onClick={() => this.handleCommentProposal(arenaProposal, arenaProposalId)}
                          className="keyClaimFooterItem">
                          <i class="far fa-comment"></i>
                        </Button>
                    </ButtonGroup>
                  </Card.Footer>
                  </Card.Body>
                </Card>
              </Row>
            </Container>

            <hr className="arenaDivider"/>

          <Container>
            <Row>

              {/* Key Claim Panel */}
              <Col xs={4} style={{}}>
                <h4 className="text-center">{selectedContributor}'s Key Claims</h4>
                <div className="keyClaimsContainer">
                  <SimpleBar style={{ height: '100%' }}>
                      {keyClaimsArray} 
                  </SimpleBar>
                </div>
              </Col>
                <Col xs={8} className="pl-0">
                <h4 className="text-center">Discussion Thread</h4>
                <div className={streamContainerClass}>
                  <SimpleBar style={{ height: '100%' }}>

                  <Image className="arenaMini1" src={this.props.topicPageContent.photo1} thumbnail roundedCircle />
                    <Image className="arenaMini2" src={this.props.topicPageContent.photo2} thumbnail roundedCircle />

                    <StreamItemFactory 
                      keyClaims={this.props.topicPageContent.keyClaims}
                      showStreamForClaim={this.state.showStreamForClaim} />
                  </SimpleBar>
                </div>
              </Col>
            </Row>
          </Container>


          </Card> 
        {/* End Discussion Arena */}

        </Container>
        
        <hr />
        
        {/* Comment Section */}
        <Container fluid >
          <CommentSection topic_id={this.props.topicPageContent.topicDbId} />
        </Container>

        <hr />

      </div>
    );
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