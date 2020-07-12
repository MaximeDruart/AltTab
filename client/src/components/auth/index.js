import React, { useEffect } from "react"
import styled from "styled-components"
import Login from "./Login"
import Register from "./Register"
import { styles } from "../../assets/defaultStyles"
import { useDispatch, useSelector } from "react-redux"
import { toggleAuth } from "../../redux/actions/interfaceActions"

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
          height: 40px;
          &:focus {
            border: 2px solid ${styles.blue};
          }
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

  useEffect(() => {
    // hides popup on escape key press
    const toggle = ({ key }) => key === "Escape" && dispatch(toggleAuth())
    window.addEventListener("keydown", toggle)
    return () => window.removeEventListener("keydown", toggle)
  }, [])

  return (
    <>
      <AuthContainer>{authMode === "LOGIN" ? <Login /> : <Register />}</AuthContainer>
      {/* clicking on somewhere else than the popup dismisses it */}
      <Filter onClick={() => dispatch(toggleAuth())} />
    </>
  )
}

export default AuthPopup
