import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Button, ControlLabel, FormControl } from 'react-bootstrap';



class LandingEdit extends Component {

  componentDidMount(){
    this.props.dispatch({
      type:'FETCH_LANDING_HEADER'
    })
  }

  // componentDidMount() {
  //   this.props.dispatch({
  //     type: 'FETCH_LANDING_CACHE'
  //   });
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
    let headerText = this.props.state.landing.landingPageHeader;
    console.log("Header Text: ", headerText);

    return (
      <div>

          <Panel>
            <Panel.Body>
              <ControlLabel>Site Description</ControlLabel>
              
              <FormControl onChange={this.handleLandingTextChange}
                name="landingPageHeader"
              value={headerText[0].header}
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