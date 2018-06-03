const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

const FriendModel = require('./friends/models/friendModels')

// connect to database (mongoDB)
mongoose.connect('mongodb://localhost/frienddb') // db is created upon connection
// let db = mongoose.connection
// db.on('error', console.error.bind(console, 'Database connection failed:'))
// db.once('open', function () {
//   console.log('Successfully Connected to MongoDB') // we're connected!
// })

const friendController = require('./friends/friendController')
const server = express()

// apply middleware
server.use(helmet())
server.use(cors())
server.use(express.json())

// server.use('/api/friends', friendController);

// ☞ 6894d39a-f208-402e-a4e7-f67d7f3e0a87
server.post('/', (req, res) => {
  // Create instance of model FriendModel
  const friendInstance = new FriendModel({
    firstName: String,
    lastName: String,
    age: Number,
    createdAt: Date.now
  })
  friendInstance.save(function (err) {
    if (err) return // handleError(err) // saved!
    res.status(404).json({ status: 'Oops! An error has occured: BAD REQUEST' })
    res.status(201).json({ status: 'please implement POST functionality'
    })
  })
  // db.friends.insert({
  //   firstName: req.firstName,
  //   lastName: req.lastName,
  //   age: req.age,
  //   createdAt: { type: Date, default: Date.now },
  //   updatedAt: { type: Date, default: Date.now }
  // })
})

// ☞ 0ed28b87-048f-4a02-a16b-1adaf5ac3291
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' })
})

// ☞ f0f27993-3dea-443d-a7f6-19a34863fac2
// server.get('/:id', (req, res) => {
//   res.send('got your GETbyID request')
// })

// ☞ ac28ef11-6fa4-47ff-b5be-f8e40f44a9dd
// server.delete('/:id', (req, res) => {
//   res.send('got your DELETE request')
//   res.status(200).json({ status: 'please implement DELETE functionality' })
// })

// ☞ 2ab0a8ac-e7ed-4ef5-b975-faa2bb32c48c
// server.put('/:id', (req, res) => {
//   res.send('got your PUT request')
//   res.status(200).json({ status: 'please implement PUT functionality' })
// })

server.use('/friends', friendController)

const port = process.env.PORT || 5000
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`))
