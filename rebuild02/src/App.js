import React, {Component} from 'react';
import {Container, Card, Nav, Navbar, NavDropdown, Form, FormControl, Button, ListGroup, ListGroupItem, ButtonGroup} from 'react-bootstrap';
import BuildCard from './BuildCard'
import FaqModal from './faqModal'
import SubmitForm from './SubmitForm'
import BuildGuide from './BuildGuide'
import MainHeader from './mainHeader'
import SearchResultsPage from './SearchResultsPage'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import * as filterOptions from './Filters.json'
import './App.css';

const renderOption = (label, value) => <option key={value} value={value}>{label}</option>

const renderOptions = options => Object.keys(options).map(key => renderOption(options[key], key))

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
    class: "",
    mastery: "",
    playstyle: "",
    purpose: "",
    damagetype: "",
    srlevel: "",
    cruci: "",
    gearreq: "",
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
        const newFilters = { ...this.state.filters, [filterCategory]: ev.target.value }
        this.setState({
            filters: newFilters
        })
        this.search(newFilters)
    }

    search(filters) {
      this.setState({
        builds: null,
        err: null
      })
      const searchBody = {
        classCode: filters.class || null,
        masteryCode: filters.mastery || null,
        playStyleCode: filters.playstyle || null,
        purposeCode: filters.purpose || null,
        damageTypeCode: filters.damagetype || null,
        srLevelCode: filters.srlevel || null,
        cruciCode: filters.cruci || null,
        gearReqCode: filters.gearreq || null,
      }
      fetch('/builds/search', {
        method: "POST",
        body: JSON.stringify(searchBody),
        headers:{"Content-Type": "application/json"}
      })
      .then(res => res.json()
        .then(body => {
          if (res.ok)
            return body
          throw new Error(body.err)
        })
      )
      .then(builds => this.setState({ builds }))
      .catch(err => this.setState({err}))
    }

    componentDidMount() {
      this.search(this.state.filters)
    }

    onSearchBarChange = ev => {
        this.setState({
            searchText: ev.target.value
        })
    }

    render() {
        /* Filter builds down */
        const builds = this.state.builds

        const Cardholder = () => <SearchResultsPage builds={builds} />

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
                <Navbar.Brand href="/">Filters</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Form className="mr-auto">
                    <Form.Row>
                    <Form.Group controlId="formClass">
                        <Form.Control as="select" onChange={this.onChangeClass}>
                            <option key="none" value="">Class</option>
                            {renderOptions(filterOptions.class)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formMastery">
                        <Form.Control as="select" onChange={this.onChangeMastery}>
                            <option key="none" value="">Mastery</option>
                            {renderOptions(filterOptions.mastery)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formStyle">
                        <Form.Control as="select" onChange={this.onChangePlaystyle}>
                            <option key="none" value="">Playstyle</option>
                            {renderOptions(filterOptions.playstyle)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formPurpose">
                        <Form.Control as="select" onChange={this.onChangePurpose}>
                            <option key="none" value="">Purpose</option>
                            {renderOptions(filterOptions.purpose)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDamage">
                        <Form.Control as="select" onChange={this.onChangeDamagetype}>
                            <option key="none" value="">Damage Type</option>
                            {renderOptions(filterOptions.damagetype)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formSR">
                        <Form.Control as="select" onChange={this.onChangeSrlevel}>
                            <option key="none" value="">Shattered Realms</option>
                            {renderOptions(filterOptions.srlevel)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formCruci">
                        <Form.Control as="select" onChange={this.onChangeCruci}>
                            <option key="none" value="">Crucible</option>
                            {renderOptions(filterOptions.cruci)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formGear">
                        <Form.Control as="select" onChange={this.onChangeGearreq}>
                            <option key="none" value="">Gear Requirement</option>
                            {renderOptions(filterOptions.gearreq)}
                        </Form.Control>
                    </Form.Group>
                    </Form.Row>
                  </Form>
                </Navbar.Collapse>
              </div>
            </Navbar>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact render={() => <SearchResultsPage builds={this.state.builds} err={this.state.err} />} />
                <Route path="/guide/:id" component={BuildGuide}/>
              </Switch>
            </BrowserRouter>
          </div>
        </div>
  );
}
}

export default App;
