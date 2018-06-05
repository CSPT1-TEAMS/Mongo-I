const router = require('express').Router()
const Friend = require('./friends.js')

router
  .route('/')
  .get((req, res) => {
    Friend.find()
      .then(friends => {
        res.status(200).json(friends)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })
  .post((req, res) => {
    const { body } = req
    const friend = new Friend(body)
    friend.save()
      .then(friend => {
        res.status(201).json(friend)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })

router
  .route('/:id')
  .get((req, res) => {
    res.status(200).json({ route: '/api/friends/' + req.params.id })
  })
  .delete((req, res) => {
    res.status(200).json({ status: 'please implement DELETE functionality' })
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' })
  })

module.exports = router
