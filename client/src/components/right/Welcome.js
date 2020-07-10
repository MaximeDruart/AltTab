import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { styles, Button } from "../../assets/defaultStyles"
import DisposableHelp from "./DisposableHelp"
import gamesData from "../../assets/gamesData"
import { useMemo } from "react"

const WelcomeContainer = styled.div`
  width: 94%;
  height: 100%;
  /* blocks on the left are 91vh high and centered so we're offsetting it by (100 - 91) /2 */
  padding-top: 4.5vh;
  * {
    font-family: NexaBold;
  }

  .games-container {
    width: 100%;
    margin-top: 35px;
    .label {
      color: ${styles.txtColor1};
      font-size: ${styles.txtSize.medium};
      margin-bottom: 7px;
    }
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
  .servers {
    margin-top: 35px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .server-block {
      .label {
        font-size: ${styles.txtSize.medium};
        margin-bottom: 7px;
      }
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
      .toggle {
        cursor: pointer;

        .private,
        .public {
          width: 50px;
          height: 30px;
          background: ${styles.black.medium};
          border-radius: 10px;
        }
      }
    }
  }
`

const Welcome = () => {
  const [isPrivate, setIsPrivate] = useState(true)
  const [roomCode, setRoomCode] = useState("")
  const mappedGames = useMemo(
    () =>
      gamesData.map((game, index) => (
        <div key={index} className="game">
          <span>{game.name}</span>
        </div>
      )),
    []
  )
  const inputHandler = ({ target }) => {
    setRoomCode(target.value.toUpperCase())
  }

  return (
    <WelcomeContainer isPrivate={isPrivate}>
      <DisposableHelp className="welcome-disposable">
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
      <div className="servers">
        <div className="create-server server-block">
          <div className="label">Create server</div>
          <div className="content">
            <div className="toggle">
              <div className="public">public</div>
              <div className="private">private</div>
            </div>
            <Button>Create</Button>
          </div>
        </div>
        <div className="join-server server-block">
          <div className="label">Join server</div>
          <div className="content">
            <input maxLength="4" value={roomCode} onChange={inputHandler} type="text" className="join-input" />
            <Button>Join</Button>
          </div>
        </div>
      </div>
    </WelcomeContainer>
  )
}

export default Welcome
