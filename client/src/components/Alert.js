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
  box-shadow: ${styles.boxShadowHard};
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
    background: ${styles.txtColor1};
    border-radius: 50%;
    width: 25px;
    height: 25px;
    box-shadow: ${styles.boxShadowHard};
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.05) rotate(-5deg) translateY(-50%);
    }
  }
`

const Alert = () => {
  const [timeoutState, setTimeoutState] = useState(null)
  const socketError = useSelector((state) => state.socket.error)
  const dispatch = useDispatch()

  const dismiss = () => dispatch(setSocketError(""))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTimeoutState(setTimeout(dismiss, 0)), [])

  useEffect(() => {
    clearTimeout(timeoutState)
    if (socketError) {
      setTimeoutState(setTimeout(dismiss, 2000))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketError])

  return (
    <AlertContainer show={socketError}>
      <div className="message">{socketError}</div>
      <div onClick={dismiss} className="dismiss">
        <svg width="12" height="12" viewBox="0 0 17 16">
          <path
            d="M16.1403 2.61865L10.7155 7.9743L16.0653 13.3776L13.6533 15.7896L8.29571 10.3628L2.87417 15.7145L0.482422 13.3228L5.91114 7.9469L0.557449 2.5234L2.94919 0.131656L8.32311 5.55842L13.7283 0.206683L16.1403 2.61865Z"
            fill={styles.red}
          />
        </svg>
      </div>
    </AlertContainer>
  )
}

export default Alert
