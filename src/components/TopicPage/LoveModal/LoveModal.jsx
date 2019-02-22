import React, { Component } from 'react';
import { Button, Glyphicon, Modal } from 'react-bootstrap';

import './LoveModal.css'

class LoveModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            interested: false,
            loveButtonColor: 'black'
        };
    }

    handleOpen = () => {

        this.setState({
            open: true,
            interested: false
        });
    };

    handleNo = () => {
        this.setState({
            loveButtonColor: 'black'
        });
        this.handleClose();

    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleInterested = () => {
        this.setState({
            interested: true,
            loveButtonColor: 'red'
        });
    };



    render() {

        let loveModalClass = this.props.contributor + 'LoveModal';

        let loveButtonColor = this.state.loveButtonColor;

        return (
            <div>
                <Glyphicon style={{color: loveButtonColor}} glyph="heart" onClick={this.handleOpen} />


                <Modal show={this.state.open} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={loveModalClass}>
                            {!this.state.interested ? <div>We’re glad you want to get involved. Would you like us to send you more information on this topic?</div> : <div>Great! We'll email you with ways to stay connected and informed.</div>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {!this.state.interested ? <div><Button onClick={this.handleNo}>No</Button><Button onClick={this.handleInterested}>Yes!</Button></div> : <div><Button onClick={this.handleClose}>Close</Button></div>}

                    </Modal.Footer>
                </Modal>
            </div >
        );
    }
}

export default LoveModal;

