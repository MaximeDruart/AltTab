import React from "react"
import styled from "styled-components"
import { styles, Selector } from "../../assets/defaultStyles"
import { useSelector, useDispatch } from "react-redux"
import settingsSvg from "../../assets/icons/settings.svg"
import profileSvg from "../../assets/icons/profile.svg"
import "react-perfect-scrollbar/dist/css/styles.css"
import PerfectScrollbar from "react-perfect-scrollbar"
import { setLeftPanelMode, updateSettings } from "../../redux/actions/interfaceActions"

const mockupMessages = [
  {
    author: "Eythan",
    date: "17:55",
    content: "je suis un message",
  },
  {
    author: "Eythan",
    date: "17:58",
    content: "jes suis un message feaiohgieagn fazifhazlkfaz",
  },
  {
    author: "Eythan",
    date: "17:55",
    content: "je suis un message",
  },
  {
    author: "Eythan",
    date: "17:55",
    content: "je suis un message",
  },
  {
    author: "Eythan",
    date: "17:55",
    content: "je suis un message",
  },
  {
    author: "Eythan",
    date: "17:55",
    content: "je suis un message",
  },
  {
    author: "Eythan",
    date: "17:55",
    content: "je suis un message",
  },
  {
    author: "Eythan",
    date: "17:55",
    content: "je suis un message",
  },
  {
    author: "Eythan",
    date: "17:55",
    content: "je suis un message",
  },
]

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

    .chat {
      height: 42%;
      width: 100%;
      background-color: ${styles.black.light};
      border-radius: 14px;
      padding: 14px 18px;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: space-between;
      .messages {
        height: 90%;
        .message {
          margin-bottom: 10px;
          margin-top: 4px;
          font-size: ${styles.txtSize.small};
          .infos {
            margin-bottom: 1px;
            .date {
              color: ${styles.txtColorDisabled};
              margin-right: 4px;
            }
            .author {
            }
          }
          .content {
            font-family: NexaRegular;
          }
        }
      }
      .chat-input {
        width: 100%;
        background-color: ${styles.black.medium};
        border: none;
        height: 30px;
        border-radius: 10px;
        padding-left: 7px;
        margin: 0 auto;
        &:focus {
          border: 1px solid ${styles.blue};
          outline: none;
        }
      }
    }
  }
`

const PlayerContainer = styled.div`
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
    border: 1px solid ${styles.blue};
  }
  .name-tag {
    display: flex;
    align-items: center;
    height: 40px;
    width: 298px;
    background-color: ${styles.black.light};
    border-radius: 10px;

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
  const { lobby, leftPanelMode } = useSelector((state) => state.interface)
  const dispatch = useDispatch()

  const getPlayers = () =>
    lobby.players.map((player, index) => (
      <PlayerContainer index={index} key={index}>
        {player.role === "owner" && <div className="crown"></div>}
        <div className="picture"></div>
        <div className="name-tag">
          <span>{player.name}</span>
        </div>
      </PlayerContainer>
    ))

  const getMessages = () =>
    mockupMessages.map((msg, index) => (
      <div key={index} className="message">
        <div className="infos">
          <span className="date">{msg.date}</span>
          <span className="author">{msg.author}</span>
        </div>
        <div className="content">{msg.content}</div>
      </div>
    ))

  const toggleLeftPanelMode = () => {
    if (leftPanelMode === "USERS") return dispatch(setLeftPanelMode("SETTINGS"))
    if (leftPanelMode === "SETTINGS") return dispatch(setLeftPanelMode("USERS"))
  }

  // const updateSettings = () => {
  //   dispatch(updateSettings)
  //   dispatch(updateSettings({ private: true }))
  // }

  return (
    <LobbyContainer>
      {lobby || true ? (
        <div className="lobby">
          <div className="lobby-header">
            <div className="lobby-name">
              <p>{lobby.lobbyName}</p>
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
                    onClick={() => lobby.settings.private && dispatch(updateSettings({ private: false }))}
                    className={lobby.settings.private ? "left" : "left active"}
                  >
                    Public
                  </div>
                  <div
                    onClick={() => !lobby.settings.private && dispatch(updateSettings({ private: true }))}
                    className={lobby.settings.private ? "right active" : "right"}
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
                    value={lobby.settings.link}
                    onChange={({ target }) => dispatch(updateSettings({ link: target.value.slice(0, 4) }))}
                    type="text"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="lobby-players">
              <PerfectScrollbar
                options={{
                  wheelSpeed: 0.15,
                  suppressScrollX: true,
                }}
              >
                {getPlayers()}
              </PerfectScrollbar>
            </div>
          )}
          <div className="options">
            <button className="leave">Leave</button>
            <div className="players-number">
              {lobby.players.length}/{lobby.nbOfPlayers}
            </div>
          </div>
          <div className="chat">
            <div className="messages">
              <PerfectScrollbar
                options={{
                  wheelSpeed: 0.25,
                  suppressScrollX: true,
                }}
              >
                {getMessages()}
              </PerfectScrollbar>
            </div>
            <input className="chat-input" type="text" />
          </div>
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
