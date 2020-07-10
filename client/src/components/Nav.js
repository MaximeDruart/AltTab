import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { styles } from "../assets/defaultStyles"
import { setLeftPanel } from "../redux/actions/interfaceActions"
import { useDispatch, useSelector } from "react-redux"
import profileSvg from "../assets/icons/profile.svg"
import lobbySvg from "../assets/icons/lobby.svg"

const NavContainer = styled.div`
  width: 150px;
  height: 91vh;
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
      ${styles.flexCentered};
      width: 25px;
      height: 25px;
      list-style-type: none;
      cursor: pointer;
      &.active {
        position: relative;
        &:after {
          content: "";
          position: absolute;
          width: 3px;
          height: 30px;
          top: 50%;
          left: 52px;
          transform: translate(-50%, -50%);
          background: ${styles.blue};
        }
      }
    }
  }
`

const Nav = () => {
  const dispatch = useDispatch()
  const activeLeftPanel = useSelector((state) => state.interface.activeLeftPanel)
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
        <li
          onClick={() => dispatch(setLeftPanel("PROFILE"))}
          className={"lower-nav-item ".concat(activeLeftPanel === "PROFILE" ? "active" : "test")}>
          <img src={profileSvg} alt="" />
        </li>
        <li
          onClick={() => dispatch(setLeftPanel("LOBBY"))}
          className={"lower-nav-item ".concat(activeLeftPanel === "LOBBY" ? "active" : "test")}>
          <img src={lobbySvg} alt="" />
        </li>
      </div>
    </NavContainer>
  )
}

export default Nav
