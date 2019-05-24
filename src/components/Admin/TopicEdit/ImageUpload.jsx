// Component for Image upload functionality
// Used in App to upload Contributor Photos, as well as Topic Archive Image/Thumbnail

// Uses FileStack API. API key stored as environment variable.
// docs: https://www.filestack.com/docs/
// Currently using a free account, should be more than enough for what we need.

import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactFilestack from 'filestack-react';

class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadItem: ''  // is this needed?
    }
  }

  handleUploadContent = (result) => {
    console.log("Image: ", result);
    let contributor = this.props.contributor;
    let fileUrl = result.filesUploaded[0].url;
    let pictureUploadPackage = {
      value: fileUrl,
      name: contributor //<-- action.payload.name is contributor1 or contributor2 
    }
    this.props.dispatch({
      type: 'CHANGE_TOPIC_INFO',
      payload: pictureUploadPackage
    })
  }

  render() {

    // API Key stored as environment variable
    const apikey = process.env.REACT_APP_FILESTACK_API;

    const options = {
      accept: ['image/*'],
      maxFiles: 1,
      imageDim: [500, 500], 
      storeTo: {
        location: 's3'
      }
    }

    return(
      <ReactFilestack
        apikey={apikey}
        buttonText="Click to Upload"
        // buttonClass="classname"
        options={options}
        onSuccess={this.handleUploadContent}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  state
});

export default connect(mapStateToProps)(ImageUpload);