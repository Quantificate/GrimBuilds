import React, {Component} from 'react';
import {Card, Nav, Navbar, NavDropdown, Form, FormControl, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Router, Link, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import BuildGuide from './BuildGuide'

const history = createBrowserHistory()

const BuildCard = build => <Card key={build.id} style={{width:'15rem'}}>
  <Card.Img variant="top" src={build.image} />
  <Card.Body>
      <Card.Title>{build.charname}</Card.Title>
      <Card.Text>{build.blurb}</Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
      <ListGroupItem>{build.class.label}</ListGroupItem>
      <ListGroupItem>{build.mastery1.label} / {build.mastery2.label}</ListGroupItem>
      <ListGroupItem>{build.purpose.label}</ListGroupItem>
      <ListGroupItem>{build.playstyle.label}</ListGroupItem>
      <ListGroupItem>{build.gearreq.label}</ListGroupItem>
      <ListGroupItem>By: {build.author}</ListGroupItem>
  </ListGroup>
  <Card.Body>
    <Link to={{ pathname: "/guide/" + build.id, state: build}}><Button variant="outline-secondary">Full Build</Button></Link>
  </Card.Body>
</Card>

export default BuildCard;
