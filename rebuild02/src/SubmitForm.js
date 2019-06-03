import React, {Component} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import BuildGuide from './BuildGuide'
import {EditorState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const getCode = value => value.toLowerCase()
  .replace(/[^a-zA-Z0-9_.-]+/g, '-')
  .replace(/^-*/, '')
  .replace(/-*$/, '')

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
        this.handleImageChange = this.handleChange.bind(this, "image");

        this.state = {
            show: false,
            submitting: false,
            err: false,
            charname: "",
            mastery1: "soldier",
            mastery2: "soldier",
            damage: "physical",
            style: "sword-and-board",
            purpose: "new-players",
            gear: "100-vendors",
            cruci: "crucible-1",
            sr: "sr-1",
            activeskills: [],
            passiveskills: [],
            primaryskill: "",
            author: "",
            link: "",
            blurb: "",
            image: "",
            guide: EditorState.createEmpty()
        };
    }

    handleClose() {
        this.setState({ show: false, submitting: false, err: false });
    }

    handleShow() {
        this.setState({ show: true, submitting: false, err: false });
    }

    onEditorStateChange: Function = (guide) => {
      const rawGuide = convertToRaw(guide.getCurrentContent());
      this.setState({
        guide: rawGuide
      });
    };

    submitForm() {
      console.log('send state=', this.state, typeof this.state.activeskills)
      const { charname, mastery1, mastery2, damage, style, purpose, gear, cruci, sr, activeskills, passiveskills, primaryskill, author, link, blurb, image, guide } = this.state

      this.setState({
        submitting: true
      })

      let activeskillcodes = activeskills.split(',').map(item => getCode(item.trim()))
      let passiveskillcodes = passiveskills.split(',').map(item => getCode(item.trim()))
      let primaryskillcode = getCode(primaryskill.trim())

      fetch('/builds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "charname": charname,
          "mastery1": mastery1,
          "mastery2": mastery2,
          "damageType": damage,
          "playStyle": style,
          "gameVersion": "1.1.2.5",
          "gearReq": gear,
          "cruci": cruci,
          "srLevel": sr,
          "guide": guide,
          "author": author,
          "primarySkill": primaryskillcode,
          "link": link,
          "purpose": purpose,
          "blurb": blurb,
          "image": image,
          "activeSkills": activeskillcodes,
          "passiveSkills": passiveskillcodes
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
      <Button variant="outline-secondary" className="submitButton" onClick={this.handleShow}>Submit Your Build</Button>
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
                <option value="soldier">Soldier</option>
                <option value="demolitionist">Demolitionist</option>
                <option value="occultist">Occultist</option>
                <option value="nightblade">Nightblade</option>
                <option value="arcanist">Arcanist</option>
                <option value="shaman">Shaman</option>
                <option value="inquisitor">Inquisitor</option>
                <option value="necromancer">Necromancer</option>
                <option value="oathkeeper">Oathkeeper</option>
              </Form.Control>
              <Form.Control as="select" onChange={this.handleMastery2Change} value={this.state.mastery2}>
              <option value="soldier">Soldier</option>
              <option value="demolitionist">Demolitionist</option>
              <option value="occultist">Occultist</option>
              <option value="nightblade">Nightblade</option>
              <option value="arcanist">Arcanist</option>
              <option value="shaman">Shaman</option>
              <option value="inquisitor">Inquisitor</option>
              <option value="necromancer">Necromancer</option>
              <option value="oathkeeper">Oathkeeper</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="buildForm">
              <Form.Label>Details</Form.Label>
              <Form.Text className="text-muted">Primary Damage Type</Form.Text>
              <Form.Control as="select" onChange={this.handleDamageChange} value={this.state.damage}>
                <option value="physical">Physical</option>
                <option value="fire">Fire</option>
                <option value="cold">Cold</option>
                <option value="lightning">Lightning</option>
                <option value="vitality">Vitality</option>
                <option value="chaos">Chaos</option>
                <option value="aether">Aether</option>
                <option value="acid">Acid</option>
                <option value="bleeding">Bleed</option>
                <option value="elemental">Elemental</option>
              </Form.Control>
              <Form.Text className="text-muted">Playstyle</Form.Text>
              <Form.Control as="select" onChange={this.handleStyleChange} value={this.state.style}>
                <option value="sword-and-board">Sword and Board</option>
                <option value="2h-melee">Two-Handed Melee</option>
                <option value="2h-ranged">Two-Handed Ranged</option>
                <option value="dw-melee">Dual-Wield Melee</option>
                <option value="dw-ranged">Dual-Wield Ranged</option>
                <option value="caster">Caster</option>
                <option value="retaliation">Retaliation</option>
              </Form.Control>
              <Form.Text className="text-muted">Build Purpose</Form.Text>
              <Form.Control as="select" onChange={this.handlePurposeChange} value={this.state.purpose}>
                <option value="new-players">New Players</option>
                <option value="leveling">Leveling</option>
                <option value="main-campaign">Main Campaign</option>
                <option value="endgame">Endgame</option>
                <option value="farming">Farming</option>
                <option value="shattered-realm-crucible">Shattered Realm/Crucible</option>
              </Form.Control>
              <Form.Text className="text-muted">Gear Requirement (see FAQ for Gear Requirement Descriptions)</Form.Text>
              <Form.Control as="select" onChange={this.handleGearChange} value={this.state.gear}>
                <option value="100-vendors">100% Vendors</option>
                <option value="vendors-rep-blueprints">Vendors/Reputation Blueprints</option>
                <option value="vendors-dropped-blueprints">Vendors/Dropped Blueprints</option>
                <option value="light-farming-legendaries">Light Farming Legendaries</option>
                <option value="moderate-farming-legendaries">Moderate Farming Legendaries</option>
                <option value="heavy-farming-legendaries">Heavy Farming Legendaries</option>
                <option value="1-mi-farming">1 MI Farming</option>
                <option value="2-mi-farming">2+ MI Farming</option>
              </Form.Control>
              <Form.Text className="text-muted">Crucible Ability (TESTED, not what you think it'll do)</Form.Text>
              <Form.Control as="select" onChange={this.handleCruciChange} value={this.state.cruci}>
                <option value="crucible-1">Crucible 1+</option>
                <option value="crucible-15">Crucible 15+</option>
                <option value="crucible-25">Crucible 25+</option>
                <option value="crucible-50">Crucible 50+</option>
                <option value="crucible-75">Crucible 75+</option>
                <option value="crucible-100">Crucible 100+</option>
                <option value="crucible-125">Crucible 125+</option>
                <option value="crucible-150">Crucible 150+</option>
                <option value="crucible-170">Crucible 170</option>
              </Form.Control>
              <Form.Text className="text-muted">Shattered Realm Ability (TESTED)</Form.Text>
              <Form.Control as="select" onChange={this.handleSRChange} value={this.state.sr}>
                <option value="sr-1">SR 1+</option>
                <option value="sr-15">SR 15+</option>
                <option value="sr-25">SR 25+</option>
                <option value="sr-50">SR 50+</option>
                <option value="sr-75">SR 75+</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="buildForm" id="extras">
              <Form.Label>Extras</Form.Label>
              <Form.Text className="text-muted">Skills, Separated by Commas (,); Spelling and Punctuation Count</Form.Text>
              <Form.Control placeholder="List your Active Skills Here" onChange={this.handleASkillChange} value={this.state.activeskills}/>
              <Form.Control placeholder="List your Passive Skills Here" onChange={this.handlePSkillChange} value={this.state.passiveskills}/>
              <Form.Control placeholder="What's your Primary (most used) Skill?" onChange={this.handlePrimaryChange} value={this.state.primaryskill}/>
              <Form.Control placeholder="Your Name (this IS displayed)" onChange={this.handleAuthorChange} value={this.state.author}/>
              <Form.Control placeholder="Paste your GrimTools link URL here." onChange={this.handleLinkChange} value={this.state.link} />
              <Form.Control placeholder="Paste your image link here. (Try Imgur)" onChange={this.handleImageChange} value={this.state.image} />
              <Form.Control placeholder="Add a short sentence describing your build." onChange={this.handleBlurbChange} value={this.state.blurb} />
            </Form.Group>
            <div className="container">
              <p>Guide</p>
              <Editor guide={this.state.guide} onEditorStateChange={this.onEditorStateChange} />
            </div>
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
