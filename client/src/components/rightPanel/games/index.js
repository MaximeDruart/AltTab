import React from "react"
import styled from "styled-components"
import Game1 from "./Game1"

const GamesContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  flex: auto;
  align-self: flex-start;
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
`

const gameSwitch = (gameName) => {
  switch (gameName) {
    case "test1":
      return <Game1></Game1>
    default:
      break
  }
}

const Games = ({ gameName }) => {
  return <GamesContainer>{gameSwitch(gameName)}</GamesContainer>
}

export default Games
