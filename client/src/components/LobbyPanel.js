import React from "react"
import styled from "styled-components"
import { styles } from "../assets/defaultStyles"
import { useSelector } from "react-redux"
import settingsSvg from "../assets/icons/settings.svg"
import "react-perfect-scrollbar/dist/css/styles.css"
import PerfectScrollbar from "react-perfect-scrollbar"

const mockupData = {
  lobbyName: "Maxime's game",
  settings: {
    private: true,
    maxPlayers: 6,
    rounds: 3,
    link: "XyZa",
  },
  nbOfPlayers: 8,
  players: [
    {
      name: "Maxime",
      role: "owner",
    },
    {
      name: "Visiteur 2624",
      role: "user",
    },
    {
      name: "test 3",
      role: "user",
    },
    {
      name: "test 4",
      role: "user",
    },
    {
      name: "test 4",
      role: "user",
    },
    {
      name: "test 4",
      role: "user",
    },
  ],
}

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
          font-size: 20px;
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
    .options {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;
      font-size: 20px;
      padding: 0 20px;
      .leave {
        font-size: 14px;
        padding: 8px 16px;
        background-color: ${styles.red};
        border: none;
        border-radius: 7px;
        cursor: pointer;
      }
      .players-number {
        font-size: 16px;
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
      font-size: 20px;
    }
  }
`

const LobbyPanel = () => {
  const lobby = useSelector((state) => state.interface.lobby)

  const getPlayers = () =>
    mockupData.players.map((player, index) => (
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

  return (
    <LobbyContainer>
      {lobby || true ? (
        <div className="lobby">
          <div className="lobby-header">
            <div className="lobby-name">
              <p>{mockupData.lobbyName}</p>
            </div>
            <div className="settings">
              <img src={settingsSvg} alt="" />
            </div>
          </div>
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
          <div className="options">
            <button className="leave">Leave</button>
            <div className="players-number">
              {mockupData.players.length}/{mockupData.nbOfPlayers}
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
