import React from 'react';
import {Nav, Navbar, NavDropdown, Form, FormControl, Button, DropdownButton, Dropdown} from 'react-bootstrap';
import './App.css';

function App() {
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
                </Nav>
            </Navbar.Collapse>
        </Navbar>
      </body>
    </div>

  );
}

export default App;
