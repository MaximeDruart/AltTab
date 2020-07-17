import React, { useState, useEffect } from "react"
import { styles } from "../../assets/defaultStyles"
import styled from "styled-components"
import closeSvg from "../../assets/icons/close.svg"

const DisposableContainer = styled.div`
  width: 100%;
  height: ${(props) => (props.height ? props.height : "240px")};
  background-color: ${styles.black.medium};
  position: relative;
  border-radius: 14px;
  ${styles.boxShadowHard};

  margin-bottom: 35px;

  .content {
    position: absolute;
    left: 50px;
    top: 50%;
    transform: translateY(-50%);
    width: 45%;
    .title {
      font-size: ${styles.txtSize.XLarge};
      margin-bottom: 16px;
    }
    .body {
      font-size: ${styles.txtSize.small};
      color: ${styles.txtColor2};
    }
  }
  .chammy {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    right: 25%;
  }
  .close {
    ${styles.flexCentered};
    background-color: ${styles.blue};
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    bottom: 2vh;
    right: 2vh;
    cursor: pointer;
    img {
      width: 60%;
      height: 60%;
    }
  }
`

const DisposableHelp = ({ children, storageKey, height }) => {
  const [isHelpShown, setIsHelpShown] = useState(true)

  useEffect(() => {
    // checks if welcome is already in local storage
    localStorage.getItem(storageKey) !== null && setIsHelpShown(JSON.parse(localStorage.getItem(storageKey)))
  }, [])

  const hideWelcome = () => {
    setIsHelpShown(false)
    localStorage.setItem(storageKey, false)
  }
  return (
    isHelpShown && (
      <DisposableContainer height={height}>
        {children}
        <div onClick={hideWelcome} className="close">
          <img src={closeSvg} alt="" />
        </div>
      </DisposableContainer>
    )
  )
}

export default DisposableHelp
