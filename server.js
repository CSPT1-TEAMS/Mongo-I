const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

const FriendModel = require('./friends/models/friendModels')

// connect to database (mongoDB)
mongoose.connect('mongodb://localhost/friends')

const friendController = require('./friends/friendController')

const server = express()

// apply middleware
server.use(helmet())
server.use(cors())
server.use(express.json())

// ☞ 0ed28b87-048f-4a02-a16b-1adaf5ac3291
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running from server.js' })
})

server.use('/friends', friendController)

const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`\n=== API up on port: ${port} ===\n`)
})
