// db.js
const knex = require('knex');
const knexConfig = require('./knexfile'); // Ensure this path is correct
const db = knex(knexConfig.development);

module.exports = db;
