require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const itemRoutes = require('./routes/items')
const checkoutRoutes = require('./routes/checkout')
const socket = require("socket.io")


// express app
const app = express()
// middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
app.use('/api/items', itemRoutes)
app.use('/api/checkout', checkoutRoutes)

let users = []
// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    const server = app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
    
    const io = socket(server, {
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });
    io.on('connection', (socket) => {
      console.log(`⚡: ${socket.id} user just connected!`);
      socket.on('message', (data) => {
        io.emit('messageResponse', data);
      });
      socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));
      socket.on('newUser', (data) => {
        //Adds the new user to the list of users
        users = users.filter((user) => user.userName !== data.userName);
        users.push(data);
        //Sends the list of users to the client
        io.emit('newUserResponse', users);
        console.log(users)
      });
      socket.on("getUsers",() => {
        io.emit("getUsersResponse", users)
      })
      socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        users = users.filter((user) => user.socketID !== socket.id);
        // console.log(users);
        //Sends the list of users to the client
        io.emit('newUserResponse', users);
        console.log(users)
        socket.disconnect();
      });
    });
    
  })
  .catch((error) => {
    console.log(error)
  })