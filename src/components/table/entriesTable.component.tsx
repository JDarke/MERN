import React, { useState } from 'react';
import './entriesTable.style.css';
import * as API from '../../service/api.service';
import { Modal } from 'react-bootstrap';
import EntryForm from '../form/entryForm.component';
import { IEntry, IEntryBase, IResponse } from '../../shared/interface';

// params: entries to display, refresh function to call when an entry is updated or deleted
const EntriesTable = ({ entries, refresh }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<IEntry>(null);

  const handleCloseModal = (): void => {
    setShowEditModal(false);
    setSelectedEntry(null);
  };

  const handleOpenModal = (entry: IEntry): void => {
    setSelectedEntry(entry);
    setShowEditModal(true);
  }

  // Submit an updated entry from the modal
  const updateEntry = (entry: IEntryBase): void => {
    const entryUpdate = { ...entry, _id: selectedEntry._id };
    API.updateEntry(entryUpdate)
      .then((res: IResponse) => {
        if (!res.error) {
          handleCloseModal();
          refresh();
        } else {
          handleCloseModal();
          window.alert(res.error);
        }
      });
  }

  const deleteEntry = (entry: IEntry): void => {
    API.deleteEntry(entry._id)
      .then((res: IResponse) => {
        if (!res.error) {
          refresh();
        } else {
          window.alert(res.error);
        }
      });
  }

  return (
    <>
      <Modal show={showEditModal} onHide={handleCloseModal} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EntryForm addEntry={updateEntry} entry={selectedEntry} />
        </Modal.Body>
      </Modal>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Text</th>
            <th>Date</th>
            <th>Time</th>
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
              <td><button className="btn btn-primary" onClick={() => handleOpenModal(entry)}>Edit</button></td>
              <td><button className="btn btn-danger" onClick={() => deleteEntry(entry)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EntriesTable;