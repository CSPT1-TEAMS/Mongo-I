const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Friend = require('./FriendSchema');
const controller = require('./FriendController')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));

server.use("/api/friends", controller)