import { CONFIG } from '../config/database';
const mongoose = require('mongoose');

interface IDB {
    mongoose: any;
    url: string;
    entries: any;
}

const database: IDB = {
    mongoose: mongoose, 
    url: CONFIG.url,
    entries: require('./entry.model.ts')(mongoose),
};
// database.mongoose = mongoose;
// database.url = config.url;
// database.entries = require('./entry.model.js')(mongoose);

module.exports = database;