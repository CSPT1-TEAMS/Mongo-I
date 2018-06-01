const router = require('express').Router();
const Friend = require('../friends.js');

router
  .route('/')
  .get((req, res) => {
    Friend.find()
      .then( friends => {
        res.status(200).json(friends);
      })
      .catch( err => {
        res.status(500).json({ error: 'Error getting freinds', err});
      })
    })

  .post((req, res) => {
    const friendData = req.body;
    const { firstName, lastName, age } = req.body;

    if (!firstName || !lastName || !age) {
      return res.status(400).json({error: 'Please provide first and last name and age'})
    }
    if (age < 1 || age > 120) { // need to check age type === number, errors out
      return res.status(400).json({error: 'Invalid age!'})
    }
    const friend = new Friend(friendData);
    friend.save()
      .then( friend => {
        res.status(201).json(friend);
      })
      .catch( err => {
        res.status(500).json({error: 'Error posting to database', err});
      })
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Friend.findById(id)
      .then( friend => {
        if (friend !== null) {
          res.status(200).json(friend);
        } else {
          res.status(404).json({error: 'Friend not found' })
        }
      })
      .catch( err => {
        res.status(500).json({error: 'Error retrieving friend from database', err});
      })
  })
  .delete((req, res) => {
    const { id } = req.params;
    Friend.findByIdAndRemove(id)
      .then( friend => {
        if (friend !== null) {
          res.status(200).json(friend);
        } else {
          res.status(404).json({error: 'Friend not found' })
        }
      })
      .catch( err => {
        res.status(500).json({error: 'Error deleting friend from database', err});
      })
  })

  .put((req, res) => {
    const { id } = req.params;
    const friendData = req.body;
    const options = {
      new: true
    }
    const { firstName, lastName, age } = req.body;

    if (!firstName || !lastName || !age) {
      return res.status(400).json({error: 'Please provide first and last name and age'})
    }
    if (age < 1 || age > 120) { 
      return res.status(400).json({error: 'Invalid age!'})
    }
    Friend.findByIdAndUpdate(id, friendData, options)
      .then( friend => {
        if (friend !== null) {
          res.status(200).json(friend);
        } else {
          res.sendStatus(404);
        }
      })
    .catch(err => res.status(500).json(err))
  });

module.exports = router;
