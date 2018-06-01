const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/friends')
  .then(mongo => {
    console.log("connected to mongo instance")
  })
  .catch(error => {
    console.log('error connecting', error)
  })
  
const controller = require('./friends/controller')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', controller);

const port = process.env.PORT || 5005;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
