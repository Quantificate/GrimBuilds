import React, {Component} from 'react';
import {Button, Modal, Alert, Navbar, Nav, Form, FormControl} from 'react-bootstrap';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import FaqModal from './faqModal'
import SubmitForm from './SubmitForm'
import {Editor, EditorState, convertFromRaw} from 'draft-js';
import './index.css'

class BuildGuide extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleFavClick = this.handleFavClick.bind(this);

        this.state = {
            build: null,
            err: null,
            guideout: "",
            isFancy: false,
        };
    }

    handleFavClick() {
      const id = this.props.build.id;
      if (this.state.clicked == false) {
        fetch('/api/likes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id})
        })
        .then(response => {
          console.log(response)
          this.setState({clicked:true})
        })
        .catch(err => {
          this.setState({ err })
        })
      } else {
        return (
          <Alert variant="danger">You have already liked this build.</Alert>
        )
      }
    }

    componentDidMount() {
      const buildId = this.props.match.params.id;
      console.log('buildId=', buildId)
      fetch('/api/guide/' + buildId)
      .then(res => {
          console.log(res);
          return res.json()
      })
      .then(build => {
        console.log('setting build state=', build)
        this.setState({ build })
      })
      .then(() => {
      if (this.state.build.guide.charAt(0) == '{') {
        const guide = JSON.parse(this.props.build.guide);
        const contentState = convertFromRaw(guide);
        this.setState({guideout: EditorState.createWithContent(contentState), isFancy: true})
      } else {
        this.setState({ guideout: this.props.build.guide.toString(), isFancy: false })
      }})
      .catch(err =>
        this.setState({ err })
      )
    }

    render(){
        const build = this.state.build
        const err = this.state.err
        const fancy = this.state.isFancy;
        let display;

        if (fancy) {
          display = <Editor editorState={this.state.guideout} readOnly={true} />;
        } else {
          display = <p>{this.state.guideout}</p>;
        }

        return (
          <div className="guide-body">
            <div className="container" id="buildTitle">
              <span id="leftTitle">{build && build.charname}</span>
              <span id="rightTitle">{build && build.gameVersion.label}</span>
            </div>
            <div className="container" id="bigstuff">
              <h4>{build && build.class.label}</h4>
              <h5>{build && build.purpose.label}</h5>
              <p>
                <Button
                  variant="outline-secondary"
                  href={build && build.link}
                  target="_blank"
                  >
                    Grim Tools
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={this.handleFavClick}
                  value={build && build.likes}
                >
                  Like this Build ({build && build.likes})
                </Button>
              </p>
            </div>
            <div className="container" id="basics">
              <ul>
                <li>Damage Type: {build && build.damageType.label}</li>
                <li>Playstyle: {build && build.playstyle.label}</li>
                <li>Primary Skill: {build && build.primarySkill.label}</li>
                <li>Author: {build && build.author}</li>
              </ul>
            </div>
            <div className="container" id="allSkills">
              <p>Active Skills: {build && build.activeSkills.map(({label}) => label).join(', ')}</p>
              <p>Passive Skills: {build && build.passiveSkills.map(({label}) => label).join(', ')}</p>
            </div>
            <div className="container" id="advanced">
              <ul>
                <li>Gear Needed: {build && build.gearreq.label}</li>
                <li>Crucible Clear: {build && build.cruci.label}</li>
                <li>Shattered Realms Clear: {build && build.srLevel.label}</li>
              </ul>
            </div>
            <div className="container" id="guide">
              {display}
            </div>
          </div>
        // <>
        // <Button variant="outline-secondary" onClick={this.handleShow}>Full Guide</Button>
        // <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
        //   <Modal.Header closeButton>
        //     <Modal.Title id="buildTitle"><span id="leftTitle">{this.props.build.charname}</span><span id="rightTitle">{this.props.build.gameVersion.label}</span></Modal.Title>
        //   </Modal.Header>
        //   <Modal.Body>
        //     <div className="container-fluid" id="bigstuff">
        //       <h4>{this.props.build.class.label}</h4>
        //       <h5>{this.props.build.purpose.label}</h5>
        //       <p><Button variant="outline-secondary" href={this.props.build.link} target="_blank">Grim Tools</Button></p>
        //     </div>
        //     <div className="container-fluid" id="basics">
        //       <p>Damage Type: {this.props.build.damageType.label}</p>
        //       <p>Playstyle: {this.props.build.playstyle.label}</p>
        //       <p>Primary Skill: {this.props.build.primarySkill.label}</p>
        //       <p>Author: {this.props.build.author}</p>
        //     </div>
        //     <div className="container-fluid" id="allSkills">
        //       <p>Active Skills: {this.props.build.activeSkills.map(({label}) => label).join(', ')}</p>
        //       <p>Passive Skills: {this.props.build.passiveSkills.map(({label}) => label).join(', ')}</p>
        //     </div>
        //     <div className="container-fluid" id="advanced">
        //       <p>Gear Needed: {this.props.build.gearreq.label}</p>
        //       <p>Crucible Clear: {this.props.build.cruci.label}</p>
        //       <p>Shattered Realms Clear: {this.props.build.srLevel.label}</p>
        //     </div>
        //     <div className="container-fluid" id="guide">
        //       {display}
        //     </div>
        //   </Modal.Body>
        //   <Modal.Footer>
        //     <Button onClick={this.handleFavClick} clicked={this.state.clicked.toString()} value={this.props.build.likes}>Like this Build ({this.props.build.likes})</Button>
        //   </Modal.Footer>
        // </Modal>
        // </>
      )
    }
  }

  export default BuildGuide
