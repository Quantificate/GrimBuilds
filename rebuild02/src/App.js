import React, {Component} from 'react';
import {Card, Nav, Navbar, NavDropdown, Form, FormControl, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import './App.css';

//TODO: Conditionals for different info items based on Purpose.
//TODO: Code for creating cards generically, then filling with database info.

class App extends Component {
    constructor(){
        super();
        this.state = {builds:[]};
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
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#home">Grim Builds</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Builds" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#">Browse Builds</NavDropdown.Item>
                            <NavDropdown.Item href="#">Top Builds</NavDropdown.Item>
                            <NavDropdown.Item href="#">Newest Builds</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#">Submit Your Build</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search Builds" className="mr-sm-2" />
                        <Button variant="outline-secondary">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
          </header>
          <body className="App-body">
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#home">Filters</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Classes" id="class-nav-dropdown">
                            <NavDropdown.Item href="#">Apostate</NavDropdown.Item>
                            <NavDropdown.Item href="#">Archon</NavDropdown.Item>
                            <NavDropdown.Item href="#">Battlemage</NavDropdown.Item>
                            <NavDropdown.Item href="#">Blademaster</NavDropdown.Item>
                            <NavDropdown.Item href="#">Cabalist</NavDropdown.Item>
                            <NavDropdown.Item href="#">Commando</NavDropdown.Item>
                            <NavDropdown.Item href="#">Conjurer</NavDropdown.Item>
                            <NavDropdown.Item href="#">Death Knight</NavDropdown.Item>
                            <NavDropdown.Item href="#">Deceiver</NavDropdown.Item>
                            <NavDropdown.Item href="#">Defiler</NavDropdown.Item>
                            <NavDropdown.Item href="#">Dervish</NavDropdown.Item>
                            <NavDropdown.Item href="#">Druid</NavDropdown.Item>
                            <NavDropdown.Item href="#">Elementalist</NavDropdown.Item>
                            <NavDropdown.Item href="#">Infiltrator</NavDropdown.Item>
                            <NavDropdown.Item href="#">Mage Hunter</NavDropdown.Item>
                            <NavDropdown.Item href="#">Oppressor</NavDropdown.Item>
                            <NavDropdown.Item href="#">Paladin</NavDropdown.Item>
                            <NavDropdown.Item href="#">Purifier</NavDropdown.Item>
                            <NavDropdown.Item href="#">Pyromancer</NavDropdown.Item>
                            <NavDropdown.Item href="#">Reaper</NavDropdown.Item>
                            <NavDropdown.Item href="#">Ritualist</NavDropdown.Item>
                            <NavDropdown.Item href="#">Saboteur</NavDropdown.Item>
                            <NavDropdown.Item href="#">Sentinel</NavDropdown.Item>
                            <NavDropdown.Item href="#">Shieldbreaker</NavDropdown.Item>
                            <NavDropdown.Item href="#">Sorcerer</NavDropdown.Item>
                            <NavDropdown.Item href="#">Spellbinder</NavDropdown.Item>
                            <NavDropdown.Item href="#">Spellbreaker</NavDropdown.Item>
                            <NavDropdown.Item href="#">Tactician</NavDropdown.Item>
                            <NavDropdown.Item href="#">Templar</NavDropdown.Item>
                            <NavDropdown.Item href="#">Trickster</NavDropdown.Item>
                            <NavDropdown.Item href="#">Vindicator</NavDropdown.Item>
                            <NavDropdown.Item href="#">Warder</NavDropdown.Item>
                            <NavDropdown.Item href="#">Warlock</NavDropdown.Item>
                            <NavDropdown.Item href="#">Warlord</NavDropdown.Item>
                            <NavDropdown.Item href="#">Witch Hunter</NavDropdown.Item>
                            <NavDropdown.Item href="#">Witchblade</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Masteries" id="mastery-nav-dropdown">
                            <NavDropdown.Item href="#">Soldier</NavDropdown.Item>
                            <NavDropdown.Item href="#">Demolitionist</NavDropdown.Item>
                            <NavDropdown.Item href="#">Occultist</NavDropdown.Item>
                            <NavDropdown.Item href="#">Nightblade</NavDropdown.Item>
                            <NavDropdown.Item href="#">Arcanist</NavDropdown.Item>
                            <NavDropdown.Item href="#">Shaman</NavDropdown.Item>
                            <NavDropdown.Item href="#">Inquisitor</NavDropdown.Item>
                            <NavDropdown.Item href="#">Necromancer</NavDropdown.Item>
                            <NavDropdown.Item href="#">Oathkeeper</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Playstyle" id="style-nav-dropdown">
                            <NavDropdown.Item href="#">DW Melee</NavDropdown.Item>
                            <NavDropdown.Item href="#">DW Ranged</NavDropdown.Item>
                            <NavDropdown.Item href="#">2H Melee</NavDropdown.Item>
                            <NavDropdown.Item href="#">2H Ranged</NavDropdown.Item>
                            <NavDropdown.Item href="#">Sword and Board</NavDropdown.Item>
                            <NavDropdown.Item href="#">Caster</NavDropdown.Item>
                            <NavDropdown.Item href="#">Pets</NavDropdown.Item>
                            <NavDropdown.Item href="#">Retaliation</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Purpose" id="purpose-nav-dropdown">
                            <NavDropdown.Item href="#">Main Campaign</NavDropdown.Item>
                            <NavDropdown.Item href="#">Leveling</NavDropdown.Item>
                            <NavDropdown.Item href="#">Endgame Bosses</NavDropdown.Item>
                            <NavDropdown.Item href="#">Shattered Realms/Crucible</NavDropdown.Item>
                            <NavDropdown.Item href="#">Farming</NavDropdown.Item>
                            <NavDropdown.Item href="#">New Players</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Damage Types" id="damage-nav-dropdown">
                            <NavDropdown.Item href="#">Physical/Internal Trauma</NavDropdown.Item>
                            <NavDropdown.Item href="#">Piercing</NavDropdown.Item>
                            <NavDropdown.Item href="#">Fire/Burning</NavDropdown.Item>
                            <NavDropdown.Item href="#">Cold/Frostburn</NavDropdown.Item>
                            <NavDropdown.Item href="#">Lightning/Electrocution</NavDropdown.Item>
                            <NavDropdown.Item href="#">Elemental</NavDropdown.Item>
                            <NavDropdown.Item href="#">Acid/Poison</NavDropdown.Item>
                            <NavDropdown.Item href="#">Bleeding</NavDropdown.Item>
                            <NavDropdown.Item href="#">Vitality/Vitality Decay</NavDropdown.Item>
                            <NavDropdown.Item href="#">Chaos</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Shattered Realms" id="sr-nav-dropdown">
                            <NavDropdown.Item href="#">SR 1+</NavDropdown.Item>
                            <NavDropdown.Item href="#">SR 15+</NavDropdown.Item>
                            <NavDropdown.Item href="#">SR 25+</NavDropdown.Item>
                            <NavDropdown.Item href="#">SR 50+</NavDropdown.Item>
                            <NavDropdown.Item href="#">SR 75+</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Crucible" id="cruci-nav-dropdown">
                            <NavDropdown.Item href="#">Crucible 1+</NavDropdown.Item>
                            <NavDropdown.Item href="#">Crucible 15+</NavDropdown.Item>
                            <NavDropdown.Item href="#">Crucible 25+</NavDropdown.Item>
                            <NavDropdown.Item href="#">Crucible 50+</NavDropdown.Item>
                            <NavDropdown.Item href="#">Crucible 75+</NavDropdown.Item>
                            <NavDropdown.Item href="#">Crucible 100+</NavDropdown.Item>
                            <NavDropdown.Item href="#">Crucible 125+</NavDropdown.Item>
                            <NavDropdown.Item href="#">Crucible 150+</NavDropdown.Item>
                            <NavDropdown.Item href="#">Crucible 170</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Gear Requirement" id="gear-nav-dropdown">
                            <NavDropdown.Item href="#">100% Vendors</NavDropdown.Item>
                            <NavDropdown.Item href="#">Vendors/Rep Blueprints</NavDropdown.Item>
                            <NavDropdown.Item href="#">Vendors/Dropped Blueprints</NavDropdown.Item>
                            <NavDropdown.Item href="#">Light Farming Legendaries</NavDropdown.Item>
                            <NavDropdown.Item href="#">Moderate Farming Legendaries</NavDropdown.Item>
                            <NavDropdown.Item href="#">Heavy Farming Legendaries</NavDropdown.Item>
                            <NavDropdown.Item href="#">1 MI Farming</NavDropdown.Item>
                            <NavDropdown.Item href="#">2+ MI Farming</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container" id="cardholder">
                <div className="row">
                    {this.state.builds.map(build =>
                    <Card style={{width:'15rem'}}>
                        <Card.Img variant="top" src="/images/placehold.png" />
                        <Card.Body>
                            <Card.Title>{build.charname}</Card.Title>
                            <Card.Text>Now with JSON!</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>{build.class}</ListGroupItem>
                            <ListGroupItem>{build.purpose}</ListGroupItem>
                            <ListGroupItem>{build.playstyle}</ListGroupItem>
                            <ListGroupItem>{build.damagetype}</ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                            <Card.Link href={build.link}>Grim Tools</Card.Link>
                        </Card.Body>
                    </Card>
                    )}
                </div>
            </div>
          </body>
        </div>

  );
}
}

export default App;
