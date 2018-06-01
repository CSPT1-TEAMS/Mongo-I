const express = require('express')
const router = express.Router()
const Friend = require('./FriendSchema');

const handleError = (err, req, res, next) => {
  if (err.errors["firstName"]) {
    return res.status(400).json({ errorMessage: err.errors["firstName"].message })
  } else if (err.errors["lastName"]) {
    return res.status(400).json({ errorMessage: err.errors["lastName"].message })
  } else if (err.errors["age"]) {
    return res.status(400).json({ errorMessage: err.errors["age"].message })
  } else {
    return res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." })
  }
}

router.route("/")
  .get((req, res) => {
    console.log("Inside GET")
    Friend.find({}, (err, friends) => {
      if (err) {
        res.status(500).json({
          errorMessage: "The friends information could not be retrieved."
        })
      } else {
        res.status(200).json(friends);
      }
    })
  })

  .post((req, res, next) => {
    const friend = new Friend(req.body)
    friend.save()
    .then(newFriend => {
      res.status(201).json(newFriend)
    })
    .catch(error => {
      next(error)
    })
  })

router.route("/:id")
  .get((req, res) => {
    const { id } = req.params
    Friend.findById(id)
    .then(friend => {
      if (friend === null) {
        return res.status(404).json({
          message: "The friend with the specified ID does not exist."
        })
      } else {
        return res.status(200).json(friend)
      }
    })
    .catch(error => {
      return res.status(500).json({
        errorMessage: "The friend information could not be retrieved."
      })
    })
  })

  .put((req, res) => {
    const { id } = req.params
    const update = req.body
    Friend.findByIdAndUpdate(id, update, { new: true })
    .then(friend => {
      if (friend === null) {
        return res.status(404).json({
          message: "The friend with the specified ID does not exist."
        })
      } else {
        return res.status(200).json(friend)
      }
    })
    .catch(error => {
      return res.status(500).json({
        errorMessage: "The friend information could not be retrieved."
      })
    })
  })

  .delete((req, res) => {
    const { id } = req.params
    Friend.findByIdAndRemove(id)
    .then(friend => {
      if (friend === null) {
        return res.status(404).json({
          message: "The friend with the specified ID does not exist."
        })
      } else {
        return res.status(200).json(friend)
      }
    })
    .catch(error => {
      return res.status(500).json({
        errorMessage: "The friend information could not be retrieved."
      })
    })
  })

router.use(handleError)

module.exports = router
