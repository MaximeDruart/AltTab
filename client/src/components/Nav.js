import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { styles } from "../assets/defaultStyles"
import { setLeftPanel } from "../redux/actions/interfaceActions"
import { useDispatch, useSelector } from "react-redux"
import profileSvg from "../assets/icons/profile.svg"
import lobbySvg from "../assets/icons/lobby.svg"
import { motion } from "framer-motion"

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
      position: relative;
      ${styles.flexCentered};
      width: 25px;
      height: 25px;
      list-style-type: none;
      cursor: pointer;
      svg path {
        transition: all 0.3s ease-in;
      }
      &.test:hover {
        opacity: 0.8;
        transition: all 0.3s ease-in;
      }
      &:after {
        content: "";
        position: absolute;
        width: 3px;
        height: 30px;
        top: 50%;
        left: 52px;
        transition: all 0.3s ease-in;
        transform: translate(-50%, -50%);
        background: transparent;
      }
      &.active:after {
        background: ${styles.blue};
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
          className={"lower-nav-item ".concat(activeLeftPanel === "PROFILE" ? "active" : "test")}
        >
          <svg width="20" height="20" viewBox="0 0 25 25">
            <path
              d="M12.4995 12.5C15.9526 12.5 18.7495 9.70312 18.7495 6.25C18.7495 2.79688 15.9526 0 12.4995 0C9.04639 0 6.24951 2.79688 6.24951 6.25C6.24951 9.70312 9.04639 12.5 12.4995 12.5ZM12.4995 15.625C8.32764 15.625 -0.000488281 17.7188 -0.000488281 21.875V25H24.9995V21.875C24.9995 17.7188 16.6714 15.625 12.4995 15.625Z"
              fill={activeLeftPanel === "PROFILE" ? styles.blue : "white"}
            />
          </svg>
        </li>
        <li
          onClick={() => dispatch(setLeftPanel("LOBBY"))}
          className={"lower-nav-item ".concat(activeLeftPanel === "LOBBY" ? "active" : "test")}
        >
          <svg width="35" height="26" viewBox="0 0 35 26">
            <path
              d="M24.7505 14.4204C26.9144 15.8893 28.4307 17.8795 28.4307 20.533V25.2715H34.7487V20.533C34.7487 17.0897 29.1099 15.0522 24.7505 14.4204Z"
              fill={activeLeftPanel === "LOBBY" ? styles.blue : "white"}
            />
            <path
              d="M12.6358 12.6359C16.1251 12.6359 18.9538 9.80727 18.9538 6.31796C18.9538 2.82865 16.1251 0 12.6358 0C9.14652 0 6.31787 2.82865 6.31787 6.31796C6.31787 9.80727 9.14652 12.6359 12.6358 12.6359Z"
              fill={activeLeftPanel === "LOBBY" ? styles.blue : "white"}
            />
            <path
              d="M22.1124 12.6359C25.6031 12.6359 28.4304 9.80863 28.4304 6.31796C28.4304 2.82729 25.6031 0 22.1124 0C21.3701 0 20.6751 0.157949 20.0117 0.379077C21.3227 2.00595 22.1124 4.07508 22.1124 6.31796C22.1124 8.56083 21.3227 10.63 20.0117 12.2568C20.6751 12.478 21.3701 12.6359 22.1124 12.6359Z"
              fill={activeLeftPanel === "LOBBY" ? styles.blue : "white"}
            />
            <path
              d="M12.6359 14.2153C8.41868 14.2153 0 16.3318 0 20.5333V25.2718H25.2718V20.5333C25.2718 16.3318 16.8532 14.2153 12.6359 14.2153Z"
              fill={activeLeftPanel === "LOBBY" ? styles.blue : "white"}
            />
          </svg>
        </li>
      </div>
    </NavContainer>
  )
}

export default Nav
