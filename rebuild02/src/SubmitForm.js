import React, {Component} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import BuildGuide from './BuildGuide'

class SubmitForm extends Component {

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
      <Button variant="secondary" className="submitButton" onClick={this.handleShow}>Submit Your Build</Button>
      <Modal size="lg" id="submitModal" show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Your Own Build!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="buildForm">
              <Form.Label>Build Name</Form.Label>
              <Form.Control placeholder="The title of your build." />
              <Form.Text className="text-muted">Pick something short, but descriptive.</Form.Text>
            </Form.Group>
            <Form.Group controlId="buildForm" id="masterygroup">
              <Form.Label>Your Masteries</Form.Label>
              <Form.Control as="select">
                <option>Soldier</option>
                <option>Demolitionist</option>
                <option>Occultist</option>
                <option>Nightblade</option>
                <option>Arcanist</option>
                <option>Shaman</option>
                <option>Inquisitor</option>
                <option>Necromancer</option>
                <option>Oathkeeper</option>
              </Form.Control>
              <Form.Control as="select">
                <option>Soldier</option>
                <option>Demolitionist</option>
                <option>Occultist</option>
                <option>Nightblade</option>
                <option>Arcanist</option>
                <option>Shaman</option>
                <option>Inquisitor</option>
                <option>Necromancer</option>
                <option>Oathkeeper</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="buildForm">
              <Form.Label>Details</Form.Label>
              <Form.Text className="text-muted">Primary Damage Type</Form.Text>
              <Form.Control as="select">
                <option>Physical</option>
                <option>Fire</option>
                <option>Cold</option>
                <option>Lightning</option>
                <option>Vitality</option>
                <option>Chaos</option>
                <option>Aether</option>
                <option>Acid</option>
                <option>Bleed</option>
                <option>Elemental</option>
              </Form.Control>
              <Form.Text className="text-muted">Playstyle</Form.Text>
              <Form.Control as="select">
                <option>Sword and Board</option>
                <option>Two-Handed Melee</option>
                <option>Two-Handed Ranged</option>
                <option>Dual-Wield Melee</option>
                <option>Dual-Wield Ranged</option>
                <option>Caster</option>
                <option>Retaliation</option>
                <option>Spin to Win</option>
              </Form.Control>
              <Form.Text className="text-muted">Build Purpose</Form.Text>
              <Form.Control as="select">
                <option>New Players</option>
                <option>Leveling</option>
                <option>Main Campaign</option>
                <option>Endgame</option>
                <option>Farming</option>
                <option>Shattered Realm/Crucible</option>
              </Form.Control>
              <Form.Text className="text-muted">Gear Requirement (see FAQ for Gear Requirement Descriptions)</Form.Text>
              <Form.Control as="select">
                <option>100% Vendors</option>
                <option>Vendors/Reputation Blueprints</option>
                <option>Vendors/Dropped Blueprints</option>
                <option>Light Farming Legendaries</option>
                <option>Moderate Farming Legendaries</option>
                <option>Heavy Farming Legendaries</option>
                <option>1 MI Farming</option>
                <option>2+ MI Farming</option>
              </Form.Control>
              <Form.Text className="text-muted">Crucible Ability (TESTED, not what you think it'll do)</Form.Text>
              <Form.Control as="select">
                <option>Crucible 1+</option>
                <option>Crucible 15+</option>
                <option>Crucible 25+</option>
                <option>Crucible 50+</option>
                <option>Crucible 75+</option>
                <option>Crucible 100+</option>
                <option>Crucible 125+</option>
                <option>Crucible 150+</option>
                <option>Crucible 170</option>
              </Form.Control>
              <Form.Text className="text-muted">Shattered Realm Ability (TESTED)</Form.Text>
              <Form.Control as="select">
                <option>SR 1+</option>
                <option>SR 15+</option>
                <option>SR 25+</option>
                <option>SR 50+</option>
                <option>SR 75+</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="buildForm" id="extras">
              <Form.Label>Extras</Form.Label>
              <Form.Control placeholder="Your Name (this IS displayed)" />
              <Form.Control placeholder="Paste your GrimTools link URL here." />
              <Form.Control placeholder="Add a short sentence describing your build." />
            </Form.Group>
            <Form.Group controlId="buildForm">
              <Form.Label>Guide</Form.Label>
              <Form.Control as="textarea" rows="5" placeholder="Put a guide to playing your build here." />
            </Form.Group>
            <Button variant="outline-secondary" type="submit">Submit Your Build</Button>
          </Form>
        </Modal.Body>
      </Modal>
      </>
    );
  }
}

export default SubmitForm;
