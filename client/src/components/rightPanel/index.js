import React from "react"
import styled from "styled-components"
import { Switch, Route } from "react-router-dom"
import Welcome from "./Welcome"
import GameSelector from "./GameSelector"
import Shop from "./shop"
import Blog from "./Blog"

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
        {/* its wierd but it works */}
        {/* If we're on the homepage it will match with the first route and stop as we're in a switch */}
        {/* else every other route will match with the other route */}
        <Route exact path="/" component={Welcome}></Route>
        <Route exact path="/shop" component={Shop}></Route>
        <Route exact path="/blog" component={Blog}></Route>
        <Route path="/" component={GameSelector}></Route>
      </Switch>
    </RightPanelContainer>
  )
}

export default RightPanel
