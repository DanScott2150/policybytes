// Subcomponent for editing Contributor Proposals

import React, { Component } from 'react'
import { Container, Row, Card, Image, FormLabel, FormControl } from 'react-bootstrap';

export default class EditProposals extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Card className="border-0" style={{ backgroundColor: 'inherit' }}>
            <Card.Body>
              <Image
                className={this.props.arenaPhotoClass}
                src={this.props.arenaPicture}
                thumbnail
                roundedCircle />

              <div className="arenaProposal">
                <h3>{this.props.selectedContributor}'s Proposal: </h3>
                <p className="mb-0">{this.props.arenaProposal}</p>

                <FormLabel>{this.props.selectedContributor}'s Proposal Summary</FormLabel>
                <FormControl 
                  onChange={this.props.handleTextChange}
                  name={this.props.tabNumber === 1 ? "proposal1" : "proposal2"}
                  value={this.props.tabNumber === 1 ? this.props.editProposal1 : this.props.editProposal2}
                  as="textarea"
                  style={{ backgroundColor: '#fff3cd' }}
                  rows="3" />

              </div>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}
