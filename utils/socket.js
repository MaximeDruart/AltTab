const { v4: uuidv4 } = require("uuid")
const axios = require("axios")
const { getRandomAvatarOptions } = require("./main")
const { uniqueNamesGenerator, adjectives, colors, animals } = require("unique-names-generator")
let users = []
let rooms = []

const randomName = () => {
  let tempName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals], separator: " " })
  return tempName.charAt(0).toUpperCase() + tempName.slice(1)
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

const createUser = (socket) => {
  let user = {
    id: socket.id,
    avatar: getRandomAvatarOptions(),
    name: randomName(),
  }
  socket.user = user
  users.push(user)
}

const removeUser = (socketId) => {
  users = users.filter((user) => user.id !== socketId)
}

// if user changes data by logging in or smth
const updateUser = (_user) => {
  // find the user index in the users array
  let foundUserIndex = users.findIndex((user) => user.id === _user.id)
  // then update that array with user sent
  users[foundUserIndex] = _user
}

const createRoom = (user, isPrivate) => {
  // const user = getUserInfoForId(userId)
  const room = {
    name: `${user.name}'s game`,
    id: uuidv4(),
    ownerId: user.id,
    members: [user],
    private: isPrivate,
    code: generateCode(),
    maxMembers: 6,
    votes: {
      Lighty: [],
      Gummy: [],
      Ballzy: [],
      random: [],
    },
  }
  rooms.push(room)
  return room
}

// case where the user updates its data and then we need to update the room that he's in so other members are aware
const findUserRoomAndUpdate = (user) => {
  const room = getUserRoom(user)
  const roomMemberIndex = room.members.findIndex((member) => member.id === user.id)
  room.members[roomMemberIndex] = user
  return room
}

const updateRoom = (roomCode, settings) => {
  const room = getRoomByCode(roomCode)
  for (const prop in settings) {
    room[prop] = settings[prop]
  }
  return room
}

const getUserInfoForId = (socketId) => users.find((user) => user.id === socketId)

const filteredUnusedRooms = () => {
  rooms = rooms.filter((room) => room.members.length > 0)
}

const addUserToRoomByCode = (userId, code) => {
  const room = getRoomByCode(code)
  const user = getUserInfoForId(userId)
  room.members.push(user)
}

// same function as above except it doesn't get a room code and searches for all room
// keeping the above function as it's more efficient

const removeUserFromAllRooms = (user) => {
  for (const room of rooms) {
    room.members = room.members.filter((member) => member.id !== user.id)
    // removing its vote too
    for (const prop in room.votes) {
      if (!room.votes[prop].length) continue
      room.votes[prop] = room.votes[prop].filter((vote) => vote.id !== user.id)
    }
  }
}

const userIsInRoom = (user) => {
  let doesInclude = false
  for (const room of rooms) {
    for (const member of room.members) {
      if (member.id === user.id) doesInclude = true
    }
  }
  return doesInclude
}

const getPublicRooms = () => rooms.filter((room) => !room.private)

const getRoomByCode = (codeProvided) => rooms.find((room) => room.code === codeProvided)

// searches room for provided user. returns undefined if none found
const getUserRoom = (user) => {
  for (const room of rooms) {
    for (const member of room.members) {
      if (member.id === user.id) return room
    }
  }
  return false
}

const getRoomForId = (rooms, roomId) => rooms.find((room) => room.id === roomId)

const addVote = (game, user) => {
  const room = getUserRoom(user)

  // remove vote from all other games
  for (const _game in room.votes) {
    if (_game !== game) {
      room.votes[_game] = room.votes[_game].filter((voter) => voter.id !== user.id)
    }
  }

  // toggle on the clicked game
  let userHasVotedForGame = false
  for (const voter of room.votes[game]) if (voter.id === user.id) userHasVotedForGame = true

  if (userHasVotedForGame) {
    room.votes[game] = room.votes[game].filter((voter) => voter.id !== user.id)
  } else {
    room.votes[game].push(user)
  }
}

module.exports = {
  createUser,
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
  addVote,
  updateUser,
  updateRoom,
  findUserRoomAndUpdate,
}
