import React from "react"
import styled from "styled-components"
import { styles } from "../../../assets/defaultStyles"
import { motion } from "framer-motion"

const hoverVariants = {
  hover: { stroke: styles.hoverBlue },
  default: { stroke: styles.blue },
}

const FieldContainer = styled.div`
  width: 100%;

  .field {
    width: 100%;
    .header {
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
        }
        .desc {
          font-size: ${styles.txtSize.medium};
          color: ${styles.txtColor2};
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
      margin-top: 25px;
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: flex-start;
    }
  }
`

const Field = ({ children, title, desc }) => {
  return (
    <FieldContainer>
      <div className="field">
        <div className="header">
          <div className="left">
            <div className="title">{title}</div>
            <div className="desc">{desc}</div>
          </div>
          <div className="collapse">
            <motion.svg whileHover="hover" initial="initial" width="20" height="14" viewBox="0 0 20 14">
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
        <div className="items-container">{children}</div>
      </div>
    </FieldContainer>
  )
}

export default Field
