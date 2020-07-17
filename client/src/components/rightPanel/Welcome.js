import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import { styles, Button, ButtonSmall, Selector } from "../../assets/defaultStyles"
import DisposableHelp from "./DisposableHelp"
import gamesData from "../../assets/gamesData"
import { useMemo } from "react"
import { WebSocketContext } from "../../WebSocketContext"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

const WelcomeContainer = styled.div`
  width: 94%;
  height: 100%;
  /* blocks on the left are 91vh high and centered so we're offsetting it by (100 - 91) /2 */
  padding-top: 4.5vh;
  * {
    font-family: NexaBold;
  }

  .label {
    color: ${styles.txtColor1};
    font-size: ${styles.txtSize.medium};
    margin-bottom: 7px;
  }

  .games-container {
    width: 100%;

    .games {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      /* overflow-x: auto; */
      .game {
        ${styles.flexCentered};
        /* width: 380px; */
        width: 30%;
        background-color: ${styles.black.medium};
        height: 125px;
        border-radius: 14px;
        cursor: pointer;
        span {
          font-size: ${styles.txtSize.large};
        }
      }
    }
  }
  .servers-link {
    margin-top: 35px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .server-block {
      .content {
        padding: 0 35px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        background-color: ${styles.black.medium};
        height: 125px;
        border-radius: 14px;
      }
    }
    .join-server .content {
      .join-input {
        margin-right: 30px;
        outline: none;
        border: none;
        background-color: ${styles.black.dark};
        padding: 16px 20px;
        text-transform: uppercase;
        color: ${styles.txtColor2};
        font-size: ${styles.txtSize.medium};
        width: 100px;
      }
    }
    .create-server .content {
      .private-selector {
        margin-right: 20px;
      }
    }
  }
  .server-browser {
    margin-top: 35px;
    width: 100%;
    /* margin at the bottom so you can scroll a bit more */
    margin-bottom: 3vh;

    .servers {
      width: 100%;
      border-radius: 14px;

      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      background-color: ${styles.black.medium};
      padding: 20px;
      .server {
        border-radius: 12px;
        margin-bottom: 15px;
        padding: 0 20px;
        width: 100%;
        height: 80px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        background-color: ${styles.black.light};
        justify-content: space-between;
        font-size: ${styles.txtSize.medium};
      }
    }
  }
`

const Welcome = () => {
  const history = useHistory()
  const ws = useContext(WebSocketContext)
  const [roomCode, setRoomCode] = useState("")
  const [isNewLobbyPrivate, setIsNewLobbyPrivate] = useState(true)
  const publicRooms = useSelector((state) => state.socket.publicRooms)

  const inputHandler = ({ target }) => {
    setRoomCode(target.value.toUpperCase())
  }

  const mappedGames = useMemo(
    () =>
      gamesData.map((game, index) => (
        <div key={index} className="game">
          <span>{game.name}</span>
        </div>
      )),
    []
  )
  const mappedServers = useMemo(
    () =>
      publicRooms.map((room, index) => (
        <div key={index} className="server">
          <div className="name">{room.name}</div>
          <div className="game">game playing</div>
          <div className="players">
            {room.members.length}/{room.maxMembers}
          </div>
          <ButtonSmall onClick={() => history.push(room.code)}>Join</ButtonSmall>
        </div>
      )),
    [publicRooms, history]
  )

  useEffect(() => {
    ws.getPublicRooms()
  }, [ws])

  const createRoom = () => {
    ws.createRoom(isNewLobbyPrivate)
  }

  const joinRoom = () => {
    roomCode.length === 4 && history.push(roomCode)
  }

  return (
    <WelcomeContainer roomCode={roomCode}>
      <DisposableHelp storageKey="showWelcomeToolTip" className="welcome-disposable">
        <div className="content">
          <div className="title">Welcome To Alt Tab !</div>
          <div className="body">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web
            designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to hav
          </div>
        </div>
        <div className="chammy">Chammy :)</div>
      </DisposableHelp>
      <div className="games-container">
        <div className="label">Quick matchmaking</div>
        <div className="games">{mappedGames}</div>
      </div>
      <div className="servers-link">
        <div className="create-server server-block">
          <div className="label">Create server</div>
          <div className="content">
            <Selector className="private-selector">
              <div
                onClick={() => isNewLobbyPrivate && setIsNewLobbyPrivate(false)}
                className={isNewLobbyPrivate ? "left" : "left active"}
              >
                Public
              </div>
              <div
                onClick={() => !isNewLobbyPrivate && setIsNewLobbyPrivate(true)}
                className={isNewLobbyPrivate ? "right active" : "right"}
              >
                Private
              </div>
            </Selector>
            <Button onClick={createRoom}>Create</Button>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="join-server server-block">
          <div className="label">Join server</div>
          <div className="content">
            <input maxLength="4" value={roomCode} onChange={inputHandler} type="text" className="join-input" />
            <Button variant={roomCode.length < 4 ? "disabled" : null} onClick={joinRoom}>
              Join
            </Button>
          </div>
        </form>
      </div>
      <div className="server-browser">
        <div className="label">Browse servers</div>
        <div className="servers">
          {publicRooms.length ? (
            mappedServers
          ) : (
            <div className="no-server">No public servers found. Create your own !</div>
          )}
        </div>
      </div>
    </WelcomeContainer>
  )
}

export default Welcome
