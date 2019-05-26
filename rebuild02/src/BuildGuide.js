import React, {Component} from 'react';
import {Button, Modal, Alert, Navbar, Nav, Form, FormControl} from 'react-bootstrap';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import FaqModal from './faqModal'
import RandomBuild from './randomBuild'
import SubmitForm from './SubmitForm'
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
        const guide = JSON.parse(this.props.build.guide);
        const contentState = convertFromRaw(guide);
        this.setState({guideout: EditorState.createWithContent(contentState), isFancy: true})
      } else {
        this.setState({ guideout: this.props.build.guide.toString(), isFancy: false })
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
          <div className="App">
            <header className="App-header">
              <Navbar bg="dark" expand="lg">
                  <Navbar.Brand href="#home">Grim Builds <span>(alpha)</span></Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                          <FaqModal />
                          <RandomBuild build={this.state.builds} />
                          <SubmitForm />
                      </Nav>
                      <Button variant="outline-secondary" id="donateButton" href="https://paypal.me/theoreticaldev" target="_blank">Donate</Button>
                      <Form inline>
                          <FormControl type="text" placeholder="Search Builds" className="mr-sm-2" onChange={this.onSearchBarChange} />
                      </Form>
                  </Navbar.Collapse>
              </Navbar>
            </header>
            <div className="App-body">
              <div className="container" id="buildTitle">
                <span id="leftTitle">{this.props.build.charname}</span>
                <span id="rightTitle">{this.props.build.gameVersion.label}</span>
              </div>
              <div className="container" id="bigstuff">
                <h4>{this.props.build.class.label}</h4>
                <h5>{this.props.build.purpose.label}</h5>
                <p><Button variant="outline-secondary" href={this.props.build.link} target="_blank">Grim Tools</Button><Button onClick={this.handleFavClick} clicked={this.state.clicked.toString()} value={this.props.build.likes}>Like this Build ({this.props.build.likes})</Button></p>
              </div>
              <div className="container" id="basics">
                <ul>
                  <li>Damage Type: {this.props.build.damageType.label}</li>
                  <li>Playstyle: {this.props.build.playstyle.label}</li>
                  <li>Primary Skill: {this.props.build.primarySkill.label}</li>
                  <li>Author: {this.props.build.author}</li>
                </ul>
              </div>
              <div className="container" id="allSkills">
                <p>Active Skills: {this.props.build.activeSkills.map(({label}) => label).join(', ')}</p>
                <p>Passive Skills: {this.props.build.passiveSkills.map(({label}) => label).join(', ')}</p>
              </div>
              <div className="container" id="advanced">
                <ul>
                  <li>Gear Needed: {this.props.build.gearreq.label}</li>
                  <li>Crucible Clear: {this.props.build.cruci.label}</li>
                  <li>Shattered Realms Clear: {this.props.build.srLevel.label}</li>
                </ul>
              </div>
              <div className="container" id="guide">
                {display}
              </div>
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
