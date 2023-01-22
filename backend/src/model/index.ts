import { CONFIG } from '../config/database';
import { IDB } from '../shared/interface';
const mongoose = require('mongoose');

// database connection
const database: IDB = {
    mongoose: mongoose, 
    url: CONFIG.url,
    entries: require('./entry.model.ts')(mongoose),
};

module.exports = database;