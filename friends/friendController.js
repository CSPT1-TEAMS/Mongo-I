const router = require('express').Router();
const Friend = require('./friendModel');


//GET
router
  .route('/api/friends')
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(error => {
        res.status(500).json({errorMessage: "The friends information could not be retrieved"});
      })
  })









module.exports = router;