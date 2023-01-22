import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as API from './service/api.service';
import EntriesTable from './components/table/entriesTable.component';
import { IEntry, IEntryRequest, IResponse } from './shared/interface';
import EntryForm from './components/form/entryForm.component';


const App = () => {
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [view, setView] = useState('review');

  const addEntry = (entry: IEntryRequest): void => {
    API.addEntry(entry)
      .then((res: IResponse) => {
        if (!res.error) {
          setEntries([...entries, ...res.data]);
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
        {view === 'add' && <EntryForm addEntry={addEntry} />}
      </div>
    </div>
  );
}

export default App;
