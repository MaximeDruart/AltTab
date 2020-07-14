import React, { createContext } from "react"
import io from "socket.io-client"
import { useDispatch } from "react-redux"
import { useLocation, useHistory } from "react-router-dom"
import {
  setRoom,
  setSocketError,
  newUserJoined,
  leftRoom,
  userLeftRoom,
  updateMessages,
  setPublicRooms,
} from "./redux/actions/socketActions"
import { setLeftPanel } from "./redux/actions/interfaceActions"

const WebSocketContext = createContext(null)

export { WebSocketContext }

let socket
let ws

export default ({ children }) => {
  const { pathname } = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const createRoom = (isPrivate) => socket.emit("createRoom", isPrivate)
  const joinRoom = (roomCode) => socket.emit("joinRoom", roomCode)
  const leaveRoom = (code) => socket.emit("leaveRoom", code)
  const getPublicRooms = (message) => socket.emit("getPublicRooms", message)
  const sendMessage = (message) => socket.emit("sendMessage", message)

  if (!socket) {
    console.log("creating new socket connection")

    socket = io.connect("http://localhost:3001")

    socket.on("createRoomSuccess", (room) => {
      dispatch(setRoom(room))
      dispatch(setLeftPanel("LOBBY"))
      history.push(`/${room.code}`)
    })

    socket.on("joinRoomSuccess", (room) => {
      dispatch(setRoom(room))
      history.push(`/${room.code}`)
    })

    socket.on("joinRoomError", (error) => {
      dispatch(setSocketError(error))
    })

    socket.on("newUserJoined", (user) => {
      console.log("new user joined !", user)
      dispatch(newUserJoined(user))
    })

    socket.on("userLeftRoom", (user) => {
      console.log("user left !", user)
      dispatch(userLeftRoom(user))
    })

    socket.on("leaveRoomSuccess", () => {
      dispatch(leftRoom())
      history.push("/")
    })

    socket.on("getPublicRoomsSuccess", (rooms) => {
      console.log("receiving rooms")
      dispatch(setPublicRooms(rooms))
    })

    socket.on("receiveMessage", (message) => {
      dispatch(updateMessages(message))
    })

    ws = {
      socket,
      sendMessage,
      createRoom,
      joinRoom,
      leaveRoom,
      getPublicRooms,
    }
  }

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
}
