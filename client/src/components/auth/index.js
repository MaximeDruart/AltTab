import React, { useEffect } from "react"
import styled from "styled-components"
import Login from "./Login"
import Register from "./Register"
import { styles } from "../../assets/defaultStyles"
import { useDispatch, useSelector } from "react-redux"
import { toggleAuth } from "../../redux/actions/interfaceActions"
import closeSvg from "../../assets/icons/close.svg"
import { motion } from "framer-motion"

const AuthContainer = styled.div`
  ${styles.flexCentered};
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1001;
  .auth-wrap {
    position: relative;
    z-index: 1001;
    background-color: ${styles.black.medium};
    width: 580px;
    padding: 50px 50px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    border-radius: 12px;
    * {
      font-family: NexaBold;
    }
    .close {
      position: absolute;
      top: 2.5vh;
      right: 2.5vh;
      ${styles.flexCentered};
      background-color: ${styles.blue};
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
      img {
        width: 60%;
        height: 60%;
      }
    }
    .auth-title {
      font-size: ${styles.txtSize.XLarge};
    }
    form {
      width: 100%;
      .fields {
        margin-bottom: 50px;
        .form-group {
          margin: 31px 0;
          width: 100%;

          .label-group {
            margin-bottom: 7px;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            label {
              font-size: ${styles.txtSize.medium};
            }
            .error-message {
              padding-left: 10px;
              font-size: ${styles.txtSize.small};
              color: ${styles.red};
            }
          }

          input {
            outline: none;
            border: 1px solid rgba(125, 99, 255, 0.6);
            background-color: ${styles.black.light};
            width: 100%;
            border-radius: 6px;
            height: 44px;
            font-size: ${styles.txtSize.medium};
            padding-left: 15px;

            &:focus {
              border: 2px solid ${styles.blue} !important;
            }
          }
        }
      }
      .no-account {
        margin: 11px 0;
        span {
          color: ${styles.txtColor2};
        }
        .link {
          cursor: pointer;
          color: ${styles.blue};
        }
      }
      .other-options {
        margin-top: 10px;
        .login-methods {
          margin-top: 20px;

          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: space-around;
          .login-method {
            width: 70px;
            height: 70px;
            border-radius: 10px;
            background-color: ${styles.blue};
          }
        }
      }
    }
  }
`
const Filter = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.75;
  z-index: 1000;
  cursor: pointer;
`

const AuthPopup = () => {
  const authMode = useSelector((state) => state.interface.authMode)
  const dispatch = useDispatch()

  // hides popup on escape key press
  useEffect(() => {
    const toggle = ({ key }) => key === "Escape" && dispatch(toggleAuth())
    window.addEventListener("keydown", toggle)
    return () => window.removeEventListener("keydown", toggle)
  }, [dispatch])

  return (
    <>
      <AuthContainer>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="auth-wrap"
        >
          <div onClick={() => dispatch(toggleAuth())} className="close">
            <img src={closeSvg} alt="" />
          </div>
          {authMode === "LOGIN" ? <Login /> : <Register />}
        </motion.div>
        <Filter
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch(toggleAuth())}
        />
      </AuthContainer>
    </>
  )
}

export default AuthPopup
