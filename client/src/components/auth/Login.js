import React, { useState, useEffect, useRef, useLayoutEffect } from "react"

import styled from "styled-components"
import { Button, styles } from "../../assets/defaultStyles"
import { useDispatch, useSelector } from "react-redux"
import { setAuthMode, toggleAuth } from "../../redux/actions/interfaceActions"
import { clearErrors } from "../../redux/actions/errorActions"
import { loginUser } from "../../redux/actions/authActions"

const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-flow: column nowrap;

  .forgot {
    cursor: pointer;
    color: ${styles.blue};
    margin-top: 10px;
    display: block;
  }
`

const Login = () => {
  const dispatch = useDispatch()

  const emailInput = useRef(null)

  const [logs, setLogs] = useState({
    email: "",
    password: "",
  })

  const errorMessages = useSelector((state) => state.error.msg)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUser(logs))
  }

  useEffect(() => {
    dispatch(clearErrors())
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated) dispatch(toggleAuth())
  }, [dispatch, isAuthenticated])

  const handleChange = ({ target }) => {
    let { name, value } = target
    setLogs({ ...logs, [name]: value })
  }

  useLayoutEffect(() => emailInput.current.focus(), [])

  return (
    <LoginContainer>
      <div className="auth-title">Welcome back !</div>
      <form onSubmit={handleSubmit}>
        <div className="fields">
          <div className="form-group email">
            <div className="label-group">
              <label htmlFor="email">email</label>
              {errorMessages.email && <div className="error-message">- {errorMessages.email}</div>}
            </div>
            <input
              ref={emailInput}
              style={{ border: errorMessages.email ? "1px solid red" : `1px solid rgba(125, 99, 255, 0.6)` }}
              id="email"
              placeholder="a.b@gmail.com"
              type="text"
              name="email"
              value={logs.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group password">
            <div className="label-group">
              <label htmlFor="password">password</label>
              {errorMessages.password && <div className="error-message">- {errorMessages.password}</div>}
            </div>
            <input
              style={{ border: errorMessages.password ? "1px solid red" : `1px solid rgba(125, 99, 255, 0.6)` }}
              placeholder="paulbismuth123"
              type="password"
              name="password"
              id="password"
              value={logs.password}
              onChange={handleChange}
            />
            <span className="forgot">forgot your password ? (coming soon :) )</span>
          </div>
        </div>
        <Button size="large">Log in</Button>
        <div className="no-account">
          <span>don't have an account ? </span>
          <span onClick={() => dispatch(setAuthMode("REGISTER"))} className="link">
            sign up.
          </span>
        </div>
        <div className="other-options">
          <div className="title">Or log in with :</div>
          <div className="login-methods">
            <div className="login-method"></div>
            <div className="login-method"></div>
            <div className="login-method"></div>
            <div className="login-method"></div>
          </div>
        </div>
      </form>
    </LoginContainer>
  )
}

export default Login
