const router = require('express').Router();
const Friends = require('./friends.js');

router
    .route('/')
    .get((req, res) => {
        Friends.find()
        .then( friends => {
            res.status(200).json(friends)
        
        })
        .catch( err => {
            res.status(500).json({error: "error getting friends"})
        })
    })
    .post((req, res) => {
        const { body } = req;
     
//validates scheme with the New Property
        const friends = new Friends(req.body);
        //   
        friends.save()
        .then(friends => {
            res.status(200).json(friends)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })
    
router
    .route('/:id')
    .get((req, res) => {
    
        res.status(200).json({route: '/api/friends/' + req.params.id})
    })
    .delete((req, res) => {
        const { id } = req.params.id;
        //no difference, delete gives us the document back just like remove
        Friends.findByIdAndRemove(id)
        .then(friends => {
            if(friends != null) {
                res.status(204).json(friends);
            } 
            res.status(404);

        })
        .catch(err => {
            res.status(500)
        })
        
    })
    .put((req, res) => {
        const  { id } = req.params.id;
        const { friendData } = req.body;
        const options = {
            new: true
        }
        Friends.findByIdAndUpdate(id, friendData, options)
        .then( friends => {
            if(friends != null) {
                res.status(204).json(friends);
            } 
            res.status(404);
        })
        .catch(err => {
            res.status(500).json(err => error)
        })
        res.status(200).json({status: 'fdhasjlkfdlks'})
    })

    module.exports = router;