import React from "react"
import styled from "styled-components"
import Nav from "./components/Nav"
import LeftPanel from "./components/LeftPanel"
import RightPanel from "./components/RightPanel"
import { useSelector } from "react-redux"
import AuthPopup from "./components/auth"

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
  const showAuth = useSelector((state) => state.interface.showAuth)
  return (
    <AppContainer>
      <Nav />
      <LeftPanel />
      <RightPanel />
      {showAuth && <AuthPopup />}
    </AppContainer>
  )
}

export default App
