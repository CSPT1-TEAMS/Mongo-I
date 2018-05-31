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
    const { body } = res;
    const friend = new Friend(body);
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
        res.status(200).json(friend);
      })
      .catch( err => {
        res.status(500).json({error: 'Error deleting from database', err});
      })
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' });
  });

module.exports = router;
