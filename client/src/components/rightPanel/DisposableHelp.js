import React, { useState, useEffect } from "react"
import { styles } from "../../assets/defaultStyles"
import styled from "styled-components"
import closeSvg from "../../assets/icons/close.svg"
import { motion, AnimatePresence } from "framer-motion"

const DisposableContainer = styled(motion.div)`
  width: 100%;
  /* height: ${(props) => (props.height ? props.height : "240px")}; */
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
  const [isHelpShown, setIsHelpShown] = useState(false)

  useEffect(() => {
    // checks if welcome is already in local storage
    if (localStorage.getItem(storageKey) === null) {
      setIsHelpShown(true)
    } else {
      setIsHelpShown(JSON.parse(localStorage.getItem(storageKey)))
    }
  }, [storageKey])

  const hideWelcome = () => {
    setIsHelpShown(false)
    localStorage.setItem(storageKey, false)
  }

  return (
    <AnimatePresence>
      {isHelpShown && (
        <DisposableContainer
          layout
          initial={{ scale: 0, opacity: 0, height: 0, marginBottom: 0 }}
          animate={{ scale: 1, opacity: 1, height: height || "240px", marginBottom: 35, transition: { delay: 0.6 } }}
          exit={{ opacity: 0, scale: 0, height: 0, marginBottom: 0 }}
          key="modal"
          height={height}
        >
          {children}
          <motion.div whileHover={{ scale: 1.09, rotate: -5 }} onClick={hideWelcome} className="close">
            <img src={closeSvg} alt="" />
          </motion.div>
        </DisposableContainer>
      )}
    </AnimatePresence>
  )
}

export default DisposableHelp
