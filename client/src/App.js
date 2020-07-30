import React, { useEffect } from "react"
import styled from "styled-components"
import Nav from "./components/Nav"
import LeftPanel from "./components/leftPanel"
import RightPanel from "./components/rightPanel"
import { useSelector, useDispatch } from "react-redux"
import AuthPopup from "./components/auth"
import { loadUser } from "./redux/actions/authActions"
import Alert from "./components/Alert"
import { AnimatePresence } from "framer-motion"
import AlertSuccess from "./components/AlertSuccess"

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
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <AppContainer>
      <Alert />
      <AlertSuccess />
      <Nav />
      <LeftPanel />
      <RightPanel />
      <AnimatePresence>{showAuth && <AuthPopup key="auth" />}</AnimatePresence>
    </AppContainer>
  )
}

export default App
