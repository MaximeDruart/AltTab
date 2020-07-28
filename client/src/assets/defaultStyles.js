import styled, { css } from "styled-components"
import { motion } from "framer-motion"

import React from "react"

export const styles = {
  txtSize: {
    XSmall: "14px",
    small: "16px",
    medium: "20px",
    mediumPlus: "27px",
    large: "34px",
    XLarge: "40px",
  },
  txtColor1: "#E2E2E2",
  txtColor2: "#BEBEBE",
  txtColorDisabled: "#858585",
  blue: "#7D63FF",
  disabledBlue: "#8881ab",
  darkBlue: "#463988",
  hoverBlue: "#a18ff8",
  black: {
    light: "#272732",
    medium: "#1B1B26",
    dark: "#0F0F12",
  },
  red: "#C32A2A",
  boxShadowHard: css`
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.29);
  `,
  boxShadowSoft: css`
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.12);
  `,
  flexCentered: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
}

export const Button = (props) => (
  <StyledButton
    {...props}
    initial={{ scale: 0.85 }}
    animate={{ scale: 1 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
  >
    {props.children}
  </StyledButton>
)

const StyledButton = styled(motion.button)`
  ${styles.boxShadowSoft};
  color: #ffffff;
  border-radius: 10px;
  display: block;
  margin: 0;
  border: none;
  text-decoration: none;
  outline : none;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  ${(props) => sizeVariantSwitch(props.size)}
  background: ${(props) => backgroundVariantSwitch(props.variant)};
  pointer-events: ${(props) => (props.variant === "disabled" ? "none" : "auto")};
  width: ${(props) => (props.size === "large" ? "100%" : "initial")};
  &:focus{
    outline : none
  }
`

const backgroundVariantSwitch = (variant) => {
  switch (variant) {
    case "disabled":
      return "#8881ab"
    case "dark":
      return "#463988"
    default:
      return "#7d63ff"
  }
}

const sizeVariantSwitch = (size) => {
  switch (size) {
    case "small":
      return css`
        padding: 0.8rem 2rem;
        font-size: 20px !important;
      `
    case "large":
      return css`
        padding: 1rem 2rem;
        font-size: 26px !important;
      `
    default:
      return css`
        padding: 1.2rem 2.4rem;
        font-size: 28px !important;
      `
  }
}

export const Selector = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 300px;
  .left,
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 50px;
    background-color: #1b1b26;
    color: #bebebe;
    border: thin solid #272732;
    cursor: pointer;
    transition: all 0.15s ease-in;
    &.active {
      background-color: #272732;
      border: 1px solid #7d63ff;
      z-index: 10;
      color: #e2e2e2;
      cursor: default;
    }
    &:hover {
      background-color: #272732;
    }
  }
  .left {
    border-radius: 10px 0 0 10px;
  }
  .right {
    border-radius: 0 10px 10px 0;
  }
`
