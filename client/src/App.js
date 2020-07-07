import React from "react"
import styled from "styled-components"
import Nav from "./components/Nav"
import LeftPanel from "./components/LeftPanel"
import RightPanel from "./components/RightPanel"

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`

const App = () => {
  return (
    <AppContainer>
      <Nav />
      <LeftPanel />
      <RightPanel />
    </AppContainer>
  )
}

export default App
