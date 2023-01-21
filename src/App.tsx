import React from 'react';
import './App.css';
import * as API from './service/api.service';
const logo = require('./logo.svg');


const App = () => {
  const addEntry = (entry) => {
    API.addEntry(entry);
  }
  const getEntries = (entry) => {
    API.addEntry(entry);
  }
  const testEntry = {
      title: 'Entry 1',
      text: 'Text 1',
      date: 'Test date',
      time: 'test time'
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Send test
        </p>
       <button onClick={() => addEntry(testEntry)}>POST</button>
       <button onClick={getEntries}>GET</button>
      </header>
    </div>
  );
}

export default App;
