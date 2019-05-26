import React, {Component} from 'react';
import {Container, Card, Nav, Navbar, NavDropdown, Form, FormControl, Button, ListGroup, ListGroupItem, ButtonGroup} from 'react-bootstrap';
import FaqModal from './faqModal'
import SubmitForm from './SubmitForm'

class MainHeader extends Component {
  render() {
    return (
      <Navbar bg="dark" expand="lg">
          <Navbar.Brand href="#home">Grim Builds <span>(alpha)</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                  <FaqModal />
                  <SubmitForm />
              </Nav>
              <Button variant="outline-secondary" id="donateButton" href="https://paypal.me/theoreticaldev" target="_blank">Donate</Button>
              <Form inline>
                  <FormControl type="text" placeholder="Search Builds" className="mr-sm-2" onChange={this.onSearchBarChange} />
              </Form>
          </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default MainHeader
