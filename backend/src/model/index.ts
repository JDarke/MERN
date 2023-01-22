import { DBURL } from '../config/database';
import { IDB } from '../shared/interface';
const mongoose = require('mongoose');

// database connection
const database: IDB = {
    mongoose: mongoose, 
    url: DBURL,
    entries: require('./entry.model.ts')(mongoose),
};

module.exports = database;