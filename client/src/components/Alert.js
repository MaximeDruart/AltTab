import React, { useEffect, useState } from "react"
import styled from "styled-components"
import closeSvg from "../assets/icons/close.svg"
import { styles } from "../assets/defaultStyles"
import { useSelector, useDispatch } from "react-redux"
import { setSocketError } from "../redux/actions/socketActions"

const AlertContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 10vh;
  transform: translateX(-50%);
  opacity: ${(props) => (props.show ? 1 : 0)};
  pointer-events: ${(props) => (props.show ? "auto" : "none")};
  transition: opacity 0.4s ease-in-out;
  ${styles.flexCentered};
  width: 70vw;
  height: 60px;
  background-color: ${styles.red};
  border-radius: 12px;
  .message {
    color: white;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    font-family: NexaBold;
    font-size: ${styles.txtSize.medium};
  }
  .dismiss {
    cursor: pointer;
    ${styles.flexCentered};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }
`

const Alert = () => {
  const [timeoutState, setTimeoutState] = useState(null)
  const socketError = useSelector((state) => state.socket.error)
  const dispatch = useDispatch()

  const dismiss = () => dispatch(setSocketError(""))

  useEffect(() => setTimeoutState(setTimeout(dismiss, 0)), [])

  useEffect(() => {
    clearTimeout(timeoutState)
    if (socketError) {
      setTimeoutState(setTimeout(dismiss, 2000))
    }
  }, [socketError])

  return (
    <AlertContainer show={socketError}>
      <div className="message">{socketError}</div>
      <div onClick={dismiss} className="dismiss">
        <img src={closeSvg} alt="" />
      </div>
    </AlertContainer>
  )
}

export default Alert
