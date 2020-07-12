import React, { useState } from "react"

import styled from "styled-components"
import { LargeButton, styles } from "../../assets/defaultStyles"
import { useDispatch } from "react-redux"
import { setAuthMode } from "../../redux/actions/interfaceActions"

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
  const [logs, setLogs] = useState({
    email: "",
    password: "",
  })
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  const handleChange = ({ target }) => {
    let { name, value } = target
    setLogs({ ...logs, [name]: value })
  }
  return (
    <LoginContainer>
      <div className="auth-title">Welcome back !</div>
      <form onSubmit={handleSubmit}>
        <div className="fields">
          <div className="form-group email">
            <label htmlFor="email">email</label>
            <input
              id="email"
              placeholder="a.b@gmail.com"
              type="text"
              name="email"
              value={logs.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group password">
            <label htmlFor="password">password</label>
            <input
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
        <LargeButton>Log in</LargeButton>
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
