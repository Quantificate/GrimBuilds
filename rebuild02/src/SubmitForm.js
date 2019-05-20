import React, {Component} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import BuildGuide from './BuildGuide'

class SubmitForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitForm = this.submitForm.bind(this);
        //is there a more "react-y" way to do this?
        this.formRef = React.createRef();
        this.handleNameChange = this.handleChange.bind(this, "charname");
        this.handleMastery1Change = this.handleChange.bind(this, "mastery1");
        this.handleMastery2Change = this.handleChange.bind(this, "mastery2");
        this.handleDamageChange = this.handleChange.bind(this, "damage");
        this.handleStyleChange = this.handleChange.bind(this, "style");
        this.handlePurposeChange = this.handleChange.bind(this, "purpose");
        this.handleGearChange = this.handleChange.bind(this, "gear");
        this.handleCruciChange = this.handleChange.bind(this, "cruci");
        this.handleSRChange = this.handleChange.bind(this, "sr");
        this.handleASkillChange = this.handleChange.bind(this, "activeskills");
        this.handlePSkillChange = this.handleChange.bind(this, "passiveskills");
        this.handlePrimaryChange = this.handleChange.bind(this, "primaryskill");
        this.handleAuthorChange = this.handleChange.bind(this, "author");
        this.handleLinkChange = this.handleChange.bind(this, "link");
        this.handleBlurbChange = this.handleChange.bind(this, "blurb");
        this.handleGuideChange = this.handleChange.bind(this, "guide");

        this.state = {
            show: false,
            submitting: false,
            err: false,
            charname: "",
            mastery1: "Soldier",
            mastery2: "Soldier",
            damage: "Physical",
            style: "Sword and Board",
            purpose: "New Players",
            gear: "100% Vendors",
            cruci: "Crucible 1+",
            sr: "SR 1+",
            activeskills: "",
            passiveskills: "",
            primaryskill: "",
            author: "",
            link: "",
            blurb: "",
            guide: ""
        };
    }

    handleClose() {
        this.setState({ show: false, submitting: false, err: false });
    }

    handleShow() {
        this.setState({ show: true, submitting: false, err: false });
    }

    submitForm() {
      console.log(this.state)
      const { charname, mastery1, mastery2, damage, style, purpose, gear, cruci, sr, activeskills, passiveskills, primaryskill, author, link, blurb, guide } = this.state

      this.setState({
        submitting: true
      })
      fetch('/api/builds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          charname, mastery1, mastery2, damage, style, purpose, gear, cruci, sr, activeskills, passiveskills, primaryskill, author, link, blurb, guide
        })
      })
      .then(response => {
        console.log(response)
        this.handleClose()
      })
      .catch(err => {
        this.setState({ err })
      })
    }

    handleChange(fieldName, event) {
      console.log('handleChange', fieldName, event.target.value)
      this.setState({
        [fieldName]: event.target.value
      })
    }

    render(){
      const footer = this.state.submitting ? 'SUBMITTING...' : this.state.err ? this.state.err : ''

      return (
      <>
      <Button variant="secondary" className="submitButton" onClick={this.handleShow}>Submit Your Build</Button>
      <Modal size="lg" id="submitModal" show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Your Own Build!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form _ref={this.formRef}>
            <Form.Group controlId="buildForm">
              <Form.Label>Build Name</Form.Label>
              <Form.Control placeholder="The title of your build." onChange={this.handleNameChange} value={this.state.charname}/>
              <Form.Text className="text-muted">Pick something short, but descriptive.</Form.Text>
            </Form.Group>
            <Form.Group controlId="buildForm" id="masterygroup">
              <Form.Label>Your Masteries</Form.Label>
              <Form.Control as="select" onChange={this.handleMastery1Change} value={this.state.mastery1}>
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
              <Form.Control as="select" onChange={this.handleMastery2Change} value={this.state.mastery2}>
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
              <Form.Control as="select" onChange={this.handleDamageChange} value={this.state.damage}>
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
              <Form.Control as="select" onChange={this.handleStyleChange} value={this.state.style}>
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
              <Form.Control as="select" onChange={this.handlePurposeChange} value={this.state.purpose}>
                <option>New Players</option>
                <option>Leveling</option>
                <option>Main Campaign</option>
                <option>Endgame</option>
                <option>Farming</option>
                <option>Shattered Realm/Crucible</option>
              </Form.Control>
              <Form.Text className="text-muted">Gear Requirement (see FAQ for Gear Requirement Descriptions)</Form.Text>
              <Form.Control as="select" onChange={this.handleGearChange} value={this.state.gear}>
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
              <Form.Control as="select" onChange={this.handleCruciChange} value={this.state.cruci}>
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
              <Form.Control as="select" onChange={this.handleSRChange} value={this.state.sr}>
                <option>SR 1+</option>
                <option>SR 15+</option>
                <option>SR 25+</option>
                <option>SR 50+</option>
                <option>SR 75+</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="buildForm" id="extras">
              <Form.Label>Extras</Form.Label>
              <Form.Control placeholder="List your Active Skills Here" onChange={this.handleASkillChange} value={this.state.activeskills}/>
              <Form.Control placeholder="List your Passive Skills Here" onChange={this.handlePSkillChange} value={this.state.passiveskills}/>
              <Form.Control placeholder="What's your Primary (most used) Skill?" onChange={this.handlePrimaryChange} value={this.state.primaryskill}/>
              <Form.Control placeholder="Your Name (this IS displayed)" onChange={this.handleAuthorChange} value={this.state.author}/>
              <Form.Control placeholder="Paste your GrimTools link URL here." onChange={this.handleLinkChange} value={this.state.link} />
              <Form.Control placeholder="Add a short sentence describing your build." onChange={this.handleBlurbChange} value={this.state.blurb} />
            </Form.Group>
            <Form.Group controlId="buildForm">
              <Form.Label>Guide</Form.Label>
              <Form.Control as="textarea" rows="5" placeholder="Put a guide to playing your build here." onChange={this.handleGuideChange} value={this.state.guide} />
            </Form.Group>
            <Button variant="outline-secondary" type="button" onClick={this.submitForm}>Submit Your Build</Button>
          </Form>
        <Modal.Footer>
          {footer}
        </Modal.Footer>
        </Modal.Body>
      </Modal>
      </>
    );
  }
}

export default SubmitForm;
