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

  // Download a pdf from base64
  const downloadPDF = (pdf: string, title: string) => {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement('a');
    const fileName = `${title}.pdf`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  // Fetch pdf base64 from server
  const getPdf = (entry: IEntry): void => {
    API.getPdf(entry._id)
      .then((res) => {
        if (!res.error) {
          downloadPDF(res.data, entry.title);
        } else {
          window.alert(res.error);
        }
      });
  }

  return (
    <>
      <Modal show={showEditModal} onHide={handleCloseModal} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>Edit entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EntryForm addEntry={updateEntry} entry={selectedEntry} />
        </Modal.Body>
      </Modal>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Text</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {!!entries?.length ?
            entries.map((entry: IEntry) => (
              <tr key={entry._id}>
                <td>{entry._id.slice(-6)}</td>
                <td>{entry.title}</td>
                <td>{entry.author}</td>
                <td>{entry.text}</td>
                <td>{entry.date}</td>
                <td>{entry.time}</td>
                <td className="cell-sm pe-0 justify-content-end">
                  <button className="btn btn-primary btn-sm" onClick={() => handleOpenModal(entry)}>Edit</button>
                </td>
                <td className="cell-sm pe-0 justify-content-end">
                  <button className="btn btn-info btn-sm" onClick={() => getPdf(entry)}>PDF</button>
                </td>
                <td className="cell-sm">
                  <button className="btn btn-danger btn-sm" onClick={() => deleteEntry(entry)}>Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={8} style={{textAlign: "center"}}>No entries</td>
              </tr>
            )}
        </tbody>
      </table>
    </>
  );
};

export default EntriesTable;