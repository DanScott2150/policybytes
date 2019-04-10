import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Button, ControlLabel, FormControl } from 'react-bootstrap';



class LandingEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      submitAlert: false,
      photo1: '',
      photo2: '',
      topicReadMore: '',
      fireRedirect: false,
      edit: false,
    }
  }

  componentDidMount() {
  //  this.populateLandingEditCache();
  //  this.fetchLandingEditCache();
    this.props.dispatch({
      type: 'FETCH_LANDING_HEADER'
    });  
}

  // populateLandingEditCache = () => {
  //   console.log("1) [LandingPageEdit.jsx] componentDidMount()");
  //   this.props.dispatch({
  //     type: 'FETCH_LANDING_CACHE'
  //   });

  // }

  // fetchLandingEditCache = () => {
  //   this.props.dispatch({
  //     type: 'FETCH_EDIT_LANDING_CACHE'
  //   })
  // }

  handleLandingTextChange = (event) => {
    console.log("HandleLandingChange");
    this.props.dispatch({
      type: 'CHANGE_LANDING_HEADER',
      payload: event.target
    })
  }

  render() {
    let headerText = this.props.state.landingCacheEdit.landingEditCache[0];
    console.log("Header Text: ", this.props.state.landingCacheEdit.landingEditCache[0]);

    return (
      <div>
        {/* SHOW STATE ON DOM */}
        <pre>state: {JSON.stringify(this.state, null, 3)}</pre>
        <pre>state: {JSON.stringify(this.props.state, null, 3)}</pre>
        {/* <pre>state: {JSON.stringify(this.props.state.cacheEdit.topicEditCache.topicReadMore, null, 3)}</pre> */}
        {/* <pre>{JSON.stringify(this.props.state.cacheEdit.topicEditCache.topicSummary, null, 3)}</pre> */}
        {/* <pre>state: {JSON.stringify(this.props.keyClaims, null, 3)}</pre> */}
        {/* <pre>state: {JSON.stringify(this.props.uploadItem, null, 3)}</pre> */}

        <Panel>
          <Panel.Body>
            <ControlLabel>Site Description</ControlLabel>

            <FormControl onChange={this.handleLandingTextChange}
              name="landingPageHeader"
              value={this.props.state.landing.landingPageEditCache.landingPageHeader}
              componentClass="textarea" />
          </Panel.Body>
          <Button type="submit" bsStyle="primary">Submit!</Button>
        </Panel>


      </div>
    )
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(LandingEdit);