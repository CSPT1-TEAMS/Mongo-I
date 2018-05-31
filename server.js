const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

mongoose
  .connect('mongodb://localhost/Friends')
  .then((connect) => {
    console.log('API Server Connected');
  })
  .catch((error) => {
    console.error('Db connection failed');
  });

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.post('/api/friends', (req, res) => {
  const { firstName, lastName, age, createdOn } = req.body;
  createdOn = !createdOn ? new Date() : createdOn; // initialize createdOn to current date/time if it is undefined
  if (!firstName || !lastName || !age) {
    res.status(400).json({ errorMessage: 'Please provide firstName, lastName, and age for the friend.' });
  }
  if (typeof age !== Number || age < 1 || age > 120) {
    res.status(400).json({ errorMessage: 'Age must be a number between 1 and 120.' });
  }
  const friend = new Friend({ firstName, lastName, age, createdOn });
  friend.save()
    .then((newFriend) => {
      res.status(201).json(newFriend);
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: 'There was an error while saving the friend to the database.' });
    });
});

server.get('api/friends', (req, res) => {
  const { id } = req.params;
  if (!id) {
    Friend.find()
      .then((friends) => {
        res.status(200).json(friends);
      })
      .catch((error) => {
        res.status(500).json({ errorMessage: 'The friends information could not be retrieved.' });
      });
  } else {
    Friend.findById(id)
      .then((friend) => {
        if (!friend) {
          res.status(404).json({ errorMessage: 'The friend with the specified ID does not exist.' });
        } else {
          res.status(200).json(friend);
        }
      })
      .catch((error) => {
        res.status(500).json({ errorMessage: 'The friend information could not be retrieved.' });
      });
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
