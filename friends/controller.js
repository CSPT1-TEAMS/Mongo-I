const router = require('express').Router();
const Friend = require('./model');

router
  .route('/')
  .get((req, res) => {
    Friend.find()
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(error => {
        res.status(500).json({errorMessage: "The friends information could not be retrieved"});
      })
  })
  .post((req, res) => {
    const { firstName, lastName, age } = req.body

    if (firstName === undefined || lastName === undefined || age === undefined)
      return res.status(400).json({errorMessage: "Please provide firstName, lastName and age for the friend."})
    
    if (age < 1 || age > 120)
      return res.status(400).json({errorMessage: "Age must be a number between 1 and 120"})
    
    const data = {firstName, lastName, age }
    const friend = new Friend(data)

    friend.save()
      .then(friend => {
        res.status(201).json(friend);
      })
      .catch(error => {
        res.status(500).json({errorMessage: "There was an error while saving the friend to the database"});
      })
  });
router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Friend.findById(id)
      .then(friend => {
        if (friend === null) 
          return res.status(404).json({message: "The friend with the specified ID does not exists."})
        res.status(200).json(friend);
      })
      .catch(error => {
        res.status(500).json({errorMessage: "The friend information could not be retrieved"});
      })
  })
  .delete((req, res) => {
    const { id } = req.params;
    Friend.findByIdAndDelete(id)
      .then(friend => {
        if (friend === null) 
          return res.status(404).json({message: "The friend with the specified ID does not exists."})
        res.status(200).json(friend);
      })
      .catch(error => {
        res.status(500).json({errorMessage: "The friend could not be removed"});
      })
  })
  .put((req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    
    if (firstName === undefined && lastName === undefined && age === undefined)
      return res.status(400).json({errorMessage: "Please provide firstName, lastName and age for the friend."})
    
    if (age < 1 || age > 120)
      return res.status(400).json({errorMessage: "Age must be a number between 1 and 120"})
    
    const updatedData = { firstName, lastName, age }
    Friend.findByIdAndUpdate(id, updatedData, {new: true})
      .then(friend => {
        if (friend === null) 
          return res.status(404).json({message: "The friend with the specified ID does not exists."})
        res.status(200).json(friend);
      })
      .catch(error => {
        res.status(500).json({errorMessage: "The friend information could not be modified"});
      })
  });

module.exports = router;
