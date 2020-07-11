import React, { useState } from "react"

import styled from "styled-components"
import { LargeButton } from "../../assets/defaultStyles"
import { useDispatch } from "react-redux"
import { setAuthMode } from "../../redux/actions/interfaceActions"

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
      <div className="auth-title">Sign up</div>
      <form onSubmit={handleSubmit}>
        <div className="fields">
          <div className="form-group username">
            <label htmlFor="username">username</label>
            <input type="text" name="username" value={logs.username} onChange={handleChange} />
          </div>
          <div className="form-group email">
            <label htmlFor="email">email</label>
            <input type="text" name="email" value={logs.email} onChange={handleChange} />
          </div>
          <div className="form-group password">
            <label htmlFor="password">password</label>
            <input type="password" name="password" value={logs.password} onChange={handleChange} />
          </div>
        </div>
        <LargeButton>Sign up</LargeButton>
        <div className="no-account">
          <span>already have an account ?</span>
          <span onClick={() => dispatch(setAuthMode("LOGIN"))} className="sign">
            log in.
          </span>
        </div>
        <div className="other-logins">
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