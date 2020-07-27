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
import debounce from "lodash.debounce"

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
        history.push("/")
        dispatch(setSocketError(res.error))
      } else {
        dispatch(setRoom(res))
      }
    })
  }

  const leaveRoom = (code) =>
    socket.emit("leaveRoom", code, (res) => {
      if (res === "success") {
        dispatch(leftRoom())
        history.push("/")
      }
    })

  const getPublicRooms = (message) => socket.emit("getPublicRooms", message)
  const sendMessage = (message) => socket.emit("sendMessage", message)
  const sendVote = (game) => socket.emit("vote", game)
  const updateRoomSettings = (roomCode, settings) => {
    socket.emit("updateRoom", roomCode, settings)
  }
  const debouncedUpdateRoomSettings = debounce(updateRoomSettings, 600)

  useEffect(() => {
    console.log(pathname)
    // if pathname is not homepage and contains smth ( aka a code) AND a room isnt already in store (ie you've just created a room)
    if (pathname !== "/" && !room) {
      // send a room info request with pathname code
      socket.emit("getRoomInfo", pathname.slice(1), (room) => {
        console.log(room)
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
    socket =
      process.env.NODE_ENV === "development"
        ? io.connect("http://localhost:3001")
        : io.connect(window.location.pathname)

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

    socket.on("getPublicRoomsSuccess", (rooms) => dispatch(setPublicRooms(rooms)))

    socket.on("receiveMessage", (message) => dispatch(updateChatMessages(message)))

    socket.on("votes", (room) => dispatch(setRoom(room)))

    socket.on("updateRoomSuccess", (room) => dispatch(setRoom(room)))

    ws = {
      socket,
      sendMessage,
      createRoom,
      leaveRoom,
      getPublicRooms,
      sendVote,
      updateRoomSettings,
      debouncedUpdateRoomSettings,
    }
  }

  useEffect(() => {
    if (socket) {
      // if user is authenticated send that data to the socket server
      if (isAuthenticated) {
        socket.emit("userInfo", {
          username: user.username,
          isAuthenticated: isAuthenticated,
          avatar: user.avatar,
        })
        // if user is a guest but has already come he's gonna have infos on localStorage
      }
      // else if (localStorage.getItem("userInfo")) {
      //   socket.emit("userInfo", {
      //     username: user.username,
      //     isAuthenticated: false,
      //     avatar: user.avatar,
      //   })
      // }
    }
  }, [isAuthenticated])

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
}
