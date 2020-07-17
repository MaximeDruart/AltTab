const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const server = require("http").createServer(app)
const path = require("path")
const PORT = process.env.PORT || 3001
require("dotenv").config()

// middlewares
app.use(cors())
app.use(express.json())

// mongodb connection
const mongoURI = process.env.MONGO_URI
mongoose
  .connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connection to mongoDB successful !"))
  .catch((err) => console.log(err))

// routes
const usersRouter = require("./routes/users")
app.use("/users", usersRouter)

// for heroku prod
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

server.listen(PORT, () => console.log(`listening on port ${PORT}`))

// exporting server so socket logic can be in another file
module.exports = server

// SOCKET

const {
  createRoom,
  createUser,
  removeUser,
  getRoomByCode,
  addUserToRoomByCode,
  filteredUnusedRooms,
  getPublicRooms,
  removeUserFromAllRooms,
  userIsInRoom,
  getUserRoom,
  addVote,
} = require("./socketUtils")

const io = require("socket.io")(server)
io.on("connect", (socket) => {
  console.log(`user ${socket.id} connected`)

  // first we create a user with some random options like name, id, avatar etc
  createUser(socket)

  // then the client sends its personal info such as auth status, username, avatar etc which will overwrite the previous data
  socket.on("userInfo", (userData) => {
    if (userData.username) socket.user.name = userData.username
    if (userData.avatar) socket.user.avatar = userData.avatar
  })

  // then we're sending it back to the client
  socket.emit("socketData", socket.user)

  socket.on("createRoom", (isPrivate, fn) => {
    const newRoom = createRoom(socket.user, isPrivate)
    socket.join(newRoom.id)
    // if room is public display it in welcome page
    !isPrivate && io.emit("getPublicRoomsSuccess", getPublicRooms())

    // return the room to the client
    fn(newRoom)
  })

  socket.on("getRoomInfo", (roomCode, fn) => {
    // if there's a room send it back, else send an error
    const answer = getRoomByCode(roomCode) ? getRoomByCode(roomCode) : { error: `no room found with code ${roomCode}` }
    fn(answer)
  })

  socket.on("joinRoom", (code, fn) => {
    const room = getRoomByCode(code)
    if (room) {
      // updating our server state
      addUserToRoomByCode(socket.id, code)
      // place the user in the socket room so that it can broadcast and receive accordingly
      socket.join(room.id, (err) => {
        // inform room members of the new user
        socket.to(room.id).emit("newUserJoined", socket.user)
        // emitting a success event to the caller who can then safely redirect to the new url
        fn(room)
      })
    } else {
      // if the room doesn't exist emit an error to caller
      fn({ error: `No room found with code ${code}` })
    }
  })

  // query from user to get all public rooms
  socket.on("getPublicRooms", () => socket.emit("getPublicRoomsSuccess", getPublicRooms()))

  // when user manually leaves room
  socket.on("leaveRoom", (code, fn) => {
    const room = getRoomByCode(code)
    socket.to(room.id).emit("userLeftRoom", socket.user)
    socket.leave(room.id, (err) => {
      removeUserFromAllRooms(socket.user)
      fn("success")
      filteredUnusedRooms()
      io.emit("getPublicRoomsSuccess", getPublicRooms())
    })
  })

  // when user forcibly disconnects (refresh / close tab)
  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`)
    if (userIsInRoom(socket.user)) {
      const room = getUserRoom(socket.user)
      socket.to(room.id).emit("userLeftRoom", socket.user)
      socket.leave(room.id, (err) => {
        removeUserFromAllRooms(socket.user)
        filteredUnusedRooms()
        io.emit("getPublicRoomsSuccess", getPublicRooms())
        removeUser(socket.id)
      })
    }
  })

  socket.on("sendMessage", (message) => {
    const room = getUserRoom(socket.user)
    const date = new Date()
    io.to(room.id).emit("receiveMessage", {
      date: `${date.getHours()}:${date.getMinutes()}`,
      author: socket.user.name,
      content: message,
    })
  })

  socket.on("vote", (game) => {
    const room = getUserRoom(socket.user)
    addVote(game, socket.user)
    io.to(room.id).emit("votes", room)
  })
})
