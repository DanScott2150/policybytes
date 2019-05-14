import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, FormLabel, FormControl } from 'react-bootstrap';



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

          <Card>
            <Card.Body>
              <FormLabel>Site Description</FormLabel>
              
              <FormControl onChange={this.handleLandingTextChange}
                name="landingPageHeader"
              value={headerText[0].header}
                componentClass="textarea" />
            </Card.Body>
          <Button type="submit" bsStyle="primary">Submit!</Button>
          </Card>


      </div>
    )
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(LandingEdit);