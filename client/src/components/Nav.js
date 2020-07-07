import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { styles } from "../assets/defaultStyles"

const NavContainer = styled.div`
  width: 150px;
  height: 91vh;
  border: 1px solid yellow;
  flex: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  .upper-nav {
    .upper-nav-item {
      width: 55px;
      height: 55px;
      margin-bottom: 50px;
      background: ${styles.blue};
      border-radius: 8%;
    }
  }
  .lower-nav {
    background-color: ${styles.black.medium};
    height: 180px;
    width: 84px;
    border-radius: 14px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    .lower-nav-item {
      width: 25px;
      height: 25px;
      background: red;
      list-style-type: none;
      &:after {
      }
    }
  }
`

const Nav = () => {
  return (
    <NavContainer>
      <ul className="upper-nav">
        <li className="upper-nav-item">
          <NavLink to="/">
            <img src="" alt="" />
          </NavLink>
        </li>
        <li className="upper-nav-item">
          <NavLink to="/shop">
            <img src="" alt="" />
          </NavLink>
        </li>
        <li className="upper-nav-item">
          <NavLink to="/blog">
            <img src="" alt="" />
          </NavLink>
        </li>
      </ul>
      <div className="lower-nav">
        <li className="lower-nav-item">
          <div>
            <img src="" alt="" />
          </div>
        </li>
        <li className="lower-nav-item">
          <div>
            <img src="" alt="" />
          </div>
        </li>
      </div>
    </NavContainer>
  )
}

export default Nav
