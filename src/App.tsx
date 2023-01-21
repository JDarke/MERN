import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as API from './service/api.service';
import EntriesTable from './components/table/entriesTable.component';
import { IEntry, IEntryRequest } from './shared/interface';
import EntryForm from './components/form/entryForm.component';
const logo = require('./logo.svg');


const App = () => {
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [view, setView] = useState('review');

  const addEntry = (entry: IEntryRequest): void => {
    API.addEntry(entry)
      .then((res) => {
        if (!res.error) {
          setEntries([...entries, ...res.data]);
        } else {
          window.alert(res.error);
        }
      });
  }

  const getEntries = (): void => {
    API.getEntries()
      .then((res) => {
        if (!res.error) {
          setEntries(res.data);
        } else {
          window.alert(res.error);
        }
      });
  }

  const testEntry: IEntryRequest = {
      title: 'Entry 1',
      text: 'Text 1',
      date: 'Test date',
      time: 'test time'
  }

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <header className="header">
          Entries App
        </header>
        <div className="view-tabs">
          <div className="view-tab" onClick={() => setView('add')}>Add</div>
          <div className="view-tab" onClick={() => setView('review')}>Review</div>
        </div>
        {view === 'review' && <EntriesTable entries={entries} refresh={getEntries} />}
        {view === 'add' && <EntryForm entries={entries} />}
        <button onClick={() => addEntry(testEntry)}>POST</button>
        <button onClick={getEntries}>GET</button>
      </div>
    </div>
  );
}

export default App;
