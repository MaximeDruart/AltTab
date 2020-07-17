import React, { useContext, useState } from "react"
import styled from "styled-components"
import { styles } from "../../assets/defaultStyles"
import PerfectScrollbar from "react-perfect-scrollbar"
import { WebSocketContext } from "../../WebSocketContext"
import { useSelector } from "react-redux"

const ChatContainer = styled.div`
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
    width: 100%;
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
  form {
    width: 100%;
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
`

const ChatPanel = () => {
  const chatMessages = useSelector((state) => state.socket.chatMessages)
  const ws = useContext(WebSocketContext)
  const [input, setInput] = useState("")
  const getMessages = () =>
    chatMessages.map((msg, index) => (
      <div key={index} className="message">
        <div className="infos">
          <span className="date">{msg.date}</span>
          <span className="author">{msg.author}</span>
        </div>
        <div className={"content"}>{msg.content}</div>
      </div>
    ))
  const sendMsg = (e) => {
    e.preventDefault()
    ws.sendMessage(input)
    setInput("")
  }

  const onChangeHandler = ({ target }) => {
    setInput(target.value)
  }
  return (
    <ChatContainer>
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
      <form onSubmit={sendMsg}>
        <input value={input} onChange={onChangeHandler} className="chat-input" type="text" />
      </form>
    </ChatContainer>
  )
}

export default ChatPanel
