import React, { useContext, useCallback } from "react"
import styled from "styled-components"
import DisposableHelp from "./DisposableHelp"
import { styles, Button } from "../../assets/defaultStyles"
import { useMemo } from "react"
import gamesData from "../../assets/gamesData"
import { WebSocketContext } from "../../WebSocketContext"
import { useSelector } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"

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
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15), inset 0px 4px 54px rgba(0, 0, 0, 0.54);
      .header {
        position: absolute;
        top: -5%;
        left: 50%;
        transform: translateX(-50%);
        width: 94%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-end;
        .votes {
          color: #ffffff;
          border-radius: 10px;
          text-align: center;
          padding: 0.7rem 1.4rem;
          font-size: 20px;
          background: ${styles.darkBlue};
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
  const socketData = useSelector((state) => state.socket.socketData)

  /* check if the user voted for this game and add a checkmark if so */
  const isGameUserVotedFor = useCallback(
    (gameName) => !!room?.votes[gameName].filter((vote) => vote.id === socketData.id).length,
    [room, socketData]
  )

  const vote = useCallback(
    (game) => {
      ws.sendVote(game)
    },
    [ws]
  )

  const mappedGames = useMemo(
    () =>
      gamesData.map((game, index) => (
        <div key={index} className="game">
          <div className="header">
            <motion.div animate={{ scale: 1.1 }} className="votes">
              {room?.votes[game.name].length} votes
            </motion.div>
            <Button variant={isGameUserVotedFor(game.name) && "dark"} size="small" onClick={() => vote(game.name)}>
              <AnimatePresence>
                {isGameUserVotedFor(game.name) ? (
                  <>
                    <motion.svg
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ marginRight: "5px" }}
                      width="16"
                      height="12"
                      viewBox="0 0 16 12"
                    >
                      <path
                        d="M5.50013 8.81667L2.02513 5.34167L0.841797 6.51667L5.50013 11.175L15.5001 1.175L14.3251 0L5.50013 8.81667Z"
                        fill="white"
                      />
                    </motion.svg>
                    <span>Voted</span>
                  </>
                ) : (
                  <span>Vote</span>
                )}
              </AnimatePresence>
            </Button>
          </div>
          <div className="body">
            <div className="game-title">{game.name}</div>
            <div className="toggle-desc">Read more</div>
            <Button>Play</Button>
          </div>
        </div>
      )),
    [room, isGameUserVotedFor, vote]
  )

  return (
    <GameSelectorContainer>
      <DisposableHelp height="180px" storageKey="showGamesToolTip" className="disposable">
        <div className="content">
          <div className="title">Choose a game</div>
          <div className="body">You can vote for which you want to play but the owner will have the final say.</div>
        </div>
        <div className="chammy">Chammy :)</div>
      </DisposableHelp>
      <div className="game-selector">
        {mappedGames}
        <div className="game random">
          <div className="header">
            <div className="votes">{room?.votes["random"].length} votes</div>
            <Button variant={isGameUserVotedFor("random") && "dark"} size="small" onClick={() => vote("random")}>
              <AnimatePresence>
                {isGameUserVotedFor("random") ? (
                  <>
                    <motion.svg
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ marginRight: "5px" }}
                      width="16"
                      height="12"
                      viewBox="0 0 16 12"
                    >
                      <path
                        d="M5.50013 8.81667L2.02513 5.34167L0.841797 6.51667L5.50013 11.175L15.5001 1.175L14.3251 0L5.50013 8.81667Z"
                        fill="white"
                      />
                    </motion.svg>
                    <span>Voted</span>
                  </>
                ) : (
                  <span>Vote</span>
                )}
              </AnimatePresence>
            </Button>
          </div>
          <div className="body">
            <div className="game-title">{"Random"}</div>
            <Button>Play</Button>
          </div>
        </div>
      </div>
    </GameSelectorContainer>
  )
}

export default GameSelector
