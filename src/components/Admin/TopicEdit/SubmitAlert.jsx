import React, { Component } from 'react'
import { Alert, Button } from 'react-bootstrap';



export default class SubmitAlert extends Component {
  render() {
    return (
      <div>
        <Alert bsStyle="success" onDismiss={this.props.handleDismiss}>
            <strong>Changes Saved!</strong>
            <Button onClick={this.props.handleDismiss}>Okay.</Button>
        </Alert>
      </div>
    )
  }
}
