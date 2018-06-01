const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const Friend = require('./Models/FriendModel')

mongoose.connect('mongodb://localhost/friends')
  .then(() => {
    console.log('Successfully connected to Mongo DB... you did it; yay!')
  })
  .catch(() => {
    console.log(`You did NOT successfully connect to Mongo DB, make sure it's running; also... don't be like Jake, Jake only likes SQL`)
  })

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.route('/api/friends').get((req, res) => {
  Friend.find()
    .then((response) => {
      res.status(200).json(response)
    })
    .catch(() => {
      res.status(500).json(`{ errorMessage: "The friends information could not be retrieved." }`)
    })
})

server.get('/api/friends/:id', (req, res) => {
  const { id } = req.params
    Friend.findById(id)
      .then((response) => {
        if(!response)
           res.status(404).json(`{ message: "The friend with the specified ID does not exist." }`)
        res.status(200).json(response)
      })
      .catch((error) => {
        res.status(500).json(`{ errorMessage: "The friend information could not be retrieved." }`)
      }) 
})

server.route('/api/friends').post((req, res) => {
  const {firstName, lastName, age} = req.body;
  if(!firstName || !lastName || !age)
    res.status(400).json(`{ errorMessage: "Please provide firstName, lastName and age for the friend." }`)
  if ( age < 1 || age > 120 )
    res.status(400).json(`{ errorMessage: "Age must be a number between 1 and 120" }`)
      const newFriend = {firstName, lastName, age}
      const friend = new Friend(newFriend)
        .save()
        .then((response) => {
          res.status(201).json(response)
        })
        .catch(() => {
          res.status(500).json( `{ errorMessage: "There was an error while saving the friend to the database." }`) 
        })
})

server.route('/api/friends/:id').delete((req, res) => {
  const { id } = req.params
    Friend.findByIdAndRemove(id)
      .then((response) => {
        res.status(200).json(response)
      })
      .catch(() => {
        res.status(500).json( `{ errorMessage: "The friend could not be removed" }`)
      })
})

server.route('/api/friends/:id').put((req, res) => {
  const { id } = req.params
  const updateFriend = req.body
    Friend.findByIdAndUpdate(id, updateFriend, {new: true})
      .then((response) => {
        res.status(200).json(response)
      })
      .catch(() => {
        res.status(500).json(`{ errorMessage: "The friend information could not be modified." }`)
      })
})
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
