import React, {Component} from 'react';
import {Button, Modal, Card, ListGroup, ListGroupItem} from 'react-bootstrap';

// TODO: Change Modal handlers to work in App.js, not within the component, see hdon's messages in Discord

class RandomBuild extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            randBuild: []
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        let rng = Math.floor(Math.random() * this.props.build.length) + 1;
        console.log(rng);
        this.setState({ show: true, randBuild: this.props.build[rng] });
    }

    render(){

        return (
        <>
        <Button variant="secondary" className="randButton" onClick={this.handleShow}>Random Build</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>You got a {this.state.randBuild.class}!</Modal.Header>
            <Card key={this.state.randBuild.id} style={{width:'100%'}}>
              <Card.Img variant="top" src="/images/placehold.png" />
              <Card.Body>
                  <Card.Title>{this.state.randBuild.charname}</Card.Title>
                  <Card.Text>{this.state.randBuild.blurb}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                  <ListGroupItem>{this.state.randBuild.class}</ListGroupItem>
                  <ListGroupItem>{this.state.randBuild.mastery1} {this.state.randBuild.mastery2}</ListGroupItem>
                  <ListGroupItem>{this.state.randBuild.purpose}</ListGroupItem>
                  <ListGroupItem>{this.state.randBuild.playstyle}</ListGroupItem>
                    <ListGroupItem>{this.state.randBuild.primaryskill}</ListGroupItem>
                  <ListGroupItem>{this.state.randBuild.damagetype}</ListGroupItem>
                    <ListGroupItem>{this.state.randBuild.cruci}</ListGroupItem>
                    <ListGroupItem>{this.state.randBuild.srlevel}</ListGroupItem>
                    <ListGroupItem>{this.state.randBuild.gearreq}</ListGroupItem>
                  <ListGroupItem>By: {this.state.randBuild.author}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <p><Card.Link href={this.state.randBuild.guide} target="_blank">Build Guide</Card.Link></p>
                <p><Card.Link href={this.state.randBuild.link} target="_blank">Grim Tools</Card.Link></p>
              </Card.Body>
            </Card>
        </Modal>
        </>
        )
    }
}

export default RandomBuild
