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
  removeUser,
  addUser,
  setRandomName,
  getRoomByCode,
  addUserToRoomByCode,
  filteredUnusedRooms,
  getPublicRooms,
  removeUserFromAllRooms,
  userIsInRoom,
  getUserRoom,
} = require("./socketUtils")

const io = require("socket.io")(server)
io.on("connect", (socket) => {
  addUser(socket.id)
  console.log(`user ${socket.id} connected`)
  setRandomName(socket)

  socket.on("createRoom", (isPrivate) => {
    const newRoom = createRoom(socket.id, isPrivate)
    socket.join(newRoom.id)
    socket.emit("createRoomSuccess", newRoom)

    // if room is public display it in welcome page
    !isPrivate && io.emit("getPublicRoomsSuccess", getPublicRooms())
  })

  socket.on("getRoomInfo", (roomCode) => {
    // if there's a room send it back, else send an error
    const answer = getRoomByCode(roomCode) ? getRoomByCode(roomCode) : { error: `no room found with code ${roomCode}` }
    socket.emit("getRoomInfoSuccess", answer)
  })

  socket.on("joinRoom", (code) => {
    const room = getRoomByCode(code)
    if (room) {
      // modifying our server state
      addUserToRoomByCode(socket.id, code)
      // place the user in the socket room so that it can broadcast and receive accordingly
      socket.join(room.id, (err) => {
        // emitting a success event to the caller who can then safely redirect to the new url
        socket.emit("joinRoomSuccess", room)
        // then inform room members of the new user
        socket.to(room.id).emit("newUserJoined", socket.id)
        // socket.to(room.id).emit("newUserJoined", {
        //   id: socket.id,
        //   name: socket.name,
        // })
      })
    } else {
      // if the room doesn't exist emit an error to caller
      socket.emit("joinRoomError", `No room found with code ${code}`)
    }
  })

  // query from user to get all public rooms
  socket.on("getPublicRooms", () => socket.emit("getPublicRoomsSuccess", getPublicRooms()))

  // when user manually leaves room
  socket.on("leaveRoom", (code) => {
    const room = getRoomByCode(code)
    socket.to(room.id).emit("userLeftRoom", socket.id)
    socket.leave(room.id, (err) => {
      removeUserFromAllRooms(socket.id)
      socket.emit("leaveRoomSuccess", "")
      filteredUnusedRooms()
      socket.emit("getPublicRoomsSuccess", getPublicRooms())
    })
  })

  // when user forcibly disconnects (refresh / close tab)
  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`)
    console.log(socket.name)
    if (userIsInRoom(socket.id)) {
      const room = getUserRoom(socket.id)
      socket.to(room.id).emit("userLeftRoom", socket.id)
      socket.leave(room.id, (err) => {
        removeUserFromAllRooms(socket.id)
        filteredUnusedRooms()
        socket.emit("getPublicRoomsSuccess", getPublicRooms())
      })
    }
    removeUser(socket.id)
  })
})
