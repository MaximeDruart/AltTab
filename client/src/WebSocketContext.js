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
  userWasKicked,
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

// routes excluded from being tested as a room name
const usedRoutes = ["/", "/shop", "/blog", "/gamedev"]

const systemMessage = (content) => ({
  author: "system",
  date: `${new Date().getHours()}:${new Date().getMinutes()}`,
  content,
})

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

  const getRoomInfoForWelcomeJoin = (code) =>
    socket.emit("getRoomInfo", code, (room) =>
      room.error ? dispatch(setSocketError(room.error)) : history.push(`/${code}`)
    )

  const kickUser = (user) => socket.emit("kickUser", user)

  const sendUserInfo = (userInfo) => socket.emit("userInfo", userInfo)
  const getPublicRooms = (message) => socket.emit("getPublicRooms", message)
  const sendMessage = (message) => socket.emit("sendMessage", message)
  const sendVote = (game) => socket.emit("vote", game)
  const updateRoomSettings = (roomCode, settings) => socket.emit("updateRoom", roomCode, settings)

  const debouncedUpdateRoomSettings = debounce(updateRoomSettings, 600)

  useEffect(() => {
    // if pathname is not a protected route and contains smth ( aka a code) AND a room isnt already in store (ie you've just created a room)
    if (!usedRoutes.includes(pathname) && !room) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  if (!socket) {
    socket = process.env.NODE_ENV === "development" ? io.connect("http://localhost:3001") : io.connect()

    socket.on("socketData", (data) => dispatch(setSocketData(data)))

    socket.on("newUserJoined", (user) => {
      dispatch(newUserJoined(user))
      dispatch(updateChatMessages(systemMessage(`${user.name} joined the room !`)))
    })

    socket.on("userLeftRoom", (user) => {
      dispatch(userLeftRoom(user))
      dispatch(updateChatMessages(systemMessage(`${user.name} left the room !`)))
    })

    socket.on("userWasKicked", (user) => {
      dispatch(userWasKicked(user))
      dispatch(updateChatMessages(systemMessage(`${user.name} was kicked from the room`)))
    })

    socket.on("youHaveBeenKicked", () => {
      dispatch(leftRoom())
      history.push("/")
      dispatch(setSocketError("You have been kicked from the room."))
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
      getRoomInfoForWelcomeJoin,
      kickUser,
    }
  }

  useEffect(() => {
    if (socket) {
      // if user is authenticated send that data to the socket server
      if (isAuthenticated) {
        sendUserInfo({
          username: user.username,
          isAuthenticated: isAuthenticated,
          avatar: user.avatar,
        })
      }
    }
  }, [isAuthenticated, user])

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
}
