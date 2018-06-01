const friends = require('./friends');
const router = require('express').Router();



router.get('/',(req,res) => {
    friends.find({},(err,results) => {
        res.status(200).send(results)
    })
})

router.post('/',(req,res)=> {
    const obj = req.body;
    friends.create(obj, (err,result) => {
        res.status(201).send(result)
    })
})

router.get('/:id',(req,res) => {
    const id = req.params.id
    friends.findById(id,(err,friend) => {
        res.status(200).send(friend)
    })
})

router.delete('/:id',(req,res) => {
    const id = req.params.id
    friends.findByIdAndRemove(id,(err,friend) => {
        res.status(202).send(friend)
    })
})

router.put('/:id',(req,res) => {
    const id = req.params.id
    updatedFriend = req.body
    friends.findByIdAndUpdate(id,updatedFriend,(err,friend) => {
        res.status(200).send(friend)
    })
})


module.exports = router;