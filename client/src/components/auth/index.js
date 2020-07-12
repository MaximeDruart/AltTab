import React, { useEffect } from "react"
import styled from "styled-components"
import Login from "./Login"
import Register from "./Register"
import { styles } from "../../assets/defaultStyles"
import { useDispatch, useSelector } from "react-redux"
import { toggleAuth } from "../../redux/actions/interfaceActions"
import closeSvg from "../../assets/icons/close.svg"

const AuthContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
        label {
          display: block;
          margin-bottom: 7px;
          font-size: ${styles.txtSize.medium};
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
            border: 2px solid ${styles.blue};
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
`
const Filter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vw;
  background: black;
  opacity: 0.75;
  z-index: 1000;
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
        <div onClick={() => dispatch(toggleAuth())} className="close">
          <img src={closeSvg} alt="" />
        </div>
        {authMode === "LOGIN" ? <Login /> : <Register />}
      </AuthContainer>
      {/* clicking on somewhere else than the popup dismisses it */}
      <Filter onClick={() => dispatch(toggleAuth())} />
    </>
  )
}

export default AuthPopup
