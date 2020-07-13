import React, { useState, useEffect } from "react"

import styled from "styled-components"
import { LargeButton } from "../../assets/defaultStyles"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { setAuthMode, toggleAuth } from "../../redux/actions/interfaceActions"
import { registerUser } from "../../redux/actions/authActions"
import { clearErrors } from "../../redux/actions/errorActions"

const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
`

const Login = () => {
  const dispatch = useDispatch()
  const [logs, setLogs] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  })

  const errorMessages = useSelector((state) => state.error.msg)
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth, shallowEqual)

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(registerUser(logs))
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
  return (
    <LoginContainer errorMessages={errorMessages}>
      <div className="auth-title">Sign up</div>
      <form onSubmit={handleSubmit}>
        <div className="fields">
          <div className="form-group username">
            <div className="label-group">
              <label htmlFor="username">username</label>
              {errorMessages.username && <div className="error-message">- {errorMessages.username}</div>}
            </div>
            <input
              style={{ border: errorMessages.username ? "1px solid red" : `1px solid rgba(125, 99, 255, 0.6)` }}
              id="username"
              placeholder="paulbismutgamer"
              type="text"
              name="username"
              value={logs.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group email">
            <div className="label-group">
              <label htmlFor="email">email</label>
              {errorMessages.email && <div className="error-message">- {errorMessages.email}</div>}
            </div>
            <input
              style={{ border: errorMessages.email ? "1px solid red" : "1px solid rgba(125, 99, 255, 0.6)" }}
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
              style={{ border: errorMessages.password ? "1px solid red" : "1px solid rgba(125, 99, 255, 0.6)" }}
              id="password"
              placeholder="paulbismuth123"
              type="password"
              name="password"
              value={logs.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group password">
            <div className="label-group">
              <label htmlFor="password2">confirm password</label>
              {errorMessages.password2 && <div className="error-message">- {errorMessages.password2}</div>}
            </div>
            <input
              style={{ border: errorMessages.password2 ? "1px solid red" : "1px solid rgba(125, 99, 255, 0.6)" }}
              id="password2"
              placeholder="paulbismuth123"
              type="password"
              name="password2"
              value={logs.password2}
              onChange={handleChange}
            />
          </div>
        </div>
        <LargeButton variant={isLoading ? "disabled" : null}>Sign up</LargeButton>
        <div className="no-account">
          <span>already have an account ? </span>
          <span onClick={() => dispatch(setAuthMode("LOGIN"))} className="link">
            log in.
          </span>
        </div>
      </form>
    </LoginContainer>
  )
}

export default Login
