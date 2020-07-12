import React from "react"
import styled from "styled-components"
import { Switch, Route } from "react-router-dom"
import Welcome from "./Welcome"
import GameSelector from "./GameSelector"

const RightPanelContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  flex: auto;
  align-self: flex-start;
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
`

const RightPanel = () => {
  return (
    <RightPanelContainer>
      <Switch>
        <Route exact path="/" component={Welcome}></Route>
        <Route exact path="/games" component={GameSelector}></Route>
      </Switch>
    </RightPanelContainer>
  )
}

export default RightPanel
