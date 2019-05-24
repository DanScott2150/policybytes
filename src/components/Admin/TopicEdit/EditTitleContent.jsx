// Subcomponent for editing a Topic's Title & Premise

import React, { Component } from 'react';
import { FormLabel, FormControl, Jumbotron } from 'react-bootstrap';

export default class EditTitleContent extends Component {
  render() {
    return (
      <Jumbotron className="text-center">

      {/* Display Output */}
        <h1><strong>{this.props.editTitle}</strong></h1>
        <p>{this.props.editPremise}</p>

      {/* Form Input */}
        <FormLabel>Topic Title</FormLabel>
        <FormControl 
          onChange={this.props.handleTextChange}
          name="topicTitle"
          value={this.props.editTitle}
          className="w-50"
          style={{ margin: '0 auto' }} />

        <FormLabel>Topic Premise</FormLabel>
        <FormControl 
          onChange={this.props.handleTextChange}
          name="topicPremise"
          value={this.props.editPremise}
          as="textarea"
          rows="3"
          className="w-50"
          style={{ margin: '0 auto' }} />

      </Jumbotron>
    );
  }
}
