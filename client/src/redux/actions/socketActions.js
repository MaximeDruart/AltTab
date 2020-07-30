export const setRoom = (payload) => ({ type: "SET_ROOM", payload })

export const setSocketData = (payload) => ({ type: "SET_SOCKET_DATA", payload })

export const setSocketError = (payload) => ({ type: "SET_SOCKET_ERROR", payload })

export const newUserJoined = (payload) => ({ type: "NEW_USER_JOINED", payload })

export const userLeftRoom = (payload) => ({ type: "USER_LEFT_ROOM", payload })

export const userWasKicked = (payload) => ({ type: "USER_WAS_KICKED", payload })

export const leftRoom = () => ({ type: "LEFT_ROOM" })

export const setPublicRooms = (payload) => ({ type: "SET_PUBLIC_ROOMS", payload })

/* MESSAGES */

export const updateChatMessages = (payload) => ({ type: "UPDATE_CHAT_MESSAGES", payload })
