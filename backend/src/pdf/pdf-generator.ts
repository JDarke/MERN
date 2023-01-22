import { IEntry } from "../shared/interface";
const getStream = require('get-stream')
const PDFDocument = require('pdfkit');

const generatePDF = async (entry: IEntry): Promise<any> => {
    const doc = new PDFDocument();

    doc.fontSize(18).text(entry.title, 100, 100);
    doc.fontSize(16).text(entry.author, 100, 150);
    doc.fontSize(14).text(entry.date + ' ' + entry.time, 100, 200);
    doc.fontSize(12).text(entry.text, 100, 250);

    doc.end();

    return await getStream.buffer(doc)
}

module.exports = generatePDF;


