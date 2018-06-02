const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/frienddb')
  .then(mongo => {
    console.log('connected');
  })
  .catch(err => {
    console.log('error', err);
  });

const friendController = require('./friends/friendController');  

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

let friends = [
  {firstName: "Laurel", lastName: "Lance", age: 32}
];

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
