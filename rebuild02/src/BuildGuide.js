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

        // this.handleFavClick = this.handleFavClick.bind(this);

        this.state = {
            build: null,
            err: null,
            guideout: "",
            isFancy: false,
        };
    }

    // handleFavClick() {
    //   const id = this.props.build.id;
    //   if (this.state.clicked == false) {
    //     fetch('/api/likes', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({id})
    //     })
    //     .then(response => {
    //       console.log(response)
    //       this.setState({clicked:true})
    //     })
    //     .catch(err => {
    //       this.setState({ err })
    //     })
    //   } else {
    //     return (
    //       <Alert variant="danger">You have already liked this build.</Alert>
    //     )
    //   }
    // }

    componentDidMount() {
      fetch('/guide/' + this.props.match.params.id)
      .then(res => res.json()
        .then(body => {
          if (res.ok)
            return body
          throw new Error(body.err || 'Unable to parse server response')
        })
      )
      .then(build => {
        this.setState({ build })
        if (this.state.build.guide.charAt(0) == '{') {
          const guide = JSON.parse(build.guide);
          const contentState = convertFromRaw(guide);
          this.setState({guideout: EditorState.createWithContent(contentState), isFancy: true})
        } else {
          this.setState({ guideout: build.guide.toString(), isFancy: false })
        }
      })
      .catch(err => {
        console.log('err=', err)
        this.setState({ err })
      })
    }

    renderBuild(build) {
      const fancy = this.state.isFancy;
      let display;

      if (fancy) {
        display = <Editor editorState={this.state.guideout} readOnly={true} />;
      } else {
        display = <p>{this.state.guideout}</p>;
      }

      return <div className="guide-body">
          <div className="container" id="buildTitle">
            <span id="leftTitle">{build.charname}</span>
            <span id="rightTitle">{build.gameVersion.label}</span>
          </div>
          <div className="container" id="bigstuff">
            <h4>{build.class.label}</h4>
            <h5>{build.purpose.label}</h5>
            <p>
              <Button
                variant="outline-secondary"
                href={build.link}
                target="_blank"
                >
                  Grim Tools
              </Button>
            </p>
          </div>
          <div className="container" id="basics">
            <ul>
              <li>Damage Type: {build.damageType.label}</li>
              <li>Playstyle: {build.playstyle.label}</li>
              <li>Primary Skill: {build.primarySkill.label}</li>
              <li>Author: {build.author}</li>
            </ul>
          </div>
          <div className="container" id="allSkills">
            <p>Active Skills: {build.activeSkills.map(({label}) => label).join(', ')}</p>
            <p>Passive Skills: {build.passiveSkills.map(({label}) => label).join(', ')}</p>
          </div>
          <div className="container" id="advanced">
            <ul>
              <li>Gear Needed: {build.gearreq.label}</li>
              <li>Crucible Clear: {build.cruci.label}</li>
              <li>Shattered Realms Clear: {build.srLevel.label}</li>
            </ul>
          </div>
          <div className="container" id="guide">
            {display}
          </div>
        </div>
    }
    renderErr(err) {
      /* TODO make this look more errory */
      return <div>
        Error: {err.message}
      </div>
    }
    renderLoadThrobber() {
      /* TODO make this look more loadery */
      return <div>
        Loading...
      </div>
    }
    render(){
        const build = this.state.build
        const err = this.state.err

        return err
          ? this.renderErr(err)
          : build
          ? this.renderBuild(build)
          : this.renderLoadThrobber()
    }
  }

  export default BuildGuide
