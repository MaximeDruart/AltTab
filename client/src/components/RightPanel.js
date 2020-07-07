import React from "react"
import styled from "styled-components"
import { Switch, Route } from "react-router-dom"
import Welcome from "./right/Welcome"
import GameSelector from "./right/GameSelector"

const RightPanelContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid red;
  flex: auto;
  align-self: flex-end;
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
