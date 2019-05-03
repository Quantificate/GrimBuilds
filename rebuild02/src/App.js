import React, {Component} from 'react';
import {Card, Nav, Navbar, NavDropdown, Form, FormControl, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import SearchResults from 'react-filter-search';
import FilterResults from 'react-filter-search';
import './App.css';

//TODO: Conditionals for different info items based on Purpose.
//TODO: Code for creating cards generically, then filling with database info.

class App extends Component {
    constructor(){
        super();
        this.state = {
            builds:[],
            value:''
        };
    }
    componentDidMount() {
        fetch('/builds')
        .then(res => {
            console.log(res);
            return res.json()
        })
        .then(builds => {
            console.log(builds);
            this.setState({ builds })
        });
    }
    handleValueChange = event => {
        const {value} = event.target;
        this.setState({value});
    };
    render() {
        const {builds, value} = this.state;
      return (
        <div className="App">
          <header className="App-header">
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#home">Grim Builds <span>(alpha)</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Builds" id="basic-nav-dropdown">
                            <NavDropdown.Item>Browse Builds</NavDropdown.Item>
                            <NavDropdown.Item>Top Builds</NavDropdown.Item>
                            <NavDropdown.Item>Newest Builds</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>Submit Your Build</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search Builds" className="mr-sm-2" value={value} onChange={this.handleValueChange} />
                    </Form>
                </Navbar.Collapse>
            </Navbar>
          </header>
          <div className="App-body">
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#home">Filters</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form className="mr-auto" value={value} onChange={this.handleValueChange}>
                        <Form.Row>
                        <Form.Group controlId="formClass">
                            <Form.Label>Class</Form.Label>
                            <Form.Control as="select">
                                <option>Classes</option>
                                <option>Apostate</option>
                                <option>Archon</option>
                                <option>Battlemage</option>
                                <option>Blademaster</option>
                                <option>Cabalist</option>
                                <option>Commando</option>
                                <option>Conjurer</option>
                                <option>Death Knight</option>
                                <option>Deceiver</option>
                                <option>Defiler</option>
                                <option>Dervish</option>
                                <option>Druid</option>
                                <option>Elementalist</option>
                                <option>Infiltrator</option>
                                <option>Mage Hunter</option>
                                <option>Oppressor</option>
                                <option>Paladin</option>
                                <option>Purifier</option>
                                <option>Pyromancer</option>
                                <option>Reaper</option>
                                <option>Ritualist</option>
                                <option>Saboteur</option>
                                <option>Sentinel</option>
                                <option>Shieldbreaker</option>
                                <option>Sorcerer</option>
                                <option>Spellbinder</option>
                                <option>Spellbreaker</option>
                                <option>Tactician</option>
                                <option>Templar</option>
                                <option>Trickster</option>
                                <option>Vindicator</option>
                                <option>Warder</option>
                                <option>Warlock</option>
                                <option>Warlord</option>
                                <option>Witch Hunter</option>
                                <option>Witchblade</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formMastery">
                            <Form.Label>Mastery</Form.Label>
                            <Form.Control as="select">
                                <option>Masteries</option>
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
                        <Form.Group controlId="formStyle">
                            <Form.Label>Playstyle</Form.Label>
                            <Form.Control as="select">
                                <option>Styles</option>
                                <option>DW Melee</option>
                                <option>DW Ranged</option>
                                <option>2H Melee</option>
                                <option>2H Ranged</option>
                                <option>Sword and Board</option>
                                <option>Caster</option>
                                <option>Pets</option>
                                <option>Retaliation</option>
                                <option>Hybrid</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formPurpose">
                            <Form.Label>Purpose</Form.Label>
                            <Form.Control as="select">
                                <option>Purposes</option>
                                <option>Main Campaign</option>
                                <option>Leveling</option>
                                <option>Endgame</option>
                                <option>Shattered Realms/Crucible</option>
                                <option>Farming</option>
                                <option>New Players</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formDamage">
                            <Form.Label>Damage Type</Form.Label>
                            <Form.Control as="select">
                                <option>Damage Types</option>
                                <option>Physical</option>
                                <option>Piercing</option>
                                <option>Fire</option>
                                <option>Cold</option>
                                <option>Lightning</option>
                                <option>Elemental</option>
                                <option>Acid</option>
                                <option>Bleeding</option>
                                <option>Vitality</option>
                                <option>Chaos</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formSR">
                            <Form.Label>Shattered Realms</Form.Label>
                            <Form.Control as="select">
                                <option>SR Ability</option>
                                <option>SR 1+</option>
                                <option>SR 15+</option>
                                <option>SR 25+</option>
                                <option>SR 50+</option>
                                <option>SR 75+</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formCruci">
                            <Form.Label>Crucible</Form.Label>
                            <Form.Control as="select">
                                <option>Crucible Ability</option>
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
                        </Form.Group>
                        <Form.Group controlId="formGear">
                            <Form.Label>Gear Requirements</Form.Label>
                            <Form.Control as="select">
                                <option>Gear Required</option>
                                <option>100% Vendors</option>
                                <option>Vendors/Rep Blueprints</option>
                                <option>Vendors/Dropped Blueprints</option>
                                <option>Light Farming Legendaries</option>
                                <option>Moderate Farming Legendaries</option>
                                <option>Heavy Farming Legendaries</option>
                                <option>1 MI Farming</option>
                                <option>2+ MI Farming</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    </Form>
                    <Button className="btn btn-secondary" href="/">Reset</Button>
                </Navbar.Collapse>
            </Navbar>
            <div className="container" id="cardholder">

                    <SearchResults value={value} data={builds}
                    renderResults={results => (
                        <div className="row">
                        {results.map(build =>
                        <Card key={build.id} style={{width:'15rem'}}>
                            <Card.Img variant="top" src="/images/placehold.png" />
                            <Card.Body>
                                <Card.Title>{build.charname}</Card.Title>
                                <Card.Text>{build.blurb}</Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>{build.class}</ListGroupItem>
                                <ListGroupItem>{build.mastery1} {build.mastery2}</ListGroupItem>
                                <ListGroupItem>{build.purpose}</ListGroupItem>
                                <ListGroupItem>{build.playstyle}</ListGroupItem>
                                <ListGroupItem>{build.damagetype}</ListGroupItem>
                                <ListGroupItem>By: {build.author}</ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                                <Card.Link href={build.link} target="_blank">Grim Tools</Card.Link>
                            </Card.Body>
                        </Card>
                        )}
                        </div>
                        )} />
            </div>
          </div>
        </div>

  );
}
}

export default App;
