import React from 'react';
import './entriesTable.style.css';
import * as API from '../../service/api.service';

const EntriesTable = ({ entries, refresh }) => {
  const editEntry = (entry) => {
    console.log('edit entry', entry);
  }
  const deleteEntry = (entry) => {
    API.deleteEntry(entry._id)
      .then((entry) => {
        refresh();
      });
  }

  return (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Text</th>
        <th>Date</th>
        <th>Time</th>
        <th>*</th>
      </tr>
    </thead>
    <tbody>
    {entries.map((entry) => (
      <tr key={entry._id}>
        <td>{entry.title}</td>
        <td>{entry.author}</td>
        <td>{entry.text}</td>
        <td>{entry.date}</td>
        <td>{entry.time}</td>
        <td><button onClick={() => editEntry(entry)}>Edit</button></td>
        <td><button onClick={() => deleteEntry(entry)}>Delete</button></td>
      </tr>
    ))}
    </tbody>
  </table>
  );
};

export default EntriesTable;