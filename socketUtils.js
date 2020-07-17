const { v4: uuidv4 } = require("uuid")
const axios = require("axios")
let users = []
let rooms = []

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
    name: "Temp name " + socket.id.slice(0, 2),
  }
  socket.user = user
  users.push(user)
}

const randomName = () => {
  axios
    .get("http://names.drycodes.com/1?nameOptions=funnyWords&separator=space")
    .then((res) => {
      res.data[0]
    })
    .catch((err) => {})
}

const removeUser = (socketId) => {
  users = users.filter((user) => user.id !== socketId)
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
    maxMembers: 12,
    votes: {
      Lighty: [],
      Gummy: [],
      Ballzy: [],
    },
  }
  rooms.push(room)
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

const avatarOptions = {
  avatarStyle: ["Circle"],
  topType: [
    "NoHair",
    "Eyepatch",
    "Hat",
    "Hijab",
    "Turban",
    "WinterHat1",
    "WinterHat2",
    "WinterHat3",
    "WinterHat4",
    "LongHairBigHair",
    "LongHairBob",
    "LongHairBun",
    "LongHairCurly",
    "LongHairCurvy",
    "LongHairDreads",
    "LongHairFrida",
    "LongHairFro",
    "LongHairFroBand",
    "LongHairNotTooLong",
    "LongHairShavedSides",
    "LongHairMiaWallace",
    "LongHairStraight",
    "LongHairStraight2",
    "LongHairStraightStrand",
    "ShortHairDreads01",
    "ShortHairDreads02",
    "ShortHairFrizzle",
    "ShortHairShaggyMullet",
    "ShortHairShortCurly",
    "ShortHairShortFlat",
    "ShortHairShortRound",
    "ShortHairShortWaved",
    "ShortHairSides",
    "ShortHairTheCaesar",
    "ShortHairTheCaesarSidePart",
  ],
  accessoriesType: ["Blank", "Kurt", "Prescription01", "Prescription02", "Round", "Sunglasses", "Wayfarers"],
  hairColor: [
    "Auburn",
    "Black",
    "Blonde",
    "BlondeGolden",
    "Brown",
    "BrownDark",
    "PastelPink",
    "Platinum",
    "Red",
    "SilverGray",
  ],
  facialHairType: ["Blank", "BeardMedium", "BeardLight", "BeardMagestic", "MoustacheFancy", "MoustacheMagnum"],
  clotheType: [
    "BlazerShirt",
    "BlazerSweater",
    "CollarSweater",
    "GraphicShirt",
    "Hoodie",
    "Overall",
    "ShirtCrewNeck",
    "ShirtScoopNeck",
    "ShirtVNeck",
  ],
  eyeType: [
    "Close",
    "Cry",
    "Default",
    "Dizzy",
    "EyeRoll",
    "Happy",
    "Hearts",
    "Side",
    "Squint",
    "Surprised",
    "Wink",
    "WinkWacky",
  ],
  eyebrowType: [
    "Angry",
    "AngryNatural",
    "Default",
    "DefaultNatural",
    "FlatNatural",
    "RaisedExcited",
    "RaisedExcitedNatural",
    "SadConcerned",
    "SadConcernedNatural",
    "UnibrowNatural",
    "UpDown",
    "UpDownNatural",
  ],
  mouthType: [
    "Concerned",
    "Default",
    "Disbelief",
    "Eating",
    "Grimace",
    "Sad",
    "ScreamOpen",
    "Serious",
    "Smile",
    "Tongue",
    "Twinkle",
    "Vomit",
  ],
  skinColor: ["Tanned", "Yellow", "Pale", "Light", "Brown", "DarkBrown", "Black"],
}

const getRandomAvatarOptions = () => {
  let options = {}
  for (const prop in avatarOptions) {
    options[prop] = avatarOptions[prop][Math.floor(Math.random() * avatarOptions[prop].length)]
  }
  return options
}

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
}
