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
    res.status(200).json({ route: '/api/friends/' + req.params.id });
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
        res.status(500).json({error: 'Error deleting from database', err});
      })
  })

  .put((req, res) => {
    const { id } = req.params;
    const friendData = req.body;
    const options = {
      new: true
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
