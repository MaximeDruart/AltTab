import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import { styles, Selector } from "../../assets/defaultStyles"
import { useSelector, useDispatch } from "react-redux"
import settingsSvg from "../../assets/icons/settings.svg"
import profileSvg from "../../assets/icons/profile.svg"
import crownSvg from "../../assets/icons/crown.svg"
import "react-perfect-scrollbar/dist/css/styles.css"
import PerfectScrollbar from "react-perfect-scrollbar"
import { setLeftPanelMode } from "../../redux/actions/interfaceActions"
import Avatar from "./Avatar"
import ChatPanel from "./ChatPanel"
import { WebSocketContext } from "../../WebSocketContext"
import { AnimatePresence, motion } from "framer-motion"

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
      }

      .link {
        .link-input {
          color: ${styles.txtColorDisabled};
          background-color: ${styles.black.light};
          border-radius: 12px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${styles.txtSize.medium};
          padding: 0 10px;

          input {
            font-size: ${styles.txtSize.medium};
            border-radius: 12px;
            outline: none;
            border: none;
            text-transform: uppercase;
            color: ${styles.txtColor2};
            background-color: ${styles.black.light};
            width: 150px;
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
      .leave {
        font-size: ${styles.txtSize.small};
        padding: 8px 16px;
        background-color: ${styles.red};
        border: none;
        border-radius: 7px;
        cursor: pointer;
      }
      .players-number {
        font-size: ${styles.txtSize.medium};
        padding: 9px 18px;
        background-color: ${styles.black.light};
        border-radius: 7px;
      }
    }
  }
`

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

  useEffect(() => setRoomName(room?.name), [room?.name])

  const onChangeHandler = ({ target }) => {
    setRoomName(target.value)
    ws.debouncedUpdateRoomSettings(room.code, {
      name: target.value,
    })
  }

  return (
    <LobbyContainer>
      {room ? (
        <div className="lobby">
          <div className="lobby-header">
            <div className="lobby-name">
              {leftPanelMode === "SETTINGS" && room?.ownerId === socketData?.id ? (
                <input value={roomName} onChange={onChangeHandler} className="room-name-input" type="text" />
              ) : (
                <p>{room.name}</p>
              )}
            </div>
            <div onClick={toggleLeftPanelMode} className="settings">
              <img src={leftPanelMode === "USERS" ? settingsSvg : profileSvg} alt="" />
            </div>
          </div>
          {leftPanelMode === "SETTINGS" ? (
            <div className="settings">
              <div className="privacy">
                <div className="label">Lobby privacy</div>
                <Selector>
                  <div
                    onClick={() => room.private && ws.updateRoomSettings({ private: false })}
                    className={room.private ? "left" : "left active"}
                  >
                    Public
                  </div>
                  <div
                    onClick={() => !room.private && ws.updateRoomSettings({ private: true })}
                    className={room.private ? "right active" : "right"}
                  >
                    Private
                  </div>
                </Selector>
              </div>
              <div className="max-users">
                <div className="label">Max users</div>
              </div>
              <div className="rounds">
                <div className="label">Rounds</div>
              </div>
              <div className="link">
                <div className="label">Lobby link</div>
                <div className="link-input">
                  <span className="prefix">alttab.com/</span>
                  <input
                    value={room.code}
                    onChange={({ target }) => ws.updateRoomSettings({ code: target.value.slice(0, 4) })}
                    type="text"
                  />
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
                <AnimatePresence initial={false}>
                  {room.members.map((member, index) => (
                    <PlayerContainer
                      key={index}
                      positionTransition
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
                        <span>{member.name}</span>
                      </div>
                    </PlayerContainer>
                  ))}
                </AnimatePresence>
              </PerfectScrollbar>
            </ul>
          )}
          <div className="options">
            <button onClick={() => ws.leaveRoom(room.code)} className="leave">
              Leave
            </button>
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
