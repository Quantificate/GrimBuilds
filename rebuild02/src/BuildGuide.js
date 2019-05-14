import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';

class BuildGuide extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render(){

        return (
        <>
        <Button variant="secondary" onClick={this.handleShow}>Full Guide</Button>
        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title id="buildTitle"><span id="leftTitle">{this.props.build.charname}</span><span id="rightTitle">{this.props.build.version}</span></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid" id="bigstuff">
              <h4>{this.props.build.class}</h4>
              <h5>{this.props.build.purpose}</h5>
            </div>
            <div className="container-fluid" id="basics">
              <p>Damage Type: {this.props.build.damagetype}</p>
              <p>Playstyle: {this.props.build.playstyle}</p>
              <p>Primary Skill: {this.props.build.primaryskill}</p>
              <p>Author: {this.props.build.author}</p>
            </div>
            <div className="container-fluid" id="allSkills">
              <p>Active Skills: {this.props.build.activeskills}</p>
              <p>Passive Skills: {this.props.build.passiveskills}</p>
            </div>
            <div className="container-fluid" id="advanced">
              <p>Gear Needed: {this.props.build.gearreq}</p>
              <p>Crucible Clear: {this.props.build.cruci}</p>
              <p>Shattered Realms Clear: {this.props.build.srlevel}</p>
            </div>
            <div className="container-fluid" id="guide">
              <p>{this.props.build.guide}</p>
              <p><Button variant="outline-secondary" href={this.props.build.link} target="_blank">Grim Tools</Button></p>
            </div>
          </Modal.Body>
        </Modal>
        </>
      )
    }
  }

  export default BuildGuide
