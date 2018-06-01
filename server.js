const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const mongoose = require('mongoose');

// connect to mongo
mongoose.connect('mongodb://localhost:27017/frienddb')
.then(mongo => {
  console.log('Successfully Connected to MongoDB')
})
.catch(err => {
  console.log('Database connection failed', err)
})

const friendController = require('./friends/friendController');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendController);

const port = process.env.PORT || 5005;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));


