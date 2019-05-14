import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import BuildCard from './BuildCard.js';

class RandomBuild extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            build: 0
        };
    }

    handleClose() {
        this.setState({ show: false });
    }
/* TODO: Change static integer to this.state.builds.length() */
    handleShow() {
        let rng = Math.floor(Math.random() * (31 - 1)) + 1;
        this.setState({ show: true, build: rng });
    }

    render(){
        return (
        <>
        <Button variant="secondary" onClick={this.handleShow}>Random Build</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
            <BuildCard />
        </Modal>
        </>
        )
    }
}

export default RandomBuild
