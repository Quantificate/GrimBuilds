import React from 'react';
import {DropdownButton, Dropdown} from '/node_modules/react-bootstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <DropdownButton id="classButton" title="Class Dropdown">
            <Dropdown.Item href="#">Archon</Dropdown.Item>
        </DropdownButton>
      </header>
    </div>

  );
}

export default App;
