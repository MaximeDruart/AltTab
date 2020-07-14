import React from "react"
import styled from "styled-components"
import { styles } from "../../assets/defaultStyles"
import PerfectScrollbar from "react-perfect-scrollbar"

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
`

const ChatPanel = () => {
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
      <input className="chat-input" type="text" />
    </ChatContainer>
  )
}

export default ChatPanel
