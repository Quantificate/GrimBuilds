import React, {Component} from 'react';
import {Button, Modal, Alert} from 'react-bootstrap';
import {Editor, EditorState, convertFromRaw} from 'draft-js';

class BuildGuide extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleFavClick = this.handleFavClick.bind(this);

        this.state = {
            show: false,
            clicked: false,
            guideout: "",
            isFancy: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
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
      if (this.props.build.guide.charAt(0) == '{') {
        console.log(this.props.build.guide);
        const guide = JSON.parse(this.props.build.guide);
        const contentState = convertFromRaw(guide);
        this.setState({guideout: EditorState.createWithContent(contentState), isFancy: true})
      } else {
        console.log(this.props.build.guide)
        this.setState({ guideout: this.props.build.guide.toString(), isFancy: false })
        console.log(this.state.guideout)
      }
    }

    render(){
        const fancy = this.state.isFancy;
        let display;

        if (fancy) {
          display = <Editor editorState={this.state.guideout} readOnly={true} />;
        } else {
          display = <p>{this.state.guideout}</p>;
        }
        return (
        <>
        <Button variant="outline-secondary" onClick={this.handleShow}>Full Guide</Button>
        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title id="buildTitle"><span id="leftTitle">{this.props.build.charname}</span><span id="rightTitle">{this.props.build.version}</span></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid" id="bigstuff">
              <h4>{this.props.build.class}</h4>
              <h5>{this.props.build.purpose}</h5>
              <p><Button variant="outline-secondary" href={this.props.build.link} target="_blank">Grim Tools</Button></p>
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
              {display}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleFavClick} clicked={this.state.clicked.toString()} value={this.props.build.likes}>Like this Build ({this.props.build.likes})</Button>
          </Modal.Footer>
        </Modal>
        </>
      )
    }
  }

  export default BuildGuide
