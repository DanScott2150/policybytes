// Subcomponent for editing Contributor info, including image upload

import React, { Component } from 'react';
import { Card, Image, Container, Row, Col, FormLabel, FormControl } from 'react-bootstrap';

// Component for uploading images, ses FileStack API
import ImageUpload from './ImageUpload.jsx';

export default class EditContributors extends Component {

  // Handle image upload via FileStack API
  // handleUploadContent = (fileUploded, contributor) => {
  //   let fileUrl = fileUploded.url;
  //   let pictureUploadPackage = {
  //     value: fileUrl,
  //     name: contributor //<-- action.payload.name is contributor1 or contributor2 
  //   }
  //   this.props.dispatch({
  //     type: 'CHANGE_TOPIC_INFO',
  //     payload: pictureUploadPackage
  //   })
  // }

  render() {

    return (
      <Container>

      {/* Top Section - Displays info output */}
        <Row>
          <Col>
            <Card className="contributorCardLeft">
              <Card.Body>
                <Image
                  className="contributorPhotoLeft"
                  src={this.props.editPhoto1}
                  thumbnail
                  roundedCircle />
                <div className="contributorText">
                  <h3 className="contributorName">
                    {this.props.editContributor1FirstName} {this.props.editContributor1LastName}
                  </h3>
                  <p className="text-justify">
                    {this.props.editContributor1Bio}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="contributorCardRight">
              <Card.Body>
                <Image
                  className="contributorPhotoRight"
                  src={this.props.editPhoto2}
                  thumbnail
                  roundedCircle />
                <div className="contributorText">
                  <h3 className="contributorName">
                    {this.props.editContributor2FirstName} {this.props.editContributor2LastName}
                  </h3>
                  <p className="text-justify">
                    {this.props.editContributor2Bio}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      {/* Bottom Section - Input/Edit */}
        <Row>

          {/* CONTRIBUTOR 1 */}
          <Col>
            <Card>
              <Card.Body>
                <FormLabel>Contributor 1 First Name</FormLabel>
                <FormControl 
                  onChange={this.props.handleTextChange}
                  name="contributor1FirstName"
                  value={this.props.editContributor1FirstName}
                />
                <FormLabel>Contributor 1 Last Name</FormLabel>
                <FormControl 
                  onChange={this.props.handleTextChange}
                  name="contributor1LastName"
                  value={this.props.editContributor1LastName}
                />
                <FormLabel>Contributor 1 Bio</FormLabel>
                <FormControl 
                  onChange={this.props.handleTextChange}
                  name="bio1"
                  value={this.props.editContributor1Bio}
                  as="textarea"
                  rows="3" />
                <img src={this.props.editPhoto1} width="100" alt="Contributor 1" />
                <p>Contributor 1 Photo</p>
                <ImageUpload
                  contributor='photo1' />
              </Card.Body>
            </Card>
          </Col>

          {/* CONTRIBUTOR 2 */}
          <Col>
            <Card>
              <Card.Body>
                <FormLabel>Contributor 2 First Name</FormLabel>
                <FormControl 
                  onChange={this.props.handleTextChange}
                  name="contributor2FirstName"
                  value={this.props.editContributor2FirstName}
                />
                <FormLabel>Contributor 2 Last Name</FormLabel>
                <FormControl 
                  onChange={this.props.handleTextChange}
                  name="contributor2LastName"
                  value={this.props.editContributor2LastName}
                />
                <FormLabel>Contributor 2 Bio</FormLabel>
                <FormControl 
                  onChange={this.props.handleTextChange}
                  name="bio2"
                  value={this.props.editContributor2Bio}
                  as="textarea"
                  rows="3" />
                <img src={this.props.editPhoto2} width="100" alt="Contributor 2" />
                <p>Contributor 2 Photo</p>
                <ImageUpload
                  contributor='photo2' />

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}