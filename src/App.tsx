import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as API from './service/api.service';
import EntriesTable from './components/table/entriesTable.component';
import { IEntry, IEntryBase, IResponse } from './shared/interface';
import EntryForm from './components/form/entryForm.component';


const App = () => {
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [view, setView] = useState('review');

  const addEntry = (entry: IEntryBase): void => {
    API.addEntry(entry)
      .then((res: IResponse) => {
        if (!res.error) {
          setEntries([...entries, ...res.data]);
          setView('review');
        } else {
          window.alert(res.error);
        }
      });
  }

  const getEntries = (): void => {
    API.getEntries()
      .then((res: IResponse) => {
        if (!res.error) {
          setEntries(res.data);
        } else {
          window.alert(res.error);
        }
      });
  }

  const testEntry: IEntryBase = {
    title: 'Entry 1',
    author: 'Author 1',
    text: 'Text 1',
    date: 'Test date',
    time: 'test time'
}

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <div className="App d-flex flex-column align-items-center">
      <div className="wrapper d-flex flex-column align-items-center p-5">
        <header className="header mb-3">
          <h2>DevTask DB</h2>
        </header>
        <div className="view-tabs d-flex flex-row align-items-center justify-content-around w-100">
          <div className={view === 'add' ? 'view-tab w-100 active' : 'view-tab w-100 '} onClick={() => setView('add')}>Add</div>
          <div className={view === 'review' ? 'view-tab w-100 active' : 'view-tab w-100 '} onClick={() => setView('review')}>Review</div>
        </div>
        {view === 'review' && <EntriesTable entries={entries} refresh={getEntries} />}
        {view === 'add' && <EntryForm addEntry={addEntry} />}
      </div>
    </div>
  );
}

export default App;
