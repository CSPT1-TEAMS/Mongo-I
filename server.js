const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
// const Friend = require('./friend/friends');


mongoose.connect('mongodb://localhost/friends')
.then(() => {
  const port = process.env.PORT || 5000;
  server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
}).catch(err => {
  console.log('was not able to connect to mongo database');
})
const controller = require('./friend/controller')

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', controller)


