import React, { Component } from 'react';
import { Card, Image, Container, Row, Col } from 'react-bootstrap';

export default class TopicContributors extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Card className="contributorCardLeft">
              <Card.Body>
                  <Image 
                    className="contributorPhotoLeft" 
                    src={this.props.topicPageContent.photo1} 
                    thumbnail 
                    roundedCircle />
                  <div className="contributorText">
                    <h3>
                      {this.props.topicPageContent.contributor1FirstName} {this.props.topicPageContent.contributor1LastName}
                    </h3>
                    <p className="text-justify">
                      {this.props.topicPageContent.bio1}
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
                  src={this.props.topicPageContent.photo2}
                  thumbnail
                  roundedCircle />
                <div className="contributorText">
                  <h3>
                    {this.props.topicPageContent.contributor2FirstName} {this.props.topicPageContent.contributor2LastName}
                  </h3>
                  <p className="text-justify">
                    {this.props.topicPageContent.bio2}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    );
  }
}
