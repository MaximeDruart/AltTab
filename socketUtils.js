const { v4: uuidv4 } = require("uuid")
let rooms = []
let users = []

const addUser = (user) => {
  users.push(user)
}
const removeUser = (userProvided) => {
  users = users.filter((user) => user !== userProvided.id)
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

const removeUserFromRoomByCode = (userId, code) => {
  const room = getRoomByCode(code)
  const roomIndex = rooms.findIndex((_room) => _room.id === room.id)
  rooms[roomIndex].members = rooms[roomIndex].members.filter((memberId) => memberId !== userId)
}

const getPublicRooms = () => rooms.filter((room) => !room.private)

const getRoomByCode = (codeProvided) => rooms.find((room) => room.code === codeProvided)

// searches room for provided user. returns undefined if none found
const getUserRoom = (rooms, userId) => rooms.find((room) => room.members.includes(userId))

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
  removeUserFromRoomByCode,
  getPublicRooms,
}
