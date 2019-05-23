// Subcomponent for editing Common Ground

import React, { Component } from 'react'
import { FormLabel, FormControl } from 'react-bootstrap';


export default class EditCommonGround extends Component {
  render() {
    return (
      <div className = "text-center">

      {/* Display */}
        <h2>Common Ground</h2>
        Both particpants agree that:
        <p>{this.props.editCommonGround}</p>

      {/* Input/Edit */}
        <FormLabel>Common Ground</FormLabel>
        <FormControl onChange={this.props.handleTextChange}
          name="topicCommonGround"
          value={this.props.editCommonGround}
          as="textarea"
          rows="3"
          className="w-50" 
          />
        
      </div>
    );
  }
}
