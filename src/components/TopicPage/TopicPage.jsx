// Topic Page
// Displays entire page for a given topic
// Including header component, and actual discussion arena

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { USER_ACTIONS } from '../../redux/actions/userActions';


// Import all subcomponents
import KeyClaimPanel from './KeyClaimPanel.jsx'
import StreamItem from './StreamItem.jsx'
import TopicTitleContent from './TopicTitleContent.jsx'
import StreamItemFactory from './StreamItemFactory.jsx'
import TopicContributors from './TopicContributors.jsx'
import CommentSection from './CommentSection/CommentSection.jsx'
import LoveModal from './LoveModal/LoveModal.jsx'
import LikeButtonProposal from './LikeButtons/LikeButtonProposal.jsx'

// Styling & Bootstrap
import { Card, Tab, Tabs, Button, ButtonGroup, Image, Container, Col, Row } from 'react-bootstrap';
import './TopicPage.css'

//TO-DO replace hard-coded topic_id in CommentSection component

// Do we need 'export' here since it's also exported at the bottom of the file?
export class TopicPage extends Component {
  
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      showStreamForClaim: undefined,
      keyClaimLocked: false,
      contributorSelect: 'contributor1',
      topicId: 0  //initialize to 0, but updates as a part of componentWillReceiveProps()
    }
  }

  // Clear data within the arena when component unmounts
  // commentReducer.js resets state for Proposal, Key Claims, Stream Comments to empty object
  componentWillUnmount(){
    this.props.dispatch({type: 'CLEAR_PROPOSAL_COMMENT'});
    this.props.dispatch({type: 'CLEAR_KEY_CLAIM_COMMENT'});
    this.props.dispatch({type: 'CLEAR_STREAM_COMMENT'});
  }

  // Think this can be deleted?
  // componentDidMount() {
  //   this.props.dispatch({
  //     type: 'FETCH_NEW_TOPIC_LANDING_PAGE'
  //   })
  // }

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

    // Populate Key Claims
    let keyClaimsArray = []
    for (const keyClaimId in this.props.topicPageContent.keyClaims) {
      // Select only claims for a given contributor
      if (this.state.contributorSelect === this.props.topicPageContent.keyClaims[keyClaimId].claimContributor) {
        // For each Key Claim, create a component:
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
        );
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

    const firstPersonTab = this.props.topicPageContent.contributor1FirstName + "'s Viewpoint";
    const secondPersonTab = this.props.topicPageContent.contributor2FirstName + "'s Viewpoint";
    

    return (
      <div>
        <TopicTitleContent topicPageContent={this.props.topicPageContent} />
        <TopicContributors topicPageContent={this.props.topicPageContent} />

        <hr/>
        
        <Container>
          <Tabs 
            defaultActiveKey='contributor1'
            id="contributorSelectTabs"
            onSelect={this.handleTabSelect}
            animation={false}>

            <Tab 
              eventKey='contributor1' 
              title={firstPersonTab}></Tab>
            <Tab 
              eventKey='contributor2' 
              title={secondPersonTab}></Tab>
          </Tabs>

          {/* ARENA */}
          {/* <Card> */}
            
          <Container>
            <Row style={{ border: '1px solid #000' }}>
            <Card>
              <Card.Body>
                <Image
                  className={arenaPhotoClass}
                  src={arenaPicture}
                  thumbnail
                  roundedCircle />
              <div>
              <h3>{selectedContributor}'s Proposal: </h3>
              <p>{arenaProposal}</p>
                  </div>
                </Card.Body>
              </Card>

              

            {/* ARENA SUMMARY Card */}
                  <Col xs={12} md={9}>
                    <Card className={arenaSummaryClass}>
                      <Card.Body>
                        <p><strong>{selectedContributor}'s Proposal: </strong></p>
                        <p>{arenaProposal}</p>
                    </Card.Body>
                      <Card.Footer className="keyClaimFooter">
                        <ButtonGroup className="keyClaimFooterButtons">
                        {this.props.user.userInfo ? 
                          <Button className="keyClaimFooterItem">
                          <LoveModal topicPageContent={this.props.topicPageContent} contributor={this.state.contributorSelect}/> 
                          </Button>: 
                          <Button disabled className="keyClaimFooterItem">
                            
                            </Button>
                          }

                          

                          <LikeButtonProposal id={arenaProposalId}/>
                          <Button a href="/topicPage#commentCardMaster" onClick={() => this.handleCommentProposal(arenaProposal, arenaProposalId)}
                            className="keyClaimFooterItem">
                            
                          </Button>
                        </ButtonGroup>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Container>

              <div className="keyClaimsContainer">
                {keyClaimsArray}
              </div>

              <div className={streamContainerClass}>

              <Image className="arenaMini1" src={this.props.topicPageContent.photo1} width="55"/>
              <Image className="arenaMini2" src={this.props.topicPageContent.photo2} width="55"/>

                <StreamItemFactory keyClaims={this.props.topicPageContent.keyClaims}
                  showStreamForClaim={this.state.showStreamForClaim} />
              </div>

          {/* </Card> */}

      


          <CommentSection topic_id={this.props.topicPageContent.topicDbId} />
        {/* </div>   <---  WRAPPER DIV ENDS */}
        </Container>
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
