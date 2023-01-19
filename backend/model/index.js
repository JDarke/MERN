const config = require('../config/database.json');
const mongoose = require('mongoose');

const database = {};
database.mongoose = mongoose;
database.url = config.url;
database.entries = require('./entry.model.js')(mongoose);

module.exports = database;