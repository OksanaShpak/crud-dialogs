require('dotenv').config();
const { connect } = require('./mongo.js');
const { startServer } = require('./server.js');
const { initCRUD } = require('./crud.js');

connect().then(initCRUD).then(startServer).catch(console.error);