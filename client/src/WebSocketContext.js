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

  const createRoom = (isPrivate) => {
    socket.emit("createRoom", isPrivate, (room) => {
      if (room) {
        dispatch(setRoom(room))
        dispatch(setLeftPanel("LOBBY"))
        history.push(`/${room.code}`)
      }
    })
  }
  const joinRoom = (roomCode) => {
    socket.emit("joinRoom", roomCode, (res) => {
      if (res.error) {
        dispatch(setSocketError(res.error))
      } else {
        dispatch(setRoom(res))
      }
    })
  }

  const leaveRoom = (code) =>
    socket.emit("leaveRoom", code, (fn) => {
      if (fn === "success") {
        dispatch(leftRoom())
        history.push("/")
      }
    })

  const getPublicRooms = (message) => socket.emit("getPublicRooms", message)
  const sendMessage = (message) => socket.emit("sendMessage", message)
  const sendVote = (game) => socket.emit("vote", game)

  useEffect(() => {
    // if pathname is not homepage and contains smth ( aka a code) AND a room isnt already in store (ie you've just created a room)
    if (pathname !== "/" && !room) {
      // send a room info request with pathname code
      socket.emit("getRoomInfo", pathname.slice(1), (room) => {
        if (!room.error) {
          // if the server sends back a room, join it
          joinRoom(room.code)
        } else {
          // else redirect to homepage
          dispatch(setSocketError(room.error))
          history.push("/")
        }
      })
    }
  }, [pathname])

  const systemMessage = (content) => ({
    author: "system",
    date: `${new Date().getHours()}:${new Date().getMinutes()}`,
    content,
  })

  if (!socket) {
    console.log("creating new socket connection")
    socket = io.connect("http://localhost:3001")

    socket.on("socketData", (data) => {
      dispatch(setSocketData(data))
    })

    socket.on("newUserJoined", (user) => {
      dispatch(newUserJoined(user))
      dispatch(updateChatMessages(systemMessage(`${user.name} joined the room !`)))
    })

    socket.on("userLeftRoom", (user) => {
      dispatch(userLeftRoom(user))
      dispatch(updateChatMessages(systemMessage(`${user.name} left the room !`)))
    })

    socket.on("getPublicRoomsSuccess", (rooms) => {
      dispatch(setPublicRooms(rooms))
    })

    socket.on("receiveMessage", (message) => {
      dispatch(updateChatMessages(message))
    })

    socket.on("votes", (room) => {
      dispatch(setRoom(room))
    })

    ws = {
      socket,
      sendMessage,
      createRoom,
      leaveRoom,
      getPublicRooms,
      sendVote,
    }
  }

  useEffect(() => {
    if (socket) {
      if (isAuthenticated) {
        let userInfo = {
          username: user.username,
          isAuthenticated: isAuthenticated,
        }
        if (localStorage.getItem("avatar")) userInfo.avatar = localStorage.getItem("avatar")
        socket.emit("userInfo", userInfo)
      }
    }
  }, [isAuthenticated])

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
}
