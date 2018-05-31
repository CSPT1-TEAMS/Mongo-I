const router = require('express').Router();
// const db = require('../model')
const Friend = require('./friendModel')


router.route('/')
  .get(get)
  .post(post);

router
  .route('/:id')
  .get(getById)
  .delete(deleteFriend)
  .put(editFriend);

// READ ALL
function get(req, res) {
  Friend.find().then(response => {
    res.status(200).json(response);
  })
    .catch(err => {
      res.status(404).json(err)
    })
}
// CREATE FRIEND
function post(req, res) {
  const friendData = req.body;
  const friend = new Friend(friendData);
  friend.save().then(friend => {
    res.status(201).json(friend)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
}
// GET FRIEND BY ID 
function getById(req, res) {
  const id = req.params.id;
  friend.findById(id).then(response => {
    res.status(201).json(response)
      .catch(err => {
        res.status(500).json(err)
      })
  })
}
// DELETE FRIEND
function deleteFriend(req, res) {
  const id = req.params.id;
  Friend.findByIdAndRemove(id).then(response => {
    res.status(200).json({
      "message": `Friend with ID: ${id} deleted! `
    })
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "The friend could not be removed" })
  })
}
// EDIT FRIEND
function editFriend(req, res) {
  const id = req.params.id;
  const updatedData = req.body;
  const options = {
    new: true
  }
  Friend.findOneAndUpdate(id, updatedData, options).then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    errorMessage: "Friend could not be updated"
  });
}

module.exports = router;
