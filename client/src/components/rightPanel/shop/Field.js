import React, { useState } from "react"
import styled from "styled-components"
import { styles } from "../../../assets/defaultStyles"
import { motion, AnimatePresence } from "framer-motion"

const hoverVariants = {
  hover: { stroke: styles.hoverBlue },
  rotate: { rotate: 180 },
  defaultRotate: { rotate: 0 },
}

const FieldContainer = styled.div`
  width: 100%;
  padding-top: 20px;

  .field {
    width: 100%;
    .header {
      margin-bottom: 45px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      position: relative;

      .left {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;
        .title {
          font-size: ${styles.txtSize.XLarge};
          margin-right: 20px;
          white-space: nowrap;
        }
        .desc {
          font-size: ${styles.txtSize.medium};
          color: ${styles.txtColor2};
          white-space: nowrap;
        }
      }

      .collapse {
        cursor: pointer;
      }

      &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 7px;
        border-radius: 4px;
        bottom: -20px;
        left: 50%;
        transition: all 0.3s ease-in;
        transform: translate(-50%, -50%);
        background: ${styles.black.medium};
      }
    }
    .items-container {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: flex-start;
    }
  }
`

const Field = ({ children, title, desc }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <FieldContainer>
      <div className="field">
        <div className="header">
          <div className="left">
            <div className="title">{title}</div>
            <div className="desc">{desc}</div>
          </div>
          <div className="collapse">
            <motion.svg
              onClick={() => setCollapsed(!collapsed)}
              whileHover="hover"
              animate={collapsed ? "rotate" : "defaultRotate"}
              width="20"
              height="14"
              viewBox="0 0 20 14"
            >
              <motion.path
                variants={hoverVariants}
                d="M2 2L10 11L18 2"
                stroke={styles.blue}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </motion.svg>
          </div>
        </div>
        <AnimatePresence exitBeforeEnter>
          {!collapsed && (
            <motion.div
              variants={{
                open: { opacity: 1, height: "auto", transition: { staggerChildren: 0.02, delayChildren: 0.1 } },
                collapsed: { opacity: 0, height: 0 },
              }}
              initial="collapsed"
              animate="open"
              exit="collapsed"
              className="items-container"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FieldContainer>
  )
}

export default Field
