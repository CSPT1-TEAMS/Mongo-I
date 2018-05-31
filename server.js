const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();


const friendsController = require('./friendsController');
const friendModel = require('./friendModel');

server.use(helmet());
server.use(cors());
server.use(express.json());

mongoose
  .connect('mongodb://localhost/friendsdb')
  .then(mongo => {
    console.log('Connected to DB!')
  })

server.use('/api/friends', friendsController);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
