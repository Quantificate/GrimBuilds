import React, {Component} from 'react';
import {Card, Nav, Navbar, NavDropdown, Form, FormControl, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import BuildGuide from './BuildGuide'

const BuildCard = build => <Card key={build.id} style={{width:'15rem'}}>
  <Card.Img variant="top" src="/images/placehold.png" />
  <Card.Body>
      <Card.Title>{build.charname}</Card.Title>
      <Card.Text>{build.blurb}</Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
      <ListGroupItem>{build.class}</ListGroupItem>
      <ListGroupItem>{build.mastery1} / {build.mastery2}</ListGroupItem>
      <ListGroupItem>{build.purpose}</ListGroupItem>
      <ListGroupItem>{build.playstyle}</ListGroupItem>
      <ListGroupItem>{build.gearreq}</ListGroupItem>
      <ListGroupItem>By: {build.author}</ListGroupItem>
  </ListGroup>
  <Card.Body>
      <BuildGuide build={build} />
  </Card.Body>
</Card>

export default BuildCard
