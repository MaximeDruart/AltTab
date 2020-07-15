const { v4: uuidv4 } = require("uuid")
let rooms = []
let users = []

const addUser = (user) => {
  users.push(user)
}
const removeUser = (userIdProvided) => {
  users = users.filter((user) => user !== userIdProvided)
}

const generateCode = () => {
  let code = ""
  const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789"
  const roomCodes = rooms.map((room) => room.code)
  do {
    for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length))
  } while (roomCodes.includes(code))
  return code
}

const createRoom = (userId, isPrivate) => {
  const room = {
    name: `${userId}'s game`,
    id: uuidv4(),
    ownerId: userId,
    members: [userId],
    private: isPrivate,
    code: generateCode(),
    maxMembers: 12,
  }
  rooms.push(room)
  return room
}

const filteredUnusedRooms = () => {
  rooms = rooms.filter((room) => room.members.length > 0)
}

const addUserToRoomByCode = (userId, code) => {
  const room = getRoomByCode(code)
  room.members.push(userId)
}

// same function as above except it doesn't get a room code and searches for all room
// keeping the above function as it's more efficient
const removeUserFromAllRooms = (userId) => {
  for (const room of rooms) {
    room.members = room.members.filter((member) => member !== userId)
  }
}

const userIsInRoom = (userId) => {
  let doesInclude = false
  for (const room of rooms) doesInclude = room.members.includes(userId)
  return doesInclude
}

const getPublicRooms = () => rooms.filter((room) => !room.private)

const getRoomByCode = (codeProvided) => rooms.find((room) => room.code === codeProvided)

// searches room for provided user. returns undefined if none found
const getUserRoom = (userId) => rooms.find((room) => room.members.includes(userId))

const getRoomForId = (rooms, roomId) => rooms.find((room) => room.id === roomId)
//

module.exports = {
  addUser,
  removeUser,
  createRoom,
  getUserRoom,
  getRoomForId,
  filteredUnusedRooms,
  getRoomByCode,
  addUserToRoomByCode,
  getPublicRooms,
  removeUserFromAllRooms,
  userIsInRoom,
}
