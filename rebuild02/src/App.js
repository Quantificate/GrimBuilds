import React, {Component} from 'react';
import {Container, Card, Nav, Navbar, NavDropdown, Form, FormControl, Button, ListGroup, ListGroupItem, ButtonGroup} from 'react-bootstrap';
import BuildCard from './BuildCard'
import FaqModal from './faqModal'
import SubmitForm from './SubmitForm'
import BuildGuide from './BuildGuide'
import MainHeader from './mainHeader'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import * as filterOptions from './Filters.json'
import './App.css';

//TODO: Conditionals for different info items based on Purpose.
//TODO: Code for creating cards generically, then filling with database info.

// const routeA = () => <div>
//   <h3>Route A</h3>
//   <p>
//     Wow! A route!
//     <Link to="/b/1">LOOK</Link>
//     <Link to="/b/2">ANOTHER</Link>
//     <Link to="/b/3">ROUTE</Link>
//     <Link to="/b/4"><Button variant="outline-secondary">Try Me</Button></Link>
//   </p>
// </div>
// const routeB = ({match:{params:{id}}}) => <div>
//   <h3>Route /b/{id}</h3>
//   <p>omg too mayn routes <Link to="/">go back..</Link></p>
// </div>


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
            sortBy: '',
            singleBuild:[]
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
        fetch('/api/builds-all')
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

        function Cardholder() {
          return <div className="container" id="cardholder">
              {renderResults(builds)}
          </div>;
        }

        const buildGuideSelector = (builds, id) => {
          var singular = builds.find(build => build.id == id);
          this.setState({singleBuild: singular})
        }

      return (
        <div className="App">
          <header className="App-header">
            <MainHeader builds={this.state.builds} />
          </header>
          <div className="App-body">
            <Navbar bg="dark" expand="lg">
              <div className="filters">
                <Navbar.Brand href="#home">Filters</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Form className="mr-auto">
                    <Form.Row>
                    <Form.Group controlId="formClass">
                        <Form.Control as="select" onChange={this.onChangeClass}>
                            <option key="none" value="">Class</option>
                            {filterOptions.class.map(renderOption)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formMastery">
                        <Form.Control as="select" onChange={this.onChangeMastery}>
                            <option key="none" value="">Mastery</option>
                            {filterOptions.mastery.map(renderOption)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formStyle">
                        <Form.Control as="select" onChange={this.onChangePlaystyle}>
                            <option key="none" value="">Playstyle</option>
                            {filterOptions.playstyle.map(renderOption)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formPurpose">
                        <Form.Control as="select" onChange={this.onChangePurpose}>
                            <option key="none" value="">Purpose</option>
                            {filterOptions.purpose.map(renderOption)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDamage">
                        <Form.Control as="select" onChange={this.onChangeDamagetype}>
                            <option key="none" value="">Damage Type</option>
                            {filterOptions.damagetype.map(renderOption)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formSR">
                        <Form.Control as="select" onChange={this.onChangeSrlevel}>
                            <option key="none" value="">Shattered Realms</option>
                            {filterOptions.srlevel.map(renderOption)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formCruci">
                        <Form.Control as="select" onChange={this.onChangeCruci}>
                            <option key="none" value="">Crucible</option>
                            {filterOptions.cruci.map(renderOption)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formGear">
                        <Form.Control as="select" onChange={this.onChangeGearreq}>
                            <option key="none" value="">Gear Requirement</option>
                            {filterOptions.gearreq.map(renderOption)}
                        </Form.Control>
                    </Form.Group>
                    </Form.Row>
                  </Form>
                </Navbar.Collapse>
              </div>
              <div className="sortButtons">
                <p>Sorting:</p>
                <ButtonGroup aria-label="Sort Buttons">
                  <Button variant="outline-secondary" onClick={this.handleSortChange} value="alpha">Alphabetical</Button>
                  <Button variant="outline-secondary" onClick={this.handleSortChange} value="oldfirst">Oldest to Newest</Button>
                  <Button variant="outline-secondary" onClick={this.handleSortChange} value="newfirst">Newest to Oldest</Button>
                  <Button variant="outline-secondary" onClick={this.handleSortChange} value="likes">Most Liked</Button>
                </ButtonGroup>
              </div>
            </Navbar>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={Cardholder} />
                <Route path="/guide/:id" render={(props) => { return <BuildGuide {...props} build={props.location.state} />}} />
              </Switch>
            </BrowserRouter>
          </div>
        </div>

  );
}
}

export default App;
