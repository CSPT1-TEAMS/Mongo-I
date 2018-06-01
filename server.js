const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/friendsDB')
const db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB Connection Error:'));
const friends = require('./friendsController');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/friends',friends)

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
