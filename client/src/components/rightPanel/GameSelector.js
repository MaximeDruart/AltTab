import React, { useContext } from "react"
import styled from "styled-components"
import DisposableHelp from "./DisposableHelp"
import { styles, ButtonSmall, Button } from "../../assets/defaultStyles"
import { useMemo } from "react"
import gamesData from "../../assets/gamesData"
import { WebSocketContext } from "../../WebSocketContext"
import { useSelector } from "react-redux"

const GameSelectorContainer = styled.div`
  width: 94%;
  height: 100%;
  padding-top: 4.5vh;

  * {
    font-family: NexaBold;
  }
  .label {
    color: ${styles.txtColor1};
    font-size: ${styles.txtSize.medium};
    margin-bottom: 7px;
  }

  .game-selector {
    width: 100%;
    .game {
      width: 100%;
      height: 154px;
      position: relative;
      background-color: ${styles.black.light};
      border-radius: 13px;
      margin-bottom: 25px;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      .header {
        position: absolute;
        top: -5%;
        left: 50%;
        transform: translateX(-50%);
        width: 88%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-end;
        .votes {
          margin: 0 20px;
        }
      }
      .body {
        margin-top: 40px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        width: 90%;

        .game-title {
          font-size: ${styles.txtSize.large};
        }
      }
    }
  }
`

const GameSelector = () => {
  const ws = useContext(WebSocketContext)
  const room = useSelector((state) => state.socket.room)
  const mappedGames = useMemo(
    () =>
      gamesData.map((game, index) => (
        <div key={index} className="game">
          <div className="header">
            <div className="votes">{room?.votes[game.name].length} votes</div>
            <ButtonSmall onClick={() => vote(game.name)}>Vote</ButtonSmall>
          </div>
          <div className="body">
            <div className="game-title">{game.name}</div>
            <div className="toggle-desc">Read more</div>
            <Button>Play</Button>
          </div>
        </div>
      )),
    [gamesData, room]
  )

  const vote = (game) => {
    ws.sendVote(game)
  }
  return (
    <GameSelectorContainer>
      <DisposableHelp height="180px" storageKey="showGamesToolTip" className="disposable">
        <div className="content">
          <div className="title">Choose a game</div>
          <div className="body">You can vote for which you want to play but the owner will have the final say.</div>
        </div>
        <div className="chammy">Chammy :)</div>
      </DisposableHelp>
      <div className="game-selector">{mappedGames}</div>
    </GameSelectorContainer>
  )
}

export default GameSelector
