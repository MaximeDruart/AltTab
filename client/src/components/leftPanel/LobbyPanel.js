import React, { useContext, useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import { styles, Selector, Button } from "../../assets/defaultStyles"
import { useSelector, useDispatch } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"
import settingsSvg from "../../assets/icons/settings.svg"
import profileSvg from "../../assets/icons/profile.svg"
import crownSvg from "../../assets/icons/crown.svg"
import "react-perfect-scrollbar/dist/css/styles.css"
import PerfectScrollbar from "react-perfect-scrollbar"
import { setLeftPanelMode, setSuccessMessage } from "../../redux/actions/interfaceActions"
import Avatar from "../Avatar"
import ChatPanel from "./ChatPanel"
import RangeSelector from "./RangeSelector"
import { WebSocketContext } from "../../WebSocketContext"

const LobbyContainer = styled.div`
  width: 100%;
  height: 100%;

  .scrollbar-container {
    .ps__rail-y {
      .ps__thumb-y {
        background-color: ${styles.blue};
      }
    }
  }
  * {
    font-family: NexaBold;
  }

  .no-lobby {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }

  .lobby {
    width: 90%;
    margin: 0 auto;
    height: 100%;
    .lobby-header {
      height: 40px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      .lobby-name {
        background-color: ${styles.black.light};
        width: 262px;
        border-radius: 12px;
        height: 100%;
        display: flex;
        align-items: center;
        /* if lobby name is too long displays name + ... */
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .room-name-input {
          width: 100%;
          border: none;
          height: 30px;
          padding-left: 7px;
          background-color: inherit;
          margin: 0 auto;
          font-size: ${styles.txtSize.medium};
          &:focus {
            border: none;
            outline: none;
          }
        }
        p {
          /* fuck it */
          font-family: NexaBold;
          font-size: ${styles.txtSize.medium};
          position: relative;
          top: 3px;
          padding-left: 12px;
        }
      }
      .settings {
        width: 42px;
        height: 42px;
        border-radius: 21px;
        background-color: ${styles.blue};
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        img {
          transition: transform 0.3s ease;
        }
        &:hover img {
          transform: scale(1.15);
        }
      }
    }
    .lobby-players {
      margin-top: 12px;
      height: 37%;
      width: 100%;
    }

    .settings {
      margin-top: 12px;
      height: 37%;
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: space-around;

      .label {
        font-size: ${styles.txtSize.medium};
        margin-bottom: 6px;
      }
      .privacy {
      }
      .max-users,
      .rounds {
        width: 100%;
      }

      .link {
        .link-input {
          color: ${styles.txtColorDisabled};
          background-color: ${styles.black.light};
          border-radius: 10px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${styles.txtSize.medium};
          padding: 0 10px;

          .code {
            font-size: ${styles.txtSize.medium};
            border-radius: 10px;
            outline: none;
            border: none;
            text-transform: uppercase;
            color: ${styles.txtColor2};
            background-color: ${styles.black.light};
            width: 150px;
          }
          .clip-board {
            cursor: pointer;
          }
        }
      }
    }
    .options {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;
      font-size: ${styles.txtSize.medium};
      padding: 0 20px;
      .players-number {
        font-size: ${styles.txtSize.medium};
        padding: 9px 18px;
        background-color: ${styles.black.light};
        border-radius: 7px;
      }
    }
  }
`

const opScaleVariant = {
  in: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
  out: { opacity: 0, scale: 0.3, transition: { duration: 0.1 } },
  hover: { scale: 1.1, transition: { duration: 0.1 } },
}

const PlayerContainer = styled(motion.li)`
  width: 100%;
  position: relative;
  margin-bottom: 22px;
  margin-top: ${(props) => (!props.index ? "15px" : 0)};
  .picture {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 52px;
    height: 52px;
    border-radius: 26px;
    background-color: ${styles.black.light};
    svg {
      width: 120%;
      height: 120%;
      position: relative;
      top: -20%;
    }
    z-index: 10;
  }
  .name-tag {
    display: flex;
    align-items: center;
    height: 40px;
    width: 298px;
    background-color: ${styles.black.light};
    border-radius: 10px;
    position: relative;

    .crown {
      position: absolute;
      top: -28%;
      right: -4%;
      transform: rotate(30deg);
      z-index: 10;
    }

    .kick {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      background: ${styles.red};
      ${styles.flexCentered};
      border-radius: 50%;
      z-index: 11;
      cursor: pointer;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease-in-out;
      svg {
        width: 60%;
        height: 60%;
      }
    }
    &:hover .kick {
      opacity: 1;
      pointer-events: all;
    }

    span {
      padding-left: 75px;
      position: relative;
      top: 3px;
      font-family: NexaBold;
      font-size: ${styles.txtSize.medium};
    }
  }
`

const LobbyPanel = () => {
  const ws = useContext(WebSocketContext)
  const leftPanelMode = useSelector((state) => state.interface.leftPanelMode)
  const { room, socketData } = useSelector((state) => state.socket)
  const dispatch = useDispatch()

  const [roomName, setRoomName] = useState(room?.name)

  const toggleLeftPanelMode = () => {
    if (leftPanelMode === "USERS") dispatch(setLeftPanelMode("SETTINGS"))
    if (leftPanelMode === "SETTINGS") dispatch(setLeftPanelMode("USERS"))
  }

  useEffect(() => setRoomName(room?.name), [room])

  const onChangeHandler = ({ target }) => {
    setRoomName(target.value)
    ws.debouncedUpdateRoomSettings(room.code, {
      name: target.value,
    })
  }

  const isLobbyOwner = useCallback(() => room?.ownerId === socketData?.id, [room, socketData])

  const copyToClip = () => {
    navigator.clipboard
      .writeText(window.location.origin + "/" + room.code)
      .then(() => dispatch(setSuccessMessage("Link copied to clipboard !")))
  }

  return (
    <LobbyContainer>
      {room ? (
        <div className="lobby">
          <div className="lobby-header">
            <div className="lobby-name">
              <input
                disabled={!isLobbyOwner()}
                value={roomName || ""}
                //  2 steps verification for people who could remove the disabled attribute in inspector :)
                onChange={(e) => isLobbyOwner() && onChangeHandler(e)}
                className="room-name-input"
                type="text"
              />
            </div>
            <div onClick={toggleLeftPanelMode} className="settings">
              <AnimatePresence exitBeforeEnter={true}>
                <motion.img
                  whileHover="hover"
                  key={leftPanelMode === "USERS" ? settingsSvg : profileSvg}
                  src={leftPanelMode === "USERS" ? settingsSvg : profileSvg}
                  variants={opScaleVariant}
                  initial="out"
                  animate="in"
                  exit="out"
                  alt=""
                />
              </AnimatePresence>
            </div>
          </div>
          {leftPanelMode === "SETTINGS" ? (
            <div className="settings">
              <div className="privacy">
                <div className="label">Lobby privacy</div>
                <Selector>
                  <div
                    onClick={() =>
                      room.private && isLobbyOwner() && ws.updateRoomSettings(room.code, { private: false })
                    }
                    className={room.private ? "left" : "left active"}
                  >
                    Public
                  </div>
                  <div
                    onClick={() =>
                      !room.private && isLobbyOwner() && ws.updateRoomSettings(room.code, { private: true })
                    }
                    className={room.private ? "right active" : "right"}
                  >
                    Private
                  </div>
                </Selector>
              </div>
              <div className="max-users">
                <div className="label">Max users</div>
                <RangeSelector
                  setValue={(value) => isLobbyOwner() && ws.updateRoomSettings(room.code, { maxMembers: value })}
                  value={room.maxMembers}
                  setting="users"
                />
              </div>
              {/* <div className="rounds">
                <div className="label">Rounds</div>
                <RangeSelector setting="rounds" />
              </div> */}
              <div className="link">
                <div className="label">Lobby link</div>
                <div className="link-input">
                  <span className="prefix">alttab.com/</span>
                  <span className="code">{room.code}</span>
                  <div className="clip-board">
                    <svg onClick={copyToClip} height="24" viewBox="0 0 24 24" width="24">
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path
                        fill={styles.blue}
                        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                      />
                    </svg>
                  </div>
                  {/* <input
                    disabled={!isLobbyOwner()}
                    value={room.code}
                    onChange={({ target }) =>
                      isLobbyOwner() && ws.updateRoomSettings({ code: target.value.slice(0, 4) })
                    }
                    type="text"
                  /> */}
                </div>
              </div>
            </div>
          ) : (
            <ul className="lobby-players">
              <PerfectScrollbar
                options={{
                  wheelSpeed: 0.15,
                  suppressScrollX: true,
                }}
              >
                <AnimatePresence>
                  {room.members.map((member, index) => (
                    <PlayerContainer
                      key={index}
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                      index={index}
                    >
                      <div className="picture">
                        <Avatar optionProps={member.avatar} />
                      </div>
                      <div className="name-tag">
                        {member.id === room.ownerId && (
                          <div className="crown">
                            <img src={crownSvg} alt="" />
                          </div>
                        )}
                        {/* if user is lobby owner and it's not his card */}
                        {isLobbyOwner() && member.id !== room.ownerId && (
                          <div onClick={() => ws.kickUser(member)} className="kick">
                            <svg width="17" height="16" viewBox="0 0 17 16">
                              <path
                                d="M16.1403 2.61865L10.7155 7.9743L16.0653 13.3776L13.6533 15.7896L8.29571 10.3628L2.87417 15.7145L0.482422 13.3228L5.91114 7.9469L0.557449 2.5234L2.94919 0.131656L8.32311 5.55842L13.7283 0.206683L16.1403 2.61865Z"
                                fill={styles.txtColor1}
                              />
                            </svg>
                          </div>
                        )}
                        <span>{member.name}</span>
                      </div>
                    </PlayerContainer>
                  ))}
                </AnimatePresence>
              </PerfectScrollbar>
            </ul>
          )}
          <div className="options">
            <Button size="small" variant="red" onClick={() => ws.leaveRoom(room.code)} className="leave">
              Leave
            </Button>
            <div className="players-number">
              {room.members.length}/{room.maxMembers}
            </div>
          </div>
          <ChatPanel />
        </div>
      ) : (
        <div className="no-lobby">
          <p>No lobby joined yet...</p>
          <img src="" alt="chameleon sad :(" />
        </div>
      )}
    </LobbyContainer>
  )
}

export default LobbyPanel
