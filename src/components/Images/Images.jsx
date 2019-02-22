import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactFilestack, { client } from 'filestack-react';
import filestack from 'filestack-js';


class Images extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uploadItem: ''
        }
    }

    handleUploadContent = (result) => {
        console.log('in IMAGES result', result);
        this.props.handleUploadContent(result.filesUploaded[0],this.props.contributor)
    }


    render() {

        const apikey = 'AG4VWAsOZRxGMNnoswbHKz';
        // const security = {policy: "eyJleHBpcnkiOjE1MjgyNjY2MDAsImNhbGwiOlsicGljayIsInJlYWQiLCJzdGF0Iiwid3JpdGUiLCJ3cml0ZVVybCIsInN0b3JlIiwiY29udmVydCIsInJlbW92ZSIsImV4aWYiXX0=",
        //                 signature: "67168f3af0d8c11b316cce342f7e551222e838f82afc6697aa9a142d1db93390"};
        const client = filestack.init('AG4VWAsOZRxGMNnoswbHKz');
        
        // client.retrieve(options);
        const options = {
            accept: ['image/*', 'video/*'],
            maxFiles: 1,
            imageDim: [500, 500], 
            storeTo: {
              location: 's3'
            },
            // dl: true
        }

        return(
            <div>
                <ReactFilestack
                apikey={apikey}
                buttonText="Click here to upload content"
                buttonClass="classname"
                options={options}
                onSuccess={this.handleUploadContent}
                // security={security}
                />
            </div>
            )
        }
    }

    const mapStateToProps = (state) => ({
        state
})


export default connect(mapStateToProps)(Images);