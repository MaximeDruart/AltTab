const initialState = {
  room: null,
  chatMessages: [],
  error: "",
  publicRooms: [],
  socketData: null,
}

export default (state = initialState, { type, payload }) => {
  let newRoom
  switch (type) {
    case "SET_ROOM":
      return {
        ...state,
        room: payload,
      }
    case "SET_SOCKET_DATA":
      return {
        ...state,
        socketData: payload,
      }
    case "SET_SOCKET_ERROR":
      return {
        ...state,
        error: payload,
      }

    case "NEW_USER_JOINED":
      return {
        ...state,
        room: {
          ...state.room,
          members: [...state.room.members, payload],
        },
      }
    case "USER_LEFT_ROOM":
      newRoom = state.room
      newRoom.members = newRoom.members.filter((member) => member.id !== payload.id)
      return {
        ...state,
        room: newRoom,
      }
    case "USER_WAS_KICKED":
      newRoom = state.room
      newRoom.members = newRoom.members.filter((member) => member.id !== payload.id)
      return {
        ...state,
        room: newRoom,
      }
    case "LEFT_ROOM":
      return {
        ...state,
        room: null,
        chatMessages: [],
        error: "",
      }
    case "SET_PUBLIC_ROOMS":
      return {
        ...state,
        publicRooms: payload,
      }

    case "UPDATE_CHAT_MESSAGES":
      return {
        ...state,
        chatMessages: [...state.chatMessages, payload],
      }

    default:
      return state
  }
}
