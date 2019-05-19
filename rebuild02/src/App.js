import React, {Component} from 'react';
import {Card, Nav, Navbar, NavDropdown, Form, FormControl, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import BuildCard from './BuildCard'
import FaqModal from './faqModal'
import RandomBuild from './randomBuild'
import SubmitForm from './SubmitForm'
import * as filterOptions from './Filters.json'
import './App.css';

//TODO: Conditionals for different info items based on Purpose.
//TODO: Code for creating cards generically, then filling with database info.

const renderOption = opt => <option key={opt} value={opt}>{opt}</option>

const filterCategories = [
    "class",
    "mastery",
    "playstyle",
    "purpose",
    "damagetype",
    "srlevel",
    "cruci",
    "gearreq"
]

/* filter categories with a single string value in the build representation
 * TODO maybe use a uniform representation for all filterable build attributes
 */
const unaryFilterCategories = [
    "class",
    "playstyle",
    "purpose",
    "damagetype",
    "srlevel",
    "cruci",
    "gearreq"
]

const initFilterState = {
    class: '',
    mastery: '',
    playstyle: '',
    purpose: '',
    damagetype: '',
    srlevel: '',
    cruci: '',
    gearreq: '',
}

const filterBuilds = (filters, searchText) => build => {
    /* Right now search text is searched as a single phrase. We'll also hit
     * false positives between field boundaries, see `_all` property assignment
     * for why. TODO more sophisticated server-side search */
    searchText = searchText.trim()
    return unaryFilterCategories.every(
        filterCategory =>
            filters[filterCategory] === '' ||
            filters[filterCategory] === build[filterCategory]
        ) && (searchText === '' || build._all.indexOf(searchText) >= 0)
}

const upper1 = s => s[0].toUpperCase() + s.slice(1)

class App extends Component {
    constructor(){
        super();
        this.state = {
            builds:[],
            filters: initFilterState,
            searchText: '',
        };
        /* pre-bind onChange handlers for each filter category */
        filterCategories.forEach(filterCategory =>
            this['onChange'+upper1(filterCategory)] = this.onChangeFilter.bind(this, filterCategory)
        )
    }
    onChangeFilter(filterCategory, ev) {
        console.log('changing filter for', filterCategory, 'to', ev.value)
        this.setState({
            filters: { ...this.state.filters, [filterCategory]: ev.target.value }
        })
    }
    componentDidMount() {
        fetch('/builds-all')
        .then(res => {
            console.log(res);
            return res.json()
        })
        .then(builds => {
            /* For our prototype, we want search text to apply to every field
             * in the build, so let's create a field which concatenates every
             * field in the build */
            builds.forEach(build =>
                build._all = Object.keys(build).map(
                    key => build[key]
                ).join(' ')
            )
            console.log(builds);
            this.setState({ builds })
        });
    }
    onSearchBarChange = ev => {
        this.setState({
            searchText: ev.target.value
        })
    }
    render() {
        /* Filter builds down */
        const builds = this.state.builds.filter(
            filterBuilds(
                this.state.filters,
                this.state.searchText,
            )
        )

        const renderResults = results => <div className="row">{
            results.map(BuildCard)
        }</div>

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
                    <Form inline>
                        <FormControl type="text" placeholder="Search Builds" className="mr-sm-2" onChange={this.onSearchBarChange} />
                    </Form>
                </Navbar.Collapse>
            </Navbar>
          </header>
          <div className="App-body">
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#home">Filters</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form className="mr-auto">
                        <Form.Row>
                        <Form.Group controlId="formClass">
                            <Form.Label>Class</Form.Label>
                            <Form.Control as="select" onChange={this.onChangeClass}>
                                <option key="none" value="">No Filter</option>
                                {filterOptions.class.map(renderOption)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formMastery">
                            <Form.Label>Mastery</Form.Label>
                            <Form.Control as="select" onChange={this.onChangeMastery}>
                                <option key="none" value="">No Filter</option>
                                {filterOptions.mastery.map(renderOption)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formStyle">
                            <Form.Label>Playstyle</Form.Label>
                            <Form.Control as="select" onChange={this.onChangePlaystyle}>
                                <option key="none" value="">No Filter</option>
                                {filterOptions.playstyle.map(renderOption)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formPurpose">
                            <Form.Label>Purpose</Form.Label>
                            <Form.Control as="select" onChange={this.onChangePurpose}>
                                <option key="none" value="">No Filter</option>
                                {filterOptions.purpose.map(renderOption)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formDamage">
                            <Form.Label>Damage Type</Form.Label>
                            <Form.Control as="select" onChange={this.onChangeDamage}>
                                <option key="none" value="">No Filter</option>
                                {filterOptions.damagetype.map(renderOption)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formSR">
                            <Form.Label>Shattered Realms</Form.Label>
                            <Form.Control as="select" onChange={this.onChangeSrlevel}>
                                <option key="none" value="">No Filter</option>
                                {filterOptions.srlevel.map(renderOption)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formCruci">
                            <Form.Label>Crucible</Form.Label>
                            <Form.Control as="select" onChange={this.onChangeCruci}>
                                <option key="none" value="">No Filter</option>
                                {filterOptions.cruci.map(renderOption)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formGear">
                            <Form.Label>Gear Requirements</Form.Label>
                            <Form.Control as="select" onChange={this.onChangeGearreq}>
                                <option key="none" value="">No Filter</option>
                                {filterOptions.gearreq.map(renderOption)}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    </Form>
                    <Button className="btn btn-secondary" href="/">Reset</Button>
                </Navbar.Collapse>
            </Navbar>
            <div className="container" id="cardholder">
                {renderResults(builds)}
            </div>
          </div>
        </div>

  );
}
}

export default App;
