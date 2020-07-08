import React from "react"
import styled from "styled-components"
import { styles } from "../assets/defaultStyles"
import { useSelector, shallowEqual } from "react-redux"
import LobbyPanel from "./LobbyPanel"
import ProfilePanel from "./ProfilePanel"

const LeftPanelContainer = styled.div`
  width: 365px;
  height: 91vh;
  flex: none;
  background-color: ${styles.black.medium};
  border-radius: 15px;
`

const LeftPanel = () => {
  const { activeLeftPanel } = useSelector((state) => state.interface, shallowEqual)
  return (
    <LeftPanelContainer>
      {/* switches between lobby and profile depending on interface store */}
      {activeLeftPanel === "PROFILE" ? <ProfilePanel /> : activeLeftPanel === "LOBBY" && <LobbyPanel />}
    </LeftPanelContainer>
  )
}

export default LeftPanel
