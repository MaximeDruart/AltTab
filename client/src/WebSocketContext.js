import React, { createContext, useEffect } from "react"
import io from "socket.io-client"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useHistory } from "react-router-dom"
import {
  setRoom,
  setSocketError,
  newUserJoined,
  leftRoom,
  userLeftRoom,
  updateChatMessages,
  setPublicRooms,
  setSocketData,
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
  const room = useSelector((state) => state.socket.room)
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  const createRoom = (isPrivate) => socket.emit("createRoom", isPrivate)
  const joinRoom = (roomCode) => socket.emit("joinRoom", roomCode)
  const leaveRoom = (code) => socket.emit("leaveRoom", code)
  const getRoomInfo = (code) => socket.emit("getRoomInfo", code)
  const getPublicRooms = (message) => socket.emit("getPublicRooms", message)
  const sendMessage = (message) => socket.emit("sendMessage", message)

  useEffect(() => {
    // if pathname is not homepage and contains smth ( aka a code) AND a room isnt already in store (ie you've just created a room)
    if (pathname !== "/" && !room) {
      // send a room info request with pathname code
      getRoomInfo(pathname.slice(1))
    }
  }, [pathname])

  if (!socket) {
    console.log("creating new socket connection")
    socket = io.connect("http://localhost:3001")

    socket.on("socketData", (data) => {
      dispatch(setSocketData(data))
    })

    socket.on("getRoomInfoSuccess", (res) => {
      if (!res.error) {
        // if the server sends back a room, join it
        joinRoom(res.code)
      } else {
        // else redirect to homepage
        dispatch(setSocketError(res.error))
        history.push("/")
      }
    })

    socket.on("createRoomSuccess", (room) => {
      dispatch(setRoom(room))
      dispatch(setLeftPanel("LOBBY"))
      history.push(`/${room.code}`)
    })

    socket.on("joinRoomSuccess", (room) => {
      dispatch(setRoom(room))
    })

    socket.on("joinRoomError", (error) => {
      dispatch(setSocketError(error))
    })

    socket.on("newUserJoined", (user) => {
      dispatch(newUserJoined(user))
    })

    socket.on("userLeftRoom", (user) => {
      dispatch(userLeftRoom(user))
    })

    socket.on("leaveRoomSuccess", () => {
      dispatch(leftRoom())
      history.push("/")
    })

    socket.on("getPublicRoomsSuccess", (rooms) => {
      dispatch(setPublicRooms(rooms))
    })

    socket.on("receiveMessage", (message) => {
      console.log("received message cleintside", message)
      dispatch(updateChatMessages(message))
    })

    ws = {
      socket,
      sendMessage,
      createRoom,
      leaveRoom,
      getPublicRooms,
    }
  }

  useEffect(() => {
    if (socket) {
      if (isAuthenticated) {
        let userInfo = {
          username: user.username,
          isAuthenticated: user.isAuthenticated,
        }
        if (localStorage.getItem("avatar")) userInfo.avatar = localStorage.getItem("avatar")
        socket.emit("userInfo", userInfo)
      }
    }
  }, [])

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
}
