import React, { useEffect } from "react"
import styled from "styled-components"
import Login from "./Login"
import Register from "./Register"
import { styles } from "../../assets/defaultStyles"
import { useDispatch, useSelector } from "react-redux"
import { toggleAuth } from "../../redux/actions/interfaceActions"
import closeSvg from "../../assets/icons/close.svg"
import googleSvg from "../../assets/icons/google.svg"

import GoogleLogin from "react-google-login"
import { registerUser, loginUser } from "../../redux/actions/authActions"

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
        .oauth-logo {
          ${styles.flexCentered};
          width: 100%;
          height: 100%;
          cursor: pointer;
          img {
            width: 60%;
            height: 60%;
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

  // hides popup on escape key press
  useEffect(() => {
    const toggle = ({ key }) => key === "Escape" && dispatch(toggleAuth())
    window.addEventListener("keydown", toggle)
    return () => window.removeEventListener("keydown", toggle)
  }, [dispatch])

  const googleResponse = (res) => {
    if (res.profileObj) {
      // need to do a function on front end that checks if a user is already in database
      if (userExists) {
        dispatch(
          registerUser({
            email: res.profileObj.email,
            username: res.profileObj.name,
            profileImageUrl: res.profileObj.imageUrl,
            googleId: res.profileObj.googleId,
          })
        )
      } else {
        dispatch()
        // need to do a special google login that doesn't require a password
      }
    } else {
      dispatch({ type: "AUTH_ERROR" })
    }
  }

  return (
    <>
      <AuthContainer>
        <div onClick={() => dispatch(toggleAuth())} className="close">
          <img src={closeSvg} alt="" />
        </div>
        {authMode === "LOGIN" ? <Login /> : <Register />}
        <div className="other-options">
          <div className="title">Or log in with :</div>
          <div className="login-methods">
            <div className="login-method">
              <GoogleLogin
                clientId="76394632971-msffvnn3r717d87dbsl0u650kk0mb07g.apps.googleusercontent.com"
                onSuccess={googleResponse}
                onFailure={googleResponse}
                cookiePolicy={"single_host_origin"}
                render={(renderProps) => (
                  <div className="oauth-logo" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <img src={googleSvg} alt="" />
                  </div>
                )}
              />
            </div>
            <div className="login-method"></div>
            <div className="login-method"></div>
            <div className="login-method"></div>
          </div>
        </div>
      </AuthContainer>
      {/* clicking on somewhere else than the popup dismisses it */}
      <Filter onClick={() => dispatch(toggleAuth())} />
    </>
  )
}

export default AuthPopup
