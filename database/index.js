const path = require("path");
const knex = require("knex");

const config = require("./config.json");

config.connection.filename = path.join(__dirname, config.connection.filename);

module.exports = knex(config);
